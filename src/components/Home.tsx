'use client';

import { Box, Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { 
    ShoppingCart, 
    StorefrontOutlined, 
    CheckCircleOutline,
    EmojiEvents,
    FavoriteBorder,
    Star
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface AdminPrice {
    id: string;
    title: string;
    price: string;
    sale_price?: string;
    unit: string;
    on_sale: boolean;
    is_visible: boolean;
    image?: string;
}

const Home = () => {
    const [featuredPrices, setFeaturedPrices] = useState<AdminPrice[]>([]);

    useEffect(() => {
        // Load prices from admin panel
        const savedPrices = localStorage.getItem('admin_prices');
        if (savedPrices) {
            try {
                const adminPrices = JSON.parse(savedPrices);
                // Get first 3 visible prices for featured section
                const visiblePrices = adminPrices
                    .filter((price: AdminPrice) => price.is_visible !== false)
                    .slice(0, 3);
                setFeaturedPrices(visiblePrices);
            } catch (e) {
                console.error('Error loading admin prices:', e);
            }
        }
    }, []);

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
                    minHeight: { xs: '80vh', md: '90vh' },
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

                {/* Even Overlay for Better Text Contrast */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.6)',
                        zIndex: 2
                    }}
                />

                {/* Hero Content */}
                <Container maxWidth="md" sx={{ 
                    textAlign: 'center', 
                    zIndex: 4, 
                    py: { xs: 6, md: 10 }, 
                    pt: { xs: '260px', md: '220px' },
                    position: 'relative' 
                }}>
                    <Box sx={{ mb: { xs: 4, md: 6 } }}>
                        <Image
                            src="/img/logo.svg"
                            alt="Knallefisk Logo"
                            width={350}
                            height={175}
                            style={{
                                maxWidth: '350px',
                                width: '100%',
                                height: 'auto'
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h2"
                        sx={{
                            color: 'white',
                            mb: { xs: 1, md: 1.5 },
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 700,
                            fontSize: { xs: '2rem', md: '3.2rem' },
                            lineHeight: 1.1,
                            letterSpacing: '-0.01em'
                        }}
                    >
                        Välkommen till Knallefisk!
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            color: 'white',
                            mb: { xs: 1, md: 1.5 },
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: { xs: '1.3rem', md: '1.6rem' },
                            maxWidth: '700px',
                            mx: 'auto',
                            lineHeight: 1.3
                        }}
                    >
                        Färska fisken över hela disken • Kvalitet sedan 2006
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: 'white',
                            mb: { xs: 2, md: 3 },
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 400,
                            fontSize: { xs: '1.1rem', md: '1.2rem' },
                            maxWidth: '600px',
                            mx: 'auto',
                            lineHeight: 1.4,
                            fontStyle: 'italic'
                        }}
                    >
                        &ldquo;Din lokala fiskhandlare som bryr sig om kvalitet och service&rdquo;
                    </Typography>

                    {/* Friendly Call-to-Action Section */}
                    <Box sx={{ mb: { xs: 4, md: 5 } }}>
                        <Box sx={{
                            display: 'flex',
                            gap: { xs: 2, md: 3 },
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            mb: 3
                        }}>
                            <Button
                                component={Link}
                                href="/bestall_online"
                                variant="contained"
                                size="small"
                                startIcon={<ShoppingCart />}
                                sx={{
                                    background: 'rgb(68, 143, 155)',
                                    color: 'white',
                                    px: { xs: 2, md: 2.5 },
                                    py: { xs: 1, md: 1.2 },
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    fontWeight: 600,
                                    borderRadius: 6,
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: 'rgb(58, 123, 135)',
                                        transform: 'translateY(-1px)'
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Beställ online
                            </Button>
                            <Button
                                component={Link}
                                href="/hitta_butik"
                                variant="outlined"
                                size="small"
                                startIcon={<StorefrontOutlined />}
                                sx={{
                                    borderColor: 'rgba(255,255,255,0.9)',
                                    color: 'white',
                                    px: { xs: 2, md: 2.5 },
                                    py: { xs: 1, md: 1.2 },
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    fontWeight: 600,
                                    borderRadius: 6,
                                    textTransform: 'none',
                                    borderWidth: '2px',
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        borderColor: 'white',
                                        transform: 'translateY(-1px)'
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Besök vår butik
                            </Button>
                        </Box>
                        
                        {/* Trust Indicators */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: { xs: 2, md: 4 },
                            flexWrap: 'wrap',
                            opacity: 0.9
                        }}>
                            <Typography sx={{ color: 'white', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircleOutline sx={{ fontSize: '1rem' }} />
                                Dagsfärsk fisk
                            </Typography>
                            <Typography sx={{ color: 'white', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircleOutline sx={{ fontSize: '1rem' }} />
                                Fri hämtning i butik
                            </Typography>
                            <Typography sx={{ color: 'white', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircleOutline sx={{ fontSize: '1rem' }} />
                                19 års erfarenhet
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Featured Prices Section */}
            {featuredPrices.length > 0 && (
                <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'white' }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                            <Typography 
                                variant="h3" 
                                component="h2"
                                sx={{ 
                                    fontWeight: 600,
                                    color: 'rgb(68, 143, 155)',
                                    mb: 2,
                                    fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                            >
                                Dagens Priser
                            </Typography>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: '#666',
                                    fontWeight: 400,
                                    fontSize: { xs: '1rem', md: '1.1rem' }
                                }}
                            >
                                Färsk fisk till bästa pris
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(2, 1fr)',
                                lg: 'repeat(3, 1fr)'
                            },
                            gap: 2
                        }}>
                            {featuredPrices.map((price) => (
                                <Card 
                                    key={price.id}
                                    sx={{ 
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 1,
                                        overflow: 'hidden',
                                        border: '1px solid #ddd',
                                        backgroundColor: '#fff',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                                        }
                                    }}
                                >
                                    {/* Image */}
                                    {price.image && (
                                        <Box sx={{ position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                height="160"
                                                image={price.image}
                                                alt={price.title}
                                                sx={{ 
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            {/* Sale Badge */}
                                            {price.on_sale && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        right: 8,
                                                        backgroundColor: '#d32f2f',
                                                        color: 'white',
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 0.5,
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase'
                                                    }}
                                                >
                                                    REA
                                                </Box>
                                            )}
                                        </Box>
                                    )}

                                    <CardContent sx={{ 
                                        flexGrow: 1, 
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        {/* Product Title */}
                                        <Typography 
                                            variant="h6" 
                                            component="h3"
                                            sx={{ 
                                                fontWeight: 500,
                                                color: '#333',
                                                mb: 1,
                                                fontSize: '1.1rem',
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            }}
                                        >
                                            {price.title}
                                        </Typography>
                                        
                                        {/* Price Section */}
                                        <Box sx={{ mt: 'auto' }}>
                                            {price.on_sale && price.sale_price ? (
                                                <Box>
                                                    <Typography 
                                                        variant="h6" 
                                                        component="div"
                                                        sx={{ 
                                                            fontWeight: 600,
                                                            color: '#2e7d32',
                                                            fontSize: '1.2rem',
                                                            fontFamily: 'system-ui, -apple-system, sans-serif',
                                                            mb: 0.5
                                                        }}
                                                    >
                                                        {price.sale_price}kr/{price.unit || 'st'}
                                                    </Typography>
                                                    <Typography 
                                                        variant="body2" 
                                                        component="div"
                                                        sx={{ 
                                                            textDecoration: 'line-through',
                                                            color: '#666',
                                                            fontSize: '0.9rem',
                                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                                        }}
                                                    >
                                                        Ordinarie: {price.price}kr/{price.unit || 'st'}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Typography 
                                                    variant="h6" 
                                                    component="div"
                                                    sx={{ 
                                                        fontWeight: 600,
                                                        color: '#333',
                                                        fontSize: '1.2rem',
                                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                                    }}
                                                >
                                                    {price.price}kr/{price.unit || 'st'}
                                                </Typography>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>

                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button
                                component={Link}
                                href="/priser"
                                variant="outlined"
                                sx={{
                                    borderColor: 'rgb(68, 143, 155)',
                                    color: 'rgb(68, 143, 155)',
                                    px: 3,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: 8,
                                    textTransform: 'none',
                                    '&:hover': {
                                        borderColor: 'rgb(68, 143, 155)',
                                        backgroundColor: 'rgba(68, 143, 155, 0.04)'
                                    }
                                }}
                            >
                                Se alla priser
                            </Button>
                        </Box>
                    </Container>
                </Box>
            )}

            {/* Enhanced About Section with Trust Elements */}
            <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#f8fafc' }}>
                <Container maxWidth="lg">
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        gap: { xs: 6, md: 8 }
                    }}>
                        <Box sx={{ 
                            flex: { xs: '1', md: '0 0 50%' },
                            position: 'relative'
                        }}>
                            <Box
                                component="img"
                                src="/img/store_front.webp"
                                alt="Bild på framsidan av fisk affären"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 3,
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.02)'
                                    }
                                }}
                            />
                            {/* Decorative element */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -20,
                                    right: -20,
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(68, 143, 155, 0.3), rgba(68, 143, 155, 0.2))',
                                    opacity: 0.1,
                                    zIndex: -1
                                }}
                            />
                        </Box>
                        <Box sx={{ 
                            flex: { xs: '1', md: '0 0 50%' },
                            textAlign: { xs: 'center', md: 'left' }
                        }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    mb: 3,
                                    color: 'rgb(68, 143, 155)',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 700,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    lineHeight: 1.2,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: -10,
                                        left: { xs: '50%', md: 0 },
                                        transform: { xs: 'translateX(-50%)', md: 'none' },
                                        width: 60,
                                        height: 4,
                                        backgroundColor: 'rgb(68, 143, 155)',
                                        borderRadius: 2
                                    }
                                }}
                            >
                                Välkommen till oss!
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#555',
                                    lineHeight: 1.8,
                                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 400,
                                    mb: 4
                                }}
                            >
                                Knallefisk startades år 2006 av en trevlig fiskhandlare som såg fram
                                emot att starta ett eget företag. Med 19 år av erfarenhet inom fiskbranchen
                                erbjuder vi alltid den bästa kvaliteten till det rätta priset.
                            </Typography>
                            <Box sx={{ 
                                p: 3, 
                                backgroundColor: 'rgba(52, 163, 217, 0.1)', 
                                borderRadius: 3,
                                borderLeft: '4px solid #52a3d9',
                                mb: 3
                            }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#2c5aa0',
                                        lineHeight: 1.7,
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 500,
                                        fontStyle: 'italic'
                                    }}
                                >
                                    &ldquo;Här hittar du allt från färsk fisk till färdiga delikatesser, som hämtas direkt
                                    från GÖTEBORGS FISKAUKTION. Vi behandlar varje kund som familj!&rdquo;
                                </Typography>
                            </Box>
                            {/* Trust badges */}
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#2c5aa0' }}>
                                    <EmojiEvents sx={{ fontSize: '1.2rem' }} />
                                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Kvalitetsgaranti</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#2c5aa0' }}>
                                    <FavoriteBorder sx={{ fontSize: '1.2rem' }} />
                                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Familjärt bemötande</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#2c5aa0' }}>
                                    <Star sx={{ fontSize: '1.2rem' }} />
                                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>19 års erfarenhet</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Enhanced Gallery Section */}
            <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#ffffff' }}>
                <Container maxWidth="lg">
                    {/* Section Header */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: 'rgb(68, 143, 155)',
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700,
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                mb: 2,
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -10,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 80,
                                    height: 4,
                                    backgroundColor: 'rgb(68, 143, 155)',
                                    borderRadius: 2
                                }
                            }}
                        >
                            Vår Butik
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#666',
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 400,
                                fontSize: { xs: '1.1rem', md: '1.2rem' },
                                maxWidth: '600px',
                                mx: 'auto'
                            }}
                        >
                            Se vad vi erbjuder
                        </Typography>
                    </Box>

                    {/* Image Gallery */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)'
                        },
                        gap: { xs: 3, md: 4 }
                    }}>
                        {images.map((image, index) => (
                            <Box 
                                key={index}
                                sx={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: 3,
                                    border: '1px solid rgba(52, 163, 217, 0.2)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        borderColor: 'rgba(52, 163, 217, 0.4)'
                                    },
                                    '&:hover .image': {
                                        transform: 'scale(1.05)'
                                    },
                                    '&:hover .overlay': {
                                        opacity: 1
                                    }
                                }}
                            >
                                <Box
                                    className="image"
                                    component="img"
                                    src={image.src}
                                    alt={image.alt}
                                    sx={{
                                        width: '100%',
                                        height: 280,
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                                {/* Hover Overlay */}
                                <Box
                                    className="overlay"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(45deg, rgba(52, 163, 217, 0.8), rgba(52, 152, 219, 0.6))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease'
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'white',
                                            fontFamily: 'Poppins, sans-serif',
                                            fontWeight: 600,
                                            textAlign: 'center',
                                            px: 2,
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        {image.alt}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;