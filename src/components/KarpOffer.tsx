'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import {
    Add,
    ArrowForward,
    Check,
    EventAvailableOutlined,
    ShoppingBasketOutlined,
    StorefrontOutlined,
} from '@mui/icons-material';
import { BRAND } from '@/theme';
import Reveal from './Reveal';

/**
 * Seasonal "Levande karp" offer. Set `active` to false to hide it
 * everywhere at once (hero badge, home section and order-page card).
 */
export const KARP_OFFER = {
    active: true,
    price: 169,
    unit: 'kr/kg',
    /** Line the order page adds to the customer's order text */
    orderLine: 'Levande karp, 1 st',
    /** Id of the home-page section, for the hero badge link */
    anchor: 'levande-karp',
    /** Opens the order form with the karp already filled in */
    orderHref: '/bestall_online?vara=karp#bestallning',
} as const;

/** True when an order text already mentions the karp (in any casing). */
export const mentionsKarp = (text: string) => /levande karp/i.test(text);

const HEADING_FONT = 'var(--font-poppins), Poppins, sans-serif';
const CORAL_TINT = 'rgba(217, 83, 44, 0.1)';
const CORAL_BORDER = 'rgba(217, 83, 44, 0.22)';

const BUBBLES = [
    { left: '12%', size: 10, delay: 0, duration: 5.6 },
    { left: '21%', size: 6, delay: 2.1, duration: 4.8 },
    { left: '79%', size: 8, delay: 1, duration: 6.2 },
    { left: '88%', size: 5, delay: 3.2, duration: 5.2 },
];

const badgeSx = {
    position: 'absolute',
    zIndex: 1,
    px: 1.5,
    py: 0.5,
    borderRadius: 999,
    backgroundColor: BRAND.coral,
    color: '#fff',
    fontFamily: HEADING_FONT,
    fontWeight: 700,
    fontSize: '0.72rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    boxShadow: '0 6px 16px rgba(217, 83, 44, 0.35)',
} as const;

/** Water-tinted panel with the karp gently swimming in place. */
function KarpPanel({ compact = false }: { compact?: boolean }) {
    return (
        <Box
            sx={{
                gridArea: 'img',
                position: 'relative',
                overflow: 'hidden',
                minHeight: compact ? { xs: 160, sm: 190 } : { xs: 230, sm: 300, md: 440 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `radial-gradient(110% 85% at 50% 50%, #ffffff 0%, ${BRAND.tealTint} 55%, ${BRAND.tealPale} 100%)`,
                px: compact ? 3 : { xs: 4, md: 5 },
                // compact: extra top room so the badge clears the dorsal fin
                pt: compact ? 6.5 : { xs: 5, md: 6 },
                pb: compact ? 3 : { xs: 5, md: 6 },
            }}
        >
            {/* Ripple rings */}
            <Box
                component="svg"
                aria-hidden
                viewBox="0 0 400 400"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: compact ? '150%' : '125%',
                    maxWidth: 680,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                }}
            >
                {[70, 120, 165, 198].map((r, i) => (
                    <circle
                        key={r}
                        cx="200"
                        cy="200"
                        r={r}
                        fill="none"
                        stroke={BRAND.tealLight}
                        strokeWidth="1.5"
                        strokeDasharray={i % 2 ? '2 9' : '6 10'}
                        opacity={0.55 - i * 0.1}
                    />
                ))}
            </Box>

            {/* Rising bubbles */}
            {!compact &&
                BUBBLES.map((b) => (
                    <Box
                        key={b.left}
                        aria-hidden
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: b.left,
                            width: b.size,
                            height: b.size,
                            borderRadius: '50%',
                            border: `1.5px solid ${BRAND.tealLight}`,
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            opacity: 0,
                            animation: `bubble-rise ${b.duration}s ${b.delay}s ease-in infinite`,
                        }}
                    />
                ))}

            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: compact ? 250 : 470,
                    animation: 'karp-swim 6s ease-in-out infinite',
                }}
            >
                <Image
                    src="/img/karp_levande.webp"
                    alt="Levande karp"
                    width={1200}
                    height={542}
                    sizes={compact ? '250px' : '(max-width: 900px) 90vw, 470px'}
                    style={{
                        width: '100%',
                        height: 'auto',
                        filter: 'drop-shadow(0 14px 16px rgba(23, 49, 58, 0.22))',
                    }}
                />
            </Box>

            <Box sx={{ ...badgeSx, top: compact ? 12 : 18, left: compact ? 12 : 18 }}>Specialerbjudande</Box>
        </Box>
    );
}

function Price({ large = false }: { large?: boolean }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
            <Typography
                component="span"
                sx={{
                    fontFamily: HEADING_FONT,
                    fontWeight: 800,
                    fontSize: large ? { xs: '3.25rem', md: '4rem' } : { xs: '2rem', md: '2.25rem' },
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: BRAND.coral,
                }}
            >
                {KARP_OFFER.price}
            </Typography>
            <Typography
                component="span"
                sx={{
                    fontFamily: HEADING_FONT,
                    fontWeight: 700,
                    fontSize: large ? '1.35rem' : '1.05rem',
                    color: BRAND.ink,
                }}
            >
                {KARP_OFFER.unit}
            </Typography>
        </Box>
    );
}

