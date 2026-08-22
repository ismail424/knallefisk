'use client';

import { Box, Typography } from '@mui/material';
import { StorefrontOutlined } from '@mui/icons-material';
import { BRAND } from '@/theme';

/** Teal gradient header shared by every store card. */
export default function StoreHeader({ title }: { title: string }) {
    return (
        <Box
            sx={{
                px: 3,
                py: 2.5,
                background: `linear-gradient(120deg, ${BRAND.teal} 0%, ${BRAND.tealDark} 100%)`,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
            }}
        >
            <StorefrontOutlined />
            <Typography variant="h5" component="h3" sx={{ color: '#fff' }}>
                {title}
            </Typography>
        </Box>
    );
}
