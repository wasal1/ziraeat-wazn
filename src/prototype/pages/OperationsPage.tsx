import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { operationsData, operationStats, operationTypeChart } from '../data/mockData';

const OP_TYPES = ['الكل', 'حصاد', 'ري', 'تسميد', 'رش وقائي', 'تقليم', 'زراعة', 'صيانة', 'تعبئة ونقل'];

const OP_ICONS: Record<string, string> = {
  حصاد: '🌾', ري: '💧', تسميد: '🧪', 'رش وقائي': '🛡️',
  تقليم: '✂️', زراعة: '🌱', صيانة: '🔧', 'تعبئة ونقل': '📦',
};

const OP_COLORS: Record<string, string> = {
  حصاد: 'bg-green-50 text-green-700 border-green-100',
  ري: 'bg-sky-50 text-sky-700 border-sky-100',
  تسميد: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'رش وقائي': 'bg-red-50 text-red-700 border-red-100',
  تقليم: 'bg-purple-50 text-purple-700 border-purple-100',
  زراعة: 'bg-lime-50 text-lime-700 border-lime-100',
  صيانة: 'bg-amber-50 text-amber-700 border-amber-100',
  'تعبئة ونقل': 'bg-blue-50 text-blue-700 border-blue-100',
};

export default function OperationsPage() {
  const [typeFilter, setTypeFilter] = useState('الكل');

  const filtered = operationsData.filter(
    (op) => typeFilter === 'الكل' || op.type === typeFilter,
  );

  const totalCostFiltered = filtered.reduce((s, op) => s + op.cost, 0);

  return (
    <PageContainer>
      <SectionHeader
        title="العمليات الزراعية"
        subtitle="سجل وتتبع جميع العمليات اليومية"
        action={<ActionButton size="sm" icon="➕">تسجيل عملية</ActionButton>}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="عمليات هذا الأسبوع"  value={operationStats.thisWeek}   unit=""      icon="⚙️" color="green"  trend={{ val: 8, up: true }} />
        <StatCard label="التكلفة الإجمالية"    value={operationStats.totalCost}  unit="ريال"  icon="💸" color="amber"  />
        <StatCard label="الإنتاج المحصود"       value={operationStats.harvested}  unit=""      icon="🌾" color="sky"    />
        <StatCard label="أكثر عملية تكراراً"   value={operationStats.topType}    unit=""      icon="📊" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Type Distribution */}
        <GlassCard title="توزيع العمليات" subtitle="هذا الأسبوع" accent="green" className="lg:col-span-1">
          <div className="space-y-3">
            {operationTypeChart.map((t) => {
              const max = Math.max(...operationTypeChart.map((x) => x.count));
              const pct = (t.count / max) * 100;
              return (
                <div key={t.type} className="flex items-center gap-3">
                  <span className="text-base w-6 text-center flex-shrink-0">{OP_ICONS[t.type] ?? '⚙️'}</span>
                  <span className="text-xs text-gray-600 w-20 flex-shrink-0">{t.type}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: t.color }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-500 w-4 text-left flex-shrink-0">{t.count}</span>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
            {[
              { label: 'مكتملة', value: operationsData.filter((o) => o.status === 'مكتملة').length, color: 'text-green-700' },
              { label: 'قيد التنفيذ', value: operationsData.filter((o) => o.status !== 'مكتملة').length, color: 'text-amber-600' },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Operations Table */}
        <GlassCard
          title="سجل العمليات"
          subtitle={`${filtered.length} عملية — تكلفة: ${totalCostFiltered.toLocaleString('ar-SA')} ريال`}
          accent="sky"
          className="lg:col-span-2"
          action={<ActionButton variant="secondary" size="sm" icon="📥">تصدير</ActionButton>}
        >
          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap mb-4">
            {OP_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                  typeFilter === t
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'
                }`}
              >
                {OP_ICONS[t] ?? ''} {t}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right border-b border-gray-100">
                  {['التاريخ', 'النوع', 'المزرعة / الدورة', 'العامل', 'المدة', 'التكلفة', 'الكمية', 'الحالة'].map((h) => (
                    <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((op) => (
                  <tr key={op.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{op.date}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${OP_COLORS[op.type] ?? 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                        {OP_ICONS[op.type] ?? '⚙️'} {op.type}
                      </span>
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <p className="text-xs font-medium text-gray-700">{op.farm}</p>
                      <p className="text-[10px] text-gray-400">{op.cycle}</p>
                    </td>
                    <td className="py-3 pr-3 text-xs text-gray-600 whitespace-nowrap">{op.worker}</td>
                    <td className="py-3 pr-3 text-xs text-gray-500 whitespace-nowrap">{op.duration}</td>
                    <td className="py-3 pr-3 font-semibold text-gray-800 whitespace-nowrap">{op.cost.toLocaleString('ar-SA')} ر</td>
                    <td className="py-3 pr-3 text-xs text-gray-500 whitespace-nowrap">{op.qty}</td>
                    <td className="py-3 pr-3 whitespace-nowrap"><StatusBadge status={op.status} size="xs" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-8">لا توجد عمليات بهذا الفلتر</p>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Quick Add Cards */}
      <GlassCard title="تسجيل عملية سريع" accent="amber">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['حصاد', 'ري', 'تسميد', 'رش وقائي'] as const).map((type) => (
            <button
              key={type}
              className="flex flex-col items-center gap-2 py-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-400 hover:bg-green-50/50 transition-all group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{OP_ICONS[type]}</span>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-green-700">{type}</span>
            </button>
          ))}
        </div>
      </GlassCard>
    </PageContainer>
  );
}
