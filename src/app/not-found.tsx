'use client';

import Link from 'next/link';
import { Box, Container, Typography, Button } from '@mui/material';
import { HomeOutlined, ShoppingBasketOutlined } from '@mui/icons-material';
import { BRAND } from '@/theme';
import { FishAccent, Bubbles } from '@/components/decor';

export default function NotFound() {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(180deg, ${BRAND.tealTint} 0%, ${BRAND.sand} 100%)`,
            }}
        >
            <Bubbles style={{ top: 40, right: '8%' }} size={220} />
            <FishAccent style={{ bottom: '18%', left: '6%' }} size={110} color="rgba(68, 143, 155, 0.18)" flip />
            <Container maxWidth="sm" sx={{ position: 'relative', textAlign: 'center', py: { xs: 10, md: 14 } }}>
                <Typography
                    sx={{
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                        fontWeight: 800,
                        fontSize: { xs: '5rem', md: '7rem' },
                        lineHeight: 1,
                        color: BRAND.tealPale,
                        mb: 1,
                    }}
                >
                    404
                </Typography>
                <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, mb: 2 }}>
                    Den här sidan simmade iväg
                </Typography>
                <Typography sx={{ color: BRAND.muted, mb: 4 }}>
                    Sidan du letar efter finns inte längre – men färsk fisk har vi gott om.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button component={Link} href="/" variant="contained" size="large" startIcon={<HomeOutlined />}>
                        Till startsidan
                    </Button>
                    <Button
                        component={Link}
                        href="/bestall_online"
                        variant="outlined"
                        size="large"
                        startIcon={<ShoppingBasketOutlined />}
                    >
                        Beställ online
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
