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
import { WaveDivider, ScalesPattern } from './decor';
import LoopVideo from './LoopVideo';

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

/** Small fish that swim across the illustration band on a loop. */
function SwimmingFish() {
    const school = [
        { top: '62%', size: 30, duration: 26, delay: -4, opacity: 0.55 },
        { top: '72%', size: 20, duration: 34, delay: -18, opacity: 0.4 },
        { top: '80%', size: 24, duration: 22, delay: -11, opacity: 0.5 },
    ];
    return (
        <Box aria-hidden sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {school.map((fish, i) => (
                <Box
                    key={i}
                    sx={{
                        position: 'absolute',
                        top: fish.top,
                        left: 0,
                        opacity: fish.opacity,
                        animation: `swim-across ${fish.duration}s linear infinite`,
                        animationDelay: `${fish.delay}s`,
                    }}
                >
                    <svg viewBox="0 0 64 40" width={fish.size} height={(fish.size * 40) / 64} style={{ transform: 'scaleX(-1)', display: 'block' }}>
                        <path
                            d="M4 20c7-9 17-14 27-14 9 0 17 4 22 9l9-8c1-1 2 0 2 1v24c0 1-1 2-2 1l-9-8c-5 5-13 9-22 9-10 0-20-5-27-14z"
                            fill="#d3e7ea"
                        />
                    </svg>
                </Box>
            ))}
        </Box>
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

            {/* ============ Illustrated coastline band ============ */}
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: INK,
                    height: { xs: 520, sm: 480, md: 480 },
                    overflow: 'hidden',
                }}
            >
                <LoopVideo
                    src="/video/kust.mp4"
                    poster="/img/illustrationer/kust.webp"
                    sx={{ objectPosition: { xs: '18% 0%', md: 'center 0%' } }}
                />
                {/* Blend the illustration into the dark footer above and below */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(180deg, ${INK} 0%, rgba(13, 40, 48, 0.55) 18%, rgba(13, 40, 48, 0.05) 45%, rgba(13, 40, 48, 0.1) 75%, ${INK} 100%)`,
                    }}
                />
                <SwimmingFish />

                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        // Mobile: copy over the dark sea below the scene; desktop: in the open sky
                        justifyContent: { xs: 'flex-end', md: 'flex-start' },
                        pt: { md: 5 },
                        pb: { xs: 3, md: 0 },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: { xs: 'flex-start', md: 'flex-end' },
                            justifyContent: 'space-between',
                            gap: 3,
                        }}
                    >
                        <Box sx={{ maxWidth: 560 }}>
                            <Typography
                                variant="overline"
                                sx={{ color: BRAND.tealPale, display: 'block', mb: 0.5, textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
                            >
                                Från västkusten till Sjuhärad
                            </Typography>
                            <Typography
                                component="p"
                                sx={{
                                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                                    fontWeight: 700,
                                    color: '#fff',
                                    fontSize: { xs: '1.45rem', md: '2.3rem' },
                                    lineHeight: 1.15,
                                    letterSpacing: '-0.015em',
                                    textShadow: '0 2px 24px rgba(0, 0, 0, 0.45)',
                                }}
                            >
                                Havets bästa, packat och klart när du kommer.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                            <Button
                                component={Link}
                                href="/bestall_online"
                                variant="contained"
                                size="large"
                                startIcon={<ShoppingBasketOutlined />}
                                sx={{
                                    backgroundColor: BRAND.coral,
                                    '&:hover': { backgroundColor: BRAND.coralDark },
                                    boxShadow: '0 8px 24px rgba(217, 83, 44, 0.35)',
                                }}
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
                                    borderColor: 'rgba(255, 255, 255, 0.6)',
                                    backgroundColor: 'rgba(13, 40, 48, 0.35)',
                                    backdropFilter: 'blur(6px)',
                                    '&:hover': {
                                        borderColor: '#fff',
                                        backgroundColor: 'rgba(13, 40, 48, 0.55)',
                                    },
                                }}
                            >
                                Ring oss
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ============ Info columns ============ */}
            <Box sx={{ backgroundColor: INK, color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <ScalesPattern color="rgba(255, 255, 255, 0.035)" />
                <Container maxWidth="lg" sx={{ position: 'relative', pt: { xs: 4, md: 6 }, pb: 4 }}>
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
