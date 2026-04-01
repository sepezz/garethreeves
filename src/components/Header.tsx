import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Toolbar,
  Typography,
} from "@mui/material";
import type { PaletteMode } from "@mui/material";
import type { PageKey } from "../App";

type NavItem = {
  label: string;
  page: PageKey;
};

const navItems: NavItem[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

type HeaderProps = {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  onRequestQuote: () => void;
  themeMode: PaletteMode;
  onToggleTheme: () => void;
};

export const Header = ({
  currentPage,
  onNavigate,
  onRequestQuote,
  themeMode,
  onToggleTheme,
}: HeaderProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleToggle = (): void => {
    setOpen((current) => !current);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleNavigateClick = (page: PageKey): void => {
    onNavigate(page);
    handleClose();
  };

  const handleBrandClick = (): void => {
    handleNavigateClick("home");
  };

  const themeIcon =
    themeMode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />;
  const themeLabel =
    themeMode === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 72, md: 76 },
            gap: { xs: 1, md: 3 },
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            onClick={handleBrandClick}
            sx={{
              color: "text.primary",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              flexShrink: 0,
              pr: { xs: 1, md: 0 },
              cursor: "pointer",
              fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.2rem", lg: "1.25rem" },
              lineHeight: 1.1,
              maxWidth: { xs: "calc(100vw - 96px)", sm: "calc(100vw - 112px)", md: "none" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Gareth Reeves Editorial
          </Typography>

          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              ml: "auto",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNavigateClick(item.page)}
                color="inherit"
                sx={{
                  color: currentPage === item.page ? "text.primary" : "text.secondary",
                  minWidth: "auto",
                  px: 1.25,
                }}
              >
                {item.label}
              </Button>
            ))}
            <Tooltip title={themeLabel} arrow>
              <IconButton
                onClick={onToggleTheme}
                color="inherit"
                aria-label={themeLabel}
              >
                {themeIcon}
              </IconButton>
            </Tooltip>
            <Button
              onClick={onRequestQuote}
              variant="outlined"
              color="primary"
              sx={{ ml: 0.5 }}
            >
              Request a Quote
            </Button>
          </Stack>

          <Stack
            direction="row"
            spacing={0.25}
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <Tooltip title={themeLabel} arrow>
              <IconButton
                onClick={onToggleTheme}
                color="inherit"
                aria-label={themeLabel}
                sx={{ flexShrink: 0 }}
              >
                {themeIcon}
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={handleToggle}
              sx={{ ml: 0.25, flexShrink: 0 }}
              aria-label="Open navigation"
            >
              <MenuRoundedIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: { xs: "min(280px, 86vw)", sm: 280 },
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleClose} aria-label="Close navigation menu">
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box sx={{ px: 2, pb: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.label}
                onClick={() => handleNavigateClick(item.page)}
                sx={{ borderRadius: 3 }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            <ListItemButton
              onClick={() => {
                onRequestQuote();
                handleClose();
              }}
              sx={{ borderRadius: 3 }}
            >
              <ListItemText primary="Request a Quote" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
