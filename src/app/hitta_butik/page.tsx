'use client';

import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { LocationOnOutlined, PhoneOutlined, DirectionsOutlined } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { STORES } from '@/lib/site';
import { BRAND } from '@/theme';
import PageHero from '@/components/PageHero';
import StoreHeader from '@/components/StoreHeader';
import OpeningHoursTable from '@/components/OpeningHoursTable';

const HittaButik = () => {
    return (
        <Box sx={{ backgroundColor: BRAND.sand }}>
            <PageHero
                overline="Här finns vi"
                title="Hitta till våra butiker"
                subtitle="Två butiker i Sjuhärad – samma färska fisk och samma familj bakom disken. Välkommen in!"
                image="/img/store_front.webp"
            />

            <Container maxWidth="lg" sx={{ pb: { xs: 7, md: 10 } }}>
                <Typography component="h2" sx={visuallyHidden}>
                    Våra butiker
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 4,
                    }}
                >
                    {STORES.map((store) => (
                        <Card key={store.id} sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <StoreHeader title={`Knallefisk ${store.name}`} />

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
                                            href={`tel:${store.phoneE164}`}
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
                                    <Typography variant="h6" component="h4" sx={{ mb: 1.5 }}>
                                        Öppettider
                                    </Typography>
                                    <OpeningHoursTable store={store} />
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
