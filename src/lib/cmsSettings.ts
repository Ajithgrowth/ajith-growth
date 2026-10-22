import { siteConfig } from '../data/siteConfig';
import { isSupabaseConfigured, supabase } from './supabase';
import type { CMSGlobalSettings } from '../types/cmsSettings';

export const defaultCmsSettings: CMSGlobalSettings = {
  authorName: 'Ajith B R',
  authorBio: siteConfig.founder.bio,
  authorImage: '',
  authorClosingText: '',
  ctaHeading: "Let's Build a Better Growth System",
  ctaDescription: "Start with a conversation about your business, your goals and where your current growth system can improve.",
  primaryCtaText: 'Book a Growth Consultation',
  primaryCtaUrl: '/contact',
  whatsappButtonText: 'Chat on WhatsApp',
  whatsappNumber: siteConfig.whatsappNumber,
  whatsappMessage: 'Hello Ajith, I would like to discuss growth consulting for my business.',
  secondaryCtaText: 'Explore All Services',
  secondaryCtaUrl: '/services',
  keyUrls: {
    Homepage: '/',
    About: '/about',
    Contact: '/contact',
    'Construction Growth': '/construction-growth',
    'Boutique Growth': '/boutique-growth',
    'Shared Services': '/services',
    Insights: '/insights',
  },
};

function asSettings(value: unknown): CMSGlobalSettings {
  const candidate = value && typeof value === 'object' ? value as Partial<CMSGlobalSettings> : {};
  return {
    ...defaultCmsSettings,
    ...candidate,
    keyUrls: { ...defaultCmsSettings.keyUrls, ...(candidate.keyUrls || {}) },
  };
}

export async function getCmsSettings(): Promise<CMSGlobalSettings> {
  if (!isSupabaseConfigured) return defaultCmsSettings;
  const { data, error } = await supabase.from('cms_site_settings').select('settings').eq('id', 'global').maybeSingle();
  return !error && data ? asSettings(data.settings) : defaultCmsSettings;
}

export async function saveCmsSettings(settings: CMSGlobalSettings): Promise<{ error?: string }> {
  const { error } = await supabase
    .from('cms_site_settings')
    .upsert({ id: 'global', settings, updated_at: new Date().toISOString() }, { onConflict: 'id' });
  return error ? { error: error.message } : {};
}

export function buildWhatsAppUrl(settings: CMSGlobalSettings): string {
  const number = settings.whatsappNumber.replace(/\D/g, '');
  if (!number) return '';
  const message = settings.whatsappMessage.trim();
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
