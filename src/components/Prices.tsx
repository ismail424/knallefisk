'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';

interface Price {
    id: string;
    name: string;
    price: string;
    sale_price?: string;
    description?: string;
    category?: string;
    unit: string;
    weight?: string;
    on_sale: boolean;
    is_visible: boolean;
    image?: string;
}

const defaultPrices: Price[] = [
    {
        id: '1',
        name: 'Lax',
        price: '280',
        description: 'Färsk norsk lax av högsta kvalitet',
        unit: 'kg',
        on_sale: false,
        is_visible: true,
        image: '/img/bild1.webp'
    },
    {
        id: '2', 
        name: 'Torsk',
        price: '220',
        description: 'Färsk torsk från Västkusten',
        unit: 'kg',
        on_sale: true,
        sale_price: '180',
        is_visible: true,
        image: '/img/bild2.webp'
    },
    {
        id: '3',
        name: 'Räkor',
        price: '340',
        description: 'Stora skalade räkor',
        unit: 'kg',
        on_sale: false,
        is_visible: true,
        image: '/img/bild3.webp'
    },
    {
        id: '4',
        name: 'Sill',
        price: '95',
        description: 'Färsk sill från Östersjön',
        unit: 'kg',
        on_sale: false,
        is_visible: true,
        image: '/img/bild4.jpg'
    },
    {
        id: '5',
        name: 'Musslor',
        price: '120',
        description: 'Blåmusslor från västkusten',
        unit: 'kg',
        on_sale: true,
        sale_price: '95',
        is_visible: true,
        image: '/img/bild5.webp'
    },
    {
        id: '6',
        name: 'Kolja',
        price: '190',
        description: 'Färsk kolja perfekt för stuvning',
        unit: 'kg',
        on_sale: false,
        is_visible: true,
        image: '/img/bild6.webp'
    }
];

const Prices = () => {
    const [prices, setPrices] = useState<Price[]>(defaultPrices);
    const [loading, setLoading] = useState(true);
    const [error] = useState("");

    useEffect(() => {
        // Ladda priser från localStorage (admin-panelen)
        const savedPrices = localStorage.getItem('admin_prices');
        if (savedPrices) {
            try {
                const adminPrices = JSON.parse(savedPrices);
                // Visa bara synliga priser
                const visiblePrices = adminPrices.filter((price: Price) => price.is_visible !== false);
                if (visiblePrices.length > 0) {
                    setPrices(visiblePrices);
                }
            } catch (e) {
                console.error('Error loading admin prices:', e);
            }
        }
        setLoading(false);
    }, []);

    const filteredPrices = prices.filter(price => price.is_visible !== false);

    if (loading) {
        return (
            <Box sx={{ 
                pt: { xs: '260px', md: '220px' }, 
                pb: 8, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '50vh'
            }}>
                <CircularProgress size={60} sx={{ color: '#448f9b' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ pt: { xs: '260px', md: '220px' }, pb: 8 }}>
                <Container maxWidth="lg">
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ pt: { xs: '260px', md: '220px' }, pb: 8 }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography 
                        variant="h3" 
                        component="h1"
                        sx={{ 
                            fontWeight: 600,
                            color: 'rgb(68, 143, 155)',
                            mb: 1
                        }}
                    >
                        Våra Priser
                    </Typography>
                </Box>

                {/* Prices Grid */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)'
                    },
                    gap: 2
                }}>
                    {filteredPrices.map((price) => (
                        <Card 
                            key={price.id}
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 1,
                                overflow: 'hidden',
                                border: '1px solid #e0e0e0',
                                backgroundColor: '#fff'
                            }}
                        >
                            {/* Image */}
                            {price.image && (
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={price.image}
                                    alt={price.name}
                                    sx={{ 
                                        objectFit: 'cover'
                                    }}
                                />
                            )}

                            <CardContent sx={{ 
                                flexGrow: 1, 
                                p: 2
                            }}>
                                {/* Product Title */}
                                <Typography 
                                    variant="h6" 
                                    component="h3"
                                    sx={{ 
                                        fontWeight: 600,
                                        color: 'rgb(68, 143, 155)',
                                        mb: 1
                                    }}
                                >
                                    {price.name}
                                </Typography>
                                
                                {/* Description */}
                                {price.description && (
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary" 
                                        sx={{ mb: 2 }}
                                    >
                                        {price.description}
                                    </Typography>
                                )}
                                
                                {/* Price Section */}
                                <Box sx={{ mt: 'auto' }}>
                                    {price.on_sale && price.sale_price ? (
                                        <Box>
                                            <Typography 
                                                variant="h5" 
                                                component="div"
                                                sx={{ 
                                                    fontWeight: 700,
                                                    color: '#ff4444',
                                                    fontFamily: 'Poppins, sans-serif'
                                                }}
                                            >
                                                {price.sale_price}kr/{price.unit || 'kg'}
                                            </Typography>
                                            <Typography 
                                                variant="body2"
                                                component="div"
                                                sx={{ 
                                                    textDecoration: 'line-through',
                                                    color: '#999',
                                                    fontWeight: 500
                                                }}
                                            >
                                                {price.price}kr/{price.unit || 'kg'}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography 
                                            variant="h5" 
                                            component="div"
                                            sx={{ 
                                                fontWeight: 700,
                                                color: 'rgb(68, 143, 155)',
                                                fontFamily: 'Poppins, sans-serif'
                                            }}
                                        >
                                            {price.price}kr/{price.unit || 'kg'}
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Prices;
