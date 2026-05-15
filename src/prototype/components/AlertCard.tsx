interface Props {
  level: 'danger' | 'warning' | 'info' | 'success';
  title: string;
  desc: string;
  time?: string;
  compact?: boolean;
}

const CFG = {
  danger:  { wrap: 'bg-red-50 border-red-200',     icon: '🚨', head: 'text-red-800',   body: 'text-red-600',   dot: 'bg-red-500'   },
  warning: { wrap: 'bg-amber-50 border-amber-200', icon: '⚠️',  head: 'text-amber-800', body: 'text-amber-600', dot: 'bg-amber-500' },
  info:    { wrap: 'bg-sky-50 border-sky-200',     icon: 'ℹ️',  head: 'text-sky-800',   body: 'text-sky-600',   dot: 'bg-sky-500'   },
  success: { wrap: 'bg-green-50 border-green-200', icon: '✅',  head: 'text-green-800', body: 'text-green-600', dot: 'bg-green-500' },
};

export default function AlertCard({ level, title, desc, time, compact }: Props) {
  const c = CFG[level];
  return (
    <div className={`flex items-start gap-3 rounded-xl border ${compact ? 'p-3' : 'p-4'} ${c.wrap}`}>
      <span className="text-xl flex-shrink-0 leading-none mt-0.5">{c.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold ${compact ? 'text-xs' : 'text-sm'} ${c.head}`}>{title}</p>
        <p className={`mt-0.5 leading-relaxed ${compact ? 'text-[11px]' : 'text-xs'} ${c.body}`}>{desc}</p>
        {time && <p className="text-[10px] text-gray-400 mt-1">{time}</p>}
      </div>
    </div>
  );
}
