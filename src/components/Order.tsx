'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { ShoppingCart, Schedule, Phone, PersonOutline, MessageOutlined, CheckCircle, Email, LocationOn } from '@mui/icons-material';

const Order = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        message: '',
        location: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Initialize EmailJS
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Prepare template params for EmailJS
            const templateParams = {
                from_name: formData.name,
                from_number: formData.phone,
                reply_to: formData.email,
                message: formData.message,
                from_date: formData.date,
                location: formData.location
            };

            // Send email using EmailJS
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams
            );

            console.log('Order submitted successfully:', formData);
            setSubmitted(true);

            setTimeout(() => {
                setFormData({ 
                    name: '', 
                    phone: '', 
                    email: '', 
                    date: '', 
                    message: '', 
                    location: '' 
                });
                setSubmitted(false);
                setLoading(false);
            }, 3000);
        } catch (error) {
            console.error('Error sending email:', error);
            setLoading(false);
            // You might want to show an error message to the user here
        }
    };

    if (submitted) {
        return (
            <Box sx={{ pt: { xs: '140px', md: '120px' }, pb: 8, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
                <Container maxWidth="md">
                    <Paper
                        sx={{
                            p: 6,
                            borderRadius: 3,
                            textAlign: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }}
                    >
                        <CheckCircle sx={{ fontSize: '4rem', color: '#4caf50', mb: 3 }} />
                        <Typography
                            variant="h4"
                            sx={{
                                color: '#448f9b',
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 600,
                                mb: 3
                            }}
                        >
                            Tack för din beställning!
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#666',
                                fontFamily: 'Poppins, sans-serif',
                                mb: 2
                            }}
                        >
                            Vi kontaktar dig på {formData.phone} eller {formData.email}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666',
                                fontFamily: 'Poppins, sans-serif',
                                mb: 1
                            }}
                        >
                            Hämtning: {formData.date}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        >
                            Plats: {formData.location}
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            pt: { xs: '140px', md: '120px' }, 
            pb: 8, 
            backgroundColor: '#f9fafb', 
            minHeight: '100vh',
            position: 'relative'
        }}>
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Simple Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            color: '#448f9b',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            mb: 3
                        }}
                    >
                        Beställ Online
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#666',
                            fontFamily: 'Poppins, sans-serif',
                            maxWidth: 600,
                            mx: 'auto',
                            lineHeight: 1.6
                        }}
                    >
                        Beställ enkelt online och hämta i butik. Vi kontaktar dig för att bekräfta din beställning.
                    </Typography>
                </Box>

                {/* Clean Order Form */}
                <Paper
                    sx={{
                        p: 6,
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        mb: 4,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {/* Multiple fish animations in random spots within form */}
                    <Box
                        sx={{
                            backgroundImage: 'url("http://www.geertjanhendriks.nl/codepen/form/fish.png")',
                            width: '235px',
                            height: '104px',
                            marginLeft: '-235px',
                            position: 'absolute',
                            top: '10px',
                            animation: 'fishSwim1 24s infinite linear',
                            zIndex: 0,
                            opacity: 0.15,
                            '@keyframes fishSwim1': {
                                '0%': { marginLeft: '-235px' },
                                '100%': { marginLeft: 'calc(100% + 235px)' }
                            }
                        }}
                    />
                    <Box
                        sx={{
                            backgroundImage: 'url("http://www.geertjanhendriks.nl/codepen/form/fish.png")',
                            width: '235px',
                            height: '104px',
                            marginLeft: '-285px',
                            position: 'absolute',
                            top: '300px',
                            animation: 'fishSwim2 20s infinite linear',
                            animationDelay: '12s',
                            zIndex: 0,
                            opacity: 0.1,
                            '@keyframes fishSwim2': {
                                '0%': { marginLeft: '-235px' },
                                '100%': { marginLeft: 'calc(100% + 235px)' }
                            }
                        }}
                    />
                    
                    {/* Form content with higher z-index */}
                    <Box sx={{ position: 'relative', zIndex: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#448f9b',
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 600,
                                mb: 4,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}
                        >
                            <ShoppingCart />
                            Din beställning
                        </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Box sx={{ display: 'grid', gap: 3 }}>
                            <Box sx={{ 
                                display: 'grid', 
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                                gap: 3 
                            }}>
                                <TextField
                                    fullWidth
                                    label="Namn och efternamn"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Förnamn Efternamn"
                                    InputProps={{
                                        startAdornment: <PersonOutline sx={{ color: '#448f9b', mr: 1 }} />
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2
                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Telefonnummer"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="070 123 45 67"
                                    InputProps={{
                                        startAdornment: <Phone sx={{ color: '#448f9b', mr: 1 }} />
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2
                                        }
                                    }}
                                />
                            </Box>
                            
                            <TextField
                                fullWidth
                                label="E-postadress"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="din@email.se"
                                InputProps={{
                                    startAdornment: <Email sx={{ color: '#448f9b', mr: 1 }} />
                                }}
                                helperText="Vi använder din e-post för att skicka bekräftelse"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2
                                    }
                                }}
                            />

                            <Box sx={{ 
                                display: 'grid', 
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                                gap: 3 
                            }}>
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
                                
                                <FormControl 
                                    fullWidth 
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2
                                        }
                                    }}
                                >
                                    <InputLabel>Hämtningsplats</InputLabel>
                                    <Select
                                        name="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                        label="Hämtningsplats"
                                        startAdornment={<LocationOn sx={{ color: '#448f9b', mr: 1 }} />}
                                    >
                                        <MenuItem value="Skene">Skene</MenuItem>
                                        <MenuItem value="Borås">Borås</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            
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
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={loading}
                            startIcon={<ShoppingCart />}
                            sx={{
                                mt: 4,
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
                                '&:disabled': {
                                    backgroundColor: '#cccccc'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {loading ? 'Skickar...' : 'Skicka beställning'}
                        </Button>
                    </Box>
                    </Box>
                </Paper>

                {/* Simple Instructions */}
                <Alert
                    severity="info"
                    sx={{
                        borderRadius: 3,
                        p: 3,
                        '& .MuiAlert-icon': {
                            color: '#448f9b'
                        }
                    }}
                >
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1rem'
                        }}
                    >
                        <strong>Så fungerar det:</strong> Vi tar emot din beställning och du plockar upp den på upphämtningsdatum.
                    </Typography>
                </Alert>
            </Container>
        </Box>
    );
};

export default Order;