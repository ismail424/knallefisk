'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Typography, Button } from '@mui/material';
import { HomeOutlined, ShoppingBasketOutlined } from '@mui/icons-material';
import { BRAND } from '@/theme';
import { Bubbles } from '@/components/decor';

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
            <Container maxWidth="sm" sx={{ position: 'relative', textAlign: 'center', py: { xs: 8, md: 12 } }}>
                <Box
                    sx={{
                        width: { xs: 150, md: 190 },
                        height: { xs: 150, md: 190 },
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        border: `1px solid ${BRAND.border}`,
                        boxShadow: '0 12px 36px rgba(23, 49, 58, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        mx: 'auto',
                        mb: 3,
                    }}
                >
                    <Image
                        src="/img/karp.webp"
                        alt=""
                        width={170}
                        height={170}
                        style={{ width: '82%', height: '82%', objectFit: 'contain', transform: 'scaleX(-1)' }}
                    />
                </Box>
                <Typography
                    sx={{
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                        fontWeight: 800,
                        fontSize: { xs: '3.25rem', md: '4.25rem' },
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
