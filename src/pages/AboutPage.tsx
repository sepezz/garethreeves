import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import englandMap from "../assets/england_location_map.svg";

const CAMBRIDGE_MARKER_STYLE = {
  left: "78.5%",
  top: "60.7%",
} as const;

export const AboutPage = (): JSX.Element => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const mapFilter = isDarkMode
    ? "brightness(0.82) contrast(0.96) saturate(0.72)"
    : "none";
  const pinColor = isDarkMode ? "#a8bf82" : "#7aa64f";
  const labelColor = isDarkMode ? "#f0f3ef" : "#34413a";
  const labelShadow = isDarkMode
    ? "0 1px 0 rgba(0, 0, 0, 0.65)"
    : "0 1px 0 rgba(255, 255, 255, 0.65)";

  return (
    <Box sx={{ py: { xs: 7.5, sm: 8.5, md: 12 } }}>
      <Container maxWidth="md">
        <Stack spacing={{ xs: 2.5, sm: 3, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.25, sm: 3, md: 6 },
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
              borderRadius: { xs: 2.25, sm: 3, md: 4 },
            }}
          >
            <Stack spacing={{ xs: 3, md: 3.5 }} maxWidth={640}>
              <Typography
                variant="overline"
                sx={{ color: "text.secondary", letterSpacing: "0.12em" }}
              >
                About
              </Typography>
              <Typography
                variant="h1"
                sx={{ fontSize: "clamp(2.4rem, 6vw, 3.6rem)" }}
              >
                Careful editorial work for serious writing.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Based in Cambridge, Gareth Reeves offers freelance academic
                editing and proofreading for scholars, researchers, and
                professionals who need clear, refined, submission-ready prose.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The approach is measured and collaborative: improving accuracy,
                readability, and consistency while respecting the author’s
                voice, argument, and disciplinary conventions.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Work spans humanities research, journal publishing, and
                specialist material across technical and regulated fields.
              </Typography>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
              borderRadius: { xs: 2.25, sm: 3, md: 4 },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={englandMap}
                alt="Map of England with Cambridge marked"
                loading="lazy"
                sx={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  filter: mapFilter,
                }}
              />
              <LocationOnRoundedIcon
                aria-hidden="true"
                sx={{
                  position: "absolute",
                  ...CAMBRIDGE_MARKER_STYLE,
                  transform: "translate(-50%, -100%)",
                  fontSize: { xs: 40, sm: 44, md: 48 },
                  color: pinColor,
                  filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.18))",
                  pointerEvents: "none",
                }}
              />
              <Typography
                aria-hidden="true"
                variant="caption"
                sx={{
                  position: "absolute",
                  left: CAMBRIDGE_MARKER_STYLE.left,
                  top: CAMBRIDGE_MARKER_STYLE.top,
                  transform: "translate(-50%, 10px)",
                  color: labelColor,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  textShadow: labelShadow,
                  pointerEvents: "none",
                }}
              >
                Cambridge
              </Typography>
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};
