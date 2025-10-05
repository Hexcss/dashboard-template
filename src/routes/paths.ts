import { type RouteId, type RouteParams } from './types';

// Central path map (add new routes here)
export const paths: Record<RouteId, string> = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
};

// Build a URL with params in a typed way (extend to replace :param segments)
export function buildPath<K extends RouteId>(key: K, _params?: RouteParams[K]): string {
  // No params in these examples; extend as needed:
  return paths[key];
}
