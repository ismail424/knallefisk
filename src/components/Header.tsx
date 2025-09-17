'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const all_links = [
        {name: 'Hem', url: '/'},
        {name: 'Priser', url: '/priser'},
        {name: 'Hitta Butik', url: '/hitta_butik'},
        {name: 'Kontakta oss', url: '/kontakta_oss'},
        {name: 'Beställ online', url: '/bestall_online'},
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: 'white',
                    borderBottom: '1px solid #e0e0e0'
                }}
            >
                <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
                    {/* Logo */}
                    <Typography
                        variant="h5"
                        component={Link}
                        href="/"
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 700,
                            color: '#448f9b',
                            textDecoration: 'none',
                            fontSize: { xs: '1.5rem', md: '1.75rem' },
                            '&:hover': {
                                color: '#3c7d88'
                            }
                        }}
                    >
                        Knallefisk
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {all_links.map((link, index) => (
                                <Button
                                    key={index}
                                    component={Link}
                                    href={link.url}
                                    sx={{
                                        color: pathname === link.url ? '#448f9b' : '#666',
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: pathname === link.url ? 600 : 500,
                                        fontSize: '0.9rem',
                                        textTransform: 'none',
                                        px: 2,
                                        py: 1,
                                        borderRadius: 1,
                                        borderBottom: pathname === link.url ? '2px solid #448f9b' : '2px solid transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(68, 143, 155, 0.05)',
                                            color: '#448f9b'
                                        },
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {link.name}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleMenu}
                            sx={{
                                color: '#448f9b'
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="top"
                open={isMenuOpen && isMobile}
                onClose={toggleMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'white',
                        top: 64,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }
                }}
            >
                <List sx={{ py: 1 }}>
                    {all_links.map((link, index) => (
                        <ListItem
                            key={index}
                            component={Link}
                            href={link.url}
                            onClick={toggleMenu}
                            sx={{
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(68, 143, 155, 0.05)'
                                }
                            }}
                        >
                            <ListItemText
                                primary={link.name}
                                primaryTypographyProps={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: pathname === link.url ? 600 : 500,
                                    fontSize: '1rem',
                                    color: pathname === link.url ? '#448f9b' : '#666',
                                    textAlign: 'center'
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Header;