import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://iiquspioabbsclltqjme.supabase.co';

const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ||
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
