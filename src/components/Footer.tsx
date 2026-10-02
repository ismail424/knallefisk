'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, IconButton, Link as MuiLink } from '@mui/material';
import {
    ShoppingBasketOutlined,
    PhoneOutlined,
    LocationOnOutlined,
    MailOutline,
    KeyboardArrowUp,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, STORES, TAGLINE, CONTACT_EMAILS, FOUNDED_YEAR, storeStatus } from '@/lib/site';
import { BRAND } from '@/theme';
import { WaveDivider } from './decor';

const INK = BRAND.inkDeep;
const PALE = 'rgba(255, 255, 255, 0.72)';
const FAINT = 'rgba(255, 255, 255, 0.5)';

function ColumnHeading({ children }: { children: React.ReactNode }) {
    return (
        <Typography
            component="h2"
            sx={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: BRAND.tealLight,
                mb: 2.25,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&::after': {
                    content: '""',
                    flex: '0 0 28px',
                    height: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(111, 176, 187, 0.4)',
                },
            }}
        >
            {children}
        </Typography>
    );
}

function OpenBadge({ open, label }: { open: boolean; label: string }) {
    return (
        <Box
            component="span"
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.1,
                py: 0.3,
                borderRadius: 999,
                fontSize: '0.75rem',
                fontWeight: 600,
                backgroundColor: open ? 'rgba(76, 175, 80, 0.16)' : 'rgba(255, 255, 255, 0.08)',
                color: open ? '#a5d6a7' : PALE,
                border: `1px solid ${open ? 'rgba(129, 199, 132, 0.4)' : 'rgba(255, 255, 255, 0.14)'}`,
            }}
        >
            <Box
                component="span"
                sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: open ? '#66bb6a' : 'rgba(255, 255, 255, 0.4)',
                    boxShadow: open ? '0 0 0 0 rgba(102, 187, 106, 0.6)' : 'none',
                    animation: open ? 'pulse-dot 2s ease-out infinite' : 'none',
                }}
            />
            {label}
        </Box>
    );
}

