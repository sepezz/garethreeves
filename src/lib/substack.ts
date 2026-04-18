export type BlogPost = {
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  publishedLabel: string;
  tags: string[];
  imageUrl?: string;
  accessLevel: BlogAccessLevel;
};

export type SubstackConfig = {
  feedUrl: string;
  archiveUrl: string;
  publicationUrl: string;
  sourceLabel: string;
};

export type BlogAccessLevel = "free" | "paid" | "unknown";

const DEFAULT_SUBSTACK_PUBLICATION_URL = "https://garethareeves.substack.com";
const DEFAULT_SUBSTACK_FEED_ENDPOINT = "/api/substack-feed";
const DEFAULT_SUBSTACK_ARCHIVE_ENDPOINT = "/api/substack-archive";

const normalizeUrl = (value: string | undefined): string => {
  return value?.trim().replace(/\/+$/, "") ?? "";
};

const normalizePostUrl = (value: string): string => {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return value.trim().replace(/\/+$/, "");
  }
};

export const getSubstackConfig = (): SubstackConfig => {
  const publicationUrl = normalizeUrl(
    import.meta.env.VITE_SUBSTACK_PUBLICATION_URL,
  );
  const feedUrlFromEnv = normalizeUrl(import.meta.env.VITE_SUBSTACK_FEED_URL);
  const archiveUrlFromEnv = normalizeUrl(
    import.meta.env.VITE_SUBSTACK_ARCHIVE_URL,
  );

  const resolvedPublicationUrl =
    publicationUrl || DEFAULT_SUBSTACK_PUBLICATION_URL;
  const feedUrl = feedUrlFromEnv || DEFAULT_SUBSTACK_FEED_ENDPOINT;
  const archiveUrl = archiveUrlFromEnv || DEFAULT_SUBSTACK_ARCHIVE_ENDPOINT;

  return {
    feedUrl,
    archiveUrl,
    publicationUrl: resolvedPublicationUrl,
    sourceLabel: "Gareth's Substack",
  };
};

const stripHtml = (value: string): string => {
  const parser = new DOMParser();
  const document = parser.parseFromString(value, "text/html");
  return document.body.textContent?.replace(/\s+/g, " ").trim() ?? "";
};

const truncate = (value: string, limit: number): string => {
  if (value.length <= limit) {
    return value;
  }

  const shortened = value.slice(0, limit).replace(/\s+\S*$/, "").trimEnd();

  return `${shortened}…`;
};

const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const getItemText = (element: Element, tagName: string): string => {
  return element.getElementsByTagName(tagName)[0]?.textContent?.trim() ?? "";
};

const getContentHtml = (element: Element): string => {
  return (
    element.getElementsByTagName("content:encoded")[0]?.textContent?.trim() ??
    getItemText(element, "description")
  );
};

const getItemImageUrl = (element: Element): string | undefined => {
  const enclosure = element.getElementsByTagName("enclosure")[0];
  const enclosureUrl = enclosure?.getAttribute("url")?.trim() ?? "";

  if (enclosureUrl) {
    return enclosureUrl;
  }

  const rawContent = getContentHtml(element);
  if (!rawContent) {
    return undefined;
  }

  const parser = new DOMParser();
  const document = parser.parseFromString(rawContent, "text/html");
  return document.querySelector("img[src]")?.getAttribute("src")?.trim() || undefined;
};

const getArchiveAccessMap = (archiveHtml: string): Map<string, BlogAccessLevel> => {
  const parser = new DOMParser();
  const document = parser.parseFromString(archiveHtml, "text/html");

  if (document.querySelector("parsererror")) {
    throw new Error("Substack returned an unreadable archive.");
  }

  const accessMap = new Map<string, BlogAccessLevel>();
  const articles = Array.from(
    document.querySelectorAll<HTMLElement>(
      '[role="article"][aria-label^="Post preview for "]',
    ),
  );

  articles.forEach((article) => {
    const titleLink = article.querySelector<HTMLAnchorElement>(
      'a[data-testid="post-preview-title"]',
    );
    const href = titleLink?.getAttribute("href")?.trim() ?? "";

    if (!href) {
      return;
    }

    const accessLevel: BlogAccessLevel = article.querySelector("svg.lucide-lock")
      ? "paid"
      : "free";

    accessMap.set(normalizePostUrl(href), accessLevel);
  });

  if (accessMap.size === 0) {
    throw new Error("Substack archive returned no post previews.");
  }

  return accessMap;
};

export const fetchSubstackPosts = async (
  feedUrl: string,
  archiveUrl: string,
  signal?: AbortSignal,
): Promise<BlogPost[]> => {
  if (!feedUrl) {
    throw new Error("Substack feed URL is not configured.");
  }

  if (!archiveUrl) {
    throw new Error("Substack archive URL is not configured.");
  }

  const [feedResponse, archiveResponse] = await Promise.all([
    fetch(feedUrl, { signal }),
    fetch(archiveUrl, { signal }),
  ]);

  if (!feedResponse.ok) {
    throw new Error(`Unable to load Substack posts (${feedResponse.status}).`);
  }

  if (!archiveResponse.ok) {
    throw new Error(
      `Unable to load the Substack archive (${archiveResponse.status}).`,
    );
  }

  const [xmlText, archiveHtml] = await Promise.all([
    feedResponse.text(),
    archiveResponse.text(),
  ]);
  const parser = new DOMParser();
  const document = parser.parseFromString(xmlText, "text/xml");
  const archiveAccessMap = getArchiveAccessMap(archiveHtml);

  if (document.querySelector("parsererror")) {
    throw new Error("Substack returned an unreadable feed.");
  }

  return Array.from(document.getElementsByTagName("item"))
    .map((item): BlogPost | null => {
      const title = getItemText(item, "title");
      const url =
        getItemText(item, "link") || getItemText(item, "guid") || "";
      const publishedAt = getItemText(item, "pubDate") || getItemText(item, "published");
      const publishedLabel = formatDate(publishedAt);
      const categories = Array.from(
        item.getElementsByTagName("category"),
      ).flatMap((category) =>
        category.textContent ? [category.textContent.trim()] : [],
      );

      const rawContent = getContentHtml(item);
      const excerpt = truncate(stripHtml(rawContent), 220) || "Read the full post on Substack.";
      const imageUrl = getItemImageUrl(item);
      const accessLevel = archiveAccessMap.get(normalizePostUrl(url)) ?? "unknown";

      if (!title || !url) {
        return null;
      }

      return {
        title,
        excerpt,
        url,
        publishedAt,
        publishedLabel,
        tags: Array.from(new Set(categories)).filter(Boolean).slice(0, 3),
        imageUrl,
        accessLevel,
      };
    })
    .filter((item): item is BlogPost => item !== null);
};
