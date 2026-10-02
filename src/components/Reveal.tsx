'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, BoxProps } from '@mui/material';

/**
 * Fades its children up the first time they scroll into view. Content is
 * visible without JavaScript-driven state only after mount, so the server
 * HTML stays crawlable (opacity, not display) and reduced-motion visitors
 * see it immediately via the global .reveal override.
 */
export default function Reveal({ delay = 0, children, ...rest }: BoxProps & { delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Box
            ref={ref}
            className={`reveal${visible ? ' is-visible' : ''}`}
            style={{ ['--reveal-delay' as string]: `${delay}s` }}
            {...rest}
        >
            {children}
        </Box>
    );
}
