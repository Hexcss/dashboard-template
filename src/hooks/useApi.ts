import { useMemo } from 'react';
import { getApiClient } from '../utils/functions/getApiClient.function';
import type { ApiServer } from '../config/endpoints.config';

/**
 * Provides a memoized Axios client for a given API server.
 */
export function useApi(server: ApiServer = 'metrics') {
  return useMemo(() => getApiClient(server), [server]);
}
