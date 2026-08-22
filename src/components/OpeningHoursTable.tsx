'use client';

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Store } from '@/lib/site';
import { BRAND } from '@/theme';

/**
 * The one weekly opening-hours table, with today highlighted. The highlight
 * is applied after mount so server and client HTML always match.
 */
export default function OpeningHoursTable({ store }: { store: Store }) {
    const [todayIndex, setTodayIndex] = useState<number | null>(null);

    useEffect(() => {
        setTodayIndex((new Date().getDay() + 6) % 7);
    }, []);

    return (
        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${BRAND.border}` }}>
            {store.hours.map((day, index) => {
                const isToday = todayIndex === index;
                const closed = day.hours === null;
                return (
                    <Box
                        key={day.day}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            px: 2,
                            py: 0.9,
                            backgroundColor: isToday
                                ? BRAND.tealTint
                                : index % 2 === 0
                                  ? '#fff'
                                  : BRAND.sand,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '0.92rem',
                                fontWeight: isToday ? 700 : 500,
                                color: BRAND.ink,
                            }}
                        >
                            {day.day}
                            {isToday && (
                                <Typography
                                    component="span"
                                    sx={{
                                        ml: 1,
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        color: BRAND.tealDark,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                    }}
                                >
                                    Idag
                                </Typography>
                            )}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.92rem',
                                fontWeight: isToday ? 700 : 400,
                                color: closed ? BRAND.muted : BRAND.ink,
                            }}
                        >
                            {day.hours ?? 'Stängt'}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
}
