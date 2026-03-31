import { ReactNode } from "react";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  disableDivider?: boolean;
};

export const Section = ({
  id,
  eyebrow,
  title,
  description,
  children,
  disableDivider = false,
}: SectionProps): JSX.Element => {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: { xs: 9, md: 13 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 4.5, md: 5.5 }}>
          <Stack spacing={1.5} maxWidth={780}>
            {eyebrow ? (
              <Typography
                variant="overline"
                sx={{ color: "text.secondary", letterSpacing: "0.12em" }}
              >
                {eyebrow}
              </Typography>
            ) : null}
            <Typography variant="h2" color="text.primary">
              {title}
            </Typography>
            {description ? (
              <Typography variant="body1" color="text.secondary">
                {description}
              </Typography>
            ) : null}
          </Stack>
          {children}
          {!disableDivider ? <Divider /> : null}
        </Stack>
      </Container>
    </Box>
  );
};
