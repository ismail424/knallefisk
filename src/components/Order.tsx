'use client';

import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Card,
    CardContent,
    Alert,
    Divider,
    Chip
} from '@mui/material';
import { ShoppingCart, Schedule, Phone, PersonOutline, MessageOutlined, CheckCircle } from '@mui/icons-material';

const Order = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the order to your backend
        console.log('Order submitted:', formData);
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: '', phone: '', date: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    const popularItems = [
        { name: 'Färsk Lax', description: '500g filéer', price: '189 kr' },
        { name: 'Räkor', description: 'Skalade västkuströkor', price: '199 kr' },
        { name: 'Gravlax', description: 'Hemgjord med dill', price: '289 kr' },
        { name: 'Hummer', description: 'Levande västkusthummer', price: '399 kr' }
    ];

    if (submitted) {
        return (
            <Box sx={{ py: 8, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
                <Container maxWidth="md">
                    <Paper
                        sx={{
                            p: 6,
                            borderRadius: 4,
                            textAlign: 'center',
                            boxShadow: '0 8px 32px rgba(68, 143, 155, 0.15)'
                        }}
                    >
                        <CheckCircle sx={{ fontSize: '4rem', color: '#4caf50', mb: 2 }} />
                        <Typography
                            variant="h3"
                            sx={{
                                color: '#448f9b',
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700,
                                mb: 2
                            }}
                        >
                            Tack för din beställning!
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#666',
                                fontFamily: 'Poppins, sans-serif',
                                mb: 3
                            }}
                        >
                            Vi har tagit emot din beställning och kommer att kontakta dig på {formData.phone} för att bekräfta din order.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        >
                            Förväntad hämtning: {formData.date}
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 6, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            color: '#448f9b',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: '2.5rem', md: '3.5rem' }
                        }}
                    >
                        Beställ online
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#666',
                            maxWidth: 600,
                            mx: 'auto',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: { xs: '1rem', md: '1.25rem' }
                        }}
                    >
                        Beställ dina favoriter och hämta i butik. Vi förbereder din order så att den är klar när du kommer.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Order Form */}
                    <Grid item xs={12} lg={8}>
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                boxShadow: '0 8px 32px rgba(68, 143, 155, 0.15)',
                                mb: 4
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#448f9b',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 600,
                                    mb: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                }}
                            >
                                <ShoppingCart />
                                Din beställning
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Namn och efternamn"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            InputProps={{
                                                startAdornment: <PersonOutline sx={{ color: '#448f9b', mr: 1 }} />
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Telefonnummer"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            InputProps={{
                                                startAdornment: <Phone sx={{ color: '#448f9b', mr: 1 }} />
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Hämtningsdatum"
                                            name="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{
                                                startAdornment: <Schedule sx={{ color: '#448f9b', mr: 1 }} />
                                            }}
                                            helperText="Välj när du vill hämta din beställning"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Beställning och beskrivning"
                                            name="message"
                                            multiline
                                            rows={6}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="Beskriv din beställning här... t.ex. 1kg färsk lax, 500g räkor, 2 hummer..."
                                            InputProps={{
                                                startAdornment: <MessageOutlined sx={{ color: '#448f9b', mr: 1, alignSelf: 'flex-start', mt: 1 }} />
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 4 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        startIcon={<ShoppingCart />}
                                        sx={{
                                            backgroundColor: '#448f9b',
                                            py: 2,
                                            fontSize: '1.2rem',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            borderRadius: 3,
                                            '&:hover': {
                                                backgroundColor: '#3c7d88',
                                                transform: 'translateY(-2px)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Skicka beställning
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>

                        {/* Order Instructions */}
                        <Alert
                            severity="info"
                            sx={{
                                borderRadius: 3,
                                '& .MuiAlert-icon': {
                                    color: '#448f9b'
                                }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                <strong>Så fungerar det:</strong> Vi tar emot din beställning och kontaktar dig inom 2 timmar för att bekräfta pris och tillgänglighet. Du betalar när du hämtar i butik.
                            </Typography>
                        </Alert>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} lg={4}>
                        {/* Popular Items */}
                        <Card
                            sx={{
                                borderRadius: 4,
                                boxShadow: '0 4px 20px rgba(68, 143, 155, 0.1)',
                                mb: 3
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#448f9b',
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 600,
                                        mb: 2
                                    }}
                                >
                                    Populära produkter
                                </Typography>
                                {popularItems.map((item, index) => (
                                    <Box key={index}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                            <Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontFamily: 'Poppins, sans-serif',
                                                        fontWeight: 600,
                                                        color: '#333'
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#666',
                                                        fontFamily: 'Poppins, sans-serif'
                                                    }}
                                                >
                                                    {item.description}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={item.price}
                                                sx={{
                                                    backgroundColor: '#448f9b',
                                                    color: 'white',
                                                    fontWeight: 600
                                                }}
                                            />
                                        </Box>
                                        {index < popularItems.length - 1 && <Divider sx={{ my: 2 }} />}
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Contact Info */}
                        <Card
                            sx={{
                                borderRadius: 4,
                                boxShadow: '0 4px 20px rgba(68, 143, 155, 0.1)',
                                background: 'linear-gradient(135deg, #448f9b 0%, #5ba3b0 100%)',
                                color: 'white'
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontWeight: 600,
                                        mb: 2
                                    }}
                                >
                                    Behöver du hjälp?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        opacity: 0.9,
                                        mb: 2,
                                        fontFamily: 'Poppins, sans-serif'
                                    }}
                                >
                                    Ring oss så hjälper vi dig med din beställning:
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 1
                                    }}
                                >
                                    📞 073 535 09 17
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600
                                    }}
                                >
                                    📞 070 836 59 71
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Order;