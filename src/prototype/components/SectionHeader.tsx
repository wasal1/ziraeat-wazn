import { type ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export default function SectionHeader({ title, subtitle, action, className = '' }: Props) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <h2 className="text-lg md:text-xl font-extrabold text-gray-800 leading-tight">{title}</h2>
        {subtitle && <p className="text-xs md:text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
