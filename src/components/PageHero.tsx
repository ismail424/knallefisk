'use client';

import { Box, Container, Typography } from '@mui/material';
import { Bubbles, FishAccent, HeadingRule } from './decor';
import { BRAND } from '@/theme';

interface PageHeroProps {
    overline: string;
    title: string;
    subtitle?: string;
    /** Optional photo background — renders the dark variant with white text. */
    image?: string;
}

/** Shared page opener: every subpage starts with the same band, optionally photo-backed. */
export default function PageHero({ overline, title, subtitle, image }: PageHeroProps) {
    const dark = Boolean(image);

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                background: dark
                    ? `${BRAND.inkDeep} url(${image}) center 40% / cover no-repeat`
                    : `linear-gradient(180deg, ${BRAND.tealTint} 0%, ${BRAND.sand} 100%)`,
            }}
        >
            {dark && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'linear-gradient(180deg, rgba(13, 40, 48, 0.84) 0%, rgba(13, 40, 48, 0.7) 60%, rgba(13, 40, 48, 0.84) 100%)',
                    }}
                />
            )}
            <Bubbles
                style={{ top: -30, right: '4%' }}
                size={200}
                color={dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(68, 143, 155, 0.16)'}
            />
            {!dark && (
                <FishAccent style={{ bottom: 18, left: '3%' }} size={72} color="rgba(68, 143, 155, 0.14)" />
            )}
            <Container
                maxWidth="md"
                sx={{ position: 'relative', textAlign: 'center', pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 6 } }}
            >
                <Typography
                    variant="overline"
                    sx={{ color: dark ? BRAND.tealPale : BRAND.tealDark, display: 'block', mb: 1 }}
                >
                    {overline}
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '2rem', md: '2.75rem' },
                        mb: subtitle ? 2 : 0,
                        color: dark ? '#fff' : BRAND.ink,
                        textShadow: dark ? '0 2px 20px rgba(0, 0, 0, 0.35)' : 'none',
                    }}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        sx={{
                            color: dark ? 'rgba(255, 255, 255, 0.88)' : BRAND.muted,
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            lineHeight: 1.7,
                            maxWidth: 620,
                            mx: 'auto',
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}
                <HeadingRule color={dark ? 'rgba(255, 255, 255, 0.75)' : undefined} />
            </Container>
        </Box>
    );
}
