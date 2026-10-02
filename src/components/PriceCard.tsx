'use client';

import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { AdminPrice } from '@/lib/types';
import { BRAND, CARD_HOVER } from '@/theme';

/**
 * The one price card used everywhere prices appear (startsida + prissida),
 * so the two can never drift apart visually.
 */
/**
 * Titles are typed by hand in the admin, some in ALL CAPS. Show those in
 * sentence case so the grid reads consistently ("ARKÖ RÄKOR" -> "Arkö räkor").
 */
function displayTitle(title: string) {
    const letters = title.replace(/[^\p{L}]/gu, '');
    if (letters.length > 1 && letters === letters.toLocaleUpperCase('sv-SE')) {
        const lower = title.toLocaleLowerCase('sv-SE');
        return lower.charAt(0).toLocaleUpperCase('sv-SE') + lower.slice(1);
    }
    return title;
}

const MEDIA_HEIGHT = 180;

export default function PriceCard({ price }: { price: AdminPrice }) {
    const onSale = price.on_sale && price.sale_price;
    const unit = price.unit || 'st';

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                ...CARD_HOVER,
            }}
        >
            <Box sx={{ position: 'relative', height: MEDIA_HEIGHT, flexShrink: 0 }}>
                {price.image ? (
                    <CardMedia
                        component="img"
                        height={MEDIA_HEIGHT}
                        image={price.image}
                        alt={displayTitle(price.title)}
                        sx={{ objectFit: 'cover', height: '100%' }}
                    />
                ) : (
                    // No photo uploaded: a calm branded tile keeps every card the same shape
                    <Box
                        aria-hidden
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: `linear-gradient(135deg, ${BRAND.tealTint} 0%, ${BRAND.tealPale} 100%)`,
                        }}
                    >
                        <svg viewBox="4 14 56 36" width="84" height="54">
                            <path
                                fill={BRAND.teal}
                                opacity="0.35"
                                d="M8 33c6-11 15-16 25-15.5 5 .3 9.3 2.6 12.6 6.2L54 17.2c1.6-1.2 3.6.2 3.1 2.1L55 32.6l2.1 13.1c.5 1.9-1.5 3.3-3.1 2.1l-8.4-6.5C42.3 45 38 47.3 33 47.6 23 48.1 14 43.8 8 33z"
                            />
                            <circle cx="18.5" cy="30.2" r="2.8" fill={BRAND.tealTint} />
                        </svg>
                    </Box>
                )}
                {onSale && (
                    <Chip
                        label="REA"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            backgroundColor: BRAND.coralDark,
                            color: '#fff',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                        }}
                    />
                )}
            </Box>

            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2.5,
                    '&:last-child': { pb: 2.5 },
                }}
            >
                <Typography
                    component="h3"
                    sx={{
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        lineHeight: 1.35,
                        color: BRAND.ink,
                        mb: 1.5,
                    }}
                >
                    {displayTitle(price.title)}
                </Typography>
                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'baseline', gap: 1.25, flexWrap: 'wrap' }}>
                    <Typography
                        component="span"
                        sx={{
                            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                            fontWeight: 700,
                            fontSize: '1.55rem',
                            lineHeight: 1,
                            color: onSale ? BRAND.coral : BRAND.tealDark,
                        }}
                    >
                        {onSale ? price.sale_price : price.price} kr
                        <Typography
                            component="span"
                            sx={{ fontSize: '0.95rem', fontWeight: 600, color: BRAND.muted, ml: 0.5 }}
                        >
                            /{unit}
                        </Typography>
                    </Typography>
                    {onSale && (
                        <Typography
                            component="span"
                            sx={{
                                textDecoration: 'line-through',
                                color: BRAND.muted,
                                fontSize: '0.95rem',
                            }}
                        >
                            {price.price} kr/{unit}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
