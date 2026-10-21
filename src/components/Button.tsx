import React from 'react';
import { Link } from '../utils/router';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
  id?: string;
  'aria-label'?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  target,
  rel,
  id,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-body font-medium transition-all rounded-lg select-none active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5 font-semibold',
  }[size];

  const variantStyles = {
    primary:
      'bg-sky-500 hover:bg-sky-400 text-[#0D1B2A] font-semibold shadow-sm hover:shadow-sky-500/20',
    secondary:
      'bg-[#0D1B2A] hover:bg-[#172A3A] text-white shadow-xs',
    outline:
      'border border-slate-700 hover:border-slate-500 bg-slate-900/60 text-slate-200 hover:bg-slate-800',
    whatsapp:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs',
    ghost:
      'text-[#0D1B2A] hover:bg-slate-100',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          id={id}
          href={href}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          className={combinedClasses}
          target={target}
          rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        id={id}
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        className={combinedClasses}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
