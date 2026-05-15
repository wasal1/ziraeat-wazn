import { type ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export default function SectionHeader({ title, subtitle, action, className = '' }: Props) {
  return (
    <div className={`flex items-start justify-between ${className}`}>
      <div>
        <h2 className="text-xl font-extrabold text-gray-800 leading-tight">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
