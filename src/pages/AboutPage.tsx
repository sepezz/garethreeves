import { Box, Container, Paper, Stack, Typography } from "@mui/material";

export const AboutPage = (): JSX.Element => {
  return (
    <Box sx={{ py: { xs: 7.5, sm: 8.5, md: 12 } }}>
      <Container maxWidth="md">
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
            <Typography variant="h1" sx={{ fontSize: "clamp(2.4rem, 6vw, 3.6rem)" }}>
              Careful editorial work for serious writing.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gareth Reeves offers freelance academic editing and proofreading
              for scholars, researchers, and professionals who need clear,
              refined, submission-ready prose.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The approach is measured and collaborative: improving accuracy,
              readability, and consistency while respecting the author’s voice,
              argument, and disciplinary conventions.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Work spans humanities research, journal publishing, and specialist
              material across technical and regulated fields.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
