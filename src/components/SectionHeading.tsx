'use client';

import { Box, Typography } from '@mui/material';
import { HeadingRule } from './decor';
import { BRAND } from '@/theme';

interface SectionHeadingProps {
    overline: string;
    title: string;
    subtitle?: string;
}

/** Centered section opener (overline + h2 + optional subtitle + rule). */
export default function SectionHeading({ overline, title, subtitle }: SectionHeadingProps) {
    return (
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography variant="overline" sx={{ color: BRAND.tealDark, display: 'block', mb: 1 }}>
                {overline}
            </Typography>
            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                {title}
            </Typography>
            {subtitle && (
                <Typography
                    sx={{
                        color: BRAND.muted,
                        mt: 1.5,
                        fontSize: { xs: '1rem', md: '1.05rem' },
                        maxWidth: 560,
                        mx: 'auto',
                    }}
                >
                    {subtitle}
                </Typography>
            )}
            <HeadingRule />
        </Box>
    );
}
