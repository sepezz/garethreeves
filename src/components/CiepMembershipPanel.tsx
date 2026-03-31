import { Box, Paper, Typography } from "@mui/material";
import ciepLogo from "../assets/ciep-logo.svg";

export const CiepMembershipPanel = (): JSX.Element => {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 4,
        p: { xs: 3, md: 4.5 },
        display: "flex",
        alignItems: "center",
        gap: { xs: 2.5, md: 4 },
        flexDirection: { xs: "column", sm: "row" },
        backgroundColor: "rgba(255, 253, 249, 0.96)",
        borderColor: "#d4cdc0",
      }}
    >
      <Box
        component="img"
        src={ciepLogo}
        alt="CIEP logo"
        sx={{
          height: { xs: 76, md: 88 },
          width: "auto",
          maxWidth: "100%",
          display: "block",
          flexShrink: 0,
          alignSelf: { xs: "flex-start", sm: "center" },
        }}
      />
      <Box sx={{ maxWidth: 640 }}>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", letterSpacing: "0.12em" }}
        >
          Professional membership
        </Typography>
        <Typography variant="h3" sx={{ mt: 0.75, color: "text.primary" }}>
          Member of the Chartered Institute of Editing and Proofreading
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1.25, maxWidth: 480 }}
        >
          Committed to professional editorial standards.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1.25,
            color: "text.secondary",
            opacity: 0.82,
          }}
        >
          Recent CIEP training: Proofreading Theses and Dissertations.
        </Typography>
      </Box>
    </Paper>
  );
};
