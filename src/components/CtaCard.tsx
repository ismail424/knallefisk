'use client';

import { Box, Card, Typography } from '@mui/material';
import { BRAND } from '@/theme';

interface CtaCardProps {
    title: string;
    text: string;
    /** Action buttons */
    children: React.ReactNode;
}

/** Tinted call-to-action card used at the bottom of content pages. */
export default function CtaCard({ title, text, children }: CtaCardProps) {
    return (
        <Card
            sx={{
                p: { xs: 3, md: 4 },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                gap: 2.5,
                backgroundColor: BRAND.tealTint,
                border: `1px solid ${BRAND.tealPale}`,
            }}
        >
            <Box>
                <Typography variant="h4" component="h2" sx={{ mb: 0.75 }}>
                    {title}
                </Typography>
                <Typography sx={{ color: BRAND.muted }}>{text}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', flexShrink: 0 }}>{children}</Box>
        </Card>
    );
}
