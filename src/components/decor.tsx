import React from 'react';

/**
 * Original decorative SVG assets in the Knallefisk brand style.
 * Everything here is pure presentation: aria-hidden, no pointer events,
 * colours passed in so the same asset works on light and dark sections.
 */

interface WaveDividerProps {
  /** Colour of the section the wave leads INTO */
  fill: string;
  /** Flip upside down (wave leads out of a section instead) */
  flip?: boolean;
  /** Height in px of the divider band */
  height?: { xs: number; md: number } | number;
}

/** Three-layer ocean wave used between page sections. */
export function WaveDivider({ fill, flip = false, height = { xs: 48, md: 88 } }: WaveDividerProps) {
  const h = typeof height === 'number' ? { xs: height, md: height } : height;
  return (
    <div
      aria-hidden
      style={{
        lineHeight: 0,
        transform: flip ? 'scaleY(-1)' : undefined,
        marginTop: -1,
        marginBottom: -1,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 'var(--wave-h)' }}
        className="wave-divider"
      >
        <style>{`.wave-divider{--wave-h:${h.xs}px}@media(min-width:900px){.wave-divider{--wave-h:${h.md}px}}`}</style>
        <path
          d="M0,68 C240,112 480,14 720,52 C960,90 1200,24 1440,62 L1440,120 L0,120 Z"
          fill={fill}
          opacity="0.32"
        />
        <path
          d="M0,84 C260,36 520,106 780,72 C1040,38 1240,92 1440,54 L1440,120 L0,120 Z"
          fill={fill}
          opacity="0.5"
        />
        <path
          d="M0,94 C240,64 480,112 760,88 C1040,64 1240,104 1440,78 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

interface BubblesProps {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

/** Cluster of rising bubbles — place absolutely in a corner of a section. */
export function Bubbles({ color = 'rgba(68, 143, 155, 0.16)', size = 180, style }: BubblesProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
    >
      <circle cx="48" cy="150" r="34" fill={color} />
      <circle cx="118" cy="108" r="20" fill={color} opacity="0.8" />
      <circle cx="88" cy="52" r="12" fill={color} opacity="0.65" />
      <circle cx="150" cy="160" r="14" fill={color} opacity="0.7" />
      <circle cx="160" cy="52" r="7" fill={color} opacity="0.5" />
      <circle cx="30" cy="72" r="6" fill={color} opacity="0.45" />
    </svg>
  );
}

/** Fish-scale pattern band, used as a subtle background texture. */
export function ScalesPattern({
  color = 'rgba(68, 143, 155, 0.07)',
  style,
}: {
  color?: string;
  style?: React.CSSProperties;
}) {
  const id = React.useId().replace(/[^a-zA-Z0-9-]/g, '');
  return (
    <svg
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <defs>
        <pattern id={`scales-${id}`} width="56" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M0 40a28 28 0 0 1 56 0M-28 20a28 28 0 0 1 56 0M28 20a28 28 0 0 1 56 0"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#scales-${id})`} />
    </svg>
  );
}

/** Small stylised fish silhouette, matching the logo's hand-drawn feel. */
export function FishAccent({
  color = 'rgba(68, 143, 155, 0.25)',
  size = 64,
  flip = false,
  style,
}: {
  color?: string;
  size?: number;
  flip?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 40"
      width={size}
      height={(size * 40) / 64}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        transform: flip ? 'scaleX(-1)' : undefined,
        ...style,
      }}
    >
      <path
        d="M4 20c7-9 17-14 27-14 9 0 17 4 22 9l9-8c1-1 2 0 2 1v24c0 1-1 2-2 1l-9-8c-5 5-13 9-22 9-10 0-20-5-27-14z"
        fill={color}
      />
      <circle cx="14" cy="17" r="2.4" fill="#fff" opacity="0.9" />
    </svg>
  );
}

/** Short brand-coloured rule used under section headings. */
export function HeadingRule({
  centered = true,
  color = '#448f9b',
}: {
  centered?: boolean;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 96 10"
      width="96"
      height="10"
      style={{ display: 'block', margin: centered ? '14px auto 0' : '14px 0 0' }}
    >
      <path
        d="M2 6c8-5 16-5 24 0s16 5 24 0 16-5 24 0 12 4 20 1"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
