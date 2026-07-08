'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';
import { AdminPrice } from '../lib/types';

const Prices = () => {
    const [prices, setPrices] = useState<AdminPrice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPrices = async () => {
            try {
                const response = await fetch('/api/admin/prices');
                if (!response.ok) {
                    throw new Error('Failed to fetch prices');
                }
                const adminPrices: AdminPrice[] = await response.json();
                setPrices(adminPrices.filter(price => price.is_visible !== false));
            } catch (err) {
                console.error('Error loading prices from API:', err);
                setError('Kunde inte ladda priserna just nu. Försök igen senare.');
            } finally {
                setLoading(false);
            }
        };

        loadPrices();
    }, []);


    if (loading) {
        return (
            <Box sx={{ 
                pt: { xs: '140px', md: '120px' }, 
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
            <Box sx={{ pt: { xs: '140px', md: '120px' }, pb: 8 }}>
                <Container maxWidth="lg">
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ pt: { xs: '140px', md: '120px' }, pb: 8 }}>
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
                        Våra priser
                    </Typography>
                </Box>

                {/* Empty State */}
                {prices.length === 0 ? (
                    <Box sx={{ 
                        textAlign: 'center', 
                        py: 8,
                        color: '#666'
                    }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Inga priser tillgängliga just nu
                        </Typography>
                        <Typography variant="body2">
                            Kontakta oss för aktuella priser
                        </Typography>
                    </Box>
                ) : (
                    /* Prices Grid */
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)'
                        },
                        gap: 2
                    }}>
                        {prices.map((price) => (
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
                                                variant="h4" 
                                                component="div"
                                                sx={{ 
                                                    fontWeight: 700,
                                                    color: '#d32f2f',
                                                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                                    mb: 0.5,
                                                    letterSpacing: '0.5px'
                                                }}
                                            >
                                                {price.sale_price} kr<Typography component="span" sx={{ fontSize: '0.7em', fontWeight: 500, ml: 0.5 }}>/{price.unit || 'st'}</Typography>
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                component="div"
                                                sx={{ 
                                                    textDecoration: 'line-through',
                                                    color: '#666',
                                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                                    fontFamily: 'system-ui, -apple-system, sans-serif'
                                                }}
                                            >
                                                Ordinarie: {price.price} kr<Typography component="span" sx={{ fontSize: '0.9em', ml: 0.5 }}>/{price.unit || 'st'}</Typography>
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography 
                                            variant="h4" 
                                            component="div"
                                            sx={{ 
                                                fontWeight: 700,
                                                color: '#2e7d32',
                                                fontSize: { xs: '1.8rem', md: '2.2rem' },
                                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                                letterSpacing: '0.5px'
                                            }}
                                        >
                                            {price.price} kr<Typography component="span" sx={{ fontSize: '0.7em', fontWeight: 500, ml: 0.5 }}>/{price.unit || 'st'}</Typography>
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Prices;
