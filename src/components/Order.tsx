'use client';

import { useState, useEffect } from 'react';
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
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import {
    Schedule,
    LocationOnOutlined,
    ArrowForward,
    PhoneOutlined,
    Add,
} from '@mui/icons-material';
import { STORES, storeStatus } from '../lib/site';
import { BRAND } from '@/theme';
import PageHero from './PageHero';
import Faq from './Faq';
import SectionHeading from './SectionHeading';

const STEPS = [
    { title: 'Skicka din beställning', text: 'Skriv vad du vill ha och välj butik och dag.' },
    { title: 'Vi packar den färsk', text: 'Vi plockar ihop allt ur dagens leverans.' },
    { title: 'Hämta och betala i butik', text: 'Beställningen står klar – betala på plats.' },
];

const POPULAR = [
    '1 kg laxfilé',
    '500 g handskalade räkor',
    '1 kg räkor med skal',
    'Kokt krabba',
    'Torskrygg',
    'Färsk hälleflundra',
];

const ORDER_FAQ = [
    {
        q: 'Hur fungerar det att beställa fisk online hos Knallefisk?',
        a: 'Du fyller i vad du vill ha, väljer butik och hämtningsdag och skickar beställningen. Vi packar den färsk ur dagens leverans och du hämtar och betalar i butiken i Borås eller Skene.',
    },
    {
        q: 'Behöver jag betala i förväg?',
        a: 'Nej. Det finns ingen betalning online – du betalar först när du hämtar din beställning i butiken.',
    },
    {
        q: 'Hur långt i förväg ska jag beställa?',
        a: 'Helst senast dagen innan. Inför helger och högtider som midsommar, kräftskiva och jul är det smart att beställa några dagar tidigare.',
    },
    {
        q: 'Kan jag beställa skaldjursplatå eller större mängder?',
        a: 'Absolut. Skriv vad du önskar och hur många ni blir, eller ring butiken så hjälper vi dig att sätta ihop beställningen.',
    },
    {
        q: 'Vad händer om något är slut?',
        a: 'Fisken kommer direkt från Göteborgs fiskauktion och tillgången varierar. Om något saknas i dagens leverans hör vi av oss och föreslår ett likvärdigt alternativ.',
    },
];


/** Animated checkmark that draws itself in a pulsing circle. */
function AnimatedCheck() {
    return (
        <Box
            sx={{
                width: 88,
                height: 88,
                mx: 'auto',
                mb: 2.5,
                borderRadius: '50%',
                backgroundColor: BRAND.tealTint,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pop-in 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.3) both',
            }}
        >
            <svg viewBox="0 0 52 52" width="56" height="56" aria-hidden>
                <circle cx="26" cy="26" r="24" fill={BRAND.teal} />
                <path
                    d="M15 27l7 7 15-16"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="40"
                    strokeDashoffset="40"
                    style={{ animation: 'draw-check 0.5s 0.45s ease-out forwards' }}
                />
            </svg>
        </Box>
    );
}

const EMPTY_FORM = {
    name: '',
    phone: '',
    email: '',
    date: '',
    message: '',
    location: '',
};

