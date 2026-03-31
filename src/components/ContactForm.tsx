import { ChangeEvent, FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type FormState = {
  name: string;
  email: string;
  wordCount: string;
  deadline: string;
  message: string;
  sampleFileName: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  wordCount: "",
  deadline: "",
  message: "",
  sampleFileName: "",
};

export const ContactForm = (): JSX.Element => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: Exclude<keyof FormState, "sampleFileName">) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
      setSubmitted(false);
      setFormState((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    setSubmitted(false);
    setFormState((current) => ({
      ...current,
      sampleFileName: file?.name ?? "",
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitted(true);
    console.log("Quote request submitted", formState);
    setFormState(initialState);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 680,
        mx: "auto",
        px: { xs: 2.5, md: 4.5 },
        py: { xs: 3, md: 4.5 },
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        borderRadius: 4,
      }}
    >
      <Stack spacing={{ xs: 3, md: 3.5 }}>
        <Box sx={{ maxWidth: 560 }}>
          <Typography variant="body2" color="text.secondary">
            Please include a 500-word sample from the middle of your work.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.8 }}>
            You can also email directly at garethareeves@hotmail.com
          </Typography>
        </Box>

        <Divider />

        {submitted ? (
          <Alert severity="success" sx={{ borderRadius: 3 }}>
            Thank you. Your enquiry has been received.
          </Alert>
        ) : null}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={{ xs: 2.25, md: 2.75 }}>
            <TextField
              label="Name"
              value={formState.name}
              onChange={handleChange("name")}
              required
            />
            <TextField
              label="Email"
              type="email"
              value={formState.email}
              onChange={handleChange("email")}
              required
            />
            <TextField
              label="Word count"
              value={formState.wordCount}
              onChange={handleChange("wordCount")}
              helperText="Approximate is fine."
            />
            <TextField
              label="Deadline"
              type="date"
              value={formState.deadline}
              onChange={handleChange("deadline")}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Message"
              value={formState.message}
              onChange={handleChange("message")}
              multiline
              minRows={6}
              required
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <Button variant="outlined" component="label">
                Upload sample
                <input
                  hidden
                  type="file"
                  onChange={handleFileChange}
                  accept=".doc,.docx,.pdf,.txt"
                />
              </Button>
              <Typography variant="body2" color="text.secondary">
                {formState.sampleFileName ||
                  "Accepted formats: DOC, DOCX, PDF, or TXT"}
              </Typography>
            </Stack>

            <Box>
              <Button type="submit" variant="contained">
                Send Enquiry
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};
