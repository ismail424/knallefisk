'use client';

import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { AdminPrice } from '@/lib/types';
import { BRAND, CARD_HOVER } from '@/theme';

/**
 * The one price card used everywhere prices appear (startsida + prissida),
 * so the two can never drift apart visually.
 */
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
            {price.image && (
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        height="180"
                        image={price.image}
                        alt={price.title}
                        sx={{ objectFit: 'cover' }}
                    />
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
            )}

            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2.5,
                    '&:last-child': { pb: 2.5 },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
                    <Typography
                        component="h3"
                        sx={{
                            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                            fontWeight: 600,
                            fontSize: '1.05rem',
                            lineHeight: 1.35,
                            color: BRAND.ink,
                            flexGrow: 1,
                        }}
                    >
                        {price.title}
                    </Typography>
                    {onSale && !price.image && (
                        <Chip
                            label="REA"
                            size="small"
                            sx={{ backgroundColor: BRAND.coral, color: '#fff', fontWeight: 700 }}
                        />
                    )}
                </Box>

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
