export interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  deliverable?: string;
  isLast?: boolean;
}

export function ProcessStep({
  number,
  title,
  description,
  deliverable,
}: ProcessStepProps) {
  return (
    <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#DCE5EE] shadow-xs flex flex-col justify-between h-full relative group hover:border-slate-400 transition-colors">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl sm:text-3xl font-heading font-bold text-slate-200 group-hover:text-sky-800 transition-colors">
            {number}
          </span>
          <span className="w-2 h-2 rounded-full bg-sky-600 opacity-60" />
        </div>
        <h3 className="font-heading font-semibold text-base sm:text-lg text-[#0D1B2A] tracking-wider uppercase mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {deliverable && (
        <div className="pt-3 border-t border-slate-100 text-[11px] font-supporting text-[#0D1B2A]">
          <span className="font-semibold text-sky-900 block uppercase tracking-wider">Output:</span>
          <span className="text-[#64748B]">{deliverable}</span>
        </div>
      )}
    </div>
  );
}
