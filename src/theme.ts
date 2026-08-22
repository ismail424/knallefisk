'use client';

import { createTheme } from '@mui/material/styles';

/**
 * The one theme for the whole site. Colours are anchored in the logo's
 * teal and reused by the order emails (src/lib/order-email.ts) — keep the
 * two in sync when adjusting.
 */

export const BRAND = {
  teal: '#448f9b',
  tealDark: '#33727d',
  tealDarker: '#245560',
  tealLight: '#6fb0bb',
  tealTint: '#eef5f6',
  tealPale: '#d3e7ea',
  coral: '#d9532c',
  coralDark: '#b23f1e',
  ink: '#17313a',
  /** Deep ocean dark used by the hero, photo heroes and the footer */
  inkDeep: '#0d2830',
  muted: '#52676e',
  sand: '#f6f9fa',
  border: '#dfeaec',
} as const;

/** BRAND.teal with alpha — keeps the rgb triplet defined in one place. */
export const tealAlpha = (a: number) => `rgba(68, 143, 155, ${a})`;

/** Shared lift-on-hover for cards, so sibling cards can't drift apart. */
export const CARD_HOVER = {
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 8px rgba(23, 49, 58, 0.06), 0 16px 36px rgba(23, 49, 58, 0.1)',
  },
} as const;

const HEADING_FONT =
  'var(--font-poppins), "Poppins", "Helvetica Neue", Arial, sans-serif';
const BODY_FONT =
  'var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';

const heading = (fontWeight: number) => ({
  fontFamily: HEADING_FONT,
  fontWeight,
  color: BRAND.ink,
  letterSpacing: '-0.01em',
  lineHeight: 1.2,
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: BRAND.teal,
      dark: BRAND.tealDark,
      light: BRAND.tealLight,
      contrastText: '#ffffff',
    },
    secondary: {
      main: BRAND.coral,
      dark: BRAND.coralDark,
      light: '#ef7c58',
      contrastText: '#ffffff',
    },
    background: {
      default: BRAND.sand,
      paper: '#ffffff',
    },
    text: {
      primary: BRAND.ink,
      secondary: BRAND.muted,
    },
    divider: BRAND.border,
  },
  // Keep MUI's default 4px radius base: numeric `sx` borderRadius values are
  // MULTIPLIED by this (borderRadius: 3 -> 12px). Component radii that should
  // be fixed are set in px in the styleOverrides below.
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: BODY_FONT,
    h1: { ...heading(700), fontSize: '2.75rem' },
    h2: { ...heading(700), fontSize: '2.125rem' },
    h3: { ...heading(700), fontSize: '1.625rem' },
    h4: { ...heading(600), fontSize: '1.375rem' },
    h5: { ...heading(600), fontSize: '1.125rem' },
    h6: { ...heading(600), fontSize: '1rem' },
    subtitle1: { fontWeight: 500, lineHeight: 1.6 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.9rem', lineHeight: 1.6 },
    button: {
      fontFamily: HEADING_FONT,
      fontWeight: 600,
      textTransform: 'none',
    },
    overline: {
      fontFamily: HEADING_FONT,
      fontWeight: 700,
      letterSpacing: '0.14em',
      fontSize: '0.75rem',
    },
    caption: { lineHeight: 1.5 },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 22,
          paddingRight: 22,
        },
        sizeLarge: {
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 30,
          paddingRight: 30,
          fontSize: '1rem',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: BRAND.tealDark,
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(68, 143, 155, 0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${BRAND.border}`,
          boxShadow: '0 1px 2px rgba(23, 49, 58, 0.04), 0 8px 24px rgba(23, 49, 58, 0.06)',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#ffffff',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: BRAND.tealLight,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: BRAND.teal,
            borderWidth: 2,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: HEADING_FONT,
          fontWeight: 600,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(68, 143, 155, 0.08)',
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
});

export default theme;
