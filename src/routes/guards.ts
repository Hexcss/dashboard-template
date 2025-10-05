import { redirect } from 'react-router-dom';
import { buildPath, paths } from './paths';

function isAuthenticated(): boolean {
  return !!localStorage.getItem('zb_auth_token');
}

export async function requireAuthLoader() {
  if (!isAuthenticated()) {
    throw redirect(buildPath('login'));
  }
  return null;
}

export async function requireAnonLoader() {
  if (isAuthenticated()) {
    throw redirect(paths.dashboard);
  }
  return null;
}
