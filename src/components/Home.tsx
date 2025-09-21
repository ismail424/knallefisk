'use client';

import { Box, Container, Typography, Button } from '@mui/material';
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
        <Box sx={{ pt: { xs: 8, md: 10 } }}>
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

                {/* Centered Vignette Overlay for Better Text Contrast */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 80%, transparent 100%)',
                        zIndex: 2
                    }}
                />

                {/* Hero Content */}
                <Container maxWidth="md" sx={{ textAlign: 'center', zIndex: 4, py: { xs: 6, md: 10 }, position: 'relative' }}>
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
                                size="large"
                                startIcon={<ShoppingCart />}
                                sx={{
                                    background: '#2c5aa0',
                                    color: 'white',
                                    px: { xs: 4, md: 6 },
                                    py: { xs: 2, md: 2.5 },
                                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                                    fontWeight: 600,
                                    borderRadius: 25,
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: '#1e3d72',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Beställ online
                            </Button>
                            <Button
                                component={Link}
                                href="/hitta_butik"
                                variant="outlined"
                                size="large"
                                startIcon={<StorefrontOutlined />}
                                sx={{
                                    borderColor: 'rgba(255,255,255,0.9)',
                                    color: 'white',
                                    px: { xs: 4, md: 6 },
                                    py: { xs: 2, md: 2.5 },
                                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                                    fontWeight: 600,
                                    borderRadius: 25,
                                    textTransform: 'none',
                                    borderWidth: '2px',
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.25)',
                                        borderColor: 'white',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease'
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
                                    background: 'linear-gradient(135deg, #52a3d9, #3498db)',
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
                                    color: '#2c5aa0',
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
                                        backgroundColor: '#52a3d9',
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
                                color: '#2c5aa0',
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
                                    backgroundColor: '#52a3d9',
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