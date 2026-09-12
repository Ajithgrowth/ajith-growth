/**
 * Analytics Readiness Helper
 * Prepares the site for Google Analytics 4, GTM, and Google Ads Conversion Tracking.
 * Dispatches structured events to window.dataLayer or console when configured.
 */

import { siteConfig } from '../data/siteConfig';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type AnalyticsEventName =
  | 'consultation_cta_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'consultation_form_start'
  | 'consultation_form_submit'
  | 'article_click'
  | 'category_filter_click'
  | 'service_cta_click';

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  const gaId = siteConfig.analytics.gaMeasurementId;
  const gtmId = siteConfig.analytics.gtmId;

  // Initialize GA4 only if gaMeasurementId is configured and non-empty
  if (gaId && typeof gaId === 'string' && gaId.trim() !== '') {
    if (!document.getElementById('ga4-script')) {
      const script = document.createElement('script');
      script.id = 'ga4-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId.trim())}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      const gtag = function (...args: any[]) {
        window.dataLayer?.push(args);
      };
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', gaId.trim(), { send_page_view: true });
    }
  }

  // Initialize GTM only if gtmId is configured and non-empty
  if (gtmId && typeof gtmId === 'string' && gtmId.trim() !== '') {
    if (!document.getElementById('gtm-script')) {
      const script = document.createElement('script');
      script.id = 'gtm-script';
      script.async = true;
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${encodeURIComponent(gtmId.trim())}');`;
      document.head.appendChild(script);
    }
  }
}

export function trackEvent(eventName: AnalyticsEventName, properties?: Record<string, any>) {

  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...properties,
  };

  // Push to GTM dataLayer if present
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload);
  }

  // Call gtag if available
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, properties);
  }

  // Log in development for auditability
  if (process.env.NODE_ENV !== 'production') {
    console.debug(`[Analytics Tracked] ${eventName}`, properties);
  }
}
