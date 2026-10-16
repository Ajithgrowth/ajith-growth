import { Target, Compass, MapPin, Layout, BarChart3, Cpu, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from '../utils/router';
import { services } from '../data/services';
import { staticPagesSeo } from '../data/seoData';
import { CTASection } from '../components/CTASection';
import { Button } from '../components/Button';

const serviceImages: Record<string, string> = {
  'google-ads': '/images/article-google-ads.jpg', 'local-seo': '/images/article-local-seo.jpg',
  'google-business-profile': '/images/article-google-business-profile.jpg', 'landing-pages': '/images/article-landing-pages.jpg',
  'conversion-tracking': '/images/service-conversion-tracking.jpg', 'geo-ai-search': '/images/article-geo-ai-search.jpg',
  'growth-strategy': '/images/article-conversion-tracking.jpg',
};

const iconMap: Record<string, any> = { Target, Compass, MapPin, Layout, BarChart3, Cpu, ShieldCheck };
const journey = [
  ['1', 'ATTRACT', 'Google Ads', 'Reach relevant prospects who are actively searching for your services.'],
  ['2', 'GET FOUND', 'Local SEO + Google Business Profile', 'Strengthen your presence when potential customers search for relevant services.'],
  ['3', 'CONVERT', 'Landing Page Optimization', 'Help visitors understand your offering and take the next step.'],
  ['4', 'MEASURE', 'Conversion Tracking', 'Measure important customer actions and evaluate marketing performance.'],
  ['5', 'EVOLVE', 'GEO + AI Search', 'Strengthen the digital foundations that support visibility as search experiences evolve.'],
];

export function ServicesPage() {
  const seo = staticPagesSeo['/services'];
  return <main id="main-content">
    <SEO title={seo.title} description={seo.description} canonicalUrl={seo.canonicalUrl} ogImage={seo.ogImage} breadcrumbs={seo.breadcrumbs} includeServices />
    <section className="bg-[#0D1B2A] text-white py-20 sm:py-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl"><nav className="text-xs text-slate-400 mb-6"><Link href="/">Home</Link> / Services</nav><h1 className="text-4xl sm:text-5xl font-heading font-bold">Google Growth Services Built Around Your Business</h1><p className="mt-6 text-lg text-slate-300 leading-relaxed">Ajith Growth brings together Google Ads, SEO, Google Business Profile, landing pages and conversion tracking to help businesses become easier to find, attract the right audience and turn relevant searches into meaningful enquiries.</p><p className="mt-3 text-lg text-slate-300">Our primary focus is residential construction companies, with selected work in premium and designer boutiques. Every strategy starts with understanding the business, its customers and its goals.</p><p className="mt-6 text-sm font-semibold text-sky-400">Not every business needs more traffic. It needs the right traffic, the right message and a system that turns attention into opportunity.</p><div className="mt-8 flex flex-col sm:flex-row gap-4"><Button href="/contact" size="lg">Talk About Your Growth <ArrowRight className="w-5 h-5" /></Button><Button href="/industries/boutiques" variant="outline" size="lg">Explore Boutique Growth</Button></div></div></div></section>

    <nav className="sticky top-20 z-30 bg-white border-b border-[#DCE5EE] overflow-x-auto"><div className="max-w-7xl mx-auto px-4 py-3 flex gap-4 min-w-max">{services.map((service) => <a key={service.id} href={`#${service.id}`} className="text-xs font-semibold text-[#64748B] hover:text-[#0D1B2A]">{service.title}</a>)}</div></nav>

    <div className="divide-y divide-[#DCE5EE]">{services.map((service, index) => {
      const Icon = iconMap[service.iconName] || Target;
      return <section id={service.id} key={service.id} className={`py-20 sm:py-24 scroll-mt-32 ${index % 2 ? 'bg-[#F8FAFC]' : 'bg-white'}`}><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D1B2A]"><Icon className="w-5 h-5 text-sky-400" /></span><span className="text-xs font-bold tracking-wider text-sky-800">{service.eyebrow}</span></div><h2 className="mt-4 text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">{service.title}</h2><p className="mt-5 text-base text-[#64748B] leading-relaxed">{service.description}</p><h3 className="mt-8 text-sm font-semibold text-[#0D1B2A]">What We Focus On</h3><div className="mt-4 grid sm:grid-cols-2 gap-4">{service.focusAreas.map((area) => <div key={area} className="flex items-start gap-3 rounded-xl border border-[#DCE5EE] bg-white p-4"><Check className="mt-0.5 w-4 h-4 shrink-0 text-sky-700" /><span className="text-sm text-[#64748B] leading-relaxed">{area}</span></div>)}</div><Button href="/contact" variant="secondary" className="mt-8">{service.cta} <ArrowRight className="w-4 h-4" /></Button></div>
        <aside className="lg:col-span-5"><img src={serviceImages[service.id]} alt="" className="w-full aspect-16/10 object-cover rounded-2xl border border-[#DCE5EE]" loading="lazy" /><div className="mt-6 rounded-2xl border border-[#DCE5EE] bg-white p-7"><span className="text-xs font-bold text-sky-800">BUSINESS OUTCOME</span><h3 className="mt-2 text-xl font-heading font-semibold text-[#0D1B2A]">{service.businessOutcome}</h3><p className="mt-4 text-sm text-[#64748B] leading-relaxed">{service.strategicNote}</p></div></aside>
      </div></div></section>;
    })}</div>

    <section className="py-20 sm:py-24 bg-[#F3F7FB] border-b border-[#DCE5EE]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mb-12"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">One Growth System. Connected From Search to Opportunity.</h2><p className="mt-4 text-lg text-[#64748B]">The strongest growth systems connect search visibility, paid traffic, conversion and measurement. Ajith Growth brings these capabilities together around your business goals rather than treating them as separate marketing activities.</p><p className="mt-3 text-lg text-[#64748B]">From attracting relevant prospects to helping them discover your business, take action and measure what happens next, every stage has a purpose.</p></div><div className="grid lg:grid-cols-5 gap-4">{journey.map(([number, title, service, text], index) => <article key={title} className="relative rounded-2xl bg-[#0D1B2A] text-white p-6"><span className="text-xs text-sky-400">{number}</span><h3 className="mt-2 font-heading font-semibold">{title}</h3><p className="mt-3 text-sm font-semibold text-sky-400">{service}</p><p className="mt-2 text-xs text-slate-300 leading-relaxed">{text}</p>{index < 4 && <span className="hidden lg:block absolute -right-3 top-1/2 z-10 text-sky-700">→</span>}</article>)}</div><div className="mt-6 rounded-2xl border border-[#DCE5EE] bg-white p-7"><h3 className="font-heading font-semibold text-[#0D1B2A]">Growth Strategy</h3><p className="mt-2 text-sm text-[#64748B]">Connects every stage around your business goals.</p></div><p className="mt-8 text-[#0D1B2A]">One strategy. Connected capabilities. Continuous improvement.</p></div></section>

    <CTASection title="Ready to Build a Better Growth System?" description="Let's understand your business, your ideal projects and your current marketing setup—and identify where Google can create better opportunities for growth. Whether you're looking to attract better-qualified homeowner enquiries or help the right customers discover your boutique, let's start with a conversation about your business, your goals and where your current growth system can improve." primaryButtonText="Book a Growth Consultation" primaryButtonHref="/contact" secondaryButtonText="Explore Our Approach" secondaryButtonHref="/about" supportingLine="No generic packages. No one-size-fits-all approach. Just a growth strategy built around your business." />
  </main>;
}
