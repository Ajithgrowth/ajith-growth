export interface TimelineStage {
  label: string;
  subhead: string;
  items?: string[];
  description: string;
}

export interface WhatIBringCard {
  title: string;
  description: string;
}

export interface BusinessLesson {
  title: string;
  description: string;
}

export interface GrowthPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface ClientType {
  title: string;
  description: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

export const aboutData = {
  eyebrow: "ABOUT AJITH GROWTH",
  headline: "Built on Technology. Driven by Business. Focused on Growth.",
  supportingText: "Ajith Growth is a specialist growth consultancy focused on helping residential construction companies generate qualified homeowner opportunities through the evolving Google ecosystem.",
  credibilityLine: "16+ Years in Technology & Management • Hands-on Business Experience • Google Growth",

  journey: {
    headline: "From Technology & Management to Growth Consulting",
    paragraphs: [
      "My professional journey began in technology, where I spent more than 16 years working across technical and management roles in leading organizations. That experience taught me how to solve complex problems, build systems, manage teams and think strategically about business outcomes.",
      "After leaving the corporate world, I moved into entrepreneurship and became deeply involved in building and growing Shrusara Fashion Boutique with my wife. There, I took hands-on responsibility for business strategy, people, operations and marketing—including Google Ads, Google Business Profile and SEO.",
      "Working on a real business changed the way I looked at marketing. I learned that generating clicks is only one part of the equation; the real challenge is connecting the right customer, the right message and the right business outcome.",
      "That experience led to Ajith Growth—a consultancy focused on helping residential construction companies build measurable growth systems through Google."
    ],
    timeline: [
      {
        label: "16+ Years",
        subhead: "Technology & Management",
        description: "B.Tech Computer Science graduate with 16+ years building systems, leading teams, and solving complex technical and operational challenges."
      },
      {
        label: "Corporate Leadership",
        subhead: "Cognizant • Accenture • Wipro • HP • IBM • Kyndryl",
        description: "Worked across technical and management levels at top global technology enterprises, mastering systems thinking, data integrity, and disciplined delivery."
      },
      {
        label: "Entrepreneurship",
        subhead: "Shrusara Fashion Boutique",
        description: "Transitioned from corporate IT to active entrepreneurship with my wife, taking hands-on ownership of business strategy, hiring, finance, and marketing."
      },
      {
        label: "Hands-on Google Growth",
        subhead: "Google Ads • GBP • SEO • Conversion",
        description: "Directly managed and optimized Google Ad campaigns, Google Business Profile rankings, local SEO, and conversion experiences for real-world sales."
      },
      {
        label: "Today",
        subhead: "Ajith Growth",
        description: "Helping residential construction companies grow through Google by engineering connected, qualified, and measurable client acquisition systems."
      }
    ] as TimelineStage[]
  },

  whyAjithGrowth: {
    headline: "Where Technology Meets Business Growth",
    supportingText: "My technology background taught me to think in systems. My business experience taught me to think about customers, operations and outcomes. Ajith Growth brings both together to build practical, measurable growth systems for residential construction companies.",
    pillars: [
      {
        title: "Technology & Systems Thinking",
        description: "Years of working in technology and management shaped a structured approach to solving complex problems and building scalable systems."
      },
      {
        title: "Real Business Perspective",
        description: "Working hands-on in a real business taught me that marketing cannot operate in isolation. It must connect with customers, operations, sales and profitability."
      },
      {
        title: "Google Growth Expertise",
        description: "I bring these perspectives together across Google Ads, SEO, Google Business Profile, landing-page optimization, conversion tracking and evolving search technologies."
      }
    ] as WhatIBringCard[],
    closingStatement: "Technology helps build the system. Business understanding gives it purpose. Data helps make it better."
  },

  handsOnExperience: {
    headline: "Learning Growth by Building a Real Business",
    supportingText: "My move from the corporate world into entrepreneurship gave me the opportunity to apply technology, systems thinking and marketing in a real business environment.\n\nThrough my work with Shrusara Fashion Boutique, I have been directly involved in business strategy, people and operations, financial planning and digital marketing. This includes managing Google Ads, optimizing the Google Business Profile, developing SEO strategies and improving the customer journey from search to enquiry.\n\nWorking with a real business has taught me an important lesson: marketing performance cannot be separated from the business itself. The right audience, the right offer, the right message and the right conversion process all have to work together.",
    lessons: [
      {
        title: "Marketing Must Connect to Business Goals",
        description: "Clicks and impressions matter, but the ultimate objective is meaningful business growth."
      },
      {
        title: "Customer Intent Matters",
        description: "Not every enquiry has the same value. Understanding who is genuinely ready to buy is critical."
      },
      {
        title: "Data Should Drive Decisions",
        description: "Campaigns, search terms, conversions and customer behaviour provide the information needed to improve performance."
      },
      {
        title: "Systems Create Consistency",
        description: "A repeatable process is more valuable than relying on individual campaigns or short-term tactics."
      }
    ] as BusinessLesson[],
    closingStatement: "I don't approach growth purely from a marketing perspective. I approach it from the perspective of someone who has had to build and grow a real business."
  },

  growthPrinciples: {
    headline: "Systems. Search. Measurement. Results.",
    supportingText: "I believe sustainable growth doesn't come from a single campaign, channel or marketing tactic. It comes from building a connected system where the right audience can find the business, understand its value, take action and be measured throughout the journey.",
    principles: [
      {
        number: "01",
        title: "Understand Before You Advertise",
        description: "Start with the business, ideal customer, project value, locations and commercial goals before deciding what to promote."
      },
      {
        number: "02",
        title: "Intent Over Volume",
        description: "A smaller number of relevant enquiries can be more valuable than a large volume of low-intent leads."
      },
      {
        number: "03",
        title: "Build Systems, Not Campaigns",
        description: "Google Ads, SEO, Google Business Profile, landing pages and conversion tracking should work together rather than operate as isolated activities."
      },
      {
        number: "04",
        title: "Measure What Matters",
        description: "Go beyond clicks and impressions. Understand enquiries, qualified opportunities and the actions that contribute to business growth."
      },
      {
        number: "05",
        title: "Improve Continuously",
        description: "Search behaviour, technology and customer expectations keep changing. Growth systems should evolve with them."
      }
    ] as GrowthPrinciple[],
    closingStatement: "The goal isn't simply to generate more traffic. It's to build a system that consistently turns relevant search demand into measurable business opportunities."
  },

  whoIWorkWith: {
    headline: "Focused on Residential Construction Growth",
    supportingText: "Ajith Growth works with residential construction companies that want to build a stronger presence across Google and attract homeowners who are genuinely planning their next project.",
    clientTypes: [
      {
        title: "Turnkey Builders",
        description: "Helping companies offering end-to-end residential construction solutions reach homeowners looking for a complete construction partner."
      },
      {
        title: "Villa Construction Companies",
        description: "Helping villa builders connect with homeowners planning premium, customized residential projects."
      },
      {
        title: "Luxury Home Builders",
        description: "Supporting businesses targeting high-value homeowners who prioritize design, quality, transparency and execution."
      },
      {
        title: "Premium Residential Construction",
        description: "Working with companies that want to compete through quality, trust and value rather than simply being the lowest-priced option."
      }
    ] as ClientType[],
    closingStatement: "My focus is deliberately narrow: helping residential construction companies build a stronger and more measurable growth engine through Google."
  },

  approach: {
    headline: "My Approach to Growth",
    subhead: "Understand → Attract → Convert → Measure → Optimize → Grow",
    intro: "Every business is different. I start by understanding the business, its ideal projects and customers before recommending where and how to invest in Google. From there, I build, measure and continuously improve the growth system based on real data.",
    steps: [
      {
        number: "01",
        title: "Understand",
        description: "Learn the business before choosing the marketing strategy."
      },
      {
        number: "02",
        title: "Attract",
        description: "Reach the right audience at the right moment."
      },
      {
        number: "03",
        title: "Convert",
        description: "Turn relevant traffic into meaningful opportunities."
      },
      {
        number: "04",
        title: "Measure",
        description: "Know what is actually generating results."
      },
      {
        number: "05",
        title: "Optimize",
        description: "Improve based on evidence, not assumptions."
      },
      {
        number: "06",
        title: "Grow",
        description: "Build a stronger growth engine over time."
      }
    ] as ApproachStep[],
    closingStatement: "Growth is not a one-time campaign. It's a continuous process of understanding, testing, measuring and improving."
  },

  finalCta: {
    headline: "Let's Discuss What's Working—and Where Your Pipeline Leaks",
    supportingText: "Every construction company has a unique bottleneck: some need higher-intent search traffic; others get clicks but lose serious homeowners on weak landing pages. Let's look at your actual numbers and find your leverage point.",
    primaryButtonText: "Book a Growth Consultation",
    secondaryButtonText: "Explore Our Services",
    smallNote: "An honest, strategic conversation with Ajith—grounded in 16+ years of systems engineering and real-world business ownership."
  }
};
