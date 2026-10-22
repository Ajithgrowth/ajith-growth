import { createClient } from '@supabase/supabase-js';

const configuredUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const configuredPublishableKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined);

/** True only when the deployment has been configured for its current Supabase project. */
export const isSupabaseConfigured = Boolean(configuredUrl && configuredPublishableKey);

// These placeholders deliberately prevent an unconfigured deployment from
// connecting to a previous Supabase project. Configure the two VITE_ variables
// in Vercel before using the CMS.
const SUPABASE_URL = configuredUrl || 'https://supabase-not-configured.invalid';
const SUPABASE_ANON_KEY = configuredPublishableKey || 'supabase-not-configured';

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
