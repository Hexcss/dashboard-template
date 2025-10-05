// Design tokens – adjust freely to match final brand colors.
export const brand = {
  // Primaries (techy purple → blue range)
  primary: {
    50:  '#f2efff',
    100: '#e5ddff',
    200: '#c9bbff',
    300: '#ad99ff',
    400: '#9a86ff',
    500: '#8a75ff',   // <-- main (close to your historic #a288ff family)
    600: '#7a66f0',
    700: '#6b58d8',
    800: '#5947bc',
    900: '#493b9b',
  },
  secondary: {
    50:  '#ebf5ff',
    100: '#d6eaff',
    200: '#add4ff',
    300: '#85bfff',
    400: '#5aa8ff',
    500: '#3b95ff',
    600: '#2e77cc',
    700: '#235aa0',
    800: '#1a4277',
    900: '#122c50',
  },

  // Neutrals (cooler slate for that “futuristic control room” vibe)
  neutral: {
    0:   '#0b0d12',   // page background (dark)
    50:  '#0f1117',
    100: '#131722',
    200: '#1b2230',
    300: '#242c3a',
    400: '#2e384a',
    500: '#39455a',
    600: '#55657d',
    700: '#7a889c',
    800: '#a3afbd',
    900: '#d4d9e0',
    1000:'#f4f6f9',   // page background (light)
  },

  success: { main: '#37d67a' },
  warning: { main: '#ffb020' },
  error:   { main: '#ff5a5f' },
  info:    { main: '#3b95ff' },

  // Gradients (subtle, no neon)
  gradients: {
    primarySoft: 'linear-gradient(135deg, rgba(138,117,255,0.16) 0%, rgba(59,149,255,0.12) 100%)',
    primaryHard: 'linear-gradient(135deg, #8a75ff 0%, #3b95ff 100%)',
  },

  radius: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },

  // Minimal “shadow” that is actually a hairline outline + faint ring
  // to keep depth without drop shadows.
  outline: {
    soft: '0 0 0 1px rgba(148, 163, 184, 0.20), 0 0 0 6px rgba(138, 117, 255, 0.06)',
    hard: '0 0 0 1px rgba(148, 163, 184, 0.28)',
  },

  // Motion
  motion: {
    duration: {
      shortest: 120,
      shorter:  160,
      short:    200,
      standard: 240,
      complex:  320,
    },
    easing: {
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      out:   'cubic-bezier(0.0, 0, 0.2, 1)',
      in:    'cubic-bezier(0.4, 0, 1, 1)',
      subtle:'cubic-bezier(0.2, 0, 0, 1)', // slightly snappier, still smooth
    },
  },
} as const;
