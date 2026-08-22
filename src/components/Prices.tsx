'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
    Box,
    Container,
    Typography,
    Card,
    Chip,
    Skeleton,
    Alert,
    Button,
} from '@mui/material';
import { SetMealOutlined, ShoppingBasketOutlined, PhoneOutlined } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { AdminPrice } from '../lib/types';
import { STORES } from '../lib/site';
import { BRAND } from '@/theme';
import PageHero from './PageHero';
import PriceCard from './PriceCard';
import CtaCard from './CtaCard';

const ALL = 'Alla';

const Prices = () => {
    const [prices, setPrices] = useState<AdminPrice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [category, setCategory] = useState(ALL);

    useEffect(() => {
        const loadPrices = async () => {
            try {
                const response = await fetch('/api/admin/prices');
                if (!response.ok) {
                    throw new Error('Failed to fetch prices');
                }
                const adminPrices: AdminPrice[] = await response.json();
                setPrices(adminPrices.filter((price) => price.is_visible !== false));
            } catch (err) {
                console.error('Error loading prices from API:', err);
                setError('Kunde inte ladda priserna just nu. Försök igen senare.');
            } finally {
                setLoading(false);
            }
        };

        loadPrices();
    }, []);

    const categories = useMemo(() => {
        const unique = Array.from(
            new Set(prices.map((p) => p.category?.trim()).filter((c): c is string => !!c))
        );
        return unique.length >= 2 ? [ALL, ...unique] : [];
    }, [prices]);

    const visiblePrices = useMemo(
        () =>
            category === ALL
                ? prices
                : prices.filter((p) => p.category?.trim() === category),
        [prices, category]
    );

    return (
        <Box sx={{ backgroundColor: BRAND.sand }}>
            <PageHero
                overline="Aktuella priser"
                title="Våra priser"
                subtitle="Priserna uppdateras löpande av oss i butiken och kan variera med dagens tillgång på Göteborgs fiskauktion."
                image="/img/bild1.webp"
            />

            <Container maxWidth="lg" sx={{ pb: { xs: 7, md: 10 } }}>
                {error ? (
                    <Alert
                        severity="error"
                        sx={{ maxWidth: 560, mx: 'auto', mb: 4 }}
                        action={
                            <Button
                                color="inherit"
                                size="small"
                                component="a"
                                href={`tel:${STORES[0].phoneE164}`}
                                startIcon={<PhoneOutlined />}
                            >
                                Ring oss
                            </Button>
                        }
                    >
                        {error}
                    </Alert>
                ) : loading ? (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                            gap: 3,
                        }}
                    >
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} sx={{ p: 2.5 }}>
                                <Skeleton variant="rounded" height={150} sx={{ mb: 2 }} />
                                <Skeleton width="70%" height={28} />
                                <Skeleton width="40%" height={34} />
                            </Card>
                        ))}
                    </Box>
                ) : prices.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: { xs: 6, md: 8 } }}>
                        <Box
                            sx={{
                                width: 88,
                                height: 88,
                                borderRadius: '50%',
                                backgroundColor: BRAND.tealTint,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3,
                            }}
                        >
                            <SetMealOutlined sx={{ fontSize: 40, color: BRAND.teal }} />
                        </Box>
                        <Typography variant="h4" component="h2" sx={{ mb: 1.5 }}>
                            Inga priser publicerade just nu
                        </Typography>
                        <Typography sx={{ color: BRAND.muted, mb: 3, maxWidth: 440, mx: 'auto' }}>
                            Ring oss eller kom förbi butiken så berättar vi vad som finns i disken idag.
                        </Typography>
                        <Button component={Link} href="/kontakta_oss" variant="contained">
                            Kontakta oss
                        </Button>
                    </Box>
                ) : (
                    <>
                        {categories.length > 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    mb: 4,
                                }}
                            >
                                {categories.map((cat) => {
                                    const selected = category === cat;
                                    return (
                                        <Chip
                                            key={cat}
                                            label={cat}
                                            clickable
                                            onClick={() => setCategory(cat)}
                                            aria-pressed={selected}
                                            sx={{
                                                px: 0.5,
                                                backgroundColor: selected ? BRAND.tealDark : '#fff',
                                                color: selected ? '#fff' : BRAND.tealDark,
                                                border: `1px solid ${selected ? BRAND.tealDark : BRAND.border}`,
                                                '&:hover, &.MuiChip-clickable:hover': {
                                                    backgroundColor: selected ? BRAND.tealDarker : BRAND.tealTint,
                                                },
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        )}

                        <Typography component="h2" sx={visuallyHidden}>
                            Prislista
                        </Typography>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                                gap: 3,
                            }}
                        >
                            {visiblePrices.map((price) => (
                                <PriceCard key={price.id} price={price} />
                            ))}
                        </Box>

                        {visiblePrices.length === 0 && (
                            <Typography sx={{ textAlign: 'center', color: BRAND.muted, py: 6 }}>
                                Inga varor i den här kategorin just nu.
                            </Typography>
                        )}

                        {/* Order CTA */}
                        <Box sx={{ mt: { xs: 5, md: 7 } }}>
                            <CtaCard
                                title="Vill du säkra din fisk till helgen?"
                                text="Beställ online så packar vi åt dig – hämta och betala i butiken."
                            >
                                <Button
                                    component={Link}
                                    href="/bestall_online"
                                    variant="contained"
                                    size="large"
                                    startIcon={<ShoppingBasketOutlined />}
                                >
                                    Beställ online
                                </Button>
                            </CtaCard>
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Prices;
