import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import App from "./App";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            scrollBehavior: "smooth",
          },
          body: {
            backgroundColor: theme.palette.background.default,
          },
          a: {
            color: "inherit",
            textDecoration: "none",
          },
          "::selection": {
            backgroundColor: "#d9ddd7",
          },
        }}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
