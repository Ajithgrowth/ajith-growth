import { ChevronRight } from 'lucide-react';
import { Link } from '../utils/router';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`py-3 ${className}`}>
      <ol className="flex items-center flex-wrap gap-2 text-xs font-supporting text-[#64748B]">
        <li>
          <Link href="/" className="hover:text-[#0D1B2A] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="text-[#0D1B2A] font-semibold truncate max-w-[200px] sm:max-w-md">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[#0D1B2A] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
