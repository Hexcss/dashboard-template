import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../context/ThemeModeContext';

export const ThemeToggleButton: React.FC = () => {
  const { mode, toggleMode } = useThemeMode();
  const theme = useTheme();
  const { t } = useTranslation();

  const isDark = mode === 'dark';

  return (
    <Tooltip title={t(isDark ? 'actions.switch_light_mode' : 'actions.switch_dark_mode')}>
      <IconButton
        onClick={toggleMode}
        disableRipple
        sx={{
          color: theme.palette.text.primary,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'rotate(20deg) scale(1.1)' },
        }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </IconButton>
    </Tooltip>
  );
};