const Order = () => {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    // Set after mount: computing it during prerender would bake the build
    // date into the static HTML and allow past pickup dates.
    const [today, setToday] = useState<string>();

    const [statuses, setStatuses] = useState<Record<string, { open: boolean; label: string }>>({});

    useEffect(() => {
        setToday(new Date().toISOString().split('T')[0]);
        setStatuses(Object.fromEntries(STORES.map((s) => [s.id, storeStatus(s)])));
    }, []);

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

    const addItem = (item: string) => {
        setFormData((current) => ({
            ...current,
            message: current.message.trim() ? `${current.message.trimEnd()}\n${item}` : item,
        }));
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
                    <Card sx={{ p: { xs: 3.5, md: 5 }, textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
                        <AnimatedCheck />
                        <Typography variant="h3" component="h1" sx={{ mb: 1.5 }}>
                            Tack för din beställning!
                        </Typography>
                        <Typography sx={{ color: BRAND.muted, mb: 3.5 }}>
                            En bekräftelse har skickats till {formData.email}.
                        </Typography>

                        <Box
                            sx={{
                                backgroundColor: BRAND.tealDark,
                                color: '#fff',
                                borderRadius: 3,
                                p: 3,
                                mb: 3.5,
                                textAlign: 'left',
                            }}
                        >
                            <Typography
                                variant="overline"
                                sx={{ color: 'rgba(255, 255, 255, 0.92)', display: 'block', mb: 1 }}
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
                            Du betalar i butiken när du hämtar.
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
                subtitle="Skriv vad du vill ha, så packar vi det färskt till din hämtningsdag. Du betalar i butiken."
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
                    <Card id="bestallning" sx={{ p: { xs: 3, md: 4 }, scrollMarginTop: 96 }}>
                        <Typography variant="h3" component="h2" sx={{ fontSize: { xs: '1.4rem', md: '1.6rem' }, mb: 0.5 }}>
                            Din beställning
                        </Typography>
                        <Typography sx={{ color: BRAND.muted, fontSize: '0.92rem', mb: 3 }}>
                            Fyll i formuläret så bekräftar vi via e-post.
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
                                        label="Namn"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoComplete="name"
                                        placeholder="Förnamn Efternamn"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Telefon"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        autoComplete="tel"
                                        placeholder="070 123 45 67"
                                    />
                                </Box>

                                <TextField
                                    fullWidth
                                    label="E-post"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    placeholder="namn@exempel.se"
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
                                        label="Hämtningsdag"
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ min: today }}
                                    />

                                    <FormControl fullWidth required>
                                        <InputLabel id="order-location-label">Butik</InputLabel>
                                        <Select
                                            labelId="order-location-label"
                                            name="location"
                                            value={formData.location}
                                            onChange={(e) =>
                                                setFormData({ ...formData, location: e.target.value })
                                            }
                                            label="Butik"
                                        >
                                            {STORES.map((store) => (
                                                <MenuItem key={store.id} value={store.name}>
                                                    {store.name} – {store.streetAddress}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <Typography sx={{ fontSize: '0.85rem', color: BRAND.muted, mb: 1 }}>
                                        Populärt – klicka för att lägga till:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {POPULAR.map((item) => (
                                            <Chip
                                                key={item}
                                                label={item}
                                                icon={<Add />}
                                                variant="outlined"
                                                clickable
                                                onClick={() => addItem(item)}
                                                sx={{
                                                    borderColor: BRAND.border,
                                                    color: BRAND.ink,
                                                    fontWeight: 500,
                                                    transition: 'all 0.2s ease',
                                                    '& .MuiChip-icon': { color: BRAND.teal },
                                                    '&:hover': { borderColor: BRAND.teal, backgroundColor: BRAND.tealTint },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>

                                <TextField
                                    fullWidth
                                    label="Din beställning"
                                    name="message"
                                    multiline
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="T.ex. 1 kg laxfilé, 500 g handskalade räkor, 2 krabbor…"
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading}
                                sx={{ mt: 4, py: 1.5, fontSize: '1.05rem' }}
                            >
                                {loading ? 'Skickar…' : 'Skicka beställning'}
                            </Button>

                            <Typography
                                sx={{ color: BRAND.muted, fontSize: '0.85rem', textAlign: 'center', mt: 2 }}
                            >
                                Ingen betalning online – du betalar när du hämtar.
                            </Typography>
                        </Box>
                    </Card>

                    {/* Sidebar */}
                    <Box sx={{ display: 'grid', gap: 3, position: { md: 'sticky' }, top: { md: 100 } }}>
                        <Card
                            sx={{
                                background: `linear-gradient(160deg, ${BRAND.tealDark} 0%, ${BRAND.tealDarker} 100%)`,
                                color: '#fff',
                                border: 'none',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <CardContent sx={{ p: 3, position: 'relative' }}>
                                <Typography variant="h5" component="h2" sx={{ mb: 2, color: '#fff' }}>
                                    Hämta hos oss
                                </Typography>
                                {STORES.map((store, index) => {
                                    const status = statuses[store.id];
                                    return (
                                        <Box
                                            key={store.id}
                                            sx={{
                                                pb: index < STORES.length - 1 ? 2.25 : 0,
                                                mb: index < STORES.length - 1 ? 2.25 : 0,
                                                borderBottom:
                                                    index < STORES.length - 1 ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                                <Typography sx={{ fontWeight: 700, color: '#fff' }}>
                                                    Knallefisk {store.name}
                                                </Typography>
                                                {status && (
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            fontSize: '0.72rem',
                                                            fontWeight: 600,
                                                            px: 1,
                                                            py: 0.25,
                                                            borderRadius: 999,
                                                            backgroundColor: status.open ? 'rgba(165, 214, 167, 0.2)' : 'rgba(255, 255, 255, 0.12)',
                                                            color: status.open ? '#c8e6c9' : 'rgba(255, 255, 255, 0.85)',
                                                        }}
                                                    >
                                                        {status.open ? 'Öppet nu' : status.label}
                                                    </Box>
                                                )}
                                            </Box>
                                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                                                {store.streetAddress}, {store.city}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                                                {store.hoursSummary}
                                            </Typography>
                                            <Box
                                                component="a"
                                                href={`tel:${store.phoneE164}`}
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 0.75,
                                                    mt: 0.75,
                                                    color: '#fff',
                                                    fontWeight: 600,
                                                    fontSize: '0.9rem',
                                                    textDecoration: 'none',
                                                    '&:hover': { textDecoration: 'underline' },
                                                }}
                                            >
                                                <PhoneOutlined sx={{ fontSize: '1rem' }} />
                                                {store.phone}
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                                    Så fungerar det
                                </Typography>
                                <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 2 }}>
                                    {STEPS.map((step, index) => (
                                        <Box component="li" key={step.title} sx={{ display: 'flex', gap: 1.75 }}>
                                            <Box
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    flexShrink: 0,
                                                    borderRadius: '50%',
                                                    backgroundColor: BRAND.tealTint,
                                                    color: BRAND.tealDark,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 700,
                                                    fontSize: '0.9rem',
                                                }}
                                            >
                                                {index + 1}
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontWeight: 600, color: BRAND.ink }}>{step.title}</Typography>
                                                <Typography sx={{ color: BRAND.muted, fontSize: '0.9rem' }}>{step.text}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>

            {/* ============ FAQ ============ */}
            <Box sx={{ backgroundColor: '#fff', py: { xs: 7, md: 10 } }}>
                <Container maxWidth="md">
                    <SectionHeading
                        overline="Frågor & svar"
                        title="Vanliga frågor om att beställa"
                        subtitle="Hittar du inte svaret? Ring närmaste butik så hjälper vi dig."
                    />
                    <Faq items={ORDER_FAQ} />
                </Container>
            </Box>
        </Box>
    );
};

export default Order;
