import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
  className?: string;
}

const VARIANT = {
  primary:   'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md active:scale-[0.98]',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300',
  ghost:     'bg-transparent text-green-600 hover:bg-green-50',
  danger:    'bg-red-600 text-white hover:bg-red-700 shadow-sm',
};

const SIZE = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
};

export default function ActionButton({ children, onClick, variant = 'primary', size = 'md', icon, disabled, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
