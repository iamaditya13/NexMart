export type DemoAuthState = {
  token: string;
  username: string;
  fullName?: string;
  email?: string;
};

export type DemoProfileState = {
  username: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
};

export const AUTH_STORAGE_KEY = 'nexmart.demo.auth';
export const PROFILE_STORAGE_KEY = 'nexmart.demo.profile';
export const AUTH_EVENT_KEY = 'nexmart-auth-updated';

export function getDemoAuthState() {
  if (typeof window === 'undefined') return null;

  try {
    const rawValue = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue) as DemoAuthState | null;
    if (!parsed?.token) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setDemoAuthState(value: DemoAuthState) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(AUTH_EVENT_KEY));
}

export function clearDemoAuthState() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT_KEY));
}

export function getDemoProfileState() {
  if (typeof window === 'undefined') return null;

  try {
    const rawValue = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue) as DemoProfileState | null;
    if (!parsed?.username) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setDemoProfileState(value: DemoProfileState) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(AUTH_EVENT_KEY));
}
