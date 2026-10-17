import { ArrowRight, AlertCircle, BadgeIndianRupee, Search, MousePointerClick, Eye, Crosshair, BriefcaseBusiness, Cpu, Network } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from '../utils/router';
import { siteConfig } from '../data/siteConfig';
import { ArticleCard } from '../components/ArticleCard';
import { getAllArticles } from '../generated/insights';
import { staticPagesSeo } from '../data/seoData';
import { Button } from '../components/Button';
import { CTASection } from '../components/CTASection';

const problems = [
  { title: 'Low-Intent Enquiries', text: 'People may enquire without having a genuine need, clear requirement or realistic buying intent.', icon: AlertCircle },
  { title: 'Price-Focused Enquiries', text: "A high number of enquiries doesn't help if most people are only looking for the cheapest option.", icon: BadgeIndianRupee },
  { title: 'Poor Search Intent', text: 'Your business may be reaching people who are searching, but not necessarily looking for what you actually offer.', icon: Search },
  { title: 'Weak Conversion', text: "Getting people to your website is only the first step. If the message, page or next action isn't clear, good opportunities can be lost.", icon: MousePointerClick },
  { title: 'Limited Google Visibility', text: 'Potential customers may be searching for your services but may not find your business when it matters.', icon: Eye },
  { title: 'Poor Tracking', text: 'Without proper conversion tracking, it is difficult to know which searches, campaigns and pages are actually bringing valuable enquiries.', icon: Crosshair },
];

const growthStages = [
  { number: '01', title: 'ATTRACT', line: 'Reach the right people when they are searching.', text: 'Google Ads helps put your business in front of people who are actively looking for the products or services you offer.' },
  { number: '02', title: 'GET FOUND', line: 'Build visibility beyond paid advertising.', text: 'SEO and Google Business Profile help your business become easier to find when potential customers search for relevant services, businesses and solutions.' },
  { number: '03', title: 'CONVERT', line: 'Turn interest into meaningful enquiries.', text: 'A good click is only the beginning. Your landing pages and website experience should make it clear what you offer, why it matters and what the visitor should do next.' },
  { number: '04', title: 'MEASURE', line: 'Know what is actually working.', text: 'Conversion tracking, GA4 and Search Console help understand where visitors are coming from, what they do and which activities are contributing to enquiries.' },
  { number: '05', title: 'EVOLVE', line: 'Use data to improve the system over time.', text: "Campaigns, search behaviour, website performance and customer enquiries provide useful insights. We use them to refine what is working, fix what isn't and improve growth over time." },
];

const methodology = [
  { number: '01', title: 'UNDERSTAND', heading: 'Start With the Business', text: 'Understand your business, ideal customers, services, locations, competition and commercial goals before deciding what to do.', focus: 'Business first.' },
  { number: '02', title: 'ATTRACT', heading: 'Reach the Right Audience', text: 'Build the right search strategy and reach people who are actively looking for the products or services you offer.', focus: 'Right audience.' },
  { number: '03', title: 'CONVERT', heading: 'Turn Interest Into Action', text: 'Make sure your website, landing pages and customer journey give genuine prospects a clear reason and an easy way to enquire.', focus: 'Visitor → Enquiry.' },
  { number: '04', title: 'MEASURE', heading: 'Track What Matters', text: 'Measure meaningful actions such as calls, forms, WhatsApp enquiries and other important customer interactions.', focus: 'Data → Decisions.' },
  { number: '05', title: 'OPTIMIZE', heading: 'Improve With Real Data', text: 'Use search behaviour, campaign performance, website data and customer enquiries to identify what is working and what needs to improve.', focus: 'Learn → Improve.' },
  { number: '06', title: 'GROW', heading: 'Build Better Over Time', text: 'Continuously improve the Google Growth System as your business, customers, competition and search behaviour evolve.', focus: 'Sustainable growth.' },
];

