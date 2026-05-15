import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatCard from '../components/StatCard';
import { expenseRecords, budgetVsActual, expenseMonthlyChart } from '../data/mockData';
import { LineChartMock } from '../components/MockChart';

const CATEGORIES = ['الكل', 'عمالة', 'أسمدة', 'كهرباء', 'مياه', 'مبيدات', 'صيانة', 'تعبئة ونقل', 'إيجار', 'شتلات وبذور', 'معدات'];

const STATUS_CFG: Record<string, string> = {
  مدفوع: 'bg-green-50 text-green-700 border-green-100',
  معلق:   'bg-amber-50 text-amber-700 border-amber-100',
};

const CAT_ICON: Record<string, string> = {
  عمالة: '👷', أسمدة: '🧪', كهرباء: '⚡', مياه: '💧',
  مبيدات: '🛡️', صيانة: '🔧', 'تعبئة ونقل': '📦',
  إيجار: '🏠', 'شتلات وبذور': '🌱', معدات: '⚙️',
};

export default function ExpensesPage() {
  const [catFilter, setCatFilter] = useState('الكل');
  const [statusFilter, setStatusFilter] = useState('الكل');

  const filtered = expenseRecords.filter((e) => {
    const catOk = catFilter === 'الكل' || e.category === catFilter;
    const stOk  = statusFilter === 'الكل' || e.status === statusFilter;
    return catOk && stOk;
  });

  const totalFiltered = filtered.reduce((s, e) => s + e.amount, 0);
  const pendingTotal  = expenseRecords.filter((e) => e.status === 'معلق').reduce((s, e) => s + e.amount, 0);
  const monthlyTotal  = expenseRecords.reduce((s, e) => s + e.amount, 0);

  // Budget vs Actual — overspent categories
  const overBudget = budgetVsActual.filter((b) => b.actual > b.budget).length;

  return (
    <PageContainer>
      <SectionHeader
        title="المصروفات التفصيلية"
        subtitle="متابعة المصروفات مقارنة بالميزانية"
        action={
          <div className="flex gap-2">
            <ActionButton variant="secondary" size="sm" icon="📥">تصدير</ActionButton>
            <ActionButton size="sm" icon="➕">إضافة مصروف</ActionButton>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="مصروفات هذا الشهر"  value={(monthlyTotal / 1000).toFixed(1) + 'K'} unit="ريال" icon="💸" color="amber" />
        <StatCard label="معلقة الدفع"         value={pendingTotal}                            unit="ريال" icon="⏳" color="red"   />
        <StatCard label="فئات تجاوزت الميزانية" value={overBudget}                           unit=""     icon="⚠️" color="purple" />
        <StatCard label="أعلى فئة"             value="عمالة"                                  unit=""     icon="👷" color="sky"   />
      </div>

      {/* Budget vs Actual */}
      <GlassCard title="الميزانية مقابل الفعلي" subtitle="هذا الشهر" accent="amber">
        <div className="space-y-4">
          {budgetVsActual.map((b) => {
            const pct    = Math.min((b.actual / b.budget) * 100, 120);
            const over   = b.actual > b.budget;
            const diffPct = Math.abs(Math.round(((b.actual - b.budget) / b.budget) * 100));
            return (
              <div key={b.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-sm">
                    <span>{CAT_ICON[b.category] ?? '📌'}</span>
                    <span className="font-medium text-gray-700">{b.category}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-400">ميزانية: {b.budget.toLocaleString('ar-SA')}</span>
                    <span className={`font-bold ${over ? 'text-red-600' : 'text-green-600'}`}>
                      فعلي: {b.actual.toLocaleString('ar-SA')}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${over ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {over ? '▲' : '▼'} {diffPct}%
                    </span>
                  </div>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all ${over ? 'bg-red-400' : 'bg-green-400'}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                  {over && (
                    <div
                      className="absolute top-0 h-full bg-red-300/50 rounded-full"
                      style={{ left: '100%', width: `${Math.min(pct - 100, 20)}%` }}
                    />
                  )}
                  {/* Budget line */}
                  <div className="absolute top-0 h-full border-l-2 border-dashed border-gray-400/60" style={{ left: '100%', marginLeft: '-1px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Monthly Trend */}
      <GlassCard title="تطور المصروفات الشهرية" subtitle="ريال" accent="sky">
        <LineChartMock data={expenseMonthlyChart} xKey="month" yKey="amount" color="#f59e0b" height={180} label="ريال" />
      </GlassCard>

      {/* Records Table */}
      <GlassCard title="سجل المصروفات"
        subtitle={`${filtered.length} سجل — ${totalFiltered.toLocaleString('ar-SA')} ريال`}
        accent="purple"
        action={
          <div className="flex gap-1 items-center flex-wrap">
            {['الكل', 'مدفوع', 'معلق'].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${statusFilter === s ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-400 hover:bg-gray-100'}`}
              >{s}</button>
            ))}
          </div>
        }
      >
        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {CATEGORIES.slice(0, 8).map((c) => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${catFilter === c ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'}`}
            >{c}</button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-right">
                {['التاريخ', 'الفئة', 'الوصف', 'المزرعة', 'المبلغ', 'متكرر', 'الحالة'].map((h) => (
                  <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/60">
                  <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{e.date}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                      {CAT_ICON[e.category] ?? '📌'} {e.category}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-gray-700 max-w-[200px] truncate">{e.desc}</td>
                  <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{e.farm}</td>
                  <td className="py-3 pr-3 font-bold text-red-600 whitespace-nowrap">{e.amount.toLocaleString('ar-SA')} ريال</td>
                  <td className="py-3 pr-3 text-center whitespace-nowrap">
                    {e.recurring ? <span className="text-green-500">🔁</span> : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_CFG[e.status]}`}>{e.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-gray-400 text-sm py-8">لا توجد نتائج</p>}
        </div>
      </GlassCard>
    </PageContainer>
  );
}
