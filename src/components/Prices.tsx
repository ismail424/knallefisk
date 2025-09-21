'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, CircularProgress, Alert, Button } from '@mui/material';
import { LocalOfferOutlined } from '@mui/icons-material';
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
    const [error, setError] = useState("");

    useEffect(() => {
        // Extended static prices for demo
        const staticPrices: Price[] = [
            {
                id: 1,
                title: 'Färsk Lax',
                price: 189,
                sale_price: null,
                on_sale: false,
                image: 'lax.jpg',
                is_visible: true,
                description: 'Färsk atlantlax av högsta kvalitet'
            },
            {
                id: 2,
                title: 'Räkor',
                price: 245,
                sale_price: 199,
                on_sale: true,
                image: 'rakor.jpg',
                is_visible: true,
                description: 'Färska västkuströkor, skalade'
            },
            {
                id: 3,
                title: 'Torsk',
                price: 159,
                sale_price: null,
                on_sale: false,
                image: 'torsk.jpg',
                is_visible: true,
                description: 'Färsk torsk, filéer utan ben'
            },
            {
                id: 4,
                title: 'Gravlax',
                price: 289,
                sale_price: null,
                on_sale: false,
                image: 'gravlax.jpg',
                is_visible: true,
                description: 'Hemgjord gravlax med dill'
            },
            {
                id: 5,
                title: 'Hummer',
                price: 489,
                sale_price: 399,
                on_sale: true,
                image: 'hummer.jpg',
                is_visible: true,
                description: 'Levande västkusthummer'
            },
            {
                id: 6,
                title: 'Ostron',
                price: 25,
                sale_price: null,
                on_sale: false,
                image: 'ostron.jpg',
                is_visible: true,
                description: 'Färska ostron per styck'
            },
            {
                id: 7,
                title: 'Musslor',
                price: 89,
                sale_price: null,
                on_sale: false,
                image: 'musslor.jpg',
                is_visible: true,
                description: 'Färska blåmusslor, 1 kg'
            },
            {
                id: 8,
                title: 'Sill',
                price: 75,
                sale_price: 59,
                on_sale: true,
                image: 'sill.jpg',
                is_visible: true,
                description: 'Inlagd sill, olika sorter'
            },
            {
                id: 9,
                title: 'Kräftor',
                price: 299,
                sale_price: null,
                on_sale: false,
                image: 'kraftor.jpg',
                is_visible: true,
                description: 'Färska havskräftor'
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
                    gap: 2
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
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ py: 4, pt: { xs: '240px', md: '200px' }, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#448f9b',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            mb: 2
                        }}
                    >
                        Våra priser
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#666',
                            maxWidth: 500,
                            mx: 'auto'
                        }}
                    >
                        Priserna uppdateras dagligen från Göteborgs Fiskauktion.
                    </Typography>
                </Box>

                {/* Price Grid */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    {prices.map((price) => (
                        <Grid item xs={12} sm={6} md={4} key={price.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 1,
                                    border: '1px solid #e0e0e0',
                                    position: 'relative',
                                    backgroundColor: 'white'
                                }}
                            >
                                {price.on_sale && (
                                    <Chip
                                        label="REA"
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            backgroundColor: '#e74c3c',
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '0.7rem'
                                        }}
                                    />
                                )}

                                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: 1,
                                            fontFamily: 'Poppins, sans-serif',
                                            fontWeight: 600,
                                            color: '#333',
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        {price.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#666',
                                            mb: 2,
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        {price.description}
                                    </Typography>

                                    {price.on_sale ? (
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    textDecoration: 'line-through',
                                                    color: '#999',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                {price.price} kr/kg
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: '#e74c3c',
                                                    fontWeight: 700,
                                                    fontFamily: 'Poppins, sans-serif'
                                                }}
                                            >
                                                {price.sale_price} kr/kg
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: '#448f9b',
                                                fontWeight: 700,
                                                fontFamily: 'Poppins, sans-serif'
                                            }}
                                        >
                                            {price.price} kr/kg
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Call to Action */}
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 4,
                        backgroundColor: '#448f9b',
                        borderRadius: 2,
                        color: 'white'
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 2,
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600
                        }}
                    >
                        Specialbeställningar
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            fontFamily: 'Poppins, sans-serif',
                            maxWidth: 500,
                            mx: 'auto'
                        }}
                    >
                        Hittar du inte det du söker? Vi tar gärna emot specialbeställningar.
                    </Typography>
                    <Button
                        component={Link}
                        href="/kontakta_oss"
                        variant="contained"
                        sx={{
                            backgroundColor: 'white',
                            color: '#448f9b',
                            px: 3,
                            py: 1,
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: '#f8f9fa'
                            }
                        }}
                    >
                        Kontakta oss
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Prices;