import { createClient } from '@supabase/supabase-js';

const getEnvVar = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      return (import.meta as any).env[key];
    }
  } catch {
    // ignore
  }
  return undefined;
};

const SUPABASE_URL =
  getEnvVar('VITE_SUPABASE_URL') ||
  'https://iiquspioabbsclltqjme.supabase.co';

const SUPABASE_ANON_KEY =
  getEnvVar('VITE_SUPABASE_ANON_KEY') ||
  getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY') ||
  'sb_publishable_vbHgxPgYNGSS62ksvD9VnQ_yDYbrgb8';

/**
 * Reusable Supabase client configured with the public project URL
 * and publishable/anon key.
 * Security: NEVER include or expose service-role/secret keys here.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Strict single-user authorization constraint for Ajith Growth CMS.
 * Only this email address is authorized for CMS access.
 */
export const AUTHORIZED_CMS_EMAIL = 'ajithgrowth.consulting@gmail.com';

export function isAuthorizedEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === AUTHORIZED_CMS_EMAIL.toLowerCase();
}
