interface Props {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
  trend?: { value: number; positive: boolean };
  color?: 'green' | 'blue' | 'amber' | 'purple' | 'red';
}

const colorMap = {
  green: { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-100' },
  blue: { bg: 'bg-sky-50', icon: 'bg-sky-100 text-sky-700', border: 'border-sky-100' },
  amber: { bg: 'bg-amber-50', icon: 'bg-amber-100 text-amber-700', border: 'border-amber-100' },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-700', border: 'border-purple-100' },
  red: { bg: 'bg-red-50', icon: 'bg-red-100 text-red-700', border: 'border-red-100' },
};

export default function StatCard({ title, value, unit, icon, trend, color = 'green' }: Props) {
  const c = colorMap[color];
  return (
    <div className={`glass-card rounded-2xl p-5 border ${c.border} hover:shadow-lg hover:-translate-y-0.5 cursor-default`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${c.icon}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trend.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">
          {typeof value === 'number' ? value.toLocaleString('ar-SA') : value}
          {unit && <span className="text-sm font-normal text-gray-400 mr-1">{unit}</span>}
        </p>
      </div>
    </div>
  );
}
