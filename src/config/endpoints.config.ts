import { getEnvValue } from "../utils/functions/getEnvValue.function";

/**
 * Add all services here.
 * Each will share the same host but use its own port.
 */
export type ApiServer =
    | 'terminal'
    | 'metrics'


interface EndpointConfig {
    baseURL: string;
    socketURL?: string;
    port?: number;
}

// Helper to build full URL from host + port
function buildUrl(host: string, port: number, protocol: 'http' | 'ws' = 'http'): string {
    const prefix = protocol === 'ws' ? 'ws' : 'http';
    const secure = window.location.protocol === 'https:' ? 's' : '';
    return `${prefix}${secure}://${host}:${port}`;
}

const HOST = getEnvValue('VITE_HOST');

// Define port map (local ports)
const PORTS = {
    metrics: 11081,
    terminal: 11082,
} as const;

// Build the endpoints
export const ENDPOINTS: Record<ApiServer, EndpointConfig> = {
    metrics: {
        baseURL: buildUrl(HOST, PORTS.metrics),
        socketURL: buildUrl(HOST, PORTS.metrics, 'ws'),
        port: PORTS.metrics,
    },
    terminal: {
        baseURL: buildUrl(HOST, PORTS.terminal),
        socketURL: buildUrl(HOST, PORTS.terminal, 'ws'),
        port: PORTS.terminal,
    },
};
