import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#596660",
    },
    secondary: {
      main: "#8a8376",
    },
    background: {
      default: "#f7f5f1",
      paper: "#fffdf9",
    },
    text: {
      primary: "#1f2522",
      secondary: "#5d675f",
    },
    divider: "#ddd8cf",
  },
  typography: {
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontSize: "clamp(2.8rem, 7vw, 4.6rem)",
      lineHeight: 1.08,
      letterSpacing: "-0.03em",
      fontWeight: 500,
    },
    h2: {
      fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
      lineHeight: 1.2,
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
        },
        outlined: {
          borderColor: "#cfc8bc",
          backgroundColor: "rgba(255, 253, 249, 0.45)",
        },
        contained: {
          backgroundColor: "#5c6862",
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
          backgroundColor: "rgba(255, 253, 249, 0.72)",
        },
        notchedOutline: {
          borderColor: "#d6d0c4",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#667167",
        },
      },
    },
  },
});
