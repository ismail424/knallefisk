'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import Link from 'next/link';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Hem', href: '/' },
    { text: 'Priser', href: '/priser' },
    { text: 'Hitta butik', href: '/hitta-butik' },
    { text: 'Kontakta oss', href: '/kontakt' },
    { text: 'Beställ online', href: '/bestall-online' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={Link} href={item.href} onClick={handleDrawerToggle}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Box
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src="/logo.svg"
              alt="Knallefisk"
              style={{ height: '40px', width: 'auto' }}
            />
          </Box>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ color: theme.palette.primary.main }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light,
                      color: 'white',
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;