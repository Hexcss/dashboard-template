// Declare your route IDs once; keeps things typed and discoverable.
export const routeIds = {
  home: 'home',
  login: 'login',
  dashboard: 'dashboard',
} as const;

export type RouteId = typeof routeIds[keyof typeof routeIds];

// Public / Protected / Hybrid
export type RouteAccess = 'public' | 'protected';

// For param typing (extend as you add params)
export type RouteParams = {
  [routeIds.home]: void;
  [routeIds.login]: void;
  [routeIds.dashboard]: void; // e.g. { orgId: string } if you add /org/:orgId
};

// Generic result of a route module’s lazy() import
export type LazyRouteModule = {
  Component?: React.ComponentType<any>;
  // You can also export loader/action/ErrorBoundary later if needed
};
