import { createTheme, responsiveFontSizes, alpha } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material/AppBar';
import { brand } from './theme.tokens';
import type { TypographyVariantsOptions } from '@mui/material/styles';
import type { TransitionsOptions } from '@mui/material/styles';
import type { Shadows } from '@mui/material/styles';

// ---------- Helpers
const buildShadows = (mode: 'light' | 'dark'): Shadows => {
  // Replace MUI's 25-level shadows with almost-flat outlines
  const hairline = 'none';
  // keep a *very* subtle level for focus states/cards
  const ring = mode === 'dark'
    ? `0 0 0 1px ${alpha('#a3afbd', 0.16)}`
    : `0 0 0 1px ${alpha('#2e384a', 0.10)}`;
  // 25 entries
  return Array(25).fill(hairline).map((_, i) => (i === 1 ? ring : hairline)) as Shadows;
};

const commonTypography: TypographyVariantsOptions = {
  fontFamily: [
    'Inter', 'SF Pro Text', 'system-ui', '-apple-system', 'Segoe UI',
    'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', 'Helvetica Neue', 'Arial', 'sans-serif',
  ].join(','),
  // Futuristic/minimal = clean sizes + tighter leading
  h1: { fontWeight: 700, letterSpacing: '-0.02em' },
  h2: { fontWeight: 700, letterSpacing: '-0.02em' },
  h3: { fontWeight: 600, letterSpacing: '-0.015em' },
  h4: { fontWeight: 600, letterSpacing: '-0.01em' },
  h5: { fontWeight: 600, letterSpacing: '-0.005em' },
  h6: { fontWeight: 600, letterSpacing: '-0.005em' },
  button: {
    fontWeight: 600,
    textTransform: 'none' as CSSProperties['textTransform'],
    letterSpacing: '0.02em',
  },
  subtitle1: { letterSpacing: '0.01em' },
  subtitle2: { letterSpacing: '0.01em' },
  body1: { letterSpacing: '0.004em' },
  body2: { letterSpacing: '0.004em' },
};

const transitions: TransitionsOptions = {
  duration: brand.motion.duration,
  easing: {
    easeInOut: brand.motion.easing.inOut,
    easeOut:   brand.motion.easing.out,
    easeIn:    brand.motion.easing.in,
    sharp:     brand.motion.easing.subtle,
  },
};

