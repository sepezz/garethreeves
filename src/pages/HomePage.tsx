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
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(180deg, rgba(255,253,249,1) 0%, rgba(247,245,241,1) 72%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={{ xs: 6, md: 7 }}
            sx={{ py: { xs: 10, md: 15 }, alignItems: "center" }}
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
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<SouthRounded />}
                    onClick={onRequestQuote}
                  >
                    Request a Quote
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => onNavigate("about")}
                    endIcon={<ArrowOutwardRounded />}
                    sx={{ color: "text.secondary" }}
                  >
                    Learn more
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4.5 },
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                  borderRadius: 4,
                }}
              >
                <Stack spacing={3.5}>
                  <Typography variant="overline" sx={{ color: "text.secondary" }}>
                    How the work is handled
                  </Typography>
                  <Typography variant="h3" color="text.primary" sx={{ maxWidth: 280 }}>
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
        <Grid container spacing={3}>
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
            <Grid item xs={12} md={4} key={service.title}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="h3">{service.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.text}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
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
        <Grid container spacing={3}>
          {[
            "Works in Microsoft Word using Track Changes and comments",
            "Provides feedback that is direct, readable, and proportionate to the brief",
            "Returns an edited document and, where useful, an accompanying style sheet",
          ].map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {item}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section
        id="credentials"
        eyebrow="Credentials"
        title="Academic depth paired with long publishing experience."
      >
        <Box>
          <Grid container spacing={2}>
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

          <Box sx={{ mt: 4 }}>
            <CiepMembershipPanel />
          </Box>
        </Box>
      </Section>

      <Section
        id="testimonial"
        eyebrow="Testimonial"
        title="Trusted by clients who need reliable, thoughtful editorial work."
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h3" sx={{ fontSize: "1.55rem" }}>
              “truly reliable”
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Helena S (University of Cambridge)
            </Typography>
          </Stack>
        </Paper>
      </Section>

      <Section
        id="portfolio"
        eyebrow="Portfolio"
        title="Selected examples of editorial work."
        description="Selected work can be presented by publication type, project scale, and subject area."
      >
        <Grid container spacing={3}>
          {portfolioGroups.map((group) => (
            <Grid item xs={12} md={4} key={group.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h3">{group.title}</Typography>
                  <Stack spacing={1.2}>
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
              </Paper>
            </Grid>
          ))}
        </Grid>
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
