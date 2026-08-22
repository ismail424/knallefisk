'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Skeleton,
} from '@mui/material';
import {
    ShoppingBasketOutlined,
    CheckCircleOutline,
    SailingOutlined,
    FavoriteBorder,
    AccessTime,
    LocationOnOutlined,
    PhoneOutlined,
    ArrowForward,
} from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { AdminPrice } from '../lib/types';
import { STORES, FOUNDED_YEAR } from '../lib/site';
import { BRAND, CARD_HOVER } from '@/theme';
import { WaveDivider, Bubbles, ScalesPattern, FishAccent } from './decor';
import PriceCard from './PriceCard';
import SectionHeading from './SectionHeading';
import StoreHeader from './StoreHeader';
import BackgroundVideo from './BackgroundVideo';

const WHITE = '#ffffff';

const USPS = [
    {
        icon: SailingOutlined,
        title: 'Direkt från auktionen',
        text: 'Vi köper in fisk och skaldjur på Göteborgs fiskauktion – dagsfärskt över hela disken.',
    },
    {
        icon: FavoriteBorder,
        title: `Familjeägt sedan ${FOUNDED_YEAR}`,
        text: 'Ett familjeföretag med passion för havet, kvalitet och personlig service i varje möte.',
    },
    {
        icon: ShoppingBasketOutlined,
        title: 'Beställ online – hämta i butik',
        text: 'Lägg din beställning på webben så står den packad och klar när du kommer till butiken.',
    },
];

const GALLERY = [
    { src: '/img/bild1.webp', alt: 'Färska laxsidor i fiskdisken' },
    { src: '/img/bild7.webp', alt: 'Räkmacka med handskalade räkor' },
    { src: '/img/bild8.webp', alt: 'Laxmacka med färsk lax' },
    { src: '/img/bild4.jpg', alt: 'Färsk fisk och laxfiléer i disken' },
    { src: '/img/bild5.webp', alt: 'Fisktallrik med dagens fångst' },
    { src: '/img/bild6.webp', alt: 'Hel färsk fisk på is' },
    { src: '/img/bild2.webp', alt: 'Räktallrik med färska räkor' },
    { src: '/img/bild3.webp', alt: 'Nykokt svensk krabba' },
];

