import { ReactNode } from "react";
import { Paper, SxProps, Theme } from "@mui/material";

type ContentPanelProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export const ContentPanel = ({
  children,
  sx,
}: ContentPanelProps): JSX.Element => {
  return (
    <Paper
      elevation={0}
      sx={[
        {
          p: { xs: 2.25, sm: 3, md: 3 },
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          borderRadius: { xs: 2.25, sm: 3, md: 3 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Paper>
  );
};
