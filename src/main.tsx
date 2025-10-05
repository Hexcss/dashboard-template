import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeModeProvider } from './context/ThemeModeContext';
import './i18n';
import { LanguageProvider } from './context/LanguageContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