const Footer = () => {
    // Computed after mount so the static HTML never bakes in a stale status
    const [statuses, setStatuses] = useState<Record<string, { open: boolean; label: string }>>({});

    useEffect(() => {
        const update = () =>
            setStatuses(Object.fromEntries(STORES.map((s) => [s.id, storeStatus(s)])));
        update();
        const timer = window.setInterval(update, 60_000);
        return () => window.clearInterval(timer);
    }, []);

    const links = [...NAV_LINKS, { name: 'Beställ online', url: '/bestall_online' }];

    return (
        <Box component="footer" sx={{ mt: 'auto' }}>
            <WaveDivider fill={INK} height={{ xs: 40, md: 64 }} />

            {/* ============ Info columns ============ */}
            <Box sx={{ backgroundColor: INK, color: '#fff' }}>
                <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: 4 }}>
                    {/* CTA row */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: { xs: 'flex-start', md: 'center' },
                            justifyContent: 'space-between',
                            gap: 2.5,
                            pb: { xs: 4, md: 5 },
                            mb: { xs: 4, md: 5 },
                            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                        }}
                    >
                        <Box>
                            <Typography
                                component="p"
                                sx={{
                                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                                    fontWeight: 700,
                                    fontSize: { xs: '1.4rem', md: '1.75rem' },
                                    lineHeight: 1.2,
                                }}
                            >
                                Sugen på färsk fisk?
                            </Typography>
                            <Typography sx={{ color: PALE, mt: 0.5 }}>
                                Beställ online och hämta i Borås eller Skene – du betalar i butiken.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                            <Button
                                component={Link}
                                href="/bestall_online"
                                variant="contained"
                                size="large"
                                startIcon={<ShoppingBasketOutlined />}
                            >
                                Beställ online
                            </Button>
                            <Button
                                component="a"
                                href={`tel:${STORES[0].phoneE164}`}
                                variant="outlined"
                                size="large"
                                startIcon={<PhoneOutlined />}
                                sx={{
                                    color: '#fff',
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                    '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.06)' },
                                }}
                            >
                                Ring oss
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                lg: '1.3fr 1.2fr 1.2fr 0.8fr',
                            },
                            gap: { xs: 4, md: 5 },
                        }}
                    >
                        {/* Brand */}
                        <Box>
                            <Box
                                component={Link}
                                href="/"
                                sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 2, color: '#fff', textDecoration: 'none' }}
                            >
                                <Image src="/img/logo.svg" alt="" width={56} height={56} />
                                <Box>
                                    <Typography
                                        sx={{
                                            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '1.25rem',
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        Knallefisk
                                    </Typography>
                                    <Typography sx={{ color: PALE, fontSize: '0.8rem' }}>{TAGLINE}</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ color: PALE, fontSize: '0.92rem', lineHeight: 1.7, maxWidth: 320 }}>
                                Familjeägd fiskhandel sedan {FOUNDED_YEAR}. Vi hämtar färsk fisk och
                                skaldjur från Göteborgs fiskauktion till våra butiker i Borås och Skene.
                            </Typography>
                            <Box sx={{ mt: 2.5, display: 'grid', gap: 0.75 }}>
                                {CONTACT_EMAILS.map((email) => (
                                    <MuiLink
                                        key={email}
                                        href={`mailto:${email}`}
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            color: PALE,
                                            fontSize: '0.9rem',
                                            '&:hover': { color: '#fff' },
                                        }}
                                    >
                                        <MailOutline sx={{ fontSize: '1rem', color: BRAND.tealLight }} />
                                        {email}
                                    </MuiLink>
                                ))}
                            </Box>
                        </Box>

                        {/* Stores, with live open/closed status */}
                        {STORES.map((store) => {
                            const status = statuses[store.id];
                            return (
                                <Box key={store.id}>
                                    <ColumnHeading>Knallefisk {store.name}</ColumnHeading>
                                    <Box sx={{ minHeight: 26, mb: 1.5 }}>
                                        {status && <OpenBadge open={status.open} label={status.open ? `Öppet nu · ${status.label.toLowerCase()}` : status.label} />}
                                    </Box>
                                    <Box sx={{ display: 'grid', gap: 1.1 }}>
                                        <MuiLink
                                            href={store.directionsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ display: 'flex', gap: 1, color: PALE, fontSize: '0.9rem', lineHeight: 1.55, '&:hover': { color: '#fff' } }}
                                        >
                                            <LocationOnOutlined sx={{ fontSize: '1.05rem', color: BRAND.tealLight, mt: 0.2 }} />
                                            <span>
                                                {store.streetAddress}
                                                <br />
                                                {store.postalCode} {store.city}
                                            </span>
                                        </MuiLink>
                                        <MuiLink
                                            href={`tel:${store.phoneE164}`}
                                            sx={{ display: 'flex', gap: 1, color: PALE, fontSize: '0.9rem', '&:hover': { color: '#fff' } }}
                                        >
                                            <PhoneOutlined sx={{ fontSize: '1.05rem', color: BRAND.tealLight, mt: 0.2 }} />
                                            {store.phone}
                                        </MuiLink>
                                        <Box sx={{ mt: 0.5, display: 'grid', gap: 0.25 }}>
                                            {store.hours
                                                .filter((d) => d.hours)
                                                .map((d) => (
                                                    <Box
                                                        key={d.day}
                                                        sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: 220, fontSize: '0.86rem' }}
                                                    >
                                                        <Box component="span" sx={{ color: FAINT }}>
                                                            {d.day}
                                                        </Box>
                                                        <Box component="span" sx={{ color: PALE, fontVariantNumeric: 'tabular-nums' }}>
                                                            {d.hours}
                                                        </Box>
                                                    </Box>
                                                ))}
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}

                        {/* Links */}
                        <Box component="nav" aria-label="Sidfotsmeny">
                            <ColumnHeading>Genvägar</ColumnHeading>
                            {links.map((link) => (
                                <MuiLink
                                    key={link.url}
                                    component={Link}
                                    href={link.url}
                                    underline="none"
                                    sx={{
                                        display: 'block',
                                        color: PALE,
                                        fontSize: '0.92rem',
                                        py: 0.5,
                                        transition: 'color 0.2s ease, transform 0.2s ease',
                                        '&:hover': { color: '#fff', transform: 'translateX(4px)' },
                                    }}
                                >
                                    {link.name}
                                </MuiLink>
                            ))}
                        </Box>
                    </Box>

                    {/* Bottom bar */}
                    <Box
                        sx={{
                            mt: { xs: 4, md: 6 },
                            pt: 3,
                            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 1.5,
                        }}
                    >
                        <Typography sx={{ color: FAINT, fontSize: '0.85rem' }} suppressHydrationWarning>
                            © {new Date().getFullYear()} Knallefisk · Färsk fisk från Göteborgs fiskauktion sedan {FOUNDED_YEAR}
                        </Typography>
                        <IconButton
                            aria-label="Till toppen av sidan"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            sx={{
                                color: '#fff',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                transition: 'transform 0.2s ease, background-color 0.2s ease',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)', transform: 'translateY(-3px)' },
                            }}
                        >
                            <KeyboardArrowUp />
                        </IconButton>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
