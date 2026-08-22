'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import {
    ShoppingBasketOutlined,
    Schedule,
    Phone,
    PersonOutline,
    MessageOutlined,
    CheckCircle,
    Email,
    LocationOnOutlined,
    AccessTime,
    ArrowForward,
} from '@mui/icons-material';
import { STORES } from '../lib/site';
import { BRAND } from '@/theme';
import PageHero from './PageHero';

const STEPS = [
    {
        title: 'Skicka din beställning',
        text: 'Beskriv vad du vill ha och när du vill hämta det.',
    },
    {
        title: 'Vi packar den färsk',
        text: 'Vi plockar ihop din beställning ur dagens leverans.',
    },
    {
        title: 'Hämta och betala i butik',
        text: 'Din beställning står klar på hämtningsdagen – betala på plats.',
    },
];

const EMPTY_FORM = {
    name: '',
    phone: '',
    email: '',
    date: '',
    message: '',
    location: '',
};

const fieldSx = {
    '& .MuiOutlinedInput-root': { borderRadius: 3 },
};

const Order = () => {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const { error } = await response.json().catch(() => ({ error: '' }));
                throw new Error(error || 'Request failed');
            }

            setSubmitted(true);
        } catch (error) {
            console.error('Error sending order:', error);
            setSubmitError(
                error instanceof Error && error.message.startsWith('För många')
                    ? error.message
                    : 'Något gick fel när beställningen skickades. Försök igen eller ring oss direkt.'
            );
        } finally {
            setLoading(false);
        }
    };

    const startNewOrder = () => {
        setFormData(EMPTY_FORM);
        setSubmitted(false);
        setSubmitError('');
    };

    if (submitted) {
        return (
            <Box sx={{ backgroundColor: BRAND.sand, flexGrow: 1 }}>
                <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
                    <Card sx={{ p: { xs: 3.5, md: 5 }, textAlign: 'center' }}>
                        <CheckCircle sx={{ fontSize: '3.5rem', color: '#2e7d32', mb: 2 }} />
                        <Typography variant="h3" component="h1" sx={{ mb: 1.5 }}>
                            Tack för din beställning!
                        </Typography>
                        <Typography sx={{ color: BRAND.muted, mb: 3.5 }}>
                            En bekräftelse har skickats till {formData.email}. Vi hör av oss om
                            något behöver stämmas av.
                        </Typography>

                        <Box
                            sx={{
                                backgroundColor: BRAND.teal,
                                color: '#fff',
                                borderRadius: 3,
                                p: 3,
                                mb: 3.5,
                                textAlign: 'left',
                            }}
                        >
                            <Typography
                                variant="overline"
                                sx={{ color: BRAND.tealPale, display: 'block', mb: 1 }}
                            >
                                Hämtas
                            </Typography>
                            <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Schedule sx={{ fontSize: '1.2rem' }} /> {formData.date}
                            </Typography>
                            <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: 1, mt: 0.75 }}>
                                <LocationOnOutlined sx={{ fontSize: '1.2rem' }} /> Knallefisk {formData.location}
                            </Typography>
                        </Box>

                        <Typography sx={{ color: BRAND.muted, fontSize: '0.92rem', mb: 3.5 }}>
                            Betalning sker i butiken vid upphämtning.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button variant="outlined" onClick={startNewOrder}>
                                Gör en ny beställning
                            </Button>
                            <Button component={Link} href="/" variant="text" endIcon={<ArrowForward />}>
                                Till startsidan
                            </Button>
                        </Box>
                    </Card>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: BRAND.sand }}>
            <PageHero
                overline="Beställ & hämta"
                title="Beställ online"
                subtitle="Skicka din beställning så packar vi den färsk och klar. Du hämtar och betalar i butiken – enkelt och smidigt."
            />

            <Container maxWidth="lg" sx={{ pb: { xs: 7, md: 10 } }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
                        gap: { xs: 4, md: 5 },
                        alignItems: 'start',
                    }}
                >
                    {/* Order form */}
                    <Card sx={{ p: { xs: 3, md: 4 } }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}
                        >
                            <ShoppingBasketOutlined sx={{ color: BRAND.teal }} />
                            Din beställning
                        </Typography>

                        {submitError && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {submitError}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Box sx={{ display: 'grid', gap: 3 }}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                                        gap: 3,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="För- och efternamn"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoComplete="name"
                                        placeholder="Förnamn Efternamn"
                                        InputProps={{
                                            startAdornment: <PersonOutline sx={{ color: BRAND.teal, mr: 1 }} />,
                                        }}
                                        sx={fieldSx}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Telefonnummer"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        autoComplete="tel"
                                        placeholder="070 123 45 67"
                                        InputProps={{
                                            startAdornment: <Phone sx={{ color: BRAND.teal, mr: 1 }} />,
                                        }}
                                        sx={fieldSx}
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
                                    autoComplete="email"
                                    placeholder="din@email.se"
                                    helperText="Hit skickar vi din orderbekräftelse"
                                    InputProps={{
                                        startAdornment: <Email sx={{ color: BRAND.teal, mr: 1 }} />,
                                    }}
                                    sx={fieldSx}
                                />

                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                                        gap: 3,
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Hämtningsdatum"
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ min: today }}
                                        InputProps={{
                                            startAdornment: <Schedule sx={{ color: BRAND.teal, mr: 1 }} />,
                                        }}
                                        helperText="När vill du hämta din beställning?"
                                        sx={fieldSx}
                                    />

                                    <FormControl fullWidth required sx={fieldSx}>
                                        <InputLabel id="order-location-label">Hämtningsplats</InputLabel>
                                        <Select
                                            labelId="order-location-label"
                                            name="location"
                                            value={formData.location}
                                            onChange={(e) =>
                                                setFormData({ ...formData, location: e.target.value })
                                            }
                                            label="Hämtningsplats"
                                            startAdornment={
                                                <LocationOnOutlined sx={{ color: BRAND.teal, mr: 1 }} />
                                            }
                                        >
                                            {STORES.map((store) => (
                                                <MenuItem key={store.id} value={store.name}>
                                                    {store.name} – {store.streetAddress}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                <TextField
                                    fullWidth
                                    label="Vad vill du beställa?"
                                    name="message"
                                    multiline
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="T.ex. 1 kg färsk laxfilé, 500 g handskalade räkor, 2 krabbor…"
                                    InputProps={{
                                        startAdornment: (
                                            <MessageOutlined
                                                sx={{ color: BRAND.teal, mr: 1, alignSelf: 'flex-start', mt: 1 }}
                                            />
                                        ),
                                    }}
                                    sx={fieldSx}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading}
                                startIcon={<ShoppingBasketOutlined />}
                                sx={{ mt: 4, py: 1.5, fontSize: '1.05rem' }}
                            >
                                {loading ? 'Skickar…' : 'Skicka beställning'}
                            </Button>

                            <Typography
                                sx={{ color: BRAND.muted, fontSize: '0.85rem', textAlign: 'center', mt: 2 }}
                            >
                                Ingen betalning online – du betalar när du hämtar i butiken.
                            </Typography>
                        </Box>
                    </Card>

                    {/* Sidebar */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h5" component="h2" sx={{ mb: 2.5 }}>
                                    Så fungerar det
                                </Typography>
                                {STEPS.map((step, index) => (
                                    <Box key={step.title} sx={{ display: 'flex', gap: 2, mb: index < STEPS.length - 1 ? 2.5 : 0 }}>
                                        <Box
                                            sx={{
                                                width: 34,
                                                height: 34,
                                                borderRadius: '50%',
                                                backgroundColor: BRAND.tealTint,
                                                color: BRAND.tealDark,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                                                fontWeight: 700,
                                                flexShrink: 0,
                                            }}
                                        >
                                            {index + 1}
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontWeight: 600, color: BRAND.ink, mb: 0.25 }}>
                                                {step.title}
                                            </Typography>
                                            <Typography sx={{ color: BRAND.muted, fontSize: '0.9rem' }}>
                                                {step.text}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h5" component="h2" sx={{ mb: 2.5 }}>
                                    Hämta hos oss
                                </Typography>
                                {STORES.map((store, index) => (
                                    <Box key={store.id} sx={{ mb: index < STORES.length - 1 ? 2.5 : 0 }}>
                                        <Typography sx={{ fontWeight: 600, color: BRAND.ink, mb: 0.5 }}>
                                            Knallefisk {store.name}
                                        </Typography>
                                        <Typography
                                            sx={{ color: BRAND.muted, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 1 }}
                                        >
                                            <LocationOnOutlined sx={{ fontSize: '1rem', color: BRAND.teal }} />
                                            {store.streetAddress}, {store.city}
                                        </Typography>
                                        <Typography
                                            sx={{ color: BRAND.muted, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}
                                        >
                                            <AccessTime sx={{ fontSize: '1rem', color: BRAND.teal }} />
                                            {store.hoursSummary}
                                        </Typography>
                                        <Typography
                                            component="a"
                                            href={`tel:${store.phone.replace(/\s/g, '')}`}
                                            sx={{
                                                color: BRAND.tealDark,
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                mt: 0.5,
                                                textDecoration: 'none',
                                                '&:hover': { textDecoration: 'underline' },
                                            }}
                                        >
                                            <Phone sx={{ fontSize: '1rem', color: BRAND.teal }} />
                                            {store.phone}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>

                        <Alert severity="info" icon={false} sx={{ backgroundColor: BRAND.tealTint, color: BRAND.ink }}>
                            <strong>Tips!</strong> Beställ gärna dagen innan om du vill vara säker på
                            att få precis det du önskar ur dagens leverans.
                        </Alert>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Order;
