export interface NavItem {
  name: string;
  href: string;
}

export interface BusinessAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  countryName: string;
  formatted: string;
}

export interface SocialProfiles {
  linkedin: string;
  googleBusinessProfile: string;
  youtube: string;
  twitter: string;
  instagram: string;
}

export const siteConfig = {
  siteName: "Ajith Growth",
  brandName: "Ajith Growth",
  siteUrl: "https://ajithgrowth.com",
  websiteUrl: "https://ajithgrowth.com",
  canonicalDomain: "https://ajithgrowth.com",
  positioning: "Google Growth Consultant for Residential Construction Companies",
  primaryTagline: "Helping Residential Construction Companies Grow Through Google",
  heroH1: "Helping Residential Construction Companies Grow Through Google",
  heroSupportingCopy: "We build Google Growth Systems that help residential construction companies attract qualified homeowner enquiries, improve conversion, and measure what actually drives growth.",
  secondaryStatement: "Building Growth Systems That Deliver Qualified Leads and Measurable Results.",
  founderName: "Ajith B R",
  location: "Bangalore, Karnataka, India",
  email: "ajithgrowth.consulting@gmail.com",
  emailMailto: "mailto:ajithgrowth.consulting@gmail.com",
  phone: "+91 78922 47558",
  phoneDisplay: "+91 78922 47558",
  phoneTel: "tel:+917892247558",
  whatsapp: "https://wa.me/917892247558",
  whatsappNumber: "917892247558",
  whatsappUrl: "https://wa.me/917892247558",
  whatsappLink: "https://wa.me/917892247558",
  whatsappDisplay: "+91 78922 47558",
  openingHours: "24 hours a day, 7 days a week",
  openingHoursDisplay: "Open 24/7",
  address: {
    streetAddress: "#106, 2nd Floor, 6th Main, Mahalakshmipuram",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560086",
    addressCountry: "IN",
    countryName: "India",
    formatted: "#106, 2nd Floor, 6th Main, Mahalakshmipuram, Bangalore, Karnataka 560086, India",
  } as BusinessAddress,
  founder: {
    name: "Ajith B R",
    title: "Founder — Ajith Growth",
    role: "Founder — Ajith Growth",
    positioning: "Google Ads • SEO • AI Search • Google Business Profile Consultant",
    experience: "16+ Years in Technology Leadership & Management",
    bio: "Ajith is a technology and business professional focused on helping residential construction companies build measurable growth systems through Google. His background combines 16+ years in IT leadership with hands-on business growth experience.",
    statement: "I believe marketing works best when technology, business understanding and measurable execution come together.",
  },
  primaryServices: [
    "Google Ads Consulting",
    "SEO Consulting",
    "AI Search Optimization",
    "Google Business Profile Optimization",
    "Construction Marketing Consulting",
  ],
  navigation: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ] as NavItem[],
  serviceLinks: [
    { name: "Google Ads", href: "/services#google-ads" },
    { name: "Local SEO", href: "/services#local-seo" },
    { name: "Google Business Profile", href: "/services#google-business-profile" },
    { name: "Landing Pages", href: "/services#landing-pages" },
    { name: "Conversion Tracking", href: "/services#conversion-tracking" },
    { name: "GEO & AI Search", href: "/services#geo-ai-search" },
  ] as NavItem[],
  socialProfiles: {
    linkedin: "",
    googleBusinessProfile: "",
    youtube: "",
    twitter: "",
    instagram: "",
  } as SocialProfiles,
  // Helper to extract only configured, non-empty, valid URLs for sameAs
  getValidSameAs(): string[] {
    const urls = Object.values(this.socialProfiles);
    return urls.filter((url): url is string => typeof url === 'string' && url.trim().startsWith('http'));
  },
  socialLinks: {
    email: "mailto:ajithgrowth.consulting@gmail.com",
    phone: "tel:+917892247558",
    whatsapp: "https://wa.me/917892247558",
    linkedin: "",
  },
  contact: {
    email: "ajithgrowth.consulting@gmail.com",
    emailMailto: "mailto:ajithgrowth.consulting@gmail.com",
    phone: "+91 78922 47558",
    phoneDisplay: "+91 78922 47558",
    phoneTel: "tel:+917892247558",
    whatsapp: "https://wa.me/917892247558",
    whatsappNumber: "917892247558",
    whatsappUrl: "https://wa.me/917892247558",
    whatsappDisplay: "+91 78922 47558",
    linkedin: "",
    location: "Bangalore, Karnataka, India",
    address: "#106, 2nd Floor, 6th Main, Mahalakshmipuram, Bangalore, Karnataka 560086, India",
    workingHours: "Open 24/7 (24 hours a day, 7 days a week)",
  },
  analytics: {
    gaMeasurementId:
      (typeof process !== 'undefined' && process.env?.VITE_GA_MEASUREMENT_ID) ||
      (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GA_MEASUREMENT_ID) ||
      '',
    gtmId:
      (typeof process !== 'undefined' && process.env?.VITE_GTM_ID) ||
      (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GTM_ID) ||
      '',
    googleSiteVerification:
      (typeof process !== 'undefined' && process.env?.VITE_GOOGLE_SITE_VERIFICATION) ||
      (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GOOGLE_SITE_VERIFICATION) ||
      '',
  },
  capabilityLine: "Google Ads • Local SEO • Google Business Profile • Landing Pages • Conversion Tracking • AI Search",

  colors: {
    midnight: "#0D1B2A",
    white: "#FFFFFF",
    offWhite: "#F8FAFC",
    softBlue: "#F3F7FB",
    border: "#DCE5EE",
    slate: "#64748B",
  }
};

export const SCHEMA_IDS = {
  organization: `${siteConfig.canonicalDomain}/#organization`,
  person: `${siteConfig.canonicalDomain}/#person`,
  website: `${siteConfig.canonicalDomain}/#website`,
  localBusiness: `${siteConfig.canonicalDomain}/#localbusiness`,
} as const;

