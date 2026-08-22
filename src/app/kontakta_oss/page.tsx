'use client';

import Link from 'next/link';
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import {
    EmailOutlined,
    PhoneOutlined,
    StorefrontOutlined,
    AccessTime,
    ArrowForward,
    ShoppingBasketOutlined,
} from '@mui/icons-material';
import { STORES, CONTACT_EMAILS } from '@/lib/site';
import { BRAND, CARD_HOVER } from '@/theme';
import PageHero from '@/components/PageHero';
import CtaCard from '@/components/CtaCard';
import OpeningHoursTable from '@/components/OpeningHoursTable';

function ContactCard({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <Card
            sx={{
                height: '100%',
                textAlign: 'center',
                ...CARD_HOVER,
            }}
        >
            <CardContent sx={{ p: 4 }}>
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
                    {icon}
                </Box>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                    {title}
                </Typography>
                {children}
            </CardContent>
        </Card>
    );
}

const linkSx = {
    display: 'block',
    color: BRAND.tealDark,
    fontWeight: 600,
    textDecoration: 'none',
    py: 0.5,
    '&:hover': { textDecoration: 'underline' },
};

export default function KontaktaOssPage() {
    return (
        <Box sx={{ backgroundColor: BRAND.sand }}>
            <PageHero
                overline="Vi finns här"
                title="Kontakta oss"
                subtitle="Undrar du vad som finns i disken idag, eller vill du göra en större beställning? Hör av dig – vi hjälper gärna till."
                image="/img/bild7.webp"
            />

            <Container maxWidth="lg" sx={{ pb: { xs: 7, md: 10 } }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 3,
                        mb: { xs: 5, md: 7 },
                    }}
                >
                    <ContactCard
                        icon={<PhoneOutlined sx={{ fontSize: 30, color: BRAND.teal }} />}
                        title="Ring oss"
                    >
                        {STORES.map((store) => (
                            <Box key={store.id} sx={{ mb: 1 }}>
                                <Typography sx={{ color: BRAND.muted, fontSize: '0.85rem' }}>
                                    {store.name}
                                </Typography>
                                <Typography
                                    component="a"
                                    href={`tel:${store.phoneE164}`}
                                    sx={linkSx}
                                >
                                    {store.phone}
                                </Typography>
                            </Box>
                        ))}
                    </ContactCard>

                    <ContactCard
                        icon={<EmailOutlined sx={{ fontSize: 30, color: BRAND.teal }} />}
                        title="Mejla oss"
                    >
                        <Typography sx={{ color: BRAND.muted, fontSize: '0.9rem', mb: 1 }}>
                            Vi svarar så snart vi kan – oftast samma dag.
                        </Typography>
                        {CONTACT_EMAILS.map((email) => (
                            <Typography key={email} component="a" href={`mailto:${email}`} sx={linkSx}>
                                {email}
                            </Typography>
                        ))}
                    </ContactCard>

                    <ContactCard
                        icon={<StorefrontOutlined sx={{ fontSize: 30, color: BRAND.teal }} />}
                        title="Besök oss"
                    >
                        {STORES.map((store) => (
                            <Box key={store.id} sx={{ mb: 1 }}>
                                <Typography sx={{ fontWeight: 600, color: BRAND.ink, fontSize: '0.95rem' }}>
                                    {store.name}
                                </Typography>
                                <Typography sx={{ color: BRAND.muted, fontSize: '0.9rem' }}>
                                    {store.streetAddress}, {store.postalCode} {store.city}
                                </Typography>
                            </Box>
                        ))}
                        <Button
                            component={Link}
                            href="/hitta_butik"
                            variant="text"
                            size="small"
                            endIcon={<ArrowForward />}
                            sx={{ mt: 1, color: BRAND.tealDark }}
                        >
                            Kartor & vägbeskrivning
                        </Button>
                    </ContactCard>
                </Box>

                {/* Opening hours */}
                <Card sx={{ mb: { xs: 5, md: 7 } }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}
                        >
                            <AccessTime sx={{ color: BRAND.teal }} />
                            Öppettider
                        </Typography>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                                gap: { xs: 3, md: 5 },
                            }}
                        >
                            {STORES.map((store) => (
                                <Box key={store.id}>
                                    <Typography variant="h6" component="h3" sx={{ mb: 1.5 }}>
                                        Knallefisk {store.name}
                                    </Typography>
                                    <OpeningHoursTable store={store} />
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </Card>

                {/* CTA */}
                <CtaCard
                    title="Vet du redan vad du vill ha?"
                    text="Skicka din beställning online så står den klar när du kommer."
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
                </CtaCard>
            </Container>
        </Box>
    );
}
