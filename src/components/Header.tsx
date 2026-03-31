import { useState } from "react";
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
  Toolbar,
  Typography,
} from "@mui/material";
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
};

export const Header = ({
  currentPage,
  onNavigate,
  onRequestQuote,
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
            minHeight: 76,
            gap: { xs: 1.5, md: 3 },
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            onClick={handleBrandClick}
            sx={{
              color: "text.primary",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              flexShrink: 0,
              pr: { xs: 1, md: 0 },
              cursor: "pointer",
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
            <Button
              onClick={onRequestQuote}
              variant="outlined"
              color="primary"
              sx={{ ml: 0.5 }}
            >
              Request a Quote
            </Button>
          </Stack>

          <IconButton
            onClick={handleToggle}
            sx={{ display: { xs: "inline-flex", md: "none" }, ml: 1 }}
            aria-label="Open navigation"
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box sx={{ px: 2, pt: 10 }}>
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
