import { AlertCircle, Target, TrendingDown, MapPin, DollarSign } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export function ProblemSection() {
  const painPoints = [
    {
      icon: TrendingDown,
      number: '01',
      title: 'Low-Quality Leads',
      description: 'Handyman inquiries, tire-kickers and low budgets. Your team spends valuable estimation hours fielding requests for $500 repairs rather than high-value residential commissions.',
    },
    {
      icon: DollarSign,
      number: '02',
      title: 'Wasted Ad Spend',
      description: 'Broad clicks, poor negative keywords, no CRM feedback. Thousands of dollars lost each month targeting DIY searches, commercial specs, and out-of-territory seekers.',
    },
    {
      icon: MapPin,
      number: '03',
      title: 'Weak Local Positioning',
      description: 'Limited visibility across key local service territories and Google local searches. Competitors capture prime search real estate in your target residential markets.',
    },
    {
      icon: AlertCircle,
      number: '04',
      title: 'No Business Accountability',
      description: 'Reports full of impressions and clicks, zero insight into signed contracts. Vanity metrics that fail to correlate with your pipeline or bottom-line bank balance.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-[#DCE5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="INDUSTRY REALITY"
          title="The Disconnect in Construction Marketing"
          description="Most digital marketing agencies treat residential construction like fast-turnaround consumer services. Because residential builds and substantial renovations involve extensive review cycles and significant homeowner investment, generic marketing playbooks fall short."
          centered
        />


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.number}
                className="bg-white rounded-2xl p-7 border border-[#DCE5EE] shadow-xs hover:border-[#CBD5E1] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-[#0D1B2A] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <span className="text-xs font-supporting font-bold text-slate-400">
                      {point.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#0D1B2A] mb-3">
                    {point.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
