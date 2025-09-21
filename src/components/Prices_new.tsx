'use client';

import { useState, useEffect } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Card, 
    CardContent, 
    CardMedia,
    Chip, 
    CircularProgress, 
    Alert, 
    Button,
    Fade
} from '@mui/material';
import { 
    LocalOffer as OfferIcon,
    ShoppingCart as CartIcon,
    Star as StarIcon
} from '@mui/icons-material';
import Link from 'next/link';

interface Price {
    id: number;
    title: string;
    price: number;
    sale_price: number | null;
    on_sale: boolean;
    image: string;
    is_visible: boolean;
    description?: string;
}

const Prices = () => {
    const [prices, setPrices] = useState<Price[]>([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState("");

    useEffect(() => {
        // Load prices from localStorage (set by admin)
        const savedPrices = localStorage.getItem('admin_prices');
        if (savedPrices) {
            const adminPrices = JSON.parse(savedPrices);
            // Only show visible prices to customers
            const visiblePrices = adminPrices.filter((price: Price) => price.is_visible);
            setPrices(visiblePrices);
            setLoading(false);
            return;
        }

        // Fallback to static prices for demo if no admin prices exist
        const staticPrices: Price[] = [
            {
                id: 1,
                title: 'Färsk Lax',
                price: 189,
                sale_price: null,
                on_sale: false,
                image: '/img/bild1.webp',
                is_visible: true,
                description: 'Färsk atlantlax av högsta kvalitet direkt från Norge'
            },
            {
                id: 2,
                title: 'Räkor',
                price: 245,
                sale_price: 199,
                on_sale: true,
                image: '/img/bild2.webp',
                is_visible: true,
                description: 'Färska handskalade räkor från Västkusten'
            },
            {
                id: 3,
                title: 'Torsk',
                price: 149,
                sale_price: null,
                on_sale: false,
                image: '/img/bild3.webp',
                is_visible: true,
                description: 'Färsk torsk från Nordsjön, perfekt för middag'
            },
            {
                id: 4,
                title: 'Kolja',
                price: 129,
                sale_price: null,
                on_sale: false,
                image: '/img/bild4.jpg',
                is_visible: true,
                description: 'Färsk kolja, utmärkt för fiskpinnar'
            },
            {
                id: 5,
                title: 'Abborre',
                price: 169,
                sale_price: 139,
                on_sale: true,
                image: '/img/bild5.webp',
                is_visible: true,
                description: 'Färsk abborre från svenska sjöar'
            },
            {
                id: 6,
                title: 'Makrill',
                price: 99,
                sale_price: null,
                on_sale: false,
                image: '/img/bild6.webp',
                is_visible: true,
                description: 'Färsk makrill, rik på omega-3'
            },
            {
                id: 7,
                title: 'Musslor',
                price: 89,
                sale_price: null,
                on_sale: false,
                image: '/img/bild7.webp',
                is_visible: true,
                description: 'Färska blåmusslor från Västkusten'
            },
            {
                id: 8,
                title: 'Sill',
                price: 75,
                sale_price: 59,
                on_sale: true,
                image: '/img/bild8.webp',
                is_visible: true,
                description: 'Inlagd sill i olika sorter'
            }
        ];

        setTimeout(() => {
            setPrices(staticPrices);
            setLoading(false);
        }, 800);
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                    flexDirection: 'column',
                    gap: 2,
                    pt: { xs: '260px', md: '220px' }
                }}
            >
                <CircularProgress size={60} sx={{ color: '#448f9b' }} />
                <Typography variant="h6" sx={{ color: '#448f9b', fontFamily: 'Poppins, sans-serif' }}>
                    Laddar priser...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4, pt: { xs: '260px', md: '220px' } }}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ 
            py: 4, 
            pt: { xs: '260px', md: '220px' }, 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '100vh' 
        }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            background: 'linear-gradient(135deg, #448f9b 0%, #2c5969 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: '2rem', md: '3rem' }
                        }}
                    >
                        Våra Priser
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#448f9b',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            mb: 3,
                            fontSize: { xs: '1rem', md: '1.25rem' }
                        }}
                    >
                        Färska fisken över hela disken
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#666',
                            maxWidth: 600,
                            mx: 'auto',
                            lineHeight: 1.8
                        }}
                    >
                        Alla priser uppdateras dagligen från Göteborgs Fiskauktion för att garantera 
                        marknadens färskaste fisk till bästa pris.
                    </Typography>
                </Box>

                {/* Price Grid */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { 
                        xs: '1fr', 
                        sm: 'repeat(2, 1fr)', 
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)'
                    },
                    gap: { xs: 3, md: 4 },
                    mb: 6 
                }}>
                    {prices.map((price, index) => (
                        <Fade in={true} timeout={300 + index * 100} key={price.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    backgroundColor: 'white',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
                                    }
                                }}
                            >
                                {/* Rea Badge */}
                                {price.on_sale && (
                                    <Chip
                                        icon={<OfferIcon />}
                                        label="REA"
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                                            color: 'white',
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                            zIndex: 10,
                                            boxShadow: '0 4px 12px rgba(231, 76, 60, 0.4)',
                                            '& .MuiChip-icon': {
                                                color: 'white'
                                            }
                                        }}
                                    />
                                )}

                                {/* Product Image */}
                                <Box sx={{ 
                                    position: 'relative', 
                                    height: 200,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {price.image ? (
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={price.image}
                                            alt={price.title}
                                            sx={{ 
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
                                    ) : (
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(135deg, #448f9b, #2c5969)',
                                        }}>
                                            <Typography 
                                                sx={{ 
                                                    fontSize: '4rem',
                                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                                                }}
                                            >
                                                🐟
                                            </Typography>
                                        </Box>
                                    )}
                                    
                                    {/* Quality Badge */}
                                    <Chip
                                        icon={<StarIcon />}
                                        label="Premium"
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 12,
                                            left: 12,
                                            background: 'rgba(255,255,255,0.95)',
                                            color: '#448f9b',
                                            fontWeight: 600,
                                            fontSize: '0.7rem',
                                            backdropFilter: 'blur(10px)',
                                            '& .MuiChip-icon': {
                                                color: '#f39c12'
                                            }
                                        }}
                                    />
                                </Box>

                                <CardContent sx={{ 
                                    p: 3, 
                                    background: 'linear-gradient(to bottom, white, #fafbfc)',
                                    height: 'calc(100% - 200px)',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {/* Title */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 1,
                                            fontFamily: 'Poppins, sans-serif',
                                            fontWeight: 700,
                                            color: '#2c3e50',
                                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                                            lineHeight: 1.3
                                        }}
                                    >
                                        {price.title}
                                    </Typography>

                                    {/* Description */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#7f8c8d',
                                            mb: 3,
                                            fontSize: '0.9rem',
                                            lineHeight: 1.6,
                                            flexGrow: 1
                                        }}
                                    >
                                        {price.description || 'Färsk fisk av högsta kvalitet från Göteborgs Fiskauktion'}
                                    </Typography>

                                    {/* Price Section */}
                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        mb: 2
                                    }}>
                                        <Box>
                                            {price.on_sale && price.sale_price ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            textDecoration: 'line-through',
                                                            color: '#bdc3c7',
                                                            fontSize: '1rem'
                                                        }}
                                                    >
                                                        {price.price} kr
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            color: '#e74c3c',
                                                            fontWeight: 700,
                                                            fontFamily: 'Poppins, sans-serif'
                                                        }}
                                                    >
                                                        {price.sale_price} kr
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        color: '#448f9b',
                                                        fontWeight: 700,
                                                        fontFamily: 'Poppins, sans-serif'
                                                    }}
                                                >
                                                    {price.price} kr
                                                </Typography>
                                            )}
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: '#95a5a6',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                per kg
                                            </Typography>
                                        </Box>
                                        
                                        {/* Add to Cart Button */}
                                        <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={<CartIcon />}
                                            sx={{
                                                background: 'linear-gradient(135deg, #448f9b, #2c5969)',
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                px: 2,
                                                py: 1,
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #357a84, #1e3d47)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 6px 16px rgba(68, 143, 155, 0.4)'
                                                }
                                            }}
                                        >
                                            Lägg till
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Fade>
                    ))}
                </Box>

                {/* Call to Action */}
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 4,
                        background: 'linear-gradient(135deg, rgba(68, 143, 155, 0.1), rgba(44, 89, 105, 0.1))',
                        borderRadius: 3,
                        border: '1px solid rgba(68, 143, 155, 0.2)'
                    }}
                >
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            color: '#448f9b', 
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            mb: 2 
                        }}
                    >
                        Vill du beställa?
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: '#666', 
                            mb: 3,
                            maxWidth: 500,
                            mx: 'auto'
                        }}
                    >
                        Kontakta oss direkt eller besök vår butik för att beställa färsk fisk av högsta kvalitet.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            component={Link}
                            href="/kontakta_oss"
                            variant="contained"
                            size="large"
                            sx={{
                                background: 'linear-gradient(135deg, #448f9b, #2c5969)',
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #357a84, #1e3d47)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 20px rgba(68, 143, 155, 0.4)'
                                }
                            }}
                        >
                            Kontakta oss
                        </Button>
                        <Button
                            component={Link}
                            href="/hitta_butik"
                            variant="outlined"
                            size="large"
                            sx={{
                                color: '#448f9b',
                                borderColor: '#448f9b',
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: 'rgba(68, 143, 155, 0.1)',
                                    borderColor: '#357a84',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Hitta butiken
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Prices;
