'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, STORES, TAGLINE, FOUNDED_YEAR, storeStatus } from '@/lib/site';
import { BRAND } from '@/theme';

const INK = BRAND.inkDeep;
const PALE = 'rgba(255, 255, 255, 0.72)';
const FAINT = 'rgba(255, 255, 255, 0.5)';

const linkSx = {
    color: PALE,
    fontSize: '0.92rem',
    '&:hover': { color: '#fff' },
} as const;

function ColumnHeading({ children }: { children: React.ReactNode }) {
    return (
        <Typography
            component="h2"
            sx={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#fff',
                mb: 1.25,
            }}
        >
            {children}
        </Typography>
    );
}

const Footer = () => {
    // Computed after mount so the static HTML never bakes in a stale status
    const [statuses, setStatuses] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const update = () => setStatuses(Object.fromEntries(STORES.map((s) => [s.id, storeStatus(s).open])));
        update();
        const timer = window.setInterval(update, 60_000);
        return () => window.clearInterval(timer);
    }, []);

    const links = [...NAV_LINKS.filter((l) => l.url !== '/'), { name: 'Beställ online', url: '/bestall_online' }];

    return (
        <Box component="footer" sx={{ mt: 'auto' }}>
            <Box sx={{ backgroundColor: INK, color: '#fff' }}>
                <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 5 }, pb: 3 }}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: '1.3fr 1fr 1fr 0.8fr' },
                            gap: { xs: 3.5, md: 4 },
                        }}
                    >
                        {/* Brand */}
                        <Box>
                            <Box
                                component={Link}
                                href="/"
                                sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: '#fff', textDecoration: 'none', mb: 1.5 }}
                            >
                                <Image src="/img/logo.svg" alt="" width={48} height={48} />
                                <Box>
                                    <Typography sx={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.2 }}>
                                        Knallefisk
                                    </Typography>
                                    <Typography sx={{ color: PALE, fontSize: '0.8rem' }}>{TAGLINE}</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ color: PALE, fontSize: '0.9rem', lineHeight: 1.65, maxWidth: 300 }}>
                                Familjeägd fiskhandel sedan {FOUNDED_YEAR} med färsk fisk och skaldjur från
                                Göteborgs fiskauktion.
                            </Typography>
                        </Box>

                        {/* Stores */}
                        {STORES.map((store) => (
                            <Box key={store.id}>
                                <ColumnHeading>
                                    Knallefisk {store.name}
                                    {statuses[store.id] && (
                                        <Box
                                            component="span"
                                            sx={{ ml: 1, fontSize: '0.75rem', fontWeight: 600, color: '#a5d6a7', whiteSpace: 'nowrap' }}
                                        >
                                            ● Öppet nu
                                        </Box>
                                    )}
                                </ColumnHeading>
                                <Typography sx={{ color: PALE, fontSize: '0.9rem', lineHeight: 1.7 }}>
                                    <MuiLink href={store.directionsUrl} target="_blank" rel="noopener noreferrer" sx={linkSx}>
                                        {store.streetAddress}, {store.city}
                                    </MuiLink>
                                    <br />
                                    <MuiLink href={`tel:${store.phoneE164}`} sx={linkSx}>
                                        {store.phone}
                                    </MuiLink>
                                    <br />
                                    {store.hoursSummary}
                                </Typography>
                            </Box>
                        ))}

                        {/* Links */}
                        <Box component="nav" aria-label="Sidfotsmeny">
                            <ColumnHeading>Genvägar</ColumnHeading>
                            {links.map((link) => (
                                <MuiLink key={link.url} component={Link} href={link.url} underline="none" sx={{ ...linkSx, display: 'block', py: 0.35 }}>
                                    {link.name}
                                </MuiLink>
                            ))}
                        </Box>
                    </Box>

                    <Typography
                        sx={{ color: FAINT, fontSize: '0.82rem', mt: { xs: 4, md: 5 }, pt: 2.5, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
                        suppressHydrationWarning
                    >
                        © {new Date().getFullYear()} Knallefisk
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