export function HomePage() {
  const seo = staticPagesSeo['/'];
  const articles = getAllArticles().filter((article) => !article.draft);
  const threeInsights = [...articles.filter((article) => article.featured), ...articles.filter((article) => !article.featured)].slice(0, 3);

  return (
    <main id="main-content" className="w-full">
      <SEO title={seo.title} description={seo.description} canonicalUrl={seo.canonicalUrl} ogImage={seo.ogImage} />
      <section className="relative overflow-hidden bg-[#0D1B2A] text-white py-20 sm:py-28 border-b border-slate-800">
        <img src="/images/hero-home.jpg" alt="Residential construction" className="absolute inset-0 h-full w-full object-cover opacity-20" width={2000} height={1200} fetchPriority="high" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-5xl">
          <span className="inline-flex rounded-md border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold tracking-wider text-sky-400">GOOGLE GROWTH CONSULTANT FOR CONSTRUCTION &amp; PREMIUM BRIDAL &amp; DESIGNER BOUTIQUES</span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-heading font-bold tracking-tight leading-tight">Turning Google Visibility Into Meaningful Business Growth</h1>
          <p className="mt-6 max-w-4xl text-lg sm:text-xl text-slate-200 leading-relaxed"><span className="block font-semibold text-white">For residential construction companies and selected premium bridal and designer boutiques.</span><span className="mt-3 block">Ajith Growth connects Google Ads, SEO, local search, landing pages and conversion tracking to help the right customers discover your business, understand its value and take the next step.</span></p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4"><Button href="/contact" size="lg">Book a Growth Consultation <ArrowRight className="w-5 h-5" /></Button><Button href="#growth-system" variant="outline" size="lg">Explore Our Approach</Button></div>
          <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-4xl">
            <Link href="/industries/construction" className="rounded-xl border border-sky-500/40 bg-sky-950/55 p-5 transition-colors hover:border-sky-400"><span className="block text-[11px] font-semibold tracking-wider text-sky-400">PRIMARY FOCUS</span><span className="mt-2 block font-heading font-semibold text-white">Residential Construction Growth</span><span className="mt-2 block text-sm text-slate-300">Google visibility, relevant homeowner enquiries and measurable growth.</span></Link>
            <Link href="/industries/boutiques" className="rounded-xl border border-fuchsia-300/30 bg-slate-900/75 p-5 transition-colors hover:border-fuchsia-200/60"><span className="block text-[11px] font-semibold tracking-wider text-fuchsia-200">SELECTED SECONDARY FOCUS</span><span className="mt-2 block font-heading font-semibold text-white">Premium Bridal &amp; Designer Boutique Growth</span><span className="mt-2 block text-sm text-slate-300">Relevant search discovery and a clearer path from Google to enquiry.</span></Link>
          </div>
        </div></div>
      </section>

      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">Getting More Leads Isn't Always the Answer.</h2><p className="mt-4 text-lg text-[#64748B] leading-relaxed">The goal isn't simply to generate more enquiries. It's to attract the right people, give them a clear reason to choose you, and turn genuine interest into meaningful business opportunities.</p></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{problems.map(({ title, text, icon: Icon }) => <article key={title} className="rounded-2xl border border-[#DCE5EE] bg-white p-7"><Icon className="w-6 h-6 text-sky-800 mb-4" /><h3 className="text-lg font-heading font-semibold text-[#0D1B2A]">{title}</h3><p className="mt-2 text-sm text-[#64748B] leading-relaxed">{text}</p></article>)}</div>
        <p className="mt-10 rounded-2xl border border-[#DCE5EE] bg-white p-6 text-base text-[#0D1B2A] leading-relaxed">Ajith Growth connects the right search intent, the right message and the right conversion experience — so growth is built around meaningful opportunities, not just lead volume.</p>
      </div></section>

      <section id="growth-system" className="py-20 sm:py-24 bg-[#F3F7FB] border-b border-[#DCE5EE] scroll-mt-24"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-12"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">A Google Growth System, Not Just Another Marketing Service</h2><p className="mt-4 text-lg text-[#64748B] leading-relaxed">Growth doesn't come from one activity alone. Google Ads, SEO, Google Business Profile, landing pages and conversion tracking work better when they are connected.</p><p className="mt-3 text-lg text-[#64748B] leading-relaxed">Ajith Growth brings these pieces together into one practical growth system — designed to help the right people find your business, understand what you offer, take action and measure what happens next.</p></div>
        <div className="grid lg:grid-cols-5 gap-4">{growthStages.map((stage, index) => <article key={stage.title} className="relative rounded-2xl bg-[#0D1B2A] p-6 text-white"><span className="text-xs font-semibold text-sky-400">{stage.number}</span><h3 className="mt-2 font-heading font-semibold">{stage.title}</h3><p className="mt-3 text-sm font-semibold text-white">{stage.line}</p><p className="mt-2 text-xs text-slate-300 leading-relaxed">{stage.text}</p>{index < growthStages.length - 1 && <span className="hidden lg:block absolute -right-3 top-1/2 z-10 text-sky-700">→</span>}</article>)}</div>
        <p className="mt-8 text-base text-[#0D1B2A]">The goal is simple: attract the right audience, become easier to find, convert genuine interest into enquiries, measure the results and continuously improve.</p>
      </div></section>

      <section className="py-20 sm:py-24 bg-white border-b border-[#DCE5EE]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">Who We Help</h2><p className="mt-4 text-lg text-[#64748B]">Ajith Growth works with businesses that want to build a stronger presence on Google and turn search visibility into meaningful business opportunities.</p></div>
        <div className="grid lg:grid-cols-5 gap-6"><article className="lg:col-span-3 rounded-2xl bg-[#0D1B2A] text-white p-8 sm:p-10"><span className="text-xs font-semibold tracking-wider text-sky-400">PRIMARY INDUSTRY</span><h3 className="mt-3 text-2xl font-heading font-semibold">Residential Construction</h3><p className="mt-3 text-slate-200">Helping residential construction companies attract better homeowner enquiries through Google.</p><p className="mt-6 text-sm text-slate-300">Turnkey home construction • Villa construction • Duplex house construction • Premium residential construction • Custom home construction</p><p className="mt-5 text-sm text-slate-300">Reaching genuine homeowners • Improving Google visibility • Reducing low-intent enquiries • Improving lead quality • Converting search traffic into enquiries • Understanding which Google activities are actually working</p><Link href="/industries/construction" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sky-400">Explore Construction Growth <ArrowRight className="w-4 h-4" /></Link></article>
          <article className="lg:col-span-2 rounded-2xl border border-[#C9D7E5] bg-[#F8FAFC] p-8 sm:p-10"><span className="text-xs font-semibold tracking-wider text-sky-800">SELECTED SECONDARY INDUSTRY</span><h3 className="mt-3 text-2xl font-heading font-semibold text-[#0D1B2A]">Premium Bridal & Designer Boutiques</h3><p className="mt-3 text-[#64748B] leading-relaxed">Helping premium bridal and designer boutiques build stronger visibility and attract customers who value their work.</p><p className="mt-6 text-sm text-[#64748B]">Bridal wear • Designer blouses • Couture and occasion wear • Custom fashion • Premium ethnic and designer wear</p><p className="mt-5 text-sm text-[#64748B] leading-relaxed">Our focus is on helping boutiques improve their Google visibility, reach the right search audience and create a better path from discovery to enquiry.</p><p className="mt-3 text-sm text-[#64748B] leading-relaxed">This can include Google Business Profile and local search presence, relevant enquiries, landing pages and conversion tracking.</p><Link href="/industries/boutiques" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sky-800">Explore Boutique Growth <ArrowRight className="w-4 h-4" /></Link></article></div>
        <p className="mt-8 text-[#64748B]">Different industries have different customers, but the principle remains the same — be visible when people are searching, communicate your value clearly, and make it easy for the right customer to take the next step.</p>
      </div></section>

      <section className="py-20 sm:py-24 bg-[#0D1B2A] text-white border-b border-slate-800"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-12"><span className="text-xs font-semibold tracking-wider text-sky-400">WHY AJITH GROWTH</span><h2 className="mt-3 text-3xl sm:text-4xl font-heading font-semibold">Technology Experience. Business Thinking. Search Growth.</h2><p className="mt-4 text-lg text-slate-300">Ajith Growth is built on 16+ years of experience in technology and management, combined with hands-on experience building and marketing a real business.</p></div>
        <div className="grid md:grid-cols-3 gap-6">{[
          ['01', '16+ Years in Technology & Management', 'Experience across technical and management roles in leading organizations including Cognizant, Accenture, Wipro, HP, IBM and Kyndryl.', Cpu],
          ['02', 'Real Business Experience', 'Practical experience in business strategy and marketing through Shrusara Fashion Boutique, including Google Ads, Google Business Profile, SEO, conversion optimization and growth.', BriefcaseBusiness],
          ['03', 'A Connected Growth Approach', 'Connecting search intent, advertising, visibility, conversion and measurement into one structured growth system.', Network],
        ].map(([number, title, text, Icon]: any) => <article key={number} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-7"><Icon className="w-6 h-6 text-sky-400" /><span className="mt-5 block text-xs text-sky-400">{number}</span><h3 className="mt-2 text-lg font-heading font-semibold">{title}</h3><p className="mt-3 text-sm text-slate-300 leading-relaxed">{text}</p></article>)}</div>
        <div className="mt-10 max-w-4xl rounded-2xl border border-slate-700 bg-slate-900/60 p-8"><blockquote className="text-lg italic text-slate-200">“{siteConfig.founder.statement}”</blockquote><p className="mt-4 text-sm text-sky-400">— Ajith, Founder, Ajith Growth</p><Link href="/industries/boutiques#shrusara-case-study" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300">See the Shrusara hands-on business experience <ArrowRight className="w-4 h-4" /></Link></div>
      </div></section>

      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-[#DCE5EE]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-12"><span className="text-xs font-semibold tracking-wider text-sky-800">OUR METHODOLOGY</span><h2 className="mt-3 text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">A Structured Approach to Sustainable Growth</h2><p className="mt-4 text-lg text-[#64748B]">We don't treat Google Ads, SEO, local visibility and conversion as separate activities. We connect them through a structured process designed around your business goals and ideal customers.</p></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">{methodology.map((step, index) => <article key={step.number} className="relative rounded-2xl border border-[#DCE5EE] bg-white p-6"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D1B2A] text-xs font-bold text-white">{step.number}</span><span className="text-xs font-bold tracking-wider text-sky-800">{step.title}</span></div><h3 className="mt-5 text-base font-heading font-semibold text-[#0D1B2A]">{step.heading}</h3><p className="mt-2 text-xs text-[#64748B] leading-relaxed">{step.text}</p><p className="mt-4 text-xs font-semibold text-[#0D1B2A]">Focus: {step.focus}</p>{index < methodology.length - 1 && <span className="hidden lg:block absolute -right-3 top-1/2 z-10 text-sky-700">→</span>}</article>)}</div>
        <p className="mt-8 text-[#0D1B2A]">No shortcuts. No disconnected activities. Just a structured process built around your business, your customers and measurable growth.</p>
      </div></section>

      <section className="py-20 sm:py-24 bg-white border-b border-[#DCE5EE]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"><div className="max-w-3xl"><h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#0D1B2A]">Growth Insights</h2><p className="mt-4 text-[#64748B]">Practical insights on Google Ads, SEO, Google Business Profile, AI Search and business growth — with construction as the primary focus and selected guidance for premium bridal and designer boutiques.</p></div><Link href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-800">Explore All Insights <ArrowRight className="w-4 h-4" /></Link></div><div className="grid md:grid-cols-3 gap-8">{threeInsights.map((article) => <ArticleCard key={article.slug} article={article} />)}</div><div className="mt-8 rounded-2xl border border-[#DCE5EE] bg-[#F3F7FB] p-6 sm:flex sm:items-center sm:justify-between sm:gap-6"><div><h3 className="font-heading font-semibold text-[#0D1B2A]">Looking for Boutique Growth guidance?</h3><p className="mt-2 text-sm text-[#64748B]">Explore the dedicated Boutique Growth page and Ajith's hands-on business experience through Shrusara Fashion Boutique.</p></div><Link href="/industries/boutiques" className="mt-5 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-sky-800">Explore Boutique Growth <ArrowRight className="w-4 h-4" /></Link></div><p className="mt-8 text-sm text-[#64748B]">Sharing practical knowledge to help businesses make better marketing and growth decisions.</p></div></section>

      <CTASection title="Let's Build a Better Growth System" description="Whether you run a residential construction company or a premium bridal or designer boutique, let's start with a conversation about your business, your ideal customers and where your current Google growth system can improve." primaryButtonText="Book a Growth Consultation" primaryButtonHref="/contact" secondaryButtonText="Explore Our Services" secondaryButtonHref="/services" supportingLine="No generic packages. No one-size-fits-all approach. Just a growth strategy built around your business." />
    </main>
  );
}
