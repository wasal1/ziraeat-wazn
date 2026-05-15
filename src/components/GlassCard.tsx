import { type ReactNode } from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export default function GlassCard({ title, subtitle, children, className = '', action }: Props) {
  return (
    <div className={`glass-card rounded-2xl overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div>
            {title && <h3 className="font-bold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
