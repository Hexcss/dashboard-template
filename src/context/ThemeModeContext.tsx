import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '../theme/index';

type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('zentra-theme');
    if (stored === 'light' || stored === 'dark') setMode(stored);
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) setMode('light');
  }, []);

  useEffect(() => {
    localStorage.setItem('zentra-theme', mode);
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = (): ThemeModeContextValue => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within a ThemeModeProvider');
  return ctx;
};
