'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import {
    VerifiedOutlined,
    SchoolOutlined,
    VolunteerActivismOutlined,
    ShoppingBasketOutlined,
    StorefrontOutlined,
} from '@mui/icons-material';
import { FOUNDED_YEAR, STORES } from '@/lib/site';
import { BRAND, CARD_HOVER } from '@/theme';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import CtaCard from '@/components/CtaCard';
import { Bubbles } from '@/components/decor';

const VALUES = [
    {
        icon: VerifiedOutlined,
        title: 'Kvalitet i varje leverans',
        text: 'Vi handplockar fisk och skaldjur från Göteborgs fiskauktion och säljer bara det vi själva skulle servera hemma.',
    },
    {
        icon: SchoolOutlined,
        title: 'Kunskap bakom disken',
        text: 'Fråga oss om styckning, tillagning och vad som är bäst i säsong – vi delar gärna med oss av våra bästa tips.',
    },
    {
        icon: VolunteerActivismOutlined,
        title: 'Service med ett leende',
        text: 'Som familjeföretag känner vi många kunder vid namn. Hos oss ska det alltid kännas välkomnande att handla.',
    },
];

export default function OmOssPage() {
    return (
        <Box sx={{ backgroundColor: BRAND.sand }}>
            <PageHero
                overline="Vår historia"
                title="Om Knallefisk"
                subtitle={`Familjeägd fiskhandel sedan ${FOUNDED_YEAR} – med färska fisken över hela disken och hjärtat i Sjuhärad.`}
                image="/img/bild6.webp"
            />

            {/* Story */}
            <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 7, md: 10 } }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: { xs: 5, md: 8 },
                        alignItems: 'center',
                        mb: { xs: 7, md: 10 },
                    }}
                >
                    <Box>
                        <Typography variant="h2" component="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, mb: 2.5 }}>
                            Från fiskauktionen till din middag
                        </Typography>
                        <Typography sx={{ color: BRAND.muted, mb: 2, fontSize: { xs: '1rem', md: '1.05rem' } }}>
                            Knallefisk startade {FOUNDED_YEAR} som en familjeägd fiskhandel med en
                            enkel idé: att ge Sjuhärad samma färska fisk som på västkusten. Sedan
                            dess har vi stått bakom disken i våra butiker i Borås och Skene,
                            vecka efter vecka, år efter år.
                        </Typography>
                        <Typography sx={{ color: BRAND.muted, mb: 2, fontSize: { xs: '1rem', md: '1.05rem' } }}>
                            Vi köper in råvarorna från Göteborgs fiskauktion – dagsfärsk fisk,
                            handskalade räkor och nykokta skaldjur. Det som inte håller vår
                            kvalitet kommer aldrig in i disken.
                        </Typography>
                        <Typography sx={{ color: BRAND.muted, fontSize: { xs: '1rem', md: '1.05rem' } }}>
                            Mottot säger allt: <em>färska fisken över hela disken</em>. Det stod på
                            skylten från första dagen, och det är löftet vi lever efter varje dag.
                        </Typography>
                    </Box>

                    <Box sx={{ position: 'relative' }}>
                        <Bubbles style={{ top: -36, right: -14 }} size={140} />
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 2 }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    aspectRatio: '4 / 5',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    boxShadow: '0 16px 48px rgba(23, 49, 58, 0.16)',
                                }}
                            >
                                <Image
                                    src="/img/store_front.webp"
                                    alt="Knallefisks butik med skylten Färska fisken över hela disken"
                                    fill
                                    sizes="(max-width: 900px) 60vw, 30vw"
                                    style={{ objectFit: 'cover' }}
                                />
                            </Box>
                            <Box sx={{ display: 'grid', gap: 2 }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        boxShadow: '0 12px 32px rgba(23, 49, 58, 0.14)',
                                    }}
                                >
                                    <Image
                                        src="/img/bild5.webp"
                                        alt="Fisktallrik med dagens fångst"
                                        fill
                                        sizes="(max-width: 900px) 40vw, 20vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        boxShadow: '0 12px 32px rgba(23, 49, 58, 0.14)',
                                    }}
                                >
                                    <Image
                                        src="/img/bild2.webp"
                                        alt="Räktallrik med färska räkor"
                                        fill
                                        sizes="(max-width: 900px) 40vw, 20vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Values */}
                <SectionHeading overline="Det här står vi för" title="Tre löften till dig som kund" />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 3,
                        mb: { xs: 7, md: 10 },
                    }}
                >
                    {VALUES.map((value) => (
                        <Card key={value.title} sx={{ textAlign: 'center', ...CARD_HOVER }}>
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
                                    <value.icon sx={{ fontSize: 30, color: BRAND.teal }} />
                                </Box>
                                <Typography variant="h5" component="h3" sx={{ mb: 1.5 }}>
                                    {value.title}
                                </Typography>
                                <Typography sx={{ color: BRAND.muted, fontSize: '0.95rem' }}>
                                    {value.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* Visit CTA */}
                <CtaCard
                    title="Kom in och hälsa på!"
                    text={`Du hittar oss i ${STORES.map((s) => s.city).join(' och ')} – eller beställ online så packar vi åt dig.`}
                >
                    <Button
                        component={Link}
                        href="/hitta_butik"
                        variant="outlined"
                        size="large"
                        startIcon={<StorefrontOutlined />}
                    >
                        Hitta butik
                    </Button>
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
