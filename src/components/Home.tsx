'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { ShoppingCart, StorefrontOutlined } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

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
                    backgroundColor: '#448f9b'
                }}
            >
                {/* Background Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onError={(e) => console.error('Video failed to load:', e)}
                    onLoadStart={() => console.log('Video loading started')}
                    onCanPlay={() => console.log('Video can play')}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1,
                        backgroundColor: 'transparent'
                    }}
                >
                    <source src="/video/havet.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Simple Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(68, 143, 155, 0.7)',
                        zIndex: 2
                    }}
                />

                {/* Hero Content */}
                <Container maxWidth="md" sx={{ textAlign: 'center', zIndex: 3, py: 8, position: 'relative' }}>
                    <Box sx={{ mb: 4 }}>
                        <Image
                            src="/img/logo.svg"
                            alt="Knallefisk Logo"
                            width={300}
                            height={150}
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
                            mb: 6,
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            fontSize: { xs: '1.8rem', md: '2.5rem' }
                        }}
                    >
                        Färska delikatesser från hav och sjö
                    </Typography>

                    {/* Simple CTA Buttons */}
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
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
                                borderRadius: 1,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#f8f9fa',
                                    color: '#448f9b'
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
                                borderRadius: 1,
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
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        gap: 6
                    }}>
                        <Box sx={{ flex: { xs: '1', md: '0 0 50%' } }}>
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
                        </Box>
                        <Box sx={{ flex: { xs: '1', md: '0 0 50%' } }}>
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
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Gallery Section */}
            <Box sx={{ py: 8, backgroundColor: '#f8fafc' }}>
                <Container maxWidth="lg">
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)'
                        },
                        gap: 2
                    }}>
                        {images.map((image, index) => (
                            <Box key={index}>
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
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;