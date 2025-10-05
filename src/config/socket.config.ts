import { io, type Socket } from 'socket.io-client';
import { ENDPOINTS, type ApiServer } from './endpoints.config';

const sockets: Partial<Record<ApiServer, Socket>> = {};

/** Lazy singleton socket per namespace */
export function getSocket(server: ApiServer): Socket {
  if (sockets[server]) return sockets[server]!;

  const endpoint = ENDPOINTS[server].socketURL;
  if (!endpoint) throw new Error(`Socket URL missing for ${server}`);

  const token = localStorage.getItem('zb_auth_token');

  const socket = io(endpoint, {
    autoConnect: true,
    transports: ['websocket'],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    auth: token ? { token } : undefined,
  });

  // Optional listeners
  socket.on('connect', () => console.log(`[${server}] socket connected →`, socket.id));
  socket.on('disconnect', (reason) => console.warn(`[${server}] disconnected:`, reason));

  sockets[server] = socket;
  return socket;
}

/** Disconnect all sockets (e.g., on logout) */
export function disconnectAllSockets() {
  Object.values(sockets).forEach((s) => s?.disconnect());
}
