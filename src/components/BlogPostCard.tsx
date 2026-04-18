import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Box, Chip, Link, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ContentPanel } from "./ContentPanel";
import type { BlogAccessLevel } from "../lib/substack";
import newBadgeIcon from "../assets/newIcon.png";

type BlogPostCardProps = {
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  publishedLabel: string;
  tags: string[];
  imageUrl?: string;
  accessLevel: BlogAccessLevel;
};

const NEW_POST_WINDOW_DAYS = 7;

const isNewPost = (publishedAt: string): boolean => {
  const date = new Date(publishedAt);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const ageInMs = Date.now() - date.getTime();
  const maxAgeInMs = NEW_POST_WINDOW_DAYS * 24 * 60 * 60 * 1000;

  return ageInMs >= 0 && ageInMs <= maxAgeInMs;
};

export const BlogPostCard = ({
  title,
  excerpt,
  url,
  publishedAt,
  publishedLabel,
  tags,
  imageUrl,
  accessLevel,
}: BlogPostCardProps): JSX.Element => {
  const theme = useTheme();
  const accessLabel =
    accessLevel === "paid"
      ? "Paid"
      : accessLevel === "free"
        ? "Free"
        : "Free";
  const isNew = isNewPost(publishedAt);

  return (
    <ContentPanel
      sx={{
        height: "100%",
        gap: 2,
      }}
    >
      <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={`Featured image for ${title}`}
            loading="lazy"
            sx={{
              width: "100%",
              aspectRatio: "4 / 3",
              objectFit: "cover",
              borderRadius: 2.25,
              border: "1px solid",
              borderColor: "divider",
            }}
          />
        ) : null}
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={1}
          alignItems="baseline"
        >
          <Stack direction="row" spacing={0.65} alignItems="center">
            {isNew ? (
              <Box
                component="img"
                src={newBadgeIcon}
                alt="New this week"
                sx={{
                  width: 18,
                  height: 18,
                  display: "inline-block",
                  objectFit: "contain",
                  opacity: 0.72,
                  filter:
                    theme.palette.mode === "dark"
                      ? "brightness(0) invert(1) opacity(0.82)"
                      : "none",
                }}
                title="New this week"
              />
            ) : null}
            <Chip
              label={accessLabel}
              size="small"
              variant="outlined"
              sx={{
                height: 22,
                borderRadius: 999,
                fontSize: "0.68rem",
                textTransform: "none",
                letterSpacing: "0.08em",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(243, 245, 242, 0.03)"
                    : "rgba(255, 253, 249, 0.8)",
                borderColor: "divider",
                color: "text.secondary",
              }}
            />
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ whiteSpace: "nowrap", pt: 0.15 }}
          >
            {publishedLabel}
          </Typography>
        </Stack>

        <Typography
          component="a"
          href={url}
          target="_blank"
          rel="noreferrer"
          variant="h3"
          sx={{
            color: "text.primary",
            textDecoration: "none",
            display: "block",
            "&:hover": {
              textDecoration: "underline",
              textUnderlineOffset: "0.15em",
            },
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,
            overflow: "hidden",
          }}
        >
          {excerpt}
        </Typography>

        {tags.length > 0 ? (
          <Stack direction="row" useFlexGap flexWrap="wrap" gap={0.75}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.secondary",
                }}
              />
            ))}
          </Stack>
        ) : null}
      </Stack>

      <Link
        href={url}
        target="_blank"
        rel="noreferrer"
        underline="hover"
        color="text.primary"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          width: "fit-content",
        }}
      >
        Read on Substack
        <ArrowOutwardRoundedIcon fontSize="inherit" />
      </Link>
    </ContentPanel>
  );
};
