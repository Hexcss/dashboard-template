import { getSocket } from '../../config/socket.config';
import type { ApiServer } from '../../config/endpoints.config';

// Cache each socket instance so we only create one per server
const socketCache = new Map<ApiServer, ReturnType<typeof getSocket>>();

/**
 * Returns a cached socket.io client for a given server.
 * Creates and connects it automatically if not cached.
 *
 * Example:
 *   const socket = getSocketClient('metrics');
 *   socket.emit('ping');
 */
export function getSocketClient(server: ApiServer) {
  if (!socketCache.has(server)) {
    socketCache.set(server, getSocket(server));
  }
  return socketCache.get(server)!;
}
