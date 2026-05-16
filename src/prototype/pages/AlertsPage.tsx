import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { alertsList, alertStats } from '../data/mockData';

type SeverityFilter = 'all' | 'critical' | 'high' | 'medium' | 'low';

const SEVERITY_STYLE: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high:     'bg-orange-100 text-orange-700 border-orange-200',
  medium:   'bg-amber-100 text-amber-700 border-amber-200',
  low:      'bg-gray-100 text-gray-600 border-gray-200',
};
const SEVERITY_LABEL: Record<string, string> = {
  critical: 'حرج', high: 'عالي', medium: 'متوسط', low: 'منخفض',
};
const SEVERITY_ICON: Record<string, string> = {
  critical: '🔴', high: '🟠', medium: '🟡', low: '⚪',
};
const TYPE_ICON: Record<string, string> = {
  sensor:      '📡',
  pump:        '💧',
  weather:     '🌦️',
  pest:        '🦗',
  maintenance: '🔧',
  irrigation:  '🌊',
  financial:   '💸',
  system:      '⚙️',
};
const STATUS_STYLE: Record<string, string> = {
  active:   'bg-red-50 border-r-2 border-r-red-400',
  resolved: 'opacity-60',
  snoozed:  'opacity-75',
};

export default function AlertsPage() {
  const [filter, setFilter] = useState<SeverityFilter>('all');
  const [showResolved, setShowResolved] = useState(false);

  const filtered = alertsList.filter((a) => {
    const matchSeverity = filter === 'all' || a.severity === filter;
    const matchStatus = showResolved ? true : a.status === 'active';
    return matchSeverity && matchStatus;
  });

  return (
    <PageContainer>
      <SectionHeader
        title="مركز التنبيهات"
        subtitle="رصد وإدارة جميع التنبيهات والإشعارات الحرجة"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'الكل', value: alertStats.total, icon: '📋', color: 'text-gray-700', filter: 'all' as SeverityFilter },
          { label: 'حرجة', value: alertStats.critical, icon: '🔴', color: 'text-red-600', filter: 'critical' as SeverityFilter },
          { label: 'عالية', value: alertStats.high, icon: '🟠', color: 'text-orange-600', filter: 'high' as SeverityFilter },
          { label: 'متوسطة', value: alertStats.medium, icon: '🟡', color: 'text-amber-600', filter: 'medium' as SeverityFilter },
          { label: 'منخفضة', value: alertStats.low, icon: '⚪', color: 'text-gray-500', filter: 'low' as SeverityFilter },
          { label: 'تم حلها اليوم', value: alertStats.resolvedToday, icon: '✅', color: 'text-green-600', filter: 'all' as SeverityFilter },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => setFilter(s.filter)}
            className={`rounded-2xl border overflow-hidden transition-all text-center p-4 ${filter === s.filter ? 'bg-green-50 border-green-300 shadow' : 'bg-white/90 border-white/70 hover:border-gray-200'} shadow-sm`}
          >
            <p className="text-xl mb-0.5">{s.icon}</p>
            <p className={`font-bold text-xl ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-gray-400">{s.label}</p>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {(['all', 'critical', 'high', 'medium', 'low'] as SeverityFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${filter === s ? 'bg-green-600 text-white shadow' : 'bg-white/90 text-gray-600 border border-gray-200 hover:border-green-300'}`}
            >
              {s === 'all' ? 'الكل' : SEVERITY_LABEL[s]}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 mr-auto cursor-pointer">
          <input
            type="checkbox"
            checked={showResolved}
            onChange={(e) => setShowResolved(e.target.checked)}
            className="w-4 h-4 rounded accent-green-600"
          />
          <span className="text-sm text-gray-600">عرض المحلولة</span>
        </label>
      </div>

      {/* Alerts list */}
      <GlassCard title={`التنبيهات النشطة (${filtered.length})`} noPadding>
        <div className="divide-y divide-gray-100/80">
          {filtered.map((alert) => (
            <div key={alert.id} className={`px-4 py-3 md:px-5 md:py-4 hover:bg-gray-50/40 transition-colors ${STATUS_STYLE[alert.status] ?? ''}`}>
              <div className="flex items-start gap-3">
                <div className="text-xl flex-shrink-0">
                  {SEVERITY_ICON[alert.severity]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{alert.title}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${SEVERITY_STYLE[alert.severity]}`}>
                      {SEVERITY_LABEL[alert.severity]}
                    </span>
                    <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {TYPE_ICON[alert.type] ?? '📌'} {alert.type === 'sensor' ? 'حساس' : alert.type === 'pump' ? 'مضخة' : alert.type === 'pest' ? 'آفة' : alert.type === 'maintenance' ? 'صيانة' : alert.type === 'financial' ? 'مالي' : alert.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{alert.message}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-gray-400">
                    <span>📍 {alert.farm}</span>
                    <span>📅 {alert.timestamp}</span>
                    {alert.source && <span>🔗 {alert.source}</span>}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {alert.status === 'active' ? (
                    <button className="px-3 py-1.5 text-[12px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      تأكيد
                    </button>
                  ) : (
                    <span className="text-[11px] text-green-600 font-medium bg-green-50 px-2.5 py-1 rounded-lg">
                      ✓ محلول
                    </span>
                  )}
                </div>
              </div>
              {alert.actionRequired && (
                <div className="mt-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-[12px] text-amber-800">
                  💡 الإجراء المطلوب: {alert.actionRequired}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">✅</p>
              <p className="text-sm">لا توجد تنبيهات نشطة</p>
            </div>
          )}
        </div>
      </GlassCard>
    </PageContainer>
  );
}
