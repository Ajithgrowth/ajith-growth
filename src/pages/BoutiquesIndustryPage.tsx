import {
  ArrowRight,
  BarChart3,
  Compass,
  MapPin,
  MessageCircle,
  MousePointerClick,
  Search,
  Target,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from '../utils/router';
import { staticPagesSeo } from '../data/seoData';
import { CTASection } from '../components/CTASection';
import { Button } from '../components/Button';
import { trackEvent } from '../utils/analytics';

const businesses = [
  ['Bridal & Couture Boutiques', 'Custom bridal wear and specialized designer creations.'],
  ['Premium Bridal & Designer Boutiques', 'Distinctive, customized fashion for customers who value design and craftsmanship.'],
  ['Customization-Led Boutiques', 'Made-to-measure outfits, personalized design and specialized craftsmanship.'],
  ['Occasion-Wear & Designer-Wear Businesses', 'Selected businesses specializing in special-occasion and designer outfits.'],
];

const challenges = [
  ['Relevant Google Discovery', 'Potential customers may not discover the boutique through relevant Google searches.', Search],
  ['Search & Service Alignment', 'Search terms may not clearly align with the customization-led services the boutique offers.', Target],
  ['Unclear Customer Journey', "Website visitors may not understand the boutique's customization process or the next step.", MousePointerClick],
  ['Price-Focused Enquiries', 'Some enquiries may focus primarily on price rather than design, craftsmanship or service suitability.', MessageCircle],
  ['Limited Measurement', 'It can be difficult to know which marketing activities generate meaningful enquiries.', BarChart3],
];

const capabilities = [
  ['Google Ads', 'Reach customers through relevant, high-intent searches.', Target],
  ['Google Business Profile', 'Strengthen local discovery and present accurate business information on Google and Google Maps.', MapPin],
  ['Local SEO', 'Build relevant organic search visibility around the boutique, its services and customer needs.', Compass],
  ['Landing Pages & Conversion', 'Explain customized services clearly and create a better path from search to enquiry.', MousePointerClick],
  ['Conversion Tracking', 'Measure calls, forms, WhatsApp enquiries and other meaningful customer actions.', BarChart3],
  ['Growth Strategy', 'Connect business goals, customer intent, visibility, conversion and measurement.', Search],
];

const lessons = [
  ['01', 'Search Intent', 'The search terms, campaign structure and message should reflect what the boutique actually offers.'],
  ['02', 'Campaign Segmentation', 'Different services and customer needs require clear campaign and keyword organization.'],
  ['03', 'Local Visibility', 'Google Business Profile, accurate business information and local search presence work together.'],
  ['04', 'Landing-Page Relevance', 'Customers need a clear explanation of the offering, customization process and next step.'],
  ['05', 'Conversion Measurement', 'Calls, forms and WhatsApp actions need to be understood before advertising figures are treated as business outcomes.'],
  ['06', 'Continuous Optimization', 'Search behaviour, campaign data and customer enquiries provide practical direction for improvement.'],
];

const approach = [
  ['01', 'UNDERSTAND', 'Learn the business, its ideal customers, services and growth priorities.'],
  ['02', 'ATTRACT', 'Reach relevant customers when they are actively searching.'],
  ['03', 'CONVERT', 'Create a clear journey from discovery to a meaningful enquiry.'],
  ['04', 'MEASURE', 'Understand which customer actions and marketing activities matter.'],
  ['05', 'OPTIMIZE', 'Improve using search behaviour, campaign data and customer enquiries.'],
  ['06', 'GROW', 'Build a stronger growth system over time.'],
];

export function BoutiquesIndustryPage() {
  const seo = staticPagesSeo['/industries/boutiques'];

  return (
    <main id="main-content">
      <SEO title={seo.title} description={seo.description} canonicalUrl={seo.canonicalUrl} ogImage={seo.ogImage} breadcrumbs={seo.breadcrumbs} />

      <section className="bg-[#0D1B2A] text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <nav className="text-xs text-slate-400 mb-6"><Link href="/">Home</Link> / Industries / Boutiques</nav>
            <span className="text-xs font-semibold tracking-wider text-sky-400">BOUTIQUE GROWTH</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-heading font-bold">Premium Bridal & Designer Boutique Growth</h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">Helping selected premium bridal and designer boutiques strengthen their Google presence, reach relevant customers and create a clearer path from search to enquiry.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/contact?industry=boutiques#consultation-form" size="lg" onClick={() => trackEvent('consultation_cta_click', { location: 'boutique_hero', industry: 'premium-designer-boutiques' })}>Discuss Boutique Growth <ArrowRight className="w-5 h-5" /></Button>
              <Button href="#shrusara-case-study" variant="outline" size="lg">See Hands-On Experience</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">Who We Help</h2>
            <p className="mt-4 text-lg text-[#64748B]">Ajith Growth works selectively with premium bridal, designer and customization-led boutiques that want to strengthen their Google presence and connect with customers who appreciate their work.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businesses.map(([title, text]) => <article key={title} className="rounded-2xl border border-[#DCE5EE] bg-[#F8FAFC] p-6"><h3 className="font-heading font-semibold text-[#0D1B2A]">{title}</h3><p className="mt-3 text-sm text-[#64748B] leading-relaxed">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-12"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">Boutique Growth Challenges</h2><p className="mt-4 text-lg text-[#64748B]">Every boutique is different. These are common challenges to assess when building a clearer path from search to enquiry.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{challenges.map(([title, text, Icon]: any) => <article key={title} className="rounded-2xl border border-[#DCE5EE] bg-white p-7"><Icon className="w-6 h-6 text-sky-800" /><h3 className="mt-4 font-heading font-semibold text-[#0D1B2A]">{title}</h3><p className="mt-3 text-sm text-[#64748B] leading-relaxed">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-12"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">How Ajith Growth Helps</h2><p className="mt-4 text-lg text-[#64748B]">The approach connects relevant search visibility, the customer journey and meaningful measurement around the boutique's business goals and ideal customers.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{capabilities.map(([title, text, Icon]: any) => <article key={title} className="rounded-2xl border border-[#DCE5EE] bg-[#F8FAFC] p-7"><Icon className="w-6 h-6 text-sky-800" /><h3 className="mt-4 font-heading font-semibold text-[#0D1B2A]">{title}</h3><p className="mt-3 text-sm text-[#64748B] leading-relaxed">{text}</p></article>)}</div>
          <Link href="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-800">Explore Our Services <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      <section id="shrusara-case-study" className="py-20 sm:py-24 bg-[#0D1B2A] text-white border-b border-slate-800 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="text-xs font-semibold tracking-wider text-sky-400">HANDS-ON BUSINESS EXPERIENCE</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-semibold">Shrusara Fashion Boutique</h2>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">Shrusara Fashion Boutique is a bridal and designer boutique in Bangalore offering customized outfits, personalized design and specialized craftsmanship.</p>
            <p className="mt-4 text-slate-300 leading-relaxed">Ajith has hands-on experience with its business strategy, marketing and Google presence. The work undertaken includes Google Ads campaign planning and optimization, campaign and keyword structure, Google Business Profile optimization, website and landing-page improvements, SEO and content development, and conversion tracking and performance monitoring.</p>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-heading font-semibold">Practical Lessons</h3>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">{lessons.map(([number, title, text]) => <article key={number} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6"><span className="text-xs font-bold text-sky-400">{number}</span><h4 className="mt-2 font-heading font-semibold">{title}</h4><p className="mt-3 text-sm text-slate-300 leading-relaxed">{text}</p></article>)}</div>
          </div>

          <div className="mt-10 rounded-2xl border border-sky-800/60 bg-sky-950/40 p-7">
            <h3 className="font-heading font-semibold text-sky-300">Transparency Statement</h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">Shrusara Fashion Boutique is a real business with which Ajith has hands-on experience in business strategy and digital growth. This case study documents that practical experience and the work undertaken.</p>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">Advertising-platform figures are not presented as confirmed enquiries, orders, sales or business outcomes. Numerical outcomes will only be published after the counted conversion actions can be verified and reconciled.</p>
          </div>

          <Button href="/contact?industry=boutiques#consultation-form" className="mt-8" onClick={() => trackEvent('consultation_cta_click', { location: 'boutique_case_study', industry: 'premium-designer-boutiques' })}>Discuss Boutique Growth <ArrowRight className="w-4 h-4" /></Button>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-[#F3F7FB] border-b border-[#DCE5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-12"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">A Connected Boutique Growth Approach</h2><p className="mt-4 text-lg text-[#64748B]">The approach connects business understanding, relevant search visibility, conversion experience, measurement and continuous improvement.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">{approach.map(([number, title, text], index) => <article key={number} className="relative rounded-2xl border border-[#DCE5EE] bg-white p-5"><span className="text-xs font-bold text-sky-800">{number}</span><h3 className="mt-2 text-sm font-heading font-semibold text-[#0D1B2A]">{title}</h3><p className="mt-3 text-xs text-[#64748B] leading-relaxed">{text}</p>{index < approach.length - 1 && <span className="hidden lg:block absolute -right-3 top-1/2 z-10 text-sky-700">→</span>}</article>)}</div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-[#DCE5EE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h2 className="text-3xl font-heading font-semibold text-[#0D1B2A]">Let's Talk About Your Boutique Growth</h2><p className="mt-4 text-[#64748B]">Share your business, ideal customers, current Google visibility and growth priorities so the conversation can begin with the right context.</p><Button href="/contact?industry=boutiques#consultation-form" className="mt-7" onClick={() => trackEvent('consultation_cta_click', { location: 'boutique_dedicated_cta', industry: 'premium-designer-boutiques' })}>Start a Boutique Growth Conversation <ArrowRight className="w-4 h-4" /></Button></div>
      </section>

      <CTASection title="Ready to Build a Stronger Boutique Growth System?" description="If you want to strengthen your Google presence and create a clearer path from search to enquiry, let's start with a conversation about your boutique, your ideal customers and your growth priorities." primaryButtonText="Discuss Boutique Growth" primaryButtonHref="/contact?industry=boutiques#consultation-form" secondaryButtonText="Explore Our Services" secondaryButtonHref="/services" supportingLine="A conversation first. A strategy next. Growth built around your business." trackingLocation="boutique_final_cta" />
    </main>
  );
}
