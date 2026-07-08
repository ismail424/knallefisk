'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

// Semesterstängt-banner visas t.o.m. 28 juli 2026, döljs automatiskt därefter
const VACATION_NOTICE_END = new Date('2026-07-29T00:00:00');

interface VacationNoticeProps {
    sx?: SxProps<Theme>;
}

const VacationNotice = ({ sx }: VacationNoticeProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(new Date() < VACATION_NOTICE_END);
    }, []);

    if (!show) return null;

    return (
        <Box sx={[
            {
                backgroundColor: '#d32f2f',
                color: 'white',
                textAlign: 'center',
                py: { xs: 2.5, md: 3 },
                px: 2
            },
            ...(Array.isArray(sx) ? sx : [sx])
        ]}>
            <Typography sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}>
                Semesterstängt – vi har stängt fram till 28 juli. Välkomna åter!
            </Typography>
        </Box>
    );
};

export default VacationNotice;
