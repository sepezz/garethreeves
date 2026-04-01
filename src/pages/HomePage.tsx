import {
  ArrowOutwardRounded,
  SouthRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { PageKey } from "../App";
import { CiepMembershipPanel } from "../components/CiepMembershipPanel";
import { ContentPanel } from "../components/ContentPanel";
import { ContactForm } from "../components/ContactForm";
import { Section } from "../components/Section";

type PortfolioGroup = {
  title: string;
  items: string[];
};

const portfolioGroups: PortfolioGroup[] = [
  {
    title: "Books and Theses",
    items: ["Monograph sample", "Doctoral thesis sample", "Edited book chapter"],
  },
  {
    title: "Journal Articles and Reviews",
    items: ["Peer-reviewed article", "Literature review", "Journal submission"],
  },
  {
    title: "Other Work",
    items: ["Finance report", "Policy paper", "Specialist feature article"],
  },
];

const expertiseAreas = [
  "English Literature",
  "History",
  "Finance",
  "Regulation",
  "Life sciences",
  "Medicine",
  "Neuroscience",
];

type HomePageProps = {
  onNavigate: (page: PageKey) => void;
  onRequestQuote: () => void;
};

export const HomePage = ({
  onNavigate,
  onRequestQuote,
}: HomePageProps): JSX.Element => {
  return (
    <Box>
      <Box
        sx={(theme) => ({
          borderBottom: "1px solid",
          borderColor: "divider",
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, rgba(255,253,249,1) 0%, rgba(247,245,241,1) 72%)"
              : "linear-gradient(180deg, rgba(29,35,32,1) 0%, rgba(21,25,23,1) 74%)",
        })}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={{ xs: 4, sm: 5, md: 7 }}
            sx={{ py: { xs: 8, sm: 9, md: 15 }, alignItems: "center" }}
          >
            <Grid item xs={12} md={7}>
              <Stack spacing={{ xs: 3.5, md: 4 }}>
                <Typography
                  variant="overline"
                  sx={{ color: "text.secondary", letterSpacing: "0.12em" }}
                >
                  Freelance Academic Editing
                </Typography>
                <Typography variant="h1" color="text.primary">
                  Academic editor/proofreader who turns draft work into polished
                  and precise prose.
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ maxWidth: 620 }}
                >
                  Careful editorial support for books, theses, journal articles,
                  reports, and specialist writing. Every edit is attentive to
                  tone, clarity, structure, and scholarly precision.
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 0.75, sm: 1, md: 1.25 }}
                  sx={{ alignItems: { xs: "center", sm: "center" } }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<SouthRounded />}
                    onClick={onRequestQuote}
                    fullWidth
                    sx={{
                      width: { xs: "100%", sm: "auto" },
                      pr: { sm: 2.25 },
                    }}
                  >
                    Request a Quote
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => onNavigate("about")}
                    endIcon={<ArrowOutwardRounded />}
                    sx={{
                      color: "text.secondary",
                      justifyContent: { xs: "flex-start", sm: "center" },
                      minWidth: "auto",
                      px: { xs: 0, sm: 1 },
                      mt: { xs: 0, sm: 0 },
                      textAlign: "center",
                    }}
                  >
                    Learn more
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={(theme) => ({
                  p: { xs: 2.25, sm: 2.75, md: 3.5 },
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "background.paper"
                      : "rgba(34, 41, 38, 0.9)",
                  borderRadius: { xs: 2.25, sm: 3, md: 3 },
                  maxWidth: { xs: 420, md: 360 },
                  mx: { xs: "auto", md: "auto" },
                })}
              >
                <Stack spacing={{ xs: 2, md: 2.75 }}>
                  <Typography variant="overline" sx={{ color: "text.secondary" }}>
                    How the work is handled
                  </Typography>
                  <Typography
                    variant="h3"
                    color="text.primary"
                    sx={{ maxWidth: { xs: "none", md: 250 } }}
                  >
                    Editorial support shaped around submission-ready writing
                  </Typography>
                  <Stack spacing={1.75}>
                    <Typography variant="body2" color="text.secondary">
                      Proofreading, copyediting, and developmental editing
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track Changes workflow with clear comments
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Practical feedback, optional style sheet, and careful
                      subject handling
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Section
        id="services"
        eyebrow="Services"
        title="Editing at the level your draft requires."
        description="Support ranges from a final polish to more substantial editorial work, always with an emphasis on accuracy, readability, and an appropriate academic register."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: { xs: 2.5, sm: 2.75, lg: 3.25 },
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {[
            {
              title: "Proofreading",
              text: "A final-stage review for grammar, punctuation, consistency, and surface-level corrections.",
            },
            {
              title: "Copyediting",
              text: "Sentence-level editing to improve clarity, flow, usage, and stylistic consistency while preserving your voice.",
            },
            {
              title: "Developmental editing",
              text: "Broader editorial input on structure, argument, coherence, and the presentation of complex material.",
            },
          ].map((service) => (
            <ContentPanel
              key={service.title}
              sx={{
                maxWidth: { lg: 286 },
                width: "100%",
                justifySelf: "center",
              }}
            >
              <Stack spacing={1.5}>
                <Typography variant="h3">{service.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.text}
                </Typography>
              </Stack>
            </ContentPanel>
          ))}
        </Box>
      </Section>

      <Section
        id="expertise"
        eyebrow="Expertise"
        title="Grounded in the arts and humanities, with wide specialist reach."
        description="The core focus is academic writing in English Literature and History, alongside substantial editorial experience across professional and technical fields."
      >
        <Stack direction="row" spacing={1.2} useFlexGap flexWrap="wrap">
          {expertiseAreas.map((area) => (
            <Chip
              key={area}
              label={area}
              sx={{
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                color: "text.secondary",
              }}
            />
          ))}
        </Stack>
      </Section>

      <Section
        id="process"
        eyebrow="Process"
        title="Clear editorial work, delivered in a practical format."
        description="Edits are made directly in your document with Track Changes and concise comments, so you can review every intervention with confidence."
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: { xs: 2.5, sm: 2.75, lg: 3.25 },
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {[
            "Works in Microsoft Word using Track Changes and comments",
            "Provides feedback that is direct, readable, and proportionate to the brief",
            "Returns an edited document and, where useful, an accompanying style sheet",
          ].map((item) => (
            <ContentPanel
              key={item}
              sx={{
                maxWidth: { lg: 286 },
                width: "100%",
                justifySelf: "center",
              }}
            >
              <Typography variant="body1" color="text.secondary">
                {item}
              </Typography>
            </ContentPanel>
          ))}
        </Box>
      </Section>

      <Section
        id="credentials"
        eyebrow="Credentials"
        title="Academic depth paired with long publishing experience."
      >
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            {[
              "PhD in English Literature",
              "20 years in publishing",
              "Approximately 30 peer-reviewed articles",
              "More than 100 articles for Reuters",
              "Level 6 CISI diploma",
            ].map((credential) => (
              <Grid item xs={12} sm={6} md={4} key={credential}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                    borderRadius: 4,
                  }}
                >
                  <Typography variant="body1">{credential}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: { xs: 3.5, md: 4 } }}>
            <CiepMembershipPanel />
          </Box>
        </Box>
      </Section>

      <Section
        id="testimonial"
        eyebrow="Testimonial"
        title="Trusted by clients who need reliable, thoughtful editorial work."
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", md: 620 },
            mx: { xs: 0, md: "auto" },
          }}
        >
          <ContentPanel
            sx={{
              px: { xs: 2.75, sm: 3.25, md: 3.75 },
              py: { xs: 3, md: 3.5 },
              borderRadius: { xs: 2.25, sm: 3, md: 3 },
            }}
          >
            <Stack spacing={1.5} maxWidth={430}>
              <Typography
                variant="h3"
                sx={{ fontSize: "1.55rem", lineHeight: 1.45 }}
              >
                “truly reliable”
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Helena S (University of Cambridge)
              </Typography>
            </Stack>
          </ContentPanel>
        </Box>
      </Section>

      <Section
        id="portfolio"
        eyebrow="Portfolio"
        title="Selected examples of editorial work."
        description="Selected work can be presented by publication type, project scale, and subject area."
      >
        <Box
          sx={{
            mt: { xs: 0, md: -0.5 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: { xs: 2.5, sm: 2.75, lg: 3 },
            maxWidth: 870,
            mx: "auto",
          }}
        >
          {portfolioGroups.map((group) => (
            <ContentPanel
              key={group.title}
              sx={{
                maxWidth: { lg: 276 },
                width: "100%",
                justifySelf: "center",
              }}
            >
              <Stack spacing={1.75}>
                <Typography
                  variant="h3"
                  sx={{
                    lineHeight: 1.3,
                    minHeight: { lg: 48 },
                    maxWidth: group.title === "Journal Articles and Reviews" ? 220 : "none",
                  }}
                >
                  {group.title}
                </Typography>
                <Stack spacing={1.1}>
                  {group.items.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      underline="hover"
                      color="text.secondary"
                      sx={{ width: "fit-content" }}
                    >
                      {item}
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </ContentPanel>
          ))}
        </Box>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Request a quote or ask about your project."
        description="Send the basic details below and you will have a clear sense of scope, timing, and the level of editing that best fits the work."
        disableDivider
      >
        <ContactForm />
      </Section>
    </Box>
  );
};
