import { type ReactNode } from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  accent?: 'green' | 'sky' | 'amber' | 'purple' | 'red';
}

const ACCENT = {
  green:  'border-t-2 border-t-green-500',
  sky:    'border-t-2 border-t-sky-500',
  amber:  'border-t-2 border-t-amber-500',
  purple: 'border-t-2 border-t-purple-500',
  red:    'border-t-2 border-t-red-500',
};

export default function GlassCard({ title, subtitle, action, children, className = '', noPadding, accent }: Props) {
  return (
    <div className={`bg-white/90 backdrop-blur-md rounded-2xl border border-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden ${accent ? ACCENT[accent] : ''} ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100/80">
          <div>
            {title && <h3 className="font-bold text-gray-800 text-[15px] leading-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>{children}</div>
    </div>
  );
}
