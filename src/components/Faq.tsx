'use client';

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { BRAND } from '@/theme';

export interface FaqItem {
    q: string;
    a: string;
}

/**
 * Accessible accordion FAQ that also emits schema.org FAQPage data, so
 * the answers can show up directly in Google's results.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
    };

    return (
        <Box sx={{ display: 'grid', gap: 1.5 }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {items.map((item) => (
                <Accordion
                    key={item.q}
                    disableGutters
                    elevation={0}
                    sx={{
                        borderRadius: '16px !important',
                        border: `1px solid ${BRAND.border}`,
                        backgroundColor: '#fff',
                        '&::before': { display: 'none' },
                        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                        '&.Mui-expanded': {
                            borderColor: BRAND.tealLight,
                            boxShadow: '0 10px 30px rgba(23, 49, 58, 0.07)',
                        },
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMore sx={{ color: BRAND.teal }} />}
                        sx={{ px: { xs: 2, md: 3 }, py: 0.75 }}
                    >
                        <Typography component="h3" sx={{ fontWeight: 600, color: BRAND.ink, fontSize: '1rem' }}>
                            {item.q}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: { xs: 2, md: 3 }, pt: 0, pb: 2.5 }}>
                        <Typography sx={{ color: BRAND.muted, fontSize: '0.95rem' }}>{item.a}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
