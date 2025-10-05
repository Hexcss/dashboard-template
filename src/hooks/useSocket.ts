import { useEffect, useMemo } from 'react';
import type { ApiServer } from '../config/endpoints.config';
import { getSocketClient } from '../utils/functions/getSocketClient.function';

/**
 * React hook wrapper for a persistent socket.io connection.
 */
export function useSocket(server: ApiServer = 'metrics') {
  const socket = useMemo(() => getSocketClient(server), [server]);

  useEffect(() => {
    if (!socket.connected) socket.connect();
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [socket]);

  return socket;
}
