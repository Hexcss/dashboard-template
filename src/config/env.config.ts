import { REQUIRED_ENV_KEYS, type AppEnv } from '../utils/types/env.types';

/**
 * Reads env vars from import.meta.env and validates required ones.
 * Throws a descriptive error early in dev and build.
 */
function loadEnv(): AppEnv {
  const env = import.meta.env as unknown as Record<string, string | undefined>;

  const missing = REQUIRED_ENV_KEYS.filter(k => !env[k]);
  if (missing.length) {
    const formatted = missing.map(k => `  • ${k}`).join('\n');
    throw new Error(
      `❌ Missing required environment variables:\n${formatted}\n` +
      'Check your .env or build environment.'
    );
  }

  return {
    VITE_HOST: env.VITE_HOST!,
    VITE_APP_NAME: env.VITE_APP_NAME!,
    VITE_ENABLE_ANALYTICS: env.VITE_ENABLE_ANALYTICS as "true" | "false" ?? 'false',
    VITE_ENV: (env.VITE_ENV ?? 'development') as AppEnv['VITE_ENV'],
  };
}

export const ENV = loadEnv();

export const IS_PROD = ENV.VITE_ENV === 'production';
export const IS_DEV = ENV.VITE_ENV === 'development';
export const IS_STAGING = ENV.VITE_ENV === 'staging';
