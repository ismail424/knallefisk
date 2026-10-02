import React from 'react';
import { BRAND } from '@/theme';

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
  // Unique class per instance: the inline <style> is document-global, so a
  // shared class would let one divider's height clobber every other's.
  const cls = `wave-${React.useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
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
        className={cls}
      >
        <style>{`.${cls}{--wave-h:${h.xs}px}@media(min-width:900px){.${cls}{--wave-h:${h.md}px}}`}</style>
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

/** Short brand-coloured rule used under section headings. */
export function HeadingRule({
  centered = true,
  color = BRAND.teal,
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
