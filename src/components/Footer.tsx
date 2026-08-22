'use client';

import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, STORES, TAGLINE, CONTACT_EMAILS, FOUNDED_YEAR } from '@/lib/site';
import { BRAND } from '@/theme';
import { WaveDivider, ScalesPattern } from './decor';

const INK = BRAND.inkDeep;
const PALE = 'rgba(255, 255, 255, 0.72)';
const FAINT = 'rgba(255, 255, 255, 0.45)';

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
                color: 'rgba(255, 255, 255, 0.55)',
                mb: 2,
            }}
        >
            {children}
        </Typography>
    );
}

const Footer = () => {
    return (
        <Box component="footer" sx={{ mt: 'auto' }}>
            <WaveDivider fill={INK} height={{ xs: 40, md: 64 }} />
            <Box sx={{ backgroundColor: INK, color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <ScalesPattern color="rgba(255, 255, 255, 0.04)" />
                <Container maxWidth="lg" sx={{ position: 'relative', pt: { xs: 5, md: 7 }, pb: 4 }}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                lg: '1.4fr 1fr 1fr 0.8fr',
                            },
                            gap: { xs: 4, md: 5 },
                        }}
                    >
                        {/* Brand */}
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                <Image src="/img/logo.svg" alt="" width={52} height={52} />
                                <Box>
                                    <Typography
                                        sx={{
                                            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '1.2rem',
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
                            <Box sx={{ mt: 2 }}>
                                {CONTACT_EMAILS.map((email) => (
                                    <MuiLink
                                        key={email}
                                        href={`mailto:${email}`}
                                        sx={{ display: 'block', color: PALE, fontSize: '0.9rem', py: 0.25, '&:hover': { color: '#fff' } }}
                                    >
                                        {email}
                                    </MuiLink>
                                ))}
                            </Box>
                        </Box>

                        {/* Stores */}
                        <Box>
                            <ColumnHeading>Våra butiker</ColumnHeading>
                            {STORES.map((store) => (
                                <Box key={store.id} sx={{ mb: 2.5 }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', mb: 0.25 }}>
                                        {store.name}
                                    </Typography>
                                    <Typography sx={{ color: PALE, fontSize: '0.9rem', lineHeight: 1.6 }}>
                                        {store.streetAddress}
                                        <br />
                                        {store.postalCode} {store.city}
                                    </Typography>
                                    <MuiLink
                                        href={`tel:${store.phoneE164}`}
                                        sx={{ color: PALE, fontSize: '0.9rem', '&:hover': { color: '#fff' } }}
                                    >
                                        {store.phone}
                                    </MuiLink>
                                </Box>
                            ))}
                        </Box>

                        {/* Opening hours */}
                        <Box>
                            <ColumnHeading>Öppettider</ColumnHeading>
                            {STORES.map((store) => (
                                <Box key={store.id} sx={{ mb: 2.5 }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', mb: 0.25 }}>
                                        {store.name}
                                    </Typography>
                                    <Typography sx={{ color: PALE, fontSize: '0.9rem', lineHeight: 1.6 }}>
                                        {store.hoursSummary}
                                    </Typography>
                                    <Typography sx={{ color: FAINT, fontSize: '0.82rem' }}>
                                        Sön–{store.id === 'boras' ? 'Mån' : 'Ons'} stängt
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {/* Links */}
                        <Box component="nav" aria-label="Sidfotsmeny">
                            <ColumnHeading>Genvägar</ColumnHeading>
                            {[...NAV_LINKS.filter((l) => l.url !== '/'), { name: 'Beställ online', url: '/bestall_online' }].map(
                                (link) => (
                                    <MuiLink
                                        key={link.url}
                                        component={Link}
                                        href={link.url}
                                        sx={{
                                            display: 'block',
                                            color: PALE,
                                            fontSize: '0.92rem',
                                            py: 0.5,
                                            '&:hover': { color: '#fff' },
                                        }}
                                    >
                                        {link.name}
                                    </MuiLink>
                                )
                            )}
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
                            gap: 1,
                        }}
                    >
                        <Typography sx={{ color: FAINT, fontSize: '0.85rem' }} suppressHydrationWarning>
                            © {new Date().getFullYear()} Knallefisk. Alla rättigheter förbehållna.
                        </Typography>
                        <Typography sx={{ color: FAINT, fontSize: '0.85rem' }}>
                            Färsk fisk från Göteborgs fiskauktion sedan {FOUNDED_YEAR}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
