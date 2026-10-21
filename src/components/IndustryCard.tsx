import { Home, Landmark, Sparkles, Building2 } from 'lucide-react';

export interface IndustryCardProps {
  title: string;
  description: string;
  iconName?: 'home' | 'landmark' | 'sparkles' | 'building';
  typicalProjects?: string;
  className?: string;
}

export function IndustryCard({
  title,
  description,
  iconName = 'home',
  typicalProjects,
  className = '',
}: IndustryCardProps) {
  const IconComponent = {
    home: Home,
    landmark: Landmark,
    sparkles: Sparkles,
    building: Building2,
  }[iconName] || Home;

  return (
    <div
      className={`p-6 sm:p-7 rounded-xl bg-white border border-[#DCE5EE] hover:border-slate-400 transition-all shadow-xs flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="w-11 h-11 rounded-lg bg-[#F3F7FB] text-[#0D1B2A] flex items-center justify-center mb-4 border border-[#DCE5EE]">
          <IconComponent className="w-5 h-5 text-sky-800" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-[#0D1B2A] mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {typicalProjects && (
        <div className="pt-3 border-t border-[#DCE5EE] text-[11px] font-supporting text-[#0D1B2A]">
          <span className="font-semibold text-sky-900 block">Focus:</span>
          <span className="text-[#64748B]">{typicalProjects}</span>
        </div>
      )}
    </div>
  );
}