function IconBubble({ icon: Icon }: { icon: typeof EventAvailableOutlined }) {
    return (
        <Box
            component="span"
            sx={{
                width: 32,
                height: 32,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: CORAL_TINT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon sx={{ fontSize: '1.1rem', color: BRAND.coralDark }} />
        </Box>
    );
}

/** Glassy announcement pill for the dark home hero, links down to the offer. */
export function KarpHeroBadge() {
    return (
        <Box
            component="a"
            href={`#${KARP_OFFER.anchor}`}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                pl: 0.6,
                pr: 1.5,
                py: 0.6,
                mb: { xs: 2.5, md: 3 },
                borderRadius: 999,
                color: '#fff',
                textDecoration: 'none',
                fontSize: { xs: '0.85rem', md: '0.92rem' },
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(8px)',
                transition: 'background-color 0.2s ease',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                '&:hover .karp-arrow': { transform: 'translateX(3px)' },
            }}
        >
            <Box
                component="span"
                sx={{
                    px: 1.25,
                    py: 0.3,
                    borderRadius: 999,
                    backgroundColor: BRAND.coral,
                    fontFamily: HEADING_FONT,
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                }}
            >
                Just nu
            </Box>
            <span>
                Levande karp <strong>{KARP_OFFER.price} {KARP_OFFER.unit}</strong>
            </span>
            <ArrowForward className="karp-arrow" sx={{ fontSize: '1rem', transition: 'transform 0.2s ease' }} />
        </Box>
    );
}

/** Full-width offer section for the home page. */
export function KarpOfferSection() {
    return (
        <Box
            component="section"
            id={KARP_OFFER.anchor}
            aria-labelledby="karp-heading"
            sx={{ backgroundColor: BRAND.sand, pt: { xs: 5, md: 8 }, scrollMarginTop: { xs: 72, md: 88 } }}
        >
            <Container maxWidth="lg">
                <Reveal>
                    <Card
                        sx={{
                            overflow: 'hidden',
                            display: 'grid',
                            gridTemplateAreas: { xs: '"img" "body"', md: '"img body"' },
                            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                            borderColor: CORAL_BORDER,
                        }}
                    >
                        <KarpPanel />

                        <Box
                            sx={{
                                gridArea: 'body',
                                p: { xs: 3, sm: 4, md: 6 },
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Typography variant="overline" sx={{ color: BRAND.coralDark, display: 'block', mb: 1 }}>
                                Just nu hos Knallefisk
                            </Typography>
                            <Typography
                                id="karp-heading"
                                variant="h2"
                                component="h2"
                                sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, mb: 1.5 }}
                            >
                                Levande karp
                            </Typography>
                            <Typography
                                sx={{ color: BRAND.muted, fontSize: { xs: '1rem', md: '1.05rem' }, mb: 3, maxWidth: 460 }}
                            >
                                Tillgången är begränsad – beställ i förväg så ser vi till att din karp
                                finns på plats när du kommer till butiken.
                            </Typography>

                            <Price large />

                            <Box
                                component="ul"
                                sx={{ listStyle: 'none', p: 0, mt: 3, mb: 4, display: 'grid', gap: 1.25 }}
                            >
                                {[
                                    { icon: EventAvailableOutlined, text: 'Måste beställas i förväg' },
                                    { icon: StorefrontOutlined, text: 'Hämta och betala i butiken' },
                                ].map((item) => (
                                    <Box
                                        component="li"
                                        key={item.text}
                                        sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}
                                    >
                                        <IconBubble icon={item.icon} />
                                        <Typography sx={{ color: BRAND.ink, fontWeight: 500 }}>{item.text}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Button
                                component={Link}
                                href={KARP_OFFER.orderHref}
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<ShoppingBasketOutlined />}
                            >
                                Beställ levande karp
                            </Button>
                        </Box>
                    </Card>
                </Reveal>
            </Container>
        </Box>
    );
}

/** Compact offer card for the order page, adds the karp to the order text. */
export function KarpOrderCard({ added, onAdd }: { added: boolean; onAdd: () => void }) {
    return (
        <Card
            component="section"
            aria-labelledby="karp-order-heading"
            sx={{
                mb: { xs: 3, md: 4 },
                overflow: 'hidden',
                display: 'grid',
                gridTemplateAreas: {
                    xs: '"img" "body" "action"',
                    sm: '"img body" "img action"',
                    md: '"img body action"',
                },
                gridTemplateColumns: { xs: '1fr', sm: '240px 1fr', md: '300px 1fr auto' },
                gridTemplateRows: { sm: '1fr auto', md: '1fr' },
                borderColor: CORAL_BORDER,
            }}
        >
            <KarpPanel compact />

            <Box
                sx={{
                    gridArea: 'body',
                    px: { xs: 2.5, sm: 3, md: 3.5 },
                    pt: { xs: 2.5, sm: 3 },
                    pb: { xs: 2, sm: 1.5, md: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'baseline', columnGap: 2, rowGap: 0.5, flexWrap: 'wrap', mb: 1.25 }}>
                    <Typography
                        id="karp-order-heading"
                        variant="h3"
                        component="h2"
                        sx={{ fontSize: { xs: '1.4rem', md: '1.6rem' } }}
                    >
                        Levande karp
                    </Typography>
                    <Price />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                    <IconBubble icon={EventAvailableOutlined} />
                    <Typography sx={{ color: BRAND.muted, fontSize: '0.95rem' }}>
                        Måste beställas i förväg – lägg till den i din beställning så säkrar vi din karp.
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    gridArea: 'action',
                    display: 'flex',
                    alignItems: { xs: 'stretch', sm: 'flex-start', md: 'center' },
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: { xs: 2.5, sm: 3, md: 0 },
                    pr: { md: 3.5 },
                    pb: { xs: 2.5, sm: 3, md: 0 },
                }}
            >
                <Button
                    onClick={onAdd}
                    variant={added ? 'outlined' : 'contained'}
                    color="secondary"
                    size="large"
                    startIcon={added ? <Check /> : <Add />}
                    sx={{ whiteSpace: 'nowrap', borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                >
                    {added ? 'Tillagd i beställningen' : 'Lägg till i beställningen'}
                </Button>
            </Box>
        </Card>
    );
}
