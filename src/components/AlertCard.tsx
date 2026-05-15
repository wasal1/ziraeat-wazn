interface Props {
  type: 'danger' | 'warning' | 'info';
  title: string;
  desc: string;
  time?: string;
}

const typeConfig = {
  danger: { bg: 'bg-red-50 border-red-200', icon: '🚨', titleColor: 'text-red-800', descColor: 'text-red-600', dot: 'bg-red-500' },
  warning: { bg: 'bg-amber-50 border-amber-200', icon: '⚠️', titleColor: 'text-amber-800', descColor: 'text-amber-600', dot: 'bg-amber-500' },
  info: { bg: 'bg-blue-50 border-blue-200', icon: 'ℹ️', titleColor: 'text-blue-800', descColor: 'text-blue-600', dot: 'bg-blue-500' },
};

export default function AlertCard({ type, title, desc, time }: Props) {
  const c = typeConfig[type];
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${c.bg}`}>
      <span className="text-xl flex-shrink-0">{c.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm ${c.titleColor}`}>{title}</p>
        <p className={`text-xs mt-0.5 ${c.descColor}`}>{desc}</p>
        {time && <p className="text-xs text-gray-400 mt-1">{time}</p>}
      </div>
    </div>
  );
}
