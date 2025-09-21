'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Card, 
    CardMedia, 
    CardContent 
} from '@mui/material';
import { 
    ShoppingCart, 
    StorefrontOutlined, 
    CheckCircleOutline 
} from '@mui/icons-material';

interface AdminPrice {
    id: string;
    title: string;
    price: string;
    sale_price?: string;
    category?: string;
    unit: string;
    weight?: string;
    on_sale: boolean;
    is_visible: boolean;
    image?: string;
}

const Home = () => {
    const [featuredPrices, setFeaturedPrices] = useState<AdminPrice[]>([]);

    useEffect(() => {
        // Load prices from admin panel - only show real admin prices
        const savedPrices = localStorage.getItem('admin_prices');
        console.log('Home - Raw saved prices:', savedPrices);
        if (savedPrices) {
            try {
                const adminPrices = JSON.parse(savedPrices);
                console.log('Home - Parsed admin prices:', adminPrices);
                // Get first 3 visible prices for featured section
                const visiblePrices = adminPrices
                    .filter((price: AdminPrice) => price.is_visible !== false)
                    .slice(0, 3);
                console.log('Home - Filtered visible prices:', visiblePrices);
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
        { src: "/img/bild5.webp", alt: "En fin fisk tallrik!" },
        { src: "/img/bild6.webp", alt: "Ett gäng fina fiskar" },
        { src: "/img/bild2.webp", alt: "En fin räka tallrik" },
        { src: "/img/bild3.webp", alt: "En stor fin krabba" }
    ];

    return (
        <Box sx={{ pt: { xs: '60px', md: '40px' } }}>
            {/* Hero Section with Video Background */}
            <Box sx={{ 
                position: 'relative', 
                height: { xs: '60vh', md: '70vh' }, 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
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

                {/* Overlay for Better Text Contrast */}
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
                    py: { xs: 8, md: 12 }, 
                    pt: { xs: '280px', md: '240px' },
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
                            mb: { xs: 3, md: 4 },
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

                    {/* Call-to-Action Section */}
                    <Box sx={{ mb: { xs: 5, md: 6 } }}>
                        <Box sx={{
                            display: 'flex',
                            gap: { xs: 2, md: 3 },
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            mb: { xs: 4, md: 5 }
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

                    {featuredPrices.length > 0 ? (
                        <>
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
                        </>
                    ) : (
                        <Box sx={{ 
                            textAlign: 'center', 
                            py: { xs: 4, md: 6 },
                            color: '#666'
                        }}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    mb: 2,
                                    fontWeight: 400,
                                    fontSize: { xs: '1.1rem', md: '1.2rem' }
                                }}
                            >
                                Inga priser att visa just nu
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: '#888',
                                    fontSize: { xs: '0.9rem', md: '1rem' }
                                }}
                            >
                                Kontakta oss för aktuella priser
                            </Typography>
                        </Box>
                    )}
                </Container>
            </Box>

            {/* About Section with Trust Elements */}
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
                                    borderRadius: 2,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                                }}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
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
                                Välkommen till oss!
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: '#666',
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    lineHeight: 1.7,
                                    mb: 3
                                }}
                            >
                                Vi är en familjeägd fiskhandel som har serverat Göteborg med den färskaste fisken sedan 2006. 
                                Vår passion för kvalitet och service gör oss till ditt förstahandsval för alla dina fiskbehov.
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: '#666',
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    lineHeight: 1.7
                                }}
                            >
                                Från dagsfärsk havsfisk till lokala delikatesser - vi erbjuder alltid det bästa för våra kunder.
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Store Section */}
            <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'white' }}>
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
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(4, 1fr)'
                        },
                        gap: 2,
                        mb: 6
                    }}>
                        {images.map((image, index) => (
                            <Box
                                key={index}
                                sx={{
                                    position: 'relative',
                                    aspectRatio: '1',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    style={{
                                        objectFit: 'cover'
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
