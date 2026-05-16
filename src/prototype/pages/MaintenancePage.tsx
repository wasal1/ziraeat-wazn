import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { maintenanceBreakdowns, preventiveSchedules, maintenanceStats } from '../data/mockData';

type Tab = 'breakdowns' | 'preventive';

const BD_STATUS_STYLE: Record<string, string> = {
  open:        'bg-red-100 text-red-700',
  inProgress:  'bg-blue-100 text-blue-700',
  resolved:    'bg-green-100 text-green-700',
};
const BD_STATUS_LABEL: Record<string, string> = {
  open: 'مفتوحة', inProgress: 'جارية', resolved: 'محلولة',
};
const BD_SEVERITY: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high:     'bg-orange-100 text-orange-700',
  medium:   'bg-amber-100 text-amber-700',
  low:      'bg-gray-100 text-gray-500',
};
const BD_SEVERITY_LABEL: Record<string, string> = {
  critical: 'حرج', high: 'عالي', medium: 'متوسط', low: 'منخفض',
};
const PREV_STATUS_STYLE: Record<string, string> = {
  scheduled:  'bg-blue-100 text-blue-700',
  completed:  'bg-green-100 text-green-700',
  overdue:    'bg-red-100 text-red-700',
  inProgress: 'bg-amber-100 text-amber-700',
};
const PREV_STATUS_LABEL: Record<string, string> = {
  scheduled: 'مجدولة', completed: 'منجزة', overdue: 'متأخرة', inProgress: 'جارية',
};

export default function MaintenancePage() {
  const [tab, setTab] = useState<Tab>('breakdowns');

  return (
    <PageContainer>
      <SectionHeader
        title="الصيانة والأعطال"
        subtitle="متابعة الأعطال والصيانة الوقائية لجميع المعدات"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: 'أعطال مفتوحة', value: maintenanceStats.openBreakdowns, color: 'text-red-600' },
          { label: 'محلولة هذا الشهر', value: maintenanceStats.resolvedThisMonth, color: 'text-green-600' },
          { label: 'التكلفة (ر.س)', value: maintenanceStats.totalCostMonth.toLocaleString(), color: 'text-purple-600' },
          { label: 'متوسط التوقف (ساعة)', value: maintenanceStats.avgDowntimeHrs, color: 'text-amber-600' },
          { label: 'وقائية في الوقت', value: maintenanceStats.preventiveOnTime, color: 'text-blue-600' },
          { label: 'وقائية متأخرة', value: maintenanceStats.preventiveOverdue, color: 'text-orange-600' },
          { label: 'الالتزام الوقائي', value: `${maintenanceStats.preventiveCompliance}%`, color: 'text-emerald-600' },
        ].map((s) => (
          <GlassCard key={s.label} className="text-center">
            <p className={`font-bold text-xl ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {([['breakdowns', '🔧 الأعطال'], ['preventive', '🛡️ الصيانة الوقائية']] as [Tab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t ? 'bg-green-600 text-white shadow' : 'bg-white/90 text-gray-600 border border-gray-200 hover:border-green-300'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'breakdowns' && (
        <GlassCard title="سجل الأعطال" noPadding>
          <div className="divide-y divide-gray-100/80">
            {maintenanceBreakdowns.map((b) => (
              <div key={b.id} className="px-4 py-3 md:px-5 md:py-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{b.equipment}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${BD_STATUS_STYLE[b.status]}`}>
                        {BD_STATUS_LABEL[b.status]}
                      </span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${BD_SEVERITY[b.severity]}`}>
                        {BD_SEVERITY_LABEL[b.severity]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{b.description}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-gray-400">
                      <span>📍 {b.farm}</span>
                      <span>📅 {b.reportedDate}</span>
                      {b.resolvedDate && <span>✅ {b.resolvedDate}</span>}
                      {b.downtimeHrs && <span>⏱ {b.downtimeHrs} ساعة توقف</span>}
                      {b.assignedTo && <span>👷 {b.assignedTo}</span>}
                    </div>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <p className="font-bold text-red-600 text-sm">{b.repairCost.toLocaleString()} ر.س</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {tab === 'preventive' && (
        <GlassCard title="الصيانة الوقائية المجدولة" noPadding>
          <div className="divide-y divide-gray-100/80">
            {preventiveSchedules.map((p) => (
              <div key={p.id} className="px-4 py-3 md:px-5 md:py-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{p.equipment}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${PREV_STATUS_STYLE[p.status]}`}>
                        {PREV_STATUS_LABEL[p.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{p.task}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-gray-400">
                      <span>📍 {p.farm}</span>
                      <span>📅 {p.nextDate}</span>
                      <span>🔄 {p.frequency}</span>
                      {p.assignedTo && <span>👷 {p.assignedTo}</span>}
                    </div>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <p className="font-bold text-blue-600 text-sm">{p.estimatedCost.toLocaleString()} ر.س</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{p.estimatedDurationHrs} ساعة</p>
                  </div>
                </div>
                {p.lastCompleted && (
                  <p className="text-[12px] text-gray-400 mt-1.5">آخر تنفيذ: {p.lastCompleted}</p>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </PageContainer>
  );
}
