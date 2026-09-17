export interface CategoryFaqTemplate {
  question: string;
  answer: string;
}

export const CATEGORY_FAQ_TEMPLATES: Record<string, CategoryFaqTemplate[]> = {
  // Category 1: Google Ads Insights
  'google-ads': [
    {
      question: 'What are Google Ads for residential construction companies?',
      answer:
        'Google Ads is a search advertising platform that allows residential builders and general contractors to appear at the very top of Google search results when local homeowners search for high-intent queries like custom home building, home additions, or luxury residential renovations.',
    },
    {
      question: 'Are Google Ads effective for home builders?',
      answer:
        'Yes, Google Ads can be highly effective for residential builders because they capture prospects actively searching for construction services with immediate commercial intent, unlike social media ads that rely on passive interruption.',
    },
    {
      question: 'How much should a residential construction company spend on Google Ads?',
      answer:
        'Ad spend depends on your geographic market, competitor density, and the specific residential project types you target. For high-ticket residential builds, campaigns should be funded adequately to secure high-intent clicks and statistically significant conversion data rather than spreading a minimal budget too thin.',
    },
    {
      question: 'Which Google Ads keywords should home builders target?',
      answer:
        'Home builders should focus on high-intent commercial keywords such as "custom home builder in [city]", "residential general contractor [suburb]", and "luxury home building company". Avoid vague informational terms like "home floor plans" or "construction materials" that attract research-phase users rather than ready clients.',
    },
    {
      question: 'Why do construction companies get irrelevant Google Ads leads?',
      answer:
        'Irrelevant inquiries typically occur when campaigns rely on broad match keywords without adequate negative keyword lists. Without strict targeting, ads show for handymen, commercial building queries, DIY repairs, job seekers, and sub-trades.',
    },
    {
      question: 'Should builders use broad match, phrase match or exact match keywords?',
      answer:
        'Residential builders usually achieve better intent control by combining exact match and carefully monitored phrase match keywords. Broad match should be reserved for mature accounts with established smart bidding and comprehensive negative keyword filters.',
    },
    {
      question: 'How can negative keywords improve construction Google Ads campaigns?',
      answer:
        'Negative keywords prevent your ads from appearing for unqualified search queries such as "jobs", "commercial", "cheap", "DIY", "course", or "subcontractor". By blocking irrelevant search terms, you protect your budget and direct ad spend toward genuine residential prospects.',
    },
    {
      question: 'Should residential builders advertise on Google Search or Display?',
      answer:
        'Google Search is the primary channel for customer acquisition because it captures active purchasing intent. The Google Display Network is better suited for brand awareness or selective remarketing to homeowners who have already visited your portfolio pages.',
    },
    {
      question: 'How should construction companies track Google Ads leads?',
      answer:
        'Builders should track confirmed form submissions, direct telephone calls with dynamic call tracking, and qualifying consultation requests. Tracking vanity metrics like raw clicks or pageviews without conversion attribution makes it impossible to optimize for qualified residential contracts.',
    },
    {
      question: 'What makes a good Google Ads landing page for a residential builder?',
      answer:
        'A high-performing landing page features a clear headline matching the search intent, professional photography of completed residential projects, client testimonials, specific territory service areas, and a low-friction consultation inquiry form.',
    },
  ],

  // Category 2: SEO Insights
  'seo': [
    {
      question: 'What is SEO for residential construction companies?',
      answer:
        'Search Engine Optimization (SEO) is the process of improving a residential construction website’s visibility in organic search results. It involves optimizing site architecture, service pages, local geographic signals, technical performance, and authoritative content so homeowners find your company organically.',
    },
    {
      question: 'How can SEO help home builders generate enquiries?',
      answer:
        'SEO positions your building company in front of homeowners who are actively researching builders, architects, and renovation contractors in your territory. Ranking for organic search terms establishes trust and delivers continuous inbound inquiries without paying per click.',
    },
    {
      question: 'How long can construction SEO take to show results?',
      answer:
        'Organic search growth typically takes several months of consistent technical improvements, content publishing, and local authority building. Timelines vary depending on domain age, current website health, and how competitive your local residential construction market is.',
    },
    {
      question: 'What keywords should residential builders target?',
      answer:
        'Builders should target high-intent local keywords combining service and territory, such as "custom home builder [city]", "residential home additions [neighborhood]", and "luxury home renovations [suburb]". Targeting location-specific phrases attracts homeowners within your actual service radius.',
    },
    {
      question: 'Why are location pages important for construction SEO?',
      answer:
        'Location pages establish geographic relevance for specific suburbs, municipalities, or luxury enclaves where you build. They signal to search engines that your business has genuine operational capability and portfolio history in those distinct areas.',
    },
    {
      question: 'Should builders create separate pages for different services?',
      answer:
        'Yes, dedicating distinct pages to custom homes, major renovations, architectural extensions, and design-build services allows each page to rank for specific search queries. Consolidating all services onto a single generic page dilutes search relevance.',
    },
    {
      question: 'How important are backlinks for construction websites?',
      answer:
        'Backlinks from reputable local business directories, industry associations, architecture publications, and supplier partnerships act as trust signals to search engines. Quality and local relevance matter far more than link quantity.',
    },
    {
      question: 'Does blogging help a residential construction company’s SEO?',
      answer:
        'Publishing in-depth articles that answer prospective homeowners’ questions about construction timelines, permitting, design choices, and budgeting builds topical authority. It also helps capture homeowners in the early planning stages before they submit a builder brief.',
    },
    {
      question: 'How does technical SEO affect a construction website?',
      answer:
        'Technical SEO ensures that search engines can easily crawl, index, and understand your website. Fast page load speeds, clean mobile responsiveness, proper canonical tags, and structured data schemas prevent crawl errors and improve user engagement.',
    },
    {
      question: 'How should construction companies measure SEO performance?',
      answer:
        'Track organic impressions, keyword ranking trends for core commercial search queries, organic traffic to service and portfolio pages, and most importantly, qualified consultation requests submitted through organic search channels.',
    },
  ],

  // Category 3: AI Search Insights
  'ai-search': [
    {
      question: 'What is AI search?',
      answer:
        'AI search refers to search engines and conversational engines (such as Google AI Overviews, Perplexity, and ChatGPT) that synthesize information from multiple web sources to provide direct, natural-language answers rather than just a list of blue links.',
    },
    {
      question: 'How is AI search different from traditional Google Search?',
      answer:
        'Traditional search matches keywords to relevant web pages and displays ranked links. AI search processes user intent conversationally, evaluates authoritative web sources, and summarizes comprehensive answers while citing source websites.',
    },
    {
      question: 'Can residential construction companies appear in AI-generated search answers?',
      answer:
        'Yes, residential construction companies can be cited in AI search summaries when their websites provide clear, factual, well-structured content that directly answers complex construction and home building inquiries.',
    },
    {
      question: 'What is Generative Engine Optimization (GEO)?',
      answer:
        'Generative Engine Optimization (GEO) is the practice of structuring website content, topical depth, authoritative citations, and schema markup so that large language models and AI search systems accurately understand, reference, and cite your brand.',
    },
    {
      question: 'How can builders optimize content for AI search?',
      answer:
        'Builders should provide clear, definitive answers to common homeowner questions, organize information with logical headings, incorporate factual project specifications, and avoid ambiguous marketing fluff that AI models struggle to extract.',
    },
    {
      question: 'Does structured data help AI search visibility?',
      answer:
        'Yes, structured data like Schema.org markup (including Organization, LocalBusiness, FAQPage, and BlogPosting) provides explicit machine-readable context about your business, projects, and geographic service areas, making it easier for AI parsers to interpret your content.',
    },
    {
      question: 'Are FAQs useful for AI search?',
      answer:
        'FAQs are exceptionally valuable for AI search because conversational searchers frequently query questions verbatim. Structured Question-Answer pairs provide concise, self-contained answers that AI systems can readily extract and cite.',
    },
    {
      question: 'Does brand authority affect AI search visibility?',
      answer:
        'Yes, AI models look for corroborating signals across third-party sources, reviews, directory listings, and industry citations. Established brand consistency across the web reinforces your company’s credibility in AI synthesis.',
    },
    {
      question: 'Will AI search replace traditional SEO?',
      answer:
        'AI search is evolving alongside traditional SEO rather than eliminating it. While high-level answers appear in AI overviews, homeowners seeking high-value residential contractors still click through to review portfolios, licensing, credentials, and contact details directly.',
    },
    {
      question: 'How can construction companies prepare their websites for AI-driven search?',
      answer:
        'Focus on original project case studies, transparent explanations of building methodologies, structured FAQ content, schema markup, and maintaining consistent local business information across all digital platforms.',
    },
  ],

  // Category 4: Google Business Profile Tips
  'google-business-profile': [
    {
      question: 'What is Google Business Profile?',
      answer:
        'Google Business Profile (formerly Google My Business) is a free tool provided by Google that allows residential builders and contractors to manage their presence on Google Search and Google Maps across local search results.',
    },
    {
      question: 'Why is Google Business Profile important for residential builders?',
      answer:
        'When local homeowners search for "custom home builders near me" or "renovation contractors [city]", Google often presents the local 3-Pack map results before organic listings. A strong profile captures prime visual real estate and immediate phone inquiries.',
    },
    {
      question: 'How should a construction company optimize its Google Business Profile?',
      answer:
        'Ensure your business name, address, and phone number (NAP) are accurate, select the most relevant primary business category, add detailed service descriptions, define your precise service areas, and regularly post high-resolution project photos.',
    },
    {
      question: 'Which Google Business Profile category should a home builder use?',
      answer:
        'Choose the most accurate primary category reflecting your core service, such as "Custom Home Builder", "General Contractor", or "Home Builder". Secondary categories like "Remodeler" or "Building Consultant" can be added to reflect secondary capabilities.',
    },
    {
      question: 'Do Google reviews help construction companies?',
      answer:
        'Authentic customer reviews directly influence local ranking algorithms and homeowner trust. Positive reviews that mention specific project types and neighborhoods reinforce local authority and improve inquiry conversion rates.',
    },
    {
      question: 'How should builders respond to Google reviews?',
      answer:
        'Respond promptly and professionally to all reviews. Thank satisfied clients while mentioning specific project aspects, and address critical feedback constructively with calm professionalism to demonstrate accountability to prospective clients.',
    },
    {
      question: 'Should construction companies upload project photos to Google Business Profile?',
      answer:
        'Yes, consistently adding high-quality exterior and interior photos of completed homes provides visual proof of craftsmanship. Google favors active profiles, and prospective clients frequently inspect photo tabs before reaching out.',
    },
    {
      question: 'How can builders improve local Google Maps visibility?',
      answer:
        'Maintain consistent business citations across industry directories, accumulate genuine customer reviews with descriptive detail, optimize your linked website with local schema, and keep profile information up to date.',
    },
    {
      question: 'Why might a Google Business Profile not appear in local search?',
      answer:
        'Common reasons include incorrect category selection, inconsistent address listings across the web, lack of verified status, policy violations, or being located too far outside the user’s immediate search proximity.',
    },
    {
      question: 'How often should a construction company update its Google Business Profile?',
      answer:
        'Review information at least monthly, upload new project imagery as milestones complete, publish Google updates or case studies every few weeks, and respond to incoming reviews within 24 to 48 hours.',
    },
  ],

  // Category 5: Construction Marketing
  'construction-marketing': [
    {
      question: 'What is digital marketing for residential construction companies?',
      answer:
        'Construction digital marketing encompasses the strategic use of search engine marketing, website architecture, portfolio presentation, local search optimization, and lead qualification workflows to generate contracted residential building projects.',
    },
    {
      question: 'How can home builders generate qualified leads online?',
      answer:
        'Qualified lead generation requires positioning your company in front of prospects with real intent, showcasing proof of quality through project case studies, and qualifying inquiries using targeted intake forms that verify budget, timeline, and site ownership.',
    },
    {
      question: 'Which marketing channels work for residential construction businesses?',
      answer:
        'Google Search Ads and Organic SEO typically deliver the highest-intent inquiries because prospects are actively searching for builders. Local Google Maps visibility and targeted referral systems complement search channels effectively.',
    },
    {
      question: 'Should construction companies invest in Google Ads or SEO?',
      answer:
        'Google Ads provides immediate visibility and intent capture, making it valuable for consistent lead flow and testing messaging. SEO builds long-term organic equity and brand authority that reduces reliance on paid advertising over time.',
    },
    {
      question: 'Why does a residential builder need a strong website?',
      answer:
        'A builder’s website serves as their digital showroom and primary credibility filter. Homeowners committing to high-value residential projects expect intuitive navigation, professional project galleries, clear process breakdowns, and transparent communication.',
    },
    {
      question: 'What should a construction company’s landing page include?',
      answer:
        'An effective construction landing page includes high-resolution photography, clear service scope, defined territory coverage, client testimonials, licensing and insurance details, and an intuitive consultation form.',
    },
    {
      question: 'How can builders improve website conversion rates?',
      answer:
        'Improve conversion by speeding up mobile page load times, replacing generic stock imagery with authentic project photos, simplifying form fields, and providing clear next steps for what happens after an inquiry is submitted.',
    },
    {
      question: 'Why is project photography important for construction marketing?',
      answer:
        'Residential construction is a visual, high-trust purchase. Professional photography showcases finishes, structural craftsmanship, and attention to detail that generic stock images can never convey.',
    },
    {
      question: 'How should construction companies measure marketing performance?',
      answer:
        'Measure cost per qualified consultation, proposal acceptance rate, and customer acquisition cost against contract value rather than vanity metrics like page impressions or raw clicks.',
    },
    {
      question: 'How can builders reduce low-quality online enquiries?',
      answer:
        'Filter low-intent leads by adding qualifying fields to inquiry forms (such as project budget ranges and land ownership status), using negative keywords in ad campaigns, and clearly stating your minimum project scope.',
    },
  ],

  // Category 6: Business Insights
  'business-insights': [
    {
      question: 'How should a residential construction company approach growth?',
      answer:
        'Sustainable construction growth requires balancing pipeline generation with operational capacity. Rather than chasing raw project volume, profitable builders focus on project profitability, clear client qualification, and disciplined project management.',
    },
    {
      question: 'What numbers should construction companies track from their marketing?',
      answer:
        'Essential metrics include total qualified consultations, lead-to-proposal ratio, contract close rate, average contract value, and marketing cost per closed project. Tracking these figures identifies where prospective clients drop out of the sales pipeline.',
    },
    {
      question: 'What is the difference between leads and qualified leads?',
      answer:
        'A lead is simply an inquiry or contact submission. A qualified lead represents a homeowner with verified land or property ownership, a realistic budget matching your pricing tiers, a realistic timeline, and project requirements aligned with your operational strengths.',
    },
    {
      question: 'Why is lead quality important for residential builders?',
      answer:
        'Estimating, quoting, and site visits consume significant executive time. Prioritizing qualified leads ensures your leadership and estimating teams invest resources into proposals with a high probability of closing profitably.',
    },
    {
      question: 'How should builders calculate marketing ROI?',
      answer:
        'Calculate marketing ROI by comparing net profit generated from signed construction contracts against total marketing expenditures, including ad spend, agency retainers, software, and creative production costs.',
    },
    {
      question: 'Why is conversion tracking important for construction companies?',
      answer:
        'Conversion tracking connects marketing dollars directly to business outcomes. Without it, builders cannot determine which campaigns, keywords, or referral sources are generating signed contracts versus empty clicks.',
    },
    {
      question: 'How can builders improve their lead follow-up process?',
      answer:
        'Establish a standardized intake protocol: acknowledge inquiries quickly, conduct a structured 15-minute phone qualification before booking in-person consultations, and maintain transparent communication regarding estimating timelines.',
    },
    {
      question: 'How should construction companies choose which locations to target?',
      answer:
        'Target geographic areas with favorable zoning, high home equity, active residential development, and project scopes matching your core craftsmanship. Concentrating in specific territories also optimizes subcontractor logistics and job site supervision.',
    },
    {
      question: 'Why should marketing and sales data be connected?',
      answer:
        'Connecting marketing analytics with sales CRM data reveals which marketing channels produce the most profitable finished projects, allowing builders to reallocate ad budget toward the highest-yielding client segments.',
    },
    {
      question: 'How can residential builders build a more predictable lead-generation system?',
      answer:
        'Build predictability by diversifying across high-intent Google search channels, maintaining a strong local reputation, qualifying inbound inquiries systematically, and maintaining consistent marketing activity throughout both peak and off-peak seasons.',
    },
  ],
};

/**
 * Returns preloaded FAQ template suggestions for a category slug.
 * If the category slug is unrecognized, defaults to 'google-ads'.
 */
export function getCategoryFaqTemplates(categorySlug: string): CategoryFaqTemplate[] {
  const normalized = categorySlug?.toLowerCase().trim();
  return CATEGORY_FAQ_TEMPLATES[normalized] || CATEGORY_FAQ_TEMPLATES['google-ads'] || [];
}
