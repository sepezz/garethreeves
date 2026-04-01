import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#596660" : "#93a39a",
      },
      secondary: {
        main: mode === "light" ? "#8a8376" : "#a79f93",
      },
      background: {
        default: mode === "light" ? "#f7f5f1" : "#151917",
        paper: mode === "light" ? "#fffdf9" : "#1d2320",
      },
      text: {
        primary: mode === "light" ? "#1f2522" : "#f3f5f2",
        secondary: mode === "light" ? "#5d675f" : "#b8c0bb",
      },
      divider: mode === "light" ? "#ddd8cf" : "#343c38",
    },
    typography: {
      fontFamily: '"Helvetica Neue", "Arial", sans-serif',
      h1: {
        fontSize: "clamp(2.35rem, 7vw, 4.6rem)",
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
        fontWeight: 500,
      },
      h2: {
        fontSize: "clamp(1.65rem, 3vw, 2.3rem)",
        lineHeight: 1.22,
        letterSpacing: "-0.02em",
        fontWeight: 500,
      },
      h3: {
        fontSize: "1.15rem",
        lineHeight: 1.35,
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.75,
      },
      body2: {
        fontSize: "0.96rem",
        lineHeight: 1.7,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
        letterSpacing: "0.01em",
      },
    },
    shape: {
      borderRadius: 18,
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            maxWidth: "1100px",
            paddingLeft: 20,
            paddingRight: 20,
            "@media (min-width:600px)": {
              paddingLeft: 24,
              paddingRight: 24,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 20,
            minHeight: 44,
            whiteSpace: "normal",
          },
          outlined: {
            borderColor: mode === "light" ? "#cfc8bc" : "#4a5550",
            backgroundColor:
              mode === "light"
                ? "rgba(255, 253, 249, 0.45)"
                : "rgba(243, 245, 242, 0.02)",
            color: mode === "light" ? undefined : "#d7ddd9",
          },
          contained: {
            backgroundColor: mode === "light" ? "#5c6862" : "#8ea096",
            color: mode === "light" ? undefined : "#151917",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "light" ? undefined : "rgba(243, 245, 242, 0.03)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor:
              mode === "light"
                ? "rgba(255, 253, 249, 0.72)"
                : "rgba(243, 245, 242, 0.03)",
          },
          notchedOutline: {
            borderColor: mode === "light" ? "#d6d0c4" : "#4d5853",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: mode === "light" ? "#667167" : "#b0b8b2",
          },
        },
      },
    },
  });
