import { useEffect, useMemo, useState } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import {
  Box,
  CssBaseline,
  Fab,
  GlobalStyles,
  Link,
  ThemeProvider,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import type { PaletteMode } from "@mui/material";
import { Header } from "./components/Header";
import { AboutPage } from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { getTheme } from "./theme";

export type PageKey = "home" | "blog" | "about" | "contact";

const THEME_MODE_KEY = "theme-mode";

const getInitialThemeMode = (): PaletteMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedMode = window.localStorage.getItem(THEME_MODE_KEY);

  if (storedMode === "light" || storedMode === "dark") {
    return storedMode;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const ScrollTopButton = (): JSX.Element => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setVisible(window.scrollY > 320);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        size="small"
        aria-label="Scroll to top"
        onClick={handleClick}
        sx={{
          position: "fixed",
          right: { xs: 20, md: 28 },
          bottom: { xs: 20, md: 28 },
          zIndex: 1200,
        }}
      >
        <KeyboardArrowUpRoundedIcon />
      </Fab>
    </Zoom>
  );
};

const App = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [scrollToContact, setScrollToContact] = useState(false);
  const [themeMode, setThemeMode] = useState<PaletteMode>(getInitialThemeMode);
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  useEffect(() => {
    window.localStorage.setItem(THEME_MODE_KEY, themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent): void => {
      const storedMode = window.localStorage.getItem(THEME_MODE_KEY);

      if (storedMode === "light" || storedMode === "dark") {
        return;
      }

      setThemeMode(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (currentPage !== "home" || !scrollToContact) {
      return;
    }

    window.requestAnimationFrame(() => {
      const element = document.getElementById("contact");

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      setScrollToContact(false);
    });
  }, [currentPage, scrollToContact]);

  const handleNavigate = (page: PageKey): void => {
    setScrollToContact(false);

    if (page === currentPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentPage(page);

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const handleRequestQuote = (): void => {
    if (currentPage !== "home") {
      setCurrentPage("home");
      setScrollToContact(true);
      return;
    }

    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleToggleTheme = (): void => {
    setThemeMode((current) => (current === "light" ? "dark" : "light"));
  };

  const renderPage = (): JSX.Element => {
    switch (currentPage) {
      case "blog":
        return <BlogPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "home":
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onRequestQuote={handleRequestQuote}
          />
        );
    }
  };

  return (
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
            backgroundColor:
              themeMode === "light" ? "#d9ddd7" : "rgba(158, 173, 164, 0.28)",
          },
        }}
      />
      <Box sx={{ minHeight: "100vh", overflowX: "clip" }}>
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onRequestQuote={handleRequestQuote}
          themeMode={themeMode}
          onToggleTheme={handleToggleTheme}
        />
        {renderPage()}
        <Box
          component="footer"
          sx={{
            mt: { xs: 8, md: 10 },
            px: { xs: 2.5, md: 3 },
            pb: { xs: 3, md: 4 },
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              textAlign: "center",
              opacity: 0.76,
            }}
          >
            Site by{" "}
            <Tooltip title="Email richard@hanney.xyz" arrow>
              <Link
                href="mailto:richard@hanney.xyz"
                color="inherit"
                underline="hover"
              >
                Richard Hanney
              </Link>
            </Tooltip>
          </Typography>
        </Box>
        <ScrollTopButton />
      </Box>
    </ThemeProvider>
  );
};

export default App;
