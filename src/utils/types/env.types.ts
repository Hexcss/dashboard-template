export interface AppEnv {
  VITE_HOST: string;
  VITE_APP_NAME: string;
  VITE_ENABLE_ANALYTICS: 'true' | 'false';
  VITE_ENV: 'development' | 'staging' | 'production';
}

export const REQUIRED_ENV_KEYS: (keyof AppEnv)[] = [
  'VITE_HOST',
  'VITE_APP_NAME',
  'VITE_ENV',
];
