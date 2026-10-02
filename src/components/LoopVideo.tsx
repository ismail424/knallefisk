'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, SxProps, Theme } from '@mui/material';
import { PauseRounded, PlayArrowRounded } from '@mui/icons-material';

interface LoopVideoProps {
    src: string;
    poster: string;
    /** Extra styles for the <video>/<img> layer (e.g. objectPosition) */
    sx?: SxProps<Theme>;
    /** Where the pause control sits; hidden entirely when false */
    control?: 'bottom-right' | 'top-right' | false;
}

/**
 * Decorative looping illustration video that costs nothing until it is
 * scrolled near: the poster image shows first, the video source is only
 * attached once the element approaches the viewport, and it pauses again
 * when scrolled away. Visitors who prefer reduced motion get the still
 * image. Carries the pause control WCAG 2.2.2 requires. Place inside a
 * position: relative parent.
 */
export default function LoopVideo({ src, poster, sx, control = 'bottom-right' }: LoopVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [load, setLoad] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [userPaused, setUserPaused] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || reduced) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoad(true);
                    if (!userPaused) video.play().then(() => setPlaying(true)).catch(() => {});
                } else if (!video.paused) {
                    video.pause();
                    setPlaying(false);
                }
            },
            { rootMargin: '200px' }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, [reduced, userPaused, load]);

    const toggle = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            setUserPaused(false);
            video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
            video.pause();
            setUserPaused(true);
            setPlaying(false);
        }
    };

    const layer: SxProps<Theme> = {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    };

    return (
        <>
            <Box
                component="video"
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                poster={poster}
                src={load ? src : undefined}
                sx={[layer, ...(Array.isArray(sx) ? sx : [sx])]}
            />
            {control && !reduced && (
                <IconButton
                    onClick={toggle}
                    aria-label={playing ? 'Pausa animationen' : 'Spela upp animationen'}
                    size="small"
                    sx={{
                        position: 'absolute',
                        ...(control === 'top-right' ? { top: 12 } : { bottom: 12 }),
                        right: 12,
                        zIndex: 3,
                        color: '#fff',
                        backgroundColor: 'rgba(13, 40, 48, 0.55)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        '&:hover': { backgroundColor: 'rgba(13, 40, 48, 0.75)' },
                    }}
                >
                    {playing ? <PauseRounded fontSize="small" /> : <PlayArrowRounded fontSize="small" />}
                </IconButton>
            )}
        </>
    );
}