const Home = () => {
    const [featuredPrices, setFeaturedPrices] = useState<AdminPrice[]>([]);
    const [pricesLoading, setPricesLoading] = useState(true);

    useEffect(() => {
        const loadPrices = async () => {
            try {
                const response = await fetch('/api/admin/prices');
                if (response.ok) {
                    const adminPrices: AdminPrice[] = await response.json();
                    setFeaturedPrices(
                        adminPrices.filter((price) => price.is_visible !== false).slice(0, 6)
                    );
                }
            } catch (error) {
                console.error('Error loading prices from API:', error);
            } finally {
                setPricesLoading(false);
            }
        };

        loadPrices();
    }, []);

    const showPricesSection = pricesLoading || featuredPrices.length > 0;

    return (
        <Box>
            {/* ============ Hero ============ */}
            <Box
                sx={{
                    position: 'relative',
                    // Fill the viewport below the header (capped), but let the
                    // section grow with its content on small screens.
                    minHeight: {
                        xs: 'min(calc(100svh - 72px), 860px)',
                        md: 'min(calc(100svh - 78px), 860px)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    backgroundColor: BRAND.inkDeep,
                }}
            >
                <BackgroundVideo src="/video/havet.mp4" poster="/img/havet_poster.jpg" />

                {/* Gradient overlay for contrast */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'linear-gradient(180deg, rgba(13, 40, 48, 0.55) 0%, rgba(13, 40, 48, 0.45) 45%, rgba(13, 40, 48, 0.72) 100%)',
                    }}
                />

                <Container
                    maxWidth="md"
                    sx={{
                        position: 'relative',
                        textAlign: 'center',
                        color: WHITE,
                        pt: { xs: 5, md: 8 },
                        pb: { xs: 10, md: 8 },
                        animation: 'fade-up 0.8s ease both',
                    }}
                >
                    <Box sx={{ mb: { xs: 3, md: 4 } }}>
                        <Image
                            src="/img/logo.svg"
                            alt="Knallefisk – Färska fisken över hela disken"
                            width={300}
                            height={190}
                            priority
                            style={{
                                width: 'min(52vw, 250px)',
                                height: 'auto',
                                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.35))',
                            }}
                        />
                    </Box>

                    <Typography
                        component="h1"
                        sx={{
                            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                            fontWeight: 700,
                            fontSize: { xs: '2rem', sm: '2.6rem', md: '3.4rem' },
                            lineHeight: 1.12,
                            letterSpacing: '-0.015em',
                            mb: 2,
                            textShadow: '0 2px 24px rgba(0, 0, 0, 0.35)',
                        }}
                    >
                        Färska fisken
                        <br />
                        över hela disken
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { xs: '1rem', md: '1.2rem' },
                            fontWeight: 400,
                            lineHeight: 1.6,
                            maxWidth: 620,
                            mx: 'auto',
                            mb: { xs: 3.5, md: 4.5 },
                            color: 'rgba(255, 255, 255, 0.9)',
                        }}
                    >
                        Familjeägd fiskhandel sedan {FOUNDED_YEAR}. Fisk och skaldjur från
                        Göteborgs fiskauktion – till våra butiker i Borås och Skene.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            mb: { xs: 4, md: 5 },
                        }}
                    >
                        <Button
                            component={Link}
                            href="/bestall_online"
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingBasketOutlined />}
                        >
                            Beställ online
                        </Button>
                        <Button
                            component={Link}
                            href="/priser"
                            variant="outlined"
                            size="large"
                            sx={{
                                color: WHITE,
                                borderColor: 'rgba(255, 255, 255, 0.75)',
                                borderWidth: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                '&:hover': {
                                    borderColor: WHITE,
                                    borderWidth: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.16)',
                                },
                            }}
                        >
                            Se dagens priser
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: { xs: 1.5, md: 3.5 },
                            flexWrap: 'wrap',
                        }}
                    >
                        {['Dagsfärskt från auktionen', `Familjeägt sedan ${FOUNDED_YEAR}`, 'Butiker i Borås & Skene'].map(
                            (item) => (
                                <Typography
                                    key={item}
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.88)',
                                        fontSize: { xs: '0.82rem', md: '0.92rem' },
                                        fontWeight: 500,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.75,
                                    }}
                                >
                                    <CheckCircleOutline sx={{ fontSize: '1.05em' }} />
                                    {item}
                                </Typography>
                            )
                        )}
                    </Box>
                </Container>

                {/* Wave into the page */}
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <WaveDivider fill={BRAND.sand} height={{ xs: 42, md: 72 }} />
                </Box>
            </Box>

            {/* ============ USP band ============ */}
            <Box sx={{ backgroundColor: BRAND.sand, py: { xs: 6, md: 9 }, position: 'relative', overflow: 'hidden' }}>
                <FishAccent style={{ top: 24, right: '2%' }} size={90} color="rgba(68, 143, 155, 0.1)" />
                <Container maxWidth="lg">
                    <Typography component="h2" sx={visuallyHidden}>
                        Därför Knallefisk
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                            gap: 3,
                        }}
                    >
                        {USPS.map((usp) => (
                            <Card
                                key={usp.title}
                                sx={{
                                    p: 1,
                                    textAlign: 'center',
                                    ...CARD_HOVER,
                                }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: '50%',
                                            backgroundColor: BRAND.tealTint,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 2,
                                        }}
                                    >
                                        <usp.icon sx={{ fontSize: 30, color: BRAND.teal }} />
                                    </Box>
                                    <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                                        {usp.title}
                                    </Typography>
                                    <Typography sx={{ color: BRAND.muted, fontSize: '0.95rem' }}>
                                        {usp.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ============ Featured prices ============ */}
            {showPricesSection && (
                <>
                    <WaveDivider fill={WHITE} height={{ xs: 36, md: 56 }} />
                    <Box sx={{ backgroundColor: WHITE, pt: { xs: 4, md: 5 }, pb: { xs: 7, md: 10 } }}>
                        <Container maxWidth="lg">
                            <SectionHeading
                                overline="Ur disken"
                                title="Dagens priser"
                                subtitle="Ett urval ur disken just nu – priserna uppdateras löpande av oss i butiken."
                            />

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)',
                                        lg: 'repeat(3, 1fr)',
                                    },
                                    gap: 3,
                                }}
                            >
                                {pricesLoading
                                    ? Array.from({ length: 3 }).map((_, i) => (
                                          <Card key={i} sx={{ p: 2.5 }}>
                                              <Skeleton variant="rounded" height={140} sx={{ mb: 2 }} />
                                              <Skeleton width="70%" height={28} />
                                              <Skeleton width="40%" height={34} />
                                          </Card>
                                      ))
                                    : featuredPrices.map((price) => (
                                          <PriceCard key={price.id} price={price} />
                                      ))}
                            </Box>

                            <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 5 } }}>
                                <Button
                                    component={Link}
                                    href="/priser"
                                    variant="outlined"
                                    size="large"
                                    endIcon={<ArrowForward />}
                                >
                                    Se alla priser
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                </>
            )}

            {/* ============ About ============ */}
            <Box
                sx={{
                    backgroundColor: showPricesSection ? BRAND.sand : WHITE,
                    py: { xs: 7, md: 11 },
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Bubbles style={{ bottom: -40, left: '-2%' }} size={220} color="rgba(68, 143, 155, 0.08)" />
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                            gap: { xs: 5, md: 8 },
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ position: 'relative' }}>
                            <Box
                                aria-hidden
                                sx={{
                                    position: 'absolute',
                                    inset: { xs: '16px -10px -16px 10px', md: '24px -16px -24px 16px' },
                                    borderRadius: 4,
                                    backgroundColor: BRAND.tealPale,
                                    zIndex: 0,
                                }}
                            />
                            <Box
                                component="img"
                                src="/img/store_front.webp"
                                alt="Knallefisks butik med skylten Färska fisken över hela disken"
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 4,
                                    display: 'block',
                                    boxShadow: '0 16px 48px rgba(23, 49, 58, 0.18)',
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="overline" sx={{ color: BRAND.tealDark, display: 'block', mb: 1 }}>
                                Vår historia
                            </Typography>
                            <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 2.5 }}>
                                Familjeägt sedan {FOUNDED_YEAR}
                            </Typography>
                            <Typography sx={{ color: BRAND.muted, fontSize: { xs: '1rem', md: '1.05rem' }, mb: 2 }}>
                                Knallefisk är en familjeägd fiskhandel som i två decennier har
                                försett Sjuhärad med färsk fisk och skaldjur. Vi handplockar varje
                                leverans från Göteborgs fiskauktion och står själva bakom disken.
                            </Typography>
                            <Typography sx={{ color: BRAND.muted, fontSize: { xs: '1rem', md: '1.05rem' }, mb: 3.5 }}>
                                Från dagsfärsk havsfisk till handskalade räkor och nykokta skaldjur –
                                hos oss får du alltid kvalitet, kunskap och ett vänligt bemötande.
                            </Typography>

                            <Box sx={{ display: 'flex', gap: { xs: 3, md: 5 }, mb: 4, flexWrap: 'wrap' }}>
                                {[
                                    { value: '20+', label: 'år i branschen' },
                                    { value: '2', label: 'butiker i Sjuhärad' },
                                    { value: '100%', label: 'färskt från auktionen' },
                                ].map((stat) => (
                                    <Box key={stat.label}>
                                        <Typography
                                            sx={{
                                                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                                                fontWeight: 800,
                                                fontSize: { xs: '1.75rem', md: '2.1rem' },
                                                color: BRAND.teal,
                                                lineHeight: 1,
                                            }}
                                        >
                                            {stat.value}
                                        </Typography>
                                        <Typography sx={{ color: BRAND.muted, fontSize: '0.88rem', mt: 0.5 }}>
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Button component={Link} href="/om_oss" variant="outlined" endIcon={<ArrowForward />}>
                                Läs mer om oss
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ============ Stores ============ */}
            <Box sx={{ backgroundColor: showPricesSection ? WHITE : BRAND.sand, py: { xs: 7, md: 10 } }}>
                <Container maxWidth="lg">
                    <SectionHeading
                        overline="Här finns vi"
                        title="Våra butiker"
                        subtitle="Två butiker i Sjuhärad – samma färska fisk och samma familj bakom disken."
                    />

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                            gap: 3,
                        }}
                    >
                        {STORES.map((store) => (
                            <Card key={store.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <StoreHeader title={`Knallefisk ${store.name}`} />
                                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                                        <LocationOnOutlined sx={{ color: BRAND.teal, fontSize: '1.2rem', mt: 0.3 }} />
                                        <Typography sx={{ color: BRAND.ink }}>
                                            {store.streetAddress}, {store.postalCode} {store.city}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                                        <AccessTime sx={{ color: BRAND.teal, fontSize: '1.2rem', mt: 0.3 }} />
                                        <Typography sx={{ color: BRAND.ink }}>{store.hoursSummary}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                                        <PhoneOutlined sx={{ color: BRAND.teal, fontSize: '1.2rem', mt: 0.3 }} />
                                        <Typography
                                            component="a"
                                            href={`tel:${store.phoneE164}`}
                                            sx={{
                                                color: BRAND.ink,
                                                textDecoration: 'none',
                                                '&:hover': { color: BRAND.tealDark },
                                            }}
                                        >
                                            {store.phone}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 'auto', pt: 1.5, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                                        <Button
                                            component="a"
                                            href={store.directionsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="contained"
                                            size="small"
                                            sx={{ px: 2.5 }}
                                        >
                                            Vägbeskrivning
                                        </Button>
                                        <Button
                                            component={Link}
                                            href="/hitta_butik"
                                            variant="text"
                                            size="small"
                                            endIcon={<ArrowForward />}
                                            sx={{ color: BRAND.tealDark }}
                                        >
                                            Öppettider & karta
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ============ Gallery ============ */}
            <Box sx={{ backgroundColor: showPricesSection ? BRAND.sand : WHITE, py: { xs: 7, md: 10 } }}>
                <Container maxWidth="lg">
                    <SectionHeading
                        overline="Ur vår disk"
                        title="Färskt varje dag"
                        subtitle="Ett smakprov på det vi dukar upp i disken – följ gärna med bakom kulisserna."
                    />

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)',
                            },
                            gridAutoFlow: 'dense',
                            gap: { xs: 1.5, md: 2 },
                        }}
                    >
                        {GALLERY.map((image, index) => {
                            const featured = index === 0;
                            const wide = index === GALLERY.length - 1;
                            return (
                                <Box
                                    key={image.src}
                                    sx={{
                                        position: 'relative',
                                        aspectRatio: featured || wide ? { xs: '2 / 1', md: featured ? '1' : 'auto' } : '1',
                                        gridColumn: featured || wide ? 'span 2' : 'span 1',
                                        gridRow: { xs: 'span 1', md: featured ? 'span 2' : 'span 1' },
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 16px rgba(23, 49, 58, 0.08)',
                                        '&:hover img': { transform: 'scale(1.06)' },
                                    }}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes={
                                            featured || wide
                                                ? '(max-width: 900px) 100vw, 50vw'
                                                : '(max-width: 900px) 50vw, 25vw'
                                        }
                                        style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                    />
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* ============ CTA band ============ */}
            <WaveDivider fill={BRAND.tealDark} height={{ xs: 36, md: 56 }} />
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${BRAND.tealDark} 0%, ${BRAND.teal} 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                    py: { xs: 7, md: 9 },
                }}
            >
                {/* The sea again, faint under a teal tint */}
                <BackgroundVideo src="/video/havet.mp4" poster="/img/havet_poster.jpg" opacity={0.22} />
                <ScalesPattern color="rgba(255, 255, 255, 0.06)" />
                <Bubbles style={{ top: -30, right: '5%' }} color="rgba(255, 255, 255, 0.1)" size={200} />
                <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center', color: WHITE }}>
                    <Typography variant="h2" component="h2" sx={{ color: WHITE, fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 2 }}>
                        Beställ till helgen redan idag
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.96)', fontSize: { xs: '1rem', md: '1.1rem' }, mb: 4, maxWidth: 560, mx: 'auto' }}>
                        Skicka din beställning online så packar vi den färsk och klar –
                        du hämtar och betalar i butiken.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            component={Link}
                            href="/bestall_online"
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingBasketOutlined />}
                            sx={{
                                backgroundColor: WHITE,
                                color: BRAND.tealDark,
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                            }}
                        >
                            Beställ online
                        </Button>
                        <Button
                            component={Link}
                            href="/kontakta_oss"
                            variant="outlined"
                            size="large"
                            sx={{
                                color: WHITE,
                                borderColor: 'rgba(255, 255, 255, 0.75)',
                                borderWidth: 2,
                                '&:hover': {
                                    borderColor: WHITE,
                                    borderWidth: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Kontakta oss
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
