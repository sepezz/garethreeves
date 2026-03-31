import { Box, Paper, Typography } from "@mui/material";
import ciepLogo from "../assets/ciep-logo.svg";

export const CiepMembershipPanel = (): JSX.Element => {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: { xs: 2.25, sm: 3, md: 4 },
        p: { xs: 2.25, sm: 3, md: 4.5 },
        display: "flex",
        alignItems: "center",
        gap: { xs: 1.75, sm: 2.5, md: 4 },
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
          height: { xs: 60, sm: 76, md: 88 },
          width: "auto",
          maxWidth: "100%",
          display: "block",
          flexShrink: 0,
          alignSelf: { xs: "flex-start", sm: "center" },
        }}
      />
      <Box sx={{ maxWidth: 640, minWidth: 0 }}>
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
          sx={{ mt: 1, maxWidth: 480 }}
        >
          Committed to professional editorial standards.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: "text.secondary",
            opacity: 0.82,
          }}
        >
          Recent CIEP training: Proofreading Theses and Dissertations.
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 0.5,
            color: "text.secondary",
            opacity: 0.72,
          }}
        >
          Additional credentials available on request.
        </Typography>
      </Box>
    </Paper>
  );
};
