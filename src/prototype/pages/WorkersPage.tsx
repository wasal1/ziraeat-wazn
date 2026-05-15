import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { workers, workerStats, laborCostChart } from '../data/mockData';
import { LineChartMock } from '../components/MockChart';

const STATUS_FILTER = ['الكل', 'حاضر', 'في مهمة', 'إجازة'];

const ROLE_ICONS: Record<string, string> = {
  'مشرف مزرعة': '👨‍💼',
  'عامل زراعة': '👨‍🌾',
  'فني ري': '💧',
  'فني كهرباء': '⚡',
  'عامل حصاد': '🌾',
  'سائق ناقلة': '🚛',
};

const STATUS_DOT: Record<string, string> = {
  'حاضر':     'bg-green-400',
  'في مهمة':  'bg-amber-400',
  'إجازة':    'bg-gray-300',
};

const NAT_FLAG: Record<string, string> = {
  سعودي: '🇸🇦', يمني: '🇾🇪', مصري: '🇪🇬', سوداني: '🇸🇩', إثيوبي: '🇪🇹',
};

export default function WorkersPage() {
  const [statusFilter, setStatusFilter] = useState('الكل');

  const filtered = workers.filter(
    (w) => statusFilter === 'الكل' || w.status === statusFilter,
  );

  return (
    <PageContainer>
      <SectionHeader
        title="إدارة العمال"
        subtitle="فرق العمل والحضور وتكاليف العمالة"
        action={<ActionButton size="sm" icon="➕">إضافة عامل</ActionButton>}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي العمال"      value={workerStats.total}       unit=""      icon="👷"  color="green" />
        <StatCard label="حاضرون اليوم"       value={workerStats.present}     unit=""      icon="✅"  color="sky"   />
        <StatCard label="تكلفة العمالة / شهر" value={workerStats.monthlyLabor} unit="ريال" icon="💰"  color="amber"
          trend={{ val: 4, up: true }}
        />
        <StatCard label="متوسط ساعات العمل"  value={workerStats.avgHours}    unit="ساعة"  icon="⏱️"  color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Status Summary */}
        <GlassCard title="ملخص الحضور" subtitle="اليوم" accent="green">
          <div className="space-y-3">
            {[
              { label: 'حاضر',     count: workerStats.present,   color: 'bg-green-100 text-green-700', icon: '✅' },
              { label: 'في مهمة',  count: workerStats.onMission, color: 'bg-amber-100 text-amber-700', icon: '🚜' },
              { label: 'إجازة',   count: workerStats.onLeave,   color: 'bg-gray-100 text-gray-600',   icon: '🏠' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-3 bg-gray-50/70 rounded-xl">
                <span className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center text-lg flex-shrink-0`}>{s.icon}</span>
                <span className="flex-1 text-sm font-medium text-gray-700">{s.label}</span>
                <span className="text-xl font-extrabold text-gray-800">{s.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-3">توزيع الجنسيات</p>
            <div className="space-y-2">
              {Object.entries(
                workers.reduce<Record<string, number>>((acc, w) => {
                  acc[w.nationality] = (acc[w.nationality] ?? 0) + 1;
                  return acc;
                }, {})
              ).map(([nat, count]) => (
                <div key={nat} className="flex items-center gap-2 text-sm">
                  <span>{NAT_FLAG[nat] ?? '🌍'}</span>
                  <span className="text-gray-600 flex-1">{nat}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: `${(count / workers.length) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-gray-500 w-4">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Labor Cost Chart */}
        <GlassCard title="تكلفة العمالة الشهرية" subtitle="ريال سعودي" accent="sky" className="lg:col-span-2">
          <LineChartMock data={laborCostChart} xKey="month" yKey="cost" color="#0ea5e9" height={160} label="ريال" />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { label: 'المتوسط الشهري', value: Math.round(laborCostChart.reduce((s, x) => s + x.cost, 0) / laborCostChart.length).toLocaleString('ar-SA') + ' ريال' },
              { label: 'أعلى شهر',       value: Math.max(...laborCostChart.map((x) => x.cost)).toLocaleString('ar-SA') + ' ريال' },
              { label: 'أدنى شهر',       value: Math.min(...laborCostChart.map((x) => x.cost)).toLocaleString('ar-SA') + ' ريال' },
            ].map((s) => (
              <div key={s.label} className="bg-sky-50 rounded-xl p-3 text-center">
                <p className="text-sm font-bold text-sky-700">{s.value}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Workers List */}
      <GlassCard
        title="قائمة العمال"
        subtitle={`${filtered.length} موظف`}
        accent="purple"
        action={
          <div className="flex gap-1">
            {STATUS_FILTER.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${
                  statusFilter === s ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((w) => (
            <div key={w.id} className="flex items-center gap-3 p-4 bg-gray-50/70 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-xl shadow-sm">
                  {ROLE_ICONS[w.role] ?? '👤'}
                </div>
                <span className={`absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${STATUS_DOT[w.status] ?? 'bg-gray-300'}`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-800 text-sm truncate">{w.name}</p>
                  <span className="text-sm flex-shrink-0">{NAT_FLAG[w.nationality] ?? '🌍'}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{w.role} — {w.farm.replace('مزرعة ', '')}</p>
              </div>

              {/* Stats */}
              <div className="flex-shrink-0 text-left space-y-1">
                <StatusBadge status={w.status} size="xs" />
                <p className="text-[10px] text-gray-400 text-center">
                  {w.hoursToday > 0 ? `${w.hoursToday} ساعات اليوم` : '—'}
                </p>
              </div>

              {/* Salary */}
              <div className="flex-shrink-0 text-left">
                <p className="text-sm font-bold text-gray-800">{w.salary.toLocaleString('ar-SA')}</p>
                <p className="text-[10px] text-gray-400">ريال/شهر</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">لا يوجد عمال بهذه الحالة</p>
        )}
      </GlassCard>

      {/* Attendance Summary Table */}
      <GlassCard title="ملخص العمل هذا الشهر" accent="amber">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right border-b border-gray-100">
                {['العامل', 'الدور', 'المزرعة', 'ساعات الشهر', 'الراتب', 'المهام', 'الحالة'].map((h) => (
                  <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {workers.map((w) => (
                <tr key={w.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 pr-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{ROLE_ICONS[w.role] ?? '👤'}</span>
                      <span className="font-semibold text-gray-800">{w.name}</span>
                      <span className="text-xs">{NAT_FLAG[w.nationality]}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-xs text-gray-500 whitespace-nowrap">{w.role}</td>
                  <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{w.farm.replace('مزرعة ', '')}</td>
                  <td className="py-3 pr-3 font-medium text-gray-700 whitespace-nowrap">{w.hoursMonth} ساعة</td>
                  <td className="py-3 pr-3 font-bold text-green-700 whitespace-nowrap">{w.salary.toLocaleString('ar-SA')} ريال</td>
                  <td className="py-3 pr-3 whitespace-nowrap">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">{w.tasks}</span>
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap"><StatusBadge status={w.status} size="xs" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
