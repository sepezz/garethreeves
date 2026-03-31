import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { ContactForm } from "../components/ContactForm";

export const ContactPage = (): JSX.Element => {
  return (
    <Box sx={{ py: { xs: 9, md: 12 } }}>
      <Container maxWidth="md">
        <Stack spacing={{ xs: 4.5, md: 5.5 }}>
          <Stack spacing={1.75} maxWidth={620} mx="auto" textAlign="center">
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", letterSpacing: "0.12em" }}
            >
              Contact
            </Typography>
            <Typography variant="h1" sx={{ fontSize: "clamp(2.4rem, 6vw, 3.8rem)" }}>
              Send details of your project.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Share your draft stage, approximate word count, deadline, and any
              particular concerns, and you will receive a clear response on
              scope, timing, and the level of editing that best suits the work.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Or email directly at{" "}
              <Link
                href="mailto:garethareeves@hotmail.com"
                color="text.primary"
                underline="hover"
              >
                garethareeves@hotmail.com
              </Link>
            </Typography>
          </Stack>
          <ContactForm />
        </Stack>
      </Container>
    </Box>
  );
};
