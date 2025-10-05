import React from 'react';
import { MenuItem, Select, Tooltip, Box } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation();

  return (
    <Tooltip title={t('actions.switch_language')}>
      <Select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          minWidth: 80,
          ml: 1,
          borderRadius: 1,
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        <MenuItem value="en">
          <Box display="flex" alignItems="center" gap={1}>
            <ReactCountryFlag countryCode="GB" svg style={{ fontSize: '1.2em' }} />
            EN
          </Box>
        </MenuItem>
        <MenuItem value="es">
          <Box display="flex" alignItems="center" gap={1}>
            <ReactCountryFlag countryCode="ES" svg style={{ fontSize: '1.2em' }} />
            ES
          </Box>
        </MenuItem>
      </Select>
    </Tooltip>
  );
};
