'use client';

import { useRef, useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { PauseRounded, PlayArrowRounded } from '@mui/icons-material';

interface BackgroundVideoProps {
    src: string;
    poster: string;
    /** Video element opacity, for faint background use */
    opacity?: number;
}

/**
 * Decorative autoplaying background video with the pause control WCAG 2.2.2
 * requires for moving content. Respects prefers-reduced-motion by starting
 * paused. Place inside a position: relative parent.
 */
export default function BackgroundVideo({ src, poster, opacity = 1 }: BackgroundVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            videoRef.current?.pause();
            setPlaying(false);
        }
    }, []);

    const toggle = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setPlaying(true);
        } else {
            video.pause();
            setPlaying(false);
        }
    };

    return (
        <>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                aria-hidden
                poster={poster}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity,
                }}
            >
                <source src={src} type="video/mp4" />
            </video>
            <IconButton
                onClick={toggle}
                aria-label={playing ? 'Pausa bakgrundsvideon' : 'Spela upp bakgrundsvideon'}
                size="small"
                sx={{
                    position: 'absolute',
                    bottom: 14,
                    right: 14,
                    zIndex: 3,
                    color: '#fff',
                    backgroundColor: 'rgba(13, 40, 48, 0.55)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    '&:hover': { backgroundColor: 'rgba(13, 40, 48, 0.75)' },
                }}
            >
                {playing ? <PauseRounded fontSize="small" /> : <PlayArrowRounded fontSize="small" />}
            </IconButton>
        </>
    );
}
