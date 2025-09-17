'use client';

import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { ShoppingCart, StorefrontOutlined } from '@mui/icons-material';
import Link from 'next/link';

const Home = () => {
    const images = [
        { src: "/img/bild1.webp", alt: "En bild på en färsk lax sida!" },
        { src: "/img/bild7.webp", alt: "Räkmacka" },
        { src: "/img/bild8.webp", alt: "Laxmacka" },
        { src: "/img/bild4.jpg", alt: "Bild på framsidan av vår butik" },
        { src: "/img/bild5.webp", alt: "Färska fiskfilér" },
        { src: "/img/bild2.webp", alt: "Färska fiskfilér" }
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    minHeight: '70vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #448f9b 0%, #5ba3b0 100%)'
                }}
            >
                {/* Background Video */}
                <Box
                    component="video"
                    autoPlay
                    muted
                    loop
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -2
                    }}
                >
                    <source src="/video/havet.mp4" type="video/mp4" />
                </Box>

                {/* Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(68, 143, 155, 0.8)',
                        zIndex: -1
                    }}
                />

                {/* Hero Content */}
                <Container maxWidth="md" sx={{ textAlign: 'center', zIndex: 1, py: 8 }}>
                    <Box sx={{ mb: 3 }}>
                        <img
                            src="/img/logo.svg"
                            alt="Knallefisk Logo"
                            style={{
                                maxWidth: '300px',
                                width: '100%',
                                height: 'auto'
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h3"
                        sx={{
                            color: 'white',
                            mb: 4,
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            fontSize: { xs: '1.75rem', md: '2.5rem' }
                        }}
                    >
                        Färska delikatesser från hav och sjö
                    </Typography>


                    {/* CTA Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            component={Link}
                            href="/bestall_online"
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCart />}
                            sx={{
                                backgroundColor: 'white',
                                color: '#448f9b',
                                px: 3,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#f0f9fa'
                                }
                            }}
                        >
                            Beställ nu
                        </Button>
                        <Button
                            component={Link}
                            href="/hitta_butik"
                            variant="outlined"
                            size="large"
                            startIcon={<StorefrontOutlined />}
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                px: 3,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: '#448f9b'
                                }
                            }}
                        >
                            Hitta butik
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* About Section */}
            <Box sx={{ py: 8, backgroundColor: 'white' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src="/img/store_front.webp"
                                alt="Bild på framsidan av fisk affären"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h4"
                                sx={{
                                    mb: 3,
                                    color: '#448f9b',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 600
                                }}
                            >
                                Om oss
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#666',
                                    lineHeight: 1.7,
                                    fontSize: '1.1rem'
                                }}
                            >
                                Knallefisk startades år 2006 av en trevlig fiskhandlare som såg fram
                                emot att starta ett eget företag. Med 15 år av erfarenhet inom fiskbranchen
                                erbjuder han och hans anställda alltid den bästa kvaliteten till det lägsta
                                priset. Här hittar du allt från färsk fisk till färdiga delikatesser, som hämtas direkt
                                från GÖTBORGS FISKAUKTION.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Gallery Section */}
            <Box sx={{ py: 8, backgroundColor: '#f8fafc' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {images.map((image, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box
                                    component="img"
                                    src={image.src}
                                    alt={image.alt}
                                    sx={{
                                        width: '100%',
                                        height: 250,
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            transition: 'transform 0.3s ease'
                                        }
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;