const baseComponents = (mode: 'light' | 'dark'): Components<Omit<Theme, 'components' | 'palette'>> => ({
  MuiCssBaseline: {
    styleOverrides: {
      ':root': {
        // CSS variables to let you live-tweak branding:
        '--zb-radius': `${brand.radius.md}px`,
        '--zb-gradient-soft': brand.gradients.primarySoft,
      } as any,
      'html, body, #root': { height: '100%' },
      body: {
        backgroundColor: mode === 'dark' ? brand.neutral[0] : brand.neutral[1000],
        color: mode === 'dark' ? brand.neutral[900] : brand.neutral[200],
        // smooth font and layout feel
        transition: `background-color ${transitions.duration!.standard}ms ${transitions.easing!.easeInOut},
                     color ${transitions.duration!.standard}ms ${transitions.easing!.easeInOut}`,
      },
      // Subtle custom scrollbar
      '*::-webkit-scrollbar': { height: 10, width: 10 },
      '*::-webkit-scrollbar-thumb': {
        background: mode === 'dark' ? alpha(brand.neutral[400], 0.5) : alpha(brand.neutral[500], 0.35),
        borderRadius: 8,
      },
      '*::-webkit-scrollbar-track': { background: 'transparent' },
    },
  },

  MuiButtonBase: {
    defaultProps: { disableRipple: true, disableTouchRipple: true }, // minimalist
  },

  MuiButton: {
    defaultProps: { variant: 'contained', disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: brand.radius.sm,
        paddingInline: 16,
        minHeight: 40,
        transition: `transform ${transitions.duration!.short}ms ${transitions.easing!.sharp},
                     background-color ${transitions.duration!.short}ms ${transitions.easing!.easeInOut}`,
        '&:active': { transform: 'translateY(1px) scale(0.995)' },
      },
      containedPrimary: {
        backgroundImage: brand.gradients.primaryHard,
      },
      outlined: {
        borderColor: alpha(mode === 'dark' ? '#a3afbd' : '#2e384a', 0.24),
        '&:hover': { borderColor: alpha('#8a75ff', 0.6), background: alpha('#8a75ff', 0.06) },
      },
      text: {
        '&:hover': { background: alpha('#8a75ff', 0.08) },
      },
    },
  },

  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        borderRadius: brand.radius.md,
        background: mode === 'dark' ? alpha('#ffffff', 0.025) : alpha('#000', 0.02),
        boxShadow: 'none',
        outline: `1px solid ${alpha(mode === 'dark' ? '#a3afbd' : '#2e384a', 0.16)}`,
        transition: `transform ${brand.motion.duration.shorter}ms ${brand.motion.easing.subtle},
                     outline-color ${brand.motion.duration.shorter}ms ${brand.motion.easing.inOut}`,
        '&:hover': {
          transform: 'translateY(-1px)',
          outlineColor: alpha('#8a75ff', 0.35),
        },
      },
    },
  },

  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: {
        borderRadius: brand.radius.md,
        backgroundImage: 'none',
        boxShadow: 'none',
      },
    },
  },

  MuiAppBar: {
    defaultProps: {
      elevation: 0 as AppBarProps['elevation'],
      color: 'transparent' as AppBarProps['color'], // keep literal union
    },
    styleOverrides: {
      root: {
        backdropFilter: 'saturate(120%) blur(8px)',
        background: mode === 'dark'
          ? alpha(brand.neutral[100], 0.3)
          : alpha(brand.neutral[1000], 0.6),
        borderBottom: `1px solid ${alpha(mode === 'dark' ? '#a3afbd' : '#2e384a', 0.18)}`,
      },
    },
  },

  MuiTextField: {
    defaultProps: { size: 'small', variant: 'outlined' },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: brand.radius.sm,
        '& fieldset': {
          borderColor: alpha(mode === 'dark' ? '#a3afbd' : '#2e384a', 0.28),
        },
        '&:hover fieldset': {
          borderColor: alpha('#8a75ff', 0.7),
        },
        '&.Mui-focused fieldset': {
          borderColor: '#8a75ff',
        },
      },
      input: { paddingBlock: 10 },
    },
  },

  MuiDialog: {
    defaultProps: { hideBackdrop: false },
    styleOverrides: {
      paper: {
        borderRadius: brand.radius.lg,
        outline: `1px solid ${alpha(mode === 'dark' ? '#a3afbd' : '#2e384a', 0.2)}`,
      },
      paperFullWidth: { maxWidth: 720 },
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: { padding: 8 },
      switchBase: {
        '&.Mui-checked': {
          color: '#fff',
          '& + .MuiSwitch-track': { background: brand.gradients.primaryHard, opacity: 1 },
        },
      },
      track: {
        background: alpha(mode === 'dark' ? '#8a75ff' : '#3b95ff', 0.25),
      },
    },
  },

  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 2,
        borderRadius: 1,
        background: brand.gradients.primaryHard,
      },
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: brand.radius.sm,
        backdropFilter: 'saturate(120%) blur(4px)',
        backgroundColor: mode === 'dark' ? alpha('#111622', 0.92) : alpha('#0b0d12', 0.92),
      },
    },
  },
});

// ---------- Dark theme (primary)
export const darkTheme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'dark',
    primary: { main: brand.primary[500] },
    secondary: { main: brand.secondary[500] },
    background: { default: brand.neutral[0], paper: brand.neutral[100] },
    text: {
      primary: brand.neutral[900],
      secondary: alpha(brand.neutral[900], 0.72),
    },
    success: { main: brand.success.main },
    warning: { main: brand.warning.main },
    error:   { main: brand.error.main },
    info:    { main: brand.info.main },
    divider: alpha('#a3afbd', 0.18),
  },
  typography: { ...commonTypography },
  shape: { borderRadius: brand.radius.md },
  shadows: buildShadows('dark'),
  transitions,
  components: baseComponents('dark'),
}));

// ---------- Light theme (optional)
export const lightTheme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'light',
    primary: { main: brand.primary[600] },
    secondary: { main: brand.secondary[500] },
    background: { default: brand.neutral[1000], paper: '#ffffff' },
    text: {
      primary: brand.neutral[200],
      secondary: alpha(brand.neutral[300], 0.8),
    },
    divider: alpha(brand.neutral[400], 0.18),
    success: { main: brand.success.main },
    warning: { main: brand.warning.main },
    error:   { main: brand.error.main },
    info:    { main: brand.info.main },
  },
  typography: { ...commonTypography },
  shape: { borderRadius: brand.radius.md },
  shadows: buildShadows('light'),
  transitions,
  components: baseComponents('light'),
}));

const theme = darkTheme;
export default theme;
