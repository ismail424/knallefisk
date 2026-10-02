import React from 'react';

/**
 * Hand-built animated SVG scene: a fishing boat bobbing on rolling waves,
 * a fish leaping, gulls gliding and bubbles rising. Pure CSS animation, so
 * it is cheap, crisp at any size and stops for prefers-reduced-motion via
 * the global rule in globals.css.
 */
export default function SeaScene({ style }: { style?: React.CSSProperties }) {
    const uid = React.useId().replace(/[^a-zA-Z0-9-]/g, '');
    const c = (name: string) => `${name}-${uid}`;

    return (
        <svg
            aria-hidden
            viewBox="0 0 480 360"
            style={{ display: 'block', width: '100%', height: 'auto', ...style }}
        >
            <style>{`
                .${c('wave1')}{--shift:-480px;animation:sea-slide 9s linear infinite}
                .${c('wave2')}{--shift:-360px;animation:sea-slide 6s linear infinite reverse}
                .${c('wave3')}{--shift:-480px;animation:sea-slide 4.5s linear infinite}
                .${c('boat')}{transform-origin:240px 214px;animation:sea-bob 4s ease-in-out infinite}
                .${c('sun')}{transform-origin:360px 110px;animation:sea-pulse 6s ease-in-out infinite}
                .${c('fish')}{animation:sea-leap 5.5s ease-in-out infinite;transform-origin:0 0}
                .${c('gull1')}{animation:sea-glide 14s linear infinite}
                .${c('gull2')}{animation:sea-glide 19s linear infinite;animation-delay:-8s}
                .${c('wing')}{transform-origin:center;animation:sea-flap 0.9s ease-in-out infinite}
                .${c('bubble')}{animation:sea-rise 4s ease-in infinite}
                .${c('cloud')}{animation:sea-drift 18s ease-in-out infinite alternate}
            `}</style>

            <defs>
                <linearGradient id={c('sky')} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#d3e7ea" />
                    <stop offset="1" stopColor="#eef5f6" />
                </linearGradient>
                <linearGradient id={c('deep')} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#448f9b" />
                    <stop offset="1" stopColor="#245560" />
                </linearGradient>
                <clipPath id={c('frame')}>
                    <rect width="480" height="360" rx="32" />
                </clipPath>
            </defs>

            <g clipPath={`url(#${c('frame')})`}>
                <rect width="480" height="360" fill={`url(#${c('sky')})`} />

                {/* Sun */}
                <g className={c('sun')}>
                    <circle cx="360" cy="110" r="58" fill="#d9532c" opacity="0.12" />
                    <circle cx="360" cy="110" r="38" fill="#ef7c58" opacity="0.9" />
                </g>

                {/* Clouds */}
                <g className={c('cloud')} fill="#ffffff" opacity="0.85">
                    <path d="M60 80c0-14 12-24 26-22 4-10 16-16 28-12 10 4 14 12 14 20 10 0 18 6 18 14H60z" />
                    <path d="M260 56c0-9 8-15 17-14 3-7 10-10 18-8 6 3 9 8 9 13 7 0 12 4 12 9h-56z" opacity="0.7" />
                </g>

                {/* Gulls */}
                <g className={c('gull1')}>
                    <g transform="translate(0 70)">
                        <path className={c('wing')} d="M0 0q8-8 16 0q8-8 16 0" fill="none" stroke="#245560" strokeWidth="3" strokeLinecap="round" />
                    </g>
                </g>
                <g className={c('gull2')}>
                    <g transform="translate(0 120) scale(0.7)">
                        <path className={c('wing')} d="M0 0q8-8 16 0q8-8 16 0" fill="none" stroke="#245560" strokeWidth="3" strokeLinecap="round" />
                    </g>
                </g>

                {/* Back wave */}
                <g className={c('wave1')}>
                    <path
                        d="M0 210c40-14 80-14 120 0s80 14 120 0 80-14 120 0 80 14 120 0 80-14 120 0 80 14 120 0 80-14 120 0 80 14 120 0V360H0z"
                        fill="#6fb0bb"
                        opacity="0.55"
                    />
                </g>

                {/* Boat */}
                <g className={c('boat')}>
                    {/* mast + flag */}
                    <rect x="238" y="118" width="5" height="78" rx="2" fill="#245560" />
                    <path d="M243 122l30 9-30 9z" fill="#d9532c" />
                    {/* cabin */}
                    <rect x="206" y="166" width="46" height="34" rx="6" fill="#ffffff" />
                    <rect x="214" y="174" width="12" height="11" rx="2.5" fill="#448f9b" />
                    <rect x="232" y="174" width="12" height="11" rx="2.5" fill="#448f9b" />
                    {/* hull */}
                    <path d="M170 198h150l-18 34c-2 4-6 6-10 6H198c-4 0-8-2-10-6z" fill="#d9532c" />
                    <path d="M176 210h138l-4 8H180z" fill="#ffffff" opacity="0.9" />
                    {/* net line */}
                    <path d="M310 200q30 22 40 58" fill="none" stroke="#245560" strokeWidth="2" strokeDasharray="4 4" />
                </g>

                {/* Middle wave */}
                <g className={c('wave2')}>
                    <path
                        d="M0 232c30-10 60-10 90 0s60 10 90 0 60-10 90 0 60 10 90 0 60-10 90 0 60 10 90 0 60-10 90 0 60 10 90 0 60-10 90 0 60 10 90 0V360H0z"
                        fill="#448f9b"
                    />
                </g>

                {/* Leaping fish */}
                <g transform="translate(120 250)">
                    <g className={c('fish')}>
                        <path
                            d="M-20 0c6-8 15-12 24-12 8 0 15 3 19 8l8-7c1-1 2 0 2 1v20c0 1-1 2-2 1l-8-7c-4 5-11 8-19 8-9 0-18-4-24-12z"
                            fill="#ffffff"
                        />
                        <circle cx="-10" cy="-3" r="2.2" fill="#245560" />
                    </g>
                </g>

                {/* Front wave (deep) */}
                <g className={c('wave3')}>
                    <path
                        d="M0 262c40-12 80-12 120 0s80 12 120 0 80-12 120 0 80 12 120 0 80-12 120 0 80 12 120 0 80-12 120 0 80 12 120 0V360H0z"
                        fill={`url(#${c('deep')})`}
                    />
                </g>

                {/* Bubbles */}
                {[
                    { x: 70, d: 0, r: 5 },
                    { x: 150, d: 1.4, r: 3.5 },
                    { x: 300, d: 0.7, r: 6 },
                    { x: 390, d: 2.2, r: 4 },
                    { x: 430, d: 3.1, r: 3 },
                ].map((b) => (
                    <circle
                        key={b.x}
                        className={c('bubble')}
                        cx={b.x}
                        cy="350"
                        r={b.r}
                        fill="none"
                        stroke="#ffffff"
                        strokeOpacity="0.55"
                        strokeWidth="2"
                        style={{ animationDelay: `${b.d}s` }}
                    />
                ))}
            </g>
        </svg>
    );
}
