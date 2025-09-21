'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

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
                position="fixed"
                elevation={0}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(15px)',
                    borderBottom: '1px solid rgba(68, 143, 155, 0.15)',
                    boxShadow: '0 1px 10px rgba(0,0,0,0.08)',
                    zIndex: 1100
                }}
            >
                <Toolbar sx={{ px: { xs: 2, md: 6 }, py: 1, minHeight: { xs: 60, md: 70 } }}>
                    {/* Logo */}
                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.02)'
                            }
                        }}
                    >
                        <Image
                            src="/img/logo.svg"
                            alt="Knallefisk Logo"
                            width={35}
                            height={35}
                            style={{
                                marginRight: '10px'
                            }}
                        />
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700,
                                color: '#448f9b',
                                fontSize: { xs: '1.3rem', md: '1.5rem' },
                                letterSpacing: '-0.3px'
                            }}
                        >
                            Knallefisk
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {all_links.map((link, index) => (
                                <Button
                                    key={index}
                                    component={Link}
                                    href={link.url}
                                    sx={{
                                        color: pathname === link.url ? '#448f9b' : '#666',
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: pathname === link.url ? 600 : 500,
                                        fontSize: '0.95rem',
                                        textTransform: 'none',
                                        px: 2.5,
                                        py: 1,
                                        borderRadius: 2,
                                        position: 'relative',
                                        backgroundColor: pathname === link.url ? 'rgba(68, 143, 155, 0.08)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'rgba(68, 143, 155, 0.1)',
                                            color: '#448f9b'
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            width: pathname === link.url ? '70%' : '0%',
                                            height: '2px',
                                            backgroundColor: '#448f9b',
                                            transform: 'translateX(-50%)',
                                            transition: 'width 0.3s ease'
                                        },
                                        '&:hover::after': {
                                            width: '70%'
                                        },
                                        transition: 'all 0.3s ease'
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
                                color: '#448f9b',
                                backgroundColor: 'rgba(68, 143, 155, 0.1)',
                                borderRadius: 2,
                                p: 1.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(68, 143, 155, 0.15)',
                                    transform: 'scale(1.05)'
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
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
                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(10px)',
                        top: { xs: 64, md: 80 },
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        borderBottom: '1px solid rgba(68, 143, 155, 0.1)'
                    }
                }}
            >
                <List sx={{ py: 2 }}>
                    {all_links.map((link, index) => (
                        <ListItem
                            key={index}
                            component={Link}
                            href={link.url}
                            onClick={toggleMenu}
                            sx={{
                                py: 2,
                                mx: 2,
                                mb: 1,
                                borderRadius: 2,
                                backgroundColor: pathname === link.url ? 'rgba(68, 143, 155, 0.1)' : 'transparent',
                                border: pathname === link.url ? '1px solid rgba(68, 143, 155, 0.2)' : '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(68, 143, 155, 0.08)',
                                    transform: 'translateX(4px)'
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <ListItemText
                                primary={link.name}
                                primaryTypographyProps={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: pathname === link.url ? 600 : 500,
                                    fontSize: '1.1rem',
                                    color: pathname === link.url ? '#448f9b' : '#555',
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