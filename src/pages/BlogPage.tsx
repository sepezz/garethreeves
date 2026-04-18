import { useEffect, useState } from "react";
import { ArrowOutwardRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { BlogPostCard } from "../components/BlogPostCard";
import { ContentPanel } from "../components/ContentPanel";
import {
  fetchSubstackPosts,
  getSubstackConfig,
  type BlogPost,
} from "../lib/substack";

const substackConfig = getSubstackConfig();
const INITIAL_VISIBLE_POSTS = 6;
const LOAD_MORE_INCREMENT = 6;

const BlogSkeletonCard = (): JSX.Element => {
  return (
    <ContentPanel
      sx={{
        height: "100%",
        gap: 2,
      }}
    >
      <Stack spacing={1.25}>
        <Skeleton variant="rounded" width="100%" height={192} />
        <Skeleton width="42%" height={18} />
        <Skeleton width="72%" height={42} />
        <Skeleton width="100%" height={22} />
        <Skeleton width="88%" height={22} />
      </Stack>
      <Skeleton width={128} height={24} />
    </ContentPanel>
  );
};

const BlogNoticeCard = ({
  eyebrow,
  title,
  body,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  body: string;
  actionLabel?: string;
}): JSX.Element => {
  return (
    <Box sx={{ maxWidth: 760, mx: "auto" }}>
      <ContentPanel
        sx={{
          p: { xs: 2.75, sm: 3.25, md: 3.5 },
          gap: 1.5,
        }}
      >
        <Stack spacing={1.1} maxWidth={520}>
          <Typography
            variant="overline"
            sx={{ color: "text.secondary", letterSpacing: "0.12em" }}
          >
            {eyebrow}
          </Typography>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </Stack>
        {actionLabel && substackConfig.publicationUrl ? (
          <Button
            component="a"
            href={substackConfig.publicationUrl}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            color="primary"
            sx={{ width: "fit-content" }}
          >
            {actionLabel}
          </Button>
        ) : null}
      </ContentPanel>
    </Box>
  );
};

export const BlogPage = (): JSX.Element => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_POSTS);

  useEffect(() => {
    const controller = new AbortController();

    const loadPosts = async (): Promise<void> => {
      if (!substackConfig.feedUrl) {
        setLoading(false);
        setErrorMessage(
          "We couldn't connect to Substack right now. Please try again shortly.",
        );
        return;
      }

      setLoading(true);
      setErrorMessage(null);

      try {
        const nextPosts = await fetchSubstackPosts(
          substackConfig.feedUrl,
          substackConfig.archiveUrl,
          controller.signal,
        );
        setPosts(nextPosts);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Failed to load Substack posts", error);
        setErrorMessage(
          "We couldn't connect to Substack right now. Please try again shortly.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadPosts();

    return () => {
      controller.abort();
    };
  }, []);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < posts.length;

  const handleViewMore = (): void => {
    setVisibleCount((current) => current + LOAD_MORE_INCREMENT);
  };

  return (
    <Box sx={{ py: { xs: 7.5, sm: 8.5, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 4.5, md: 5.5 }}>
          <Stack
            spacing={{ xs: 1.5, md: 1.75 }}
            maxWidth={720}
            mx="auto"
            textAlign="center"
          >
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", letterSpacing: "0.12em" }}
            >
              Blog
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontSize: "clamp(2.35rem, 5.5vw, 3.9rem)" }}
            >
              Writing from Substack.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Recent posts from Gareth Reeves appear here automatically, with
              each card labelled to show whether it is free or paid on
              Substack.
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                opacity: 0.76,
                maxWidth: 540,
                mx: "auto",
              }}
            >
              Posts appear automatically from Gareth's Substack archive and
              RSS feed.
            </Typography>
            {substackConfig.publicationUrl ? (
              <Button
                component="a"
                href={substackConfig.publicationUrl}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                color="primary"
                endIcon={<ArrowOutwardRounded />}
                sx={{ alignSelf: "center", width: "fit-content" }}
              >
                Visit Substack
              </Button>
            ) : null}
          </Stack>

          <Box sx={{ maxWidth: 1040, width: "100%", mx: "auto" }}>
            {loading ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    lg: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: { xs: 2.5, sm: 2.75, lg: 3 },
                }}
              >
                {Array.from({ length: INITIAL_VISIBLE_POSTS }).map((_, index) => (
                  <BlogSkeletonCard key={index} />
                ))}
              </Box>
            ) : errorMessage ? (
              <BlogNoticeCard
                eyebrow="Connection issue"
                title="We couldn't connect to Substack."
                body={errorMessage}
                actionLabel="Open the Substack source"
              />
            ) : posts.length > 0 ? (
              <Stack spacing={3} alignItems="center">
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, minmax(0, 1fr))",
                      lg: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: { xs: 2.5, sm: 2.75, lg: 3 },
                    alignItems: "stretch",
                    width: "100%",
                  }}
                >
                  {visiblePosts.map((post) => (
                    <BlogPostCard
                      key={post.url}
                      title={post.title}
                      excerpt={post.excerpt}
                      url={post.url}
                      publishedAt={post.publishedAt}
                      publishedLabel={post.publishedLabel}
                      tags={post.tags}
                      imageUrl={post.imageUrl}
                      accessLevel={post.accessLevel}
                    />
                  ))}
                </Box>
                {hasMorePosts ? (
                  <Button
                    type="button"
                    onClick={handleViewMore}
                    variant="outlined"
                    color="primary"
                    sx={{
                      width: { xs: "100%", sm: "fit-content" },
                      minWidth: { sm: 180 },
                    }}
                  >
                    View more
                  </Button>
                ) : null}
              </Stack>
            ) : posts.length > 0 ? (
              <BlogNoticeCard
                eyebrow="No public posts"
                title="Public posts aren’t available yet."
                body="Gareth’s free Substack posts will appear here once there are public posts in the archive."
                actionLabel="Open Substack"
              />
            ) : (
              <BlogNoticeCard
                eyebrow="No posts available"
                title="There aren’t any posts to show yet."
                body="Gareth’s Substack posts will appear here once the feed and archive are available."
                actionLabel="Open Substack"
              />
            )}
          </Box>

        </Stack>
      </Container>
    </Box>
  );
};
