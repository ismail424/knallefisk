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
    EditNoteOutlined,
    Inventory2Outlined,
    StorefrontOutlined,
    CreditCardOffOutlined,
    AcUnitOutlined,
    PhoneOutlined,
    Add,
} from '@mui/icons-material';
import { STORES, storeStatus } from '../lib/site';
import { BRAND } from '@/theme';
import { Bubbles, FishAccent, HeadingRule } from './decor';
import LoopVideo from './LoopVideo';
import SeaScene from './SeaScene';
import Reveal from './Reveal';
import Faq from './Faq';
import SectionHeading from './SectionHeading';

const STEPS = [
    { icon: EditNoteOutlined, title: 'Skicka din beställning', text: 'Skriv vad du vill ha och välj butik och dag.' },
    { icon: Inventory2Outlined, title: 'Vi packar den färsk', text: 'Vi plockar ihop allt ur dagens leverans.' },
    { icon: StorefrontOutlined, title: 'Hämta och betala i butik', text: 'Beställningen står klar – betala på plats.' },
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

const PERKS = [
    { icon: CreditCardOffOutlined, label: 'Ingen betalning online' },
    { icon: AcUnitOutlined, label: 'Packas kallt & färskt' },
    { icon: LocationOnOutlined, label: 'Hämta i Borås eller Skene' },
];

/** A small label that floats over the hero illustration. */
function FloatingChip({ children, sx }: { children: React.ReactNode; sx?: object }) {
    return (
        <Box
            aria-hidden
            sx={{
                position: 'absolute',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1.75,
                py: 1,
                borderRadius: 999,
                backgroundColor: '#fff',
                color: BRAND.ink,
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontWeight: 600,
                fontSize: { xs: '0.78rem', md: '0.88rem' },
                boxShadow: '0 10px 30px rgba(23, 49, 58, 0.16)',
                animation: 'bob 4s ease-in-out infinite',
                whiteSpace: 'nowrap',
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}

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

                        <Box sx={{ borderRadius: 4, overflow: 'hidden', mb: 3.5, mx: { xs: -1, md: 0 } }}>
                            <SeaScene />
                        </Box>

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
            {/* ============ Hero with animated illustration ============ */}
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(180deg, ${BRAND.tealTint} 0%, ${BRAND.sand} 100%)`,
                }}
            >
                <Bubbles style={{ top: -40, left: '-3%' }} size={220} color="rgba(68, 143, 155, 0.12)" />
                <FishAccent style={{ bottom: 30, right: '2%' }} size={80} color="rgba(68, 143, 155, 0.12)" flip />
                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '5fr 6fr' },
                        gap: { xs: 4, md: 6 },
                        alignItems: 'center',
                        pt: { xs: 5, md: 8 },
                        pb: { xs: 5, md: 8 },
                    }}
                >
                    <Box sx={{ animation: 'fade-up 0.7s ease both', textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="overline" sx={{ color: BRAND.tealDark, display: 'block', mb: 1 }}>
                            Beställ & hämta
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{ fontSize: { xs: '2.1rem', md: '3rem' }, mb: 2, lineHeight: 1.1 }}
                        >
                            Beställ online,{' '}
                            <Box component="span" sx={{ color: BRAND.teal }}>
                                hämta färskt
                            </Box>
                        </Typography>
                        <Typography
                            sx={{
                                color: BRAND.muted,
                                fontSize: { xs: '1rem', md: '1.12rem' },
                                lineHeight: 1.7,
                                maxWidth: 480,
                                mx: { xs: 'auto', md: 0 },
                            }}
                        >
                            Skriv vad du vill ha, så packar vi det färskt ur dagens leverans till din
                            hämtningsdag. Du betalar i butiken.
                        </Typography>
                        <Box sx={{ '& svg': { mx: { xs: 'auto !important', md: '0 !important' } } }}>
                            <HeadingRule centered={false} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                mt: 3,
                                justifyContent: { xs: 'center', md: 'flex-start' },
                            }}
                        >
                            {PERKS.map((perk) => (
                                <Box
                                    key={perk.label}
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 0.75,
                                        px: 1.5,
                                        py: 0.75,
                                        borderRadius: 999,
                                        backgroundColor: '#fff',
                                        border: `1px solid ${BRAND.border}`,
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        color: BRAND.ink,
                                    }}
                                >
                                    <perk.icon sx={{ fontSize: '1rem', color: BRAND.teal }} />
                                    {perk.label}
                                </Box>
                            ))}
                        </Box>
                        <Button
                            href="#bestallning"
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForward sx={{ transform: 'rotate(90deg)' }} />}
                            sx={{ mt: 3.5, display: { xs: 'none', md: 'inline-flex' } }}
                        >
                            Till beställningen
                        </Button>
                    </Box>

                    <Box sx={{ position: 'relative', animation: 'fade-up 0.9s 0.15s ease both' }}>
                        <Box
                            sx={{
                                position: 'relative',
                                aspectRatio: '16 / 9',
                                borderRadius: { xs: 4, md: 6 },
                                overflow: 'hidden',
                                backgroundColor: BRAND.tealTint,
                                boxShadow: '0 24px 60px rgba(23, 49, 58, 0.18)',
                                border: '6px solid #fff',
                            }}
                        >
                            <LoopVideo
                                src="/video/fiskdisk.mp4"
                                poster="/img/illustrationer/fiskdisk.webp"
                                control="top-right"
                            />
                        </Box>
                        <FloatingChip sx={{ top: { xs: -14, md: 24 }, left: { xs: 8, md: -28 } }}>
                            <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#66bb6a' }} />
                            Dagsfärskt från auktionen
                        </FloatingChip>
                        <FloatingChip
                            sx={{
                                bottom: { xs: -16, md: 28 },
                                right: { xs: 8, md: -20 },
                                animationDelay: '-2s',
                                backgroundColor: BRAND.coral,
                                color: '#fff',
                            }}
                        >
                            Packat & klart till dig
                        </FloatingChip>
                    </Box>
                </Container>
            </Box>

            {/* ============ How it works ============ */}
            <Container maxWidth="lg" sx={{ pb: { xs: 5, md: 7 } }}>
                <Box
                    component="ol"
                    sx={{
                        listStyle: 'none',
                        m: 0,
                        p: 0,
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: { xs: 2, md: 3 },
                        position: 'relative',
                    }}
                >
                    {STEPS.map((step, index) => (
                        <Reveal component="li" key={step.title} delay={index * 0.12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center',
                                    p: 2.5,
                                    height: '100%',
                                    borderRadius: 4,
                                    backgroundColor: '#fff',
                                    border: `1px solid ${BRAND.border}`,
                                    position: 'relative',
                                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 12px 30px rgba(23, 49, 58, 0.08)',
                                    },
                                    '&:hover .step-icon': { transform: 'rotate(-8deg) scale(1.08)' },
                                }}
                            >
                                <Box
                                    className="step-icon"
                                    sx={{
                                        position: 'relative',
                                        width: 56,
                                        height: 56,
                                        flexShrink: 0,
                                        borderRadius: 3,
                                        background: `linear-gradient(135deg, ${BRAND.teal} 0%, ${BRAND.tealDark} 100%)`,
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'transform 0.3s ease',
                                    }}
                                >
                                    <step.icon />
                                    <Box
                                        component="span"
                                        sx={{
                                            position: 'absolute',
                                            top: -8,
                                            right: -8,
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            backgroundColor: BRAND.coral,
                                            color: '#fff',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid #fff',
                                        }}
                                    >
                                        {index + 1}
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography component="h2" sx={{ fontWeight: 700, color: BRAND.ink, fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                                        {step.title}
                                    </Typography>
                                    <Typography sx={{ color: BRAND.muted, fontSize: '0.9rem' }}>{step.text}</Typography>
                                </Box>
                            </Box>
                        </Reveal>
                    ))}
                </Box>
            </Container>

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
                            <Bubbles style={{ top: -50, right: -40 }} size={180} color="rgba(255, 255, 255, 0.08)" />
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
                                <Typography variant="h5" component="h2" sx={{ mb: 1.5 }}>
                                    Bra att veta
                                </Typography>
                                <Box component="ul" sx={{ m: 0, pl: 2.25, color: BRAND.muted, fontSize: '0.92rem', display: 'grid', gap: 1 }}>
                                    <li>Beställ gärna senast dagen innan – till helgen helst redan på onsdag.</li>
                                    <li>Ange ungefärlig vikt eller antal personer, så hjälper vi dig med mängden.</li>
                                    <li>Vi meddelar dig om något är slut i dagens leverans.</li>
                                    <li>Skaldjursplatå eller större beställning? Ring oss gärna direkt.</li>
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
