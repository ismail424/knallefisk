'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    IconButton, 
    Drawer, 
    List, 
    ListItem, 
    ListItemText, 
    Box, 
    useMediaQuery, 
    useTheme,
    Container
} from '@mui/material';
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
                elevation={0}
                sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    color: '#333'
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                        {/* Logo Section */}
                        <Box 
                            component={Link} 
                            href="/"
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                textDecoration: 'none',
                                '&:hover': { transform: 'scale(1.02)' },
                                transition: 'transform 0.2s ease'
                            }}
                        >
                            <Image
                                src="/img/logo.svg"
                                alt="Knallefisk Logo"
                                width={65}
                                height={65}
                                style={{ marginRight: '15px' }}
                            />
                            <Box>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 700,
                                        color: '#448f9b',
                                        fontSize: { xs: '1.2rem', md: '1.4rem' },
                                        lineHeight: 1.2
                                    }}
                                >
                                    Knallefisk
                                </Typography>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        fontFamily: 'Poppins, sans-serif',
                                        color: '#666',
                                        fontSize: { xs: '0.7rem', md: '0.8rem' },
                                        fontStyle: 'italic',
                                        display: 'block',
                                        lineHeight: 1
                                    }}
                                >
                                    Färska fisken över hela disken
                                </Typography>
                            </Box>
                        </Box>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {all_links.map((link) => (
                                    <Button
                                        key={link.url}
                                        component={Link}
                                        href={link.url}
                                        variant="text"
                                        sx={{
                                            fontFamily: 'Poppins, sans-serif',
                                            textTransform: 'none',
                                            borderRadius: 2,
                                            px: 2.5,
                                            py: 1,
                                            color: pathname === link.url ? '#448f9b' : '#666',
                                            fontWeight: pathname === link.url ? 600 : 500,
                                            backgroundColor: pathname === link.url ? 'rgba(68, 143, 155, 0.08)' : 'transparent',
                                            '&:hover': {
                                                backgroundColor: 'rgba(68, 143, 155, 0.1)',
                                                color: '#448f9b'
                                            }
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
                                onClick={toggleMenu}
                                sx={{
                                    color: '#448f9b'
                                }}
                            >
                                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={isMenuOpen && isMobile}
                onClose={toggleMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: 280,
                        backgroundColor: 'white',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                    }
                }}
            >
                <Box sx={{ pt: 2, pb: 1 }}>
                    {/* Logo in mobile drawer */}
                    <Box sx={{ display: 'flex', alignItems: 'center', px: 3, pb: 2, borderBottom: '1px solid #eee' }}>
                        <Image
                            src="/img/logo.svg"
                            alt="Knallefisk Logo"
                            width={30}
                            height={30}
                            style={{ marginRight: '10px' }}
                        />
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#448f9b', fontSize: '1.1rem' }}>
                                Knallefisk
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                                Färska fisken över hela disken
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                
                <List sx={{ px: 2, py: 1 }}>
                    {all_links.map((link, index) => (
                        <ListItem
                            key={index}
                            component={Link}
                            href={link.url}
                            onClick={toggleMenu}
                            sx={{
                                py: 2,
                                px: 2,
                                mb: 1,
                                borderRadius: 2,
                                backgroundColor: pathname === link.url ? 'rgba(68, 143, 155, 0.12)' : 'transparent',
                                border: pathname === link.url ? '1px solid rgba(68, 143, 155, 0.3)' : '1px solid transparent',
                                '&:hover': {
                                    backgroundColor: 'rgba(68, 143, 155, 0.08)'
                                },
                                transition: 'all 0.2s ease',
                                minHeight: 48
                            }}
                        >
                            <ListItemText
                                primary={link.name}
                                primaryTypographyProps={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: pathname === link.url ? 600 : 500,
                                    fontSize: '1.1rem',
                                    color: pathname === link.url ? '#448f9b' : '#555'
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