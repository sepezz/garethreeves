import { useEffect, useState } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Box, Fab, Zoom } from "@mui/material";
import { Header } from "./components/Header";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";

export type PageKey = "home" | "about" | "contact";

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

  const renderPage = (): JSX.Element => {
    switch (currentPage) {
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
    <Box sx={{ minHeight: "100vh" }}>
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onRequestQuote={handleRequestQuote}
      />
      {renderPage()}
      <ScrollTopButton />
    </Box>
  );
};

export default App;
