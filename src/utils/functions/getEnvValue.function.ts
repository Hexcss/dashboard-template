import { ENV } from '../../config/env.config';

/**
 * Type-safe getter for environment values.
 * Example: getEnvValue('VITE_HOST')
 */
export function getEnvValue<K extends keyof typeof ENV>(key: K): typeof ENV[K] {
  return ENV[key];
}
