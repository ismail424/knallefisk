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
    ListItemButton,
    ListItemText,
    Box,
    Divider,
    Container,
    useScrollTrigger,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    ShoppingBasketOutlined,
    PhoneOutlined,
} from '@mui/icons-material';
import { NAV_LINKS, STORES, TAGLINE } from '@/lib/site';
import { BRAND } from '@/theme';

const ORDER_URL = '/bestall_online';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

    const toggleMenu = () => setIsMenuOpen((open) => !open);

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(10px)',
                    color: BRAND.ink,
                    borderBottom: `1px solid ${scrolled ? BRAND.border : 'transparent'}`,
                    boxShadow: scrolled ? '0 4px 24px rgba(23, 49, 58, 0.08)' : 'none',
                    transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1, gap: 2 }}>
                        {/* Logo */}
                        <Box
                            component={Link}
                            href="/"
                            aria-label="Knallefisk – till startsidan"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                textDecoration: 'none',
                            }}
                        >
                            <Image
                                src="/img/logo.svg"
                                alt=""
                                width={54}
                                height={54}
                                priority
                            />
                            <Box>
                                <Typography
                                    sx={{
                                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                                        fontWeight: 700,
                                        color: BRAND.tealDark,
                                        fontSize: { xs: '1.15rem', md: '1.3rem' },
                                        lineHeight: 1.15,
                                        letterSpacing: '-0.01em',
                                    }}
                                >
                                    Knallefisk
                                </Typography>
                                <Typography
                                    sx={{
                                        color: BRAND.muted,
                                        fontSize: { xs: '0.66rem', md: '0.74rem' },
                                        display: { xs: 'none', sm: 'block' },
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {TAGLINE}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Desktop navigation */}
                        <Box
                            component="nav"
                            aria-label="Huvudmeny"
                            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}
                        >
                            {NAV_LINKS.map((link) => {
                                const active = pathname === link.url;
                                return (
                                    <Button
                                        key={link.url}
                                        component={Link}
                                        href={link.url}
                                        aria-current={active ? 'page' : undefined}
                                        sx={{
                                            px: 2,
                                            py: 1,
                                            borderRadius: 999,
                                            fontSize: '0.95rem',
                                            color: active ? BRAND.tealDark : BRAND.muted,
                                            fontWeight: active ? 700 : 500,
                                            backgroundColor: active ? 'rgba(68, 143, 155, 0.1)' : 'transparent',
                                            '&:hover': {
                                                backgroundColor: 'rgba(68, 143, 155, 0.1)',
                                                color: BRAND.tealDark,
                                            },
                                        }}
                                    >
                                        {link.name}
                                    </Button>
                                );
                            })}
                            <Button
                                component={Link}
                                href={ORDER_URL}
                                variant="contained"
                                startIcon={<ShoppingBasketOutlined />}
                                sx={{ ml: 1.5, px: 2.75, py: 1 }}
                            >
                                Beställ online
                            </Button>
                        </Box>

                        {/* Mobile menu button */}
                        <IconButton
                            edge="end"
                            onClick={toggleMenu}
                            aria-label={isMenuOpen ? 'Stäng menyn' : 'Öppna menyn'}
                            sx={{ display: { xs: 'inline-flex', md: 'none' }, color: BRAND.tealDark }}
                        >
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer
                anchor="right"
                open={isMenuOpen}
                onClose={toggleMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: 300,
                        borderRadius: 0,
                        backgroundColor: '#ffffff',
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                        <Image src="/img/logo.svg" alt="" width={38} height={38} />
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                                    fontWeight: 700,
                                    color: BRAND.tealDark,
                                    fontSize: '1.05rem',
                                    lineHeight: 1.2,
                                }}
                            >
                                Knallefisk
                            </Typography>
                            <Typography sx={{ color: BRAND.muted, fontSize: '0.68rem' }}>
                                {TAGLINE}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={toggleMenu} aria-label="Stäng menyn" size="small">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Divider />

                <List sx={{ px: 1.5, py: 1.5 }}>
                    {NAV_LINKS.map((link) => {
                        const active = pathname === link.url;
                        return (
                            <ListItem key={link.url} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    component={Link}
                                    href={link.url}
                                    onClick={toggleMenu}
                                    aria-current={active ? 'page' : undefined}
                                    sx={{
                                        borderRadius: 2,
                                        py: 1.25,
                                        backgroundColor: active ? 'rgba(68, 143, 155, 0.12)' : 'transparent',
                                        '&:hover': { backgroundColor: 'rgba(68, 143, 155, 0.08)' },
                                    }}
                                >
                                    <ListItemText
                                        primary={link.name}
                                        primaryTypographyProps={{
                                            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                                            fontWeight: active ? 700 : 500,
                                            fontSize: '1.02rem',
                                            color: active ? BRAND.tealDark : BRAND.ink,
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>

                <Box sx={{ px: 2.5 }}>
                    <Button
                        component={Link}
                        href={ORDER_URL}
                        onClick={toggleMenu}
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<ShoppingBasketOutlined />}
                    >
                        Beställ online
                    </Button>
                </Box>

                <Box sx={{ mt: 'auto', px: 2.5, py: 2.5, backgroundColor: BRAND.tealTint }}>
                    {STORES.map((store) => (
                        <Box
                            key={store.id}
                            component="a"
                            href={`tel:${store.phoneE164}`}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                py: 0.5,
                                color: BRAND.tealDark,
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                            }}
                        >
                            <PhoneOutlined sx={{ fontSize: '1rem' }} />
                            {store.name}: {store.phone}
                        </Box>
                    ))}
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
