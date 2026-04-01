import { ChangeEvent, FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { CONTACT_EMAIL } from "../constants/site";

type FormState = {
  name: string;
  email: string;
  wordCount: string;
  deadline: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  wordCount: "",
  deadline: "",
  message: "",
};

export const ContactForm = (): JSX.Element => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
      setSubmitted(false);
      setErrorMessage(null);
      setFormState((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);
    setErrorMessage(null);

    try {
      const { name, email, wordCount, deadline, message } = formState;
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "form-name": "contact",
          name,
          email,
          wordCount,
          deadline,
          message,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setSubmitted(true);
      setFormState(initialState);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 680,
        mx: "auto",
        px: { xs: 2, sm: 2.5, md: 4.5 },
        py: { xs: 2.5, sm: 3, md: 4.5 },
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        borderRadius: { xs: 2.25, sm: 3, md: 4 },
        overflow: "hidden",
      }}
    >
      <Stack spacing={{ xs: 3, md: 3.5 }}>
        <Box sx={{ maxWidth: 560 }}>
          <Typography variant="body2" color="text.secondary">
            Please include a 500-word sample from the middle of your work.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.8 }}>
            You can also email directly at{" "}
            <Tooltip title={`Email ${CONTACT_EMAIL}`} arrow>
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                color="text.primary"
                underline="hover"
              >
                {CONTACT_EMAIL}
              </Link>
            </Tooltip>
          </Typography>
        </Box>

        <Divider />

        {submitted ? (
          <Alert
            severity="success"
            sx={{
              borderRadius: 3,
              backgroundColor: "rgba(92, 104, 98, 0.08)",
              color: "text.primary",
              "& .MuiAlert-icon": {
                color: "primary.main",
              },
            }}
          >
            Thanks - your enquiry has been sent successfully. Gareth will get
            back to you soon.
          </Alert>
        ) : null}

        {errorMessage ? (
          <Alert
            severity="error"
            sx={{
              borderRadius: 3,
              backgroundColor: "rgba(138, 131, 118, 0.1)",
              color: "text.primary",
              "& .MuiAlert-icon": {
                color: "secondary.main",
              },
            }}
          >
            {errorMessage}
          </Alert>
        ) : null}

        <Box
          component="form"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />

          <Stack spacing={{ xs: 2.25, md: 2.75 }}>
            <TextField
              label="Name"
              name="name"
              value={formState.name}
              onChange={handleChange("name")}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange("email")}
              required
            />
            <TextField
              label="Word count"
              name="wordCount"
              value={formState.wordCount}
              onChange={handleChange("wordCount")}
              helperText="Approximate is fine."
            />
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Deadline
              </Typography>
              <TextField
                name="deadline"
                type="date"
                value={formState.deadline}
                onChange={handleChange("deadline")}
                inputProps={{ "aria-label": "Deadline" }}
              />
            </Stack>
            <TextField
              label="Message"
              name="message"
              value={formState.message}
              onChange={handleChange("message")}
              multiline
              minRows={6}
              required
            />

            <Box>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary">
              Prefer email? Contact{" "}
              <Tooltip title={`Email ${CONTACT_EMAIL}`} arrow>
                <Link
                  href={`mailto:${CONTACT_EMAIL}`}
                  color="text.primary"
                  underline="hover"
                >
                  {CONTACT_EMAIL}
                </Link>
              </Tooltip>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};
