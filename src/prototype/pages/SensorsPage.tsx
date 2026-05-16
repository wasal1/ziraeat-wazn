import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { sensors, sensorStats } from '../data/mockData';

const STATUS_STYLE: Record<string, string> = {
  normal:  'bg-green-100 text-green-700',
  alert:   'bg-red-100 text-red-700',
  offline: 'bg-gray-100 text-gray-500',
};
const STATUS_LABEL: Record<string, string> = {
  normal: 'طبيعي', alert: 'تنبيه', offline: 'غير متصل',
};
const TYPE_ICON: Record<string, string> = {
  temperature:    '🌡️',
  humidity:       '💧',
  soil_moisture:  '🌱',
  co2:            '💨',
  light:          '☀️',
  ph:             '⚗️',
  ec:             '⚡',
  wind:           '🌬️',
};

export default function SensorsPage() {
  return (
    <PageContainer>
      <SectionHeader
        title="الحساسات والقراءات"
        subtitle="مراقبة قراءات الحساسات البيئية وجودة التربة في الوقت الفعلي"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'إجمالي الحساسات', value: sensorStats.total, icon: '📡', color: 'text-gray-700' },
          { label: 'طبيعية', value: sensorStats.normal, icon: '✅', color: 'text-green-600' },
          { label: 'تنبيه', value: sensorStats.alert, icon: '⚠️', color: 'text-red-600' },
          { label: 'غير متصلة', value: sensorStats.offline, icon: '🔴', color: 'text-gray-500' },
        ].map((s) => (
          <GlassCard key={s.label} className="flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className={`font-bold text-2xl ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-gray-400">{s.label}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Sensors grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sensors.map((s) => (
          <GlassCard key={s.id} accent={s.status === 'alert' ? 'red' : s.status === 'offline' ? undefined : 'green'}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl flex-shrink-0">
                {TYPE_ICON[s.type] ?? '📡'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-800 text-sm truncate">{s.name}</p>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${STATUS_STYLE[s.status]}`}>
                    {STATUS_LABEL[s.status]}
                  </span>
                </div>
                <p className="text-[12px] text-gray-500 truncate">{s.location} · {s.farm}</p>
              </div>
            </div>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className={`font-bold text-2xl ${s.status === 'alert' ? 'text-red-600' : s.status === 'offline' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {s.status === 'offline' ? '—' : `${s.value} ${s.unit}`}
                </p>
                <div className="flex gap-3 text-[11px] text-gray-400 mt-0.5">
                  <span>↓ {s.minOk} {s.unit}</span>
                  <span>↑ {s.maxOk} {s.unit}</span>
                </div>
              </div>
              <div className="text-left">
                <p className="text-[11px] text-gray-400">{s.lastUpdate}</p>
                <p className="text-[11px] text-gray-400">{s.batteryLevel}% 🔋</p>
              </div>
            </div>

            {s.status === 'alert' && s.alertMessage && (
              <div className="mt-2.5 bg-red-50 border border-red-100 rounded-xl px-3 py-2 text-[12px] text-red-700">
                ⚠ {s.alertMessage}
              </div>
            )}

            {/* Mini trend bar */}
            {s.status !== 'offline' && (
              <div className="mt-3">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${s.status === 'alert' ? 'bg-red-400' : 'bg-green-400'}`}
                    style={{ width: `${Math.min(100, Math.max(5, ((s.value - s.minOk) / Math.max(1, s.maxOk - s.minOk)) * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>أدنى</span>
                  <span>أعلى</span>
                </div>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  );
}
