'use client';

import { Box, Container, Typography } from '@mui/material';
import { Bubbles, FishAccent, HeadingRule } from './decor';
import { BRAND } from '@/theme';

interface PageHeroProps {
    overline: string;
    title: string;
    subtitle?: string;
}

/** Shared page opener: every subpage starts with the same calm teal band. */
export default function PageHero({ overline, title, subtitle }: PageHeroProps) {
    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(180deg, ${BRAND.tealTint} 0%, ${BRAND.sand} 100%)`,
            }}
        >
            <Bubbles style={{ top: -30, right: '4%' }} size={200} />
            <FishAccent style={{ bottom: 18, left: '3%' }} size={72} color="rgba(68, 143, 155, 0.14)" />
            <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center', pt: { xs: 6, md: 8 }, pb: { xs: 4, md: 6 } }}>
                <Typography variant="overline" sx={{ color: BRAND.teal, display: 'block', mb: 1 }}>
                    {overline}
                </Typography>
                <Typography
                    variant="h1"
                    sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: subtitle ? 2 : 0 }}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        sx={{
                            color: BRAND.muted,
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            lineHeight: 1.7,
                            maxWidth: 620,
                            mx: 'auto',
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}
                <HeadingRule />
            </Container>
        </Box>
    );
}
