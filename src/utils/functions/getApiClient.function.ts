import { createApiClient } from '../../config/api.config';
import type { ApiServer } from '../../config/endpoints.config';

const apiCache = new Map<ApiServer, ReturnType<typeof createApiClient>>();

/**
 * Returns a cached Axios client for a given API server.
 * Creates it on first call.
 *
 * Example:
 *   const api = getApiClient('metrics');
 *   api.get('/status');
 */
export function getApiClient(server: ApiServer) {
  if (!apiCache.has(server)) {
    apiCache.set(server, createApiClient(server));
  }
  return apiCache.get(server)!;
}
