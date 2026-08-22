'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import {
    StorefrontOutlined,
    LocationOnOutlined,
    PhoneOutlined,
    DirectionsOutlined,
} from '@mui/icons-material';
import { STORES } from '@/lib/site';
import { BRAND } from '@/theme';
import PageHero from '@/components/PageHero';

const HittaButik = () => {
    // Highlighted after mount so server and client HTML always match.
    const [todayIndex, setTodayIndex] = useState<number | null>(null);

    useEffect(() => {
        setTodayIndex((new Date().getDay() + 6) % 7);
    }, []);

    return (
        <Box sx={{ backgroundColor: BRAND.sand }}>
            <PageHero
                overline="Här finns vi"
                title="Hitta till våra butiker"
                subtitle="Två butiker i Sjuhärad – samma färska fisk och samma familj bakom disken. Välkommen in!"
                image="/img/store_front.webp"
            />

            <Container maxWidth="lg" sx={{ pb: { xs: 7, md: 10 } }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 4,
                    }}
                >
                    {STORES.map((store) => (
                        <Card key={store.id} sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            {/* Store header */}
                            <Box
                                sx={{
                                    px: 3,
                                    py: 2.5,
                                    background: `linear-gradient(120deg, ${BRAND.teal} 0%, ${BRAND.tealDark} 100%)`,
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                }}
                            >
                                <StorefrontOutlined />
                                <Typography variant="h4" component="h2" sx={{ color: '#fff' }}>
                                    Knallefisk {store.name}
                                </Typography>
                            </Box>

                            {/* Map */}
                            <Box sx={{ height: 280 }}>
                                <iframe
                                    src={store.mapEmbed}
                                    title={`Karta till Knallefisk ${store.name}`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, display: 'block' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </Box>

                            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5, flexGrow: 1 }}>
                                {/* Address + phone */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
                                        <LocationOnOutlined sx={{ color: BRAND.teal, fontSize: '1.2rem' }} />
                                        <Typography sx={{ color: BRAND.ink }}>
                                            {store.streetAddress}, {store.postalCode} {store.city}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}>
                                        <PhoneOutlined sx={{ color: BRAND.teal, fontSize: '1.2rem' }} />
                                        <Typography
                                            component="a"
                                            href={`tel:${store.phone.replace(/\s/g, '')}`}
                                            sx={{
                                                color: BRAND.ink,
                                                textDecoration: 'none',
                                                fontWeight: 500,
                                                '&:hover': { color: BRAND.tealDark },
                                            }}
                                        >
                                            {store.phone}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Opening hours */}
                                <Box>
                                    <Typography variant="h6" component="h3" sx={{ mb: 1.5 }}>
                                        Öppettider
                                    </Typography>
                                    <Box sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${BRAND.border}` }}>
                                        {store.hours.map((day, index) => {
                                            const isToday = todayIndex === index;
                                            const closed = day.hours === null;
                                            return (
                                                <Box
                                                    key={day.day}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        px: 2,
                                                        py: 0.9,
                                                        backgroundColor: isToday
                                                            ? BRAND.tealTint
                                                            : index % 2 === 0
                                                              ? '#fff'
                                                              : BRAND.sand,
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.92rem',
                                                            fontWeight: isToday ? 700 : 500,
                                                            color: BRAND.ink,
                                                        }}
                                                    >
                                                        {day.day}
                                                        {isToday && (
                                                            <Typography
                                                                component="span"
                                                                sx={{
                                                                    ml: 1,
                                                                    fontSize: '0.72rem',
                                                                    fontWeight: 700,
                                                                    color: BRAND.tealDark,
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.08em',
                                                                }}
                                                            >
                                                                Idag
                                                            </Typography>
                                                        )}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.92rem',
                                                            fontWeight: isToday ? 700 : 400,
                                                            color: closed ? BRAND.muted : BRAND.ink,
                                                        }}
                                                    >
                                                        {day.hours ?? 'Stängt'}
                                                    </Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </Box>

                                <Button
                                    component="a"
                                    href={store.directionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="contained"
                                    startIcon={<DirectionsOutlined />}
                                    sx={{ mt: 'auto', alignSelf: 'flex-start' }}
                                >
                                    Vägbeskrivning
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default HittaButik;
