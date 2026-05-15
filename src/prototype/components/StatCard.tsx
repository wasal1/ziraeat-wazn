interface Trend { val: number; up: boolean }

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  icon: string;
  trend?: Trend | null;
  color?: 'green' | 'sky' | 'amber' | 'purple' | 'red';
  size?: 'sm' | 'md';
}

const COLOR = {
  green:  { icon: 'bg-green-100 text-green-600',   border: 'border-green-100',  val: 'text-green-700'  },
  sky:    { icon: 'bg-sky-100 text-sky-600',         border: 'border-sky-100',    val: 'text-sky-700'    },
  amber:  { icon: 'bg-amber-100 text-amber-600',     border: 'border-amber-100',  val: 'text-amber-700'  },
  purple: { icon: 'bg-purple-100 text-purple-600',   border: 'border-purple-100', val: 'text-purple-700' },
  red:    { icon: 'bg-red-100 text-red-600',         border: 'border-red-100',    val: 'text-red-700'    },
};

export default function StatCard({ label, value, unit, icon, trend, color = 'green', size = 'md' }: Props) {
  const c = COLOR[color];
  const numStr = typeof value === 'number' ? value.toLocaleString('ar-SA') : value;

  return (
    <div className={`bg-white/90 backdrop-blur-md rounded-2xl border ${c.border} shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default group`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base ${c.icon} flex-shrink-0 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${trend.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend.up ? '↑' : '↓'} {trend.val}%
          </span>
        )}
      </div>
      <p className="text-[11px] text-gray-400 font-medium mb-1 leading-tight">{label}</p>
      <div className="flex items-baseline gap-1">
        <p className={`font-extrabold leading-none ${size === 'sm' ? 'text-xl' : 'text-2xl'} ${c.val}`}>{numStr}</p>
        {unit && <span className="text-xs text-gray-400 font-normal">{unit}</span>}
      </div>
    </div>
  );
}
