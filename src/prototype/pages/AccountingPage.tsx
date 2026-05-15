import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatCard from '../components/StatCard';
import {
  accountingKPIs, accountingMonthly, expenseBreakdown,
  revenueByFarm, transactions,
} from '../data/mockData';
import { LineChartMock, DonutChartMock } from '../components/MockChart';

const TX_TYPE_COLOR: Record<string, string> = {
  إيراد:  'text-green-700 bg-green-50 border-green-100',
  مصروف: 'text-red-600 bg-red-50 border-red-100',
};

const TABS = ['نظرة عامة', 'الإيرادات والمصروفات', 'توزيع المصروفات', 'المعاملات'];

export default function AccountingPage() {
  const [tab, setTab] = useState('نظرة عامة');

  const donutData = expenseBreakdown.map((e) => ({
    name: e.label,
    value: e.pct,
    color: e.color,
  }));

  return (
    <PageContainer>
      <SectionHeader
        title="المحاسبة والمالية"
        subtitle="الإيرادات والمصروفات وصافي الربح"
        action={
          <div className="flex gap-2">
            <ActionButton variant="secondary" size="sm" icon="📥">تصدير</ActionButton>
            <ActionButton size="sm" icon="➕">إضافة معاملة</ActionButton>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="إجمالي الإيرادات"
          value={(accountingKPIs.totalRevenue / 1000).toFixed(0) + 'K'}
          unit="ريال"
          icon="💰"
          color="green"
          trend={{ val: 12, up: true }}
        />
        <StatCard
          label="إجمالي المصروفات"
          value={(accountingKPIs.totalExpenses / 1000).toFixed(0) + 'K'}
          unit="ريال"
          icon="💸"
          color="amber"
          trend={{ val: 4, up: true }}
        />
        <StatCard
          label="صافي الربح"
          value={(accountingKPIs.netProfit / 1000).toFixed(0) + 'K'}
          unit="ريال"
          icon="📈"
          color="sky"
          trend={{ val: 18, up: true }}
        />
        <StatCard
          label="هامش الربح"
          value={accountingKPIs.profitMargin.toFixed(1)}
          unit="%"
          icon="🎯"
          color="purple"
          trend={{ val: 2, up: true }}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100/70 backdrop-blur-sm rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
              tab === t
                ? 'bg-white text-green-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ─── نظرة عامة ─── */}
      {tab === 'نظرة عامة' && (
        <div className="space-y-5">
          {/* Progress toward target */}
          <GlassCard title="التقدم نحو هدف الإيرادات" subtitle="2026" accent="green">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-2xl font-extrabold text-gray-800">
                  {accountingKPIs.totalRevenue.toLocaleString('ar-SA')}
                  <span className="text-sm font-normal text-gray-400 mr-1">ريال</span>
                </p>
                <p className="text-xs text-gray-400">من أصل {accountingKPIs.revenueTarget.toLocaleString('ar-SA')} ريال</p>
              </div>
              <div className="text-left">
                <p className="text-3xl font-extrabold text-green-700">{accountingKPIs.targetAchieved}%</p>
                <p className="text-xs text-gray-400">تحقق الهدف</p>
              </div>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-l from-green-400 to-emerald-600 transition-all duration-700"
                style={{ width: `${accountingKPIs.targetAchieved}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-400">
              <span>0</span>
              <span className="text-green-600 font-semibold">نقطة التعادل: {accountingKPIs.breakEven.toLocaleString('ar-SA')} ريال/شهر ✓</span>
              <span>{accountingKPIs.revenueTarget.toLocaleString('ar-SA')}</span>
            </div>
          </GlassCard>

          {/* Farm Revenue comparison */}
          <GlassCard title="الربحية حسب المزرعة" accent="sky">
            <div className="space-y-4">
              {revenueByFarm.map((f) => {
                const maxRev = Math.max(...revenueByFarm.map((x) => x.revenue));
                const pct = (f.revenue / maxRev) * 100;
                const margin = ((f.profit / f.revenue) * 100).toFixed(1);
                return (
                  <div key={f.farm}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-gray-700">{f.farm}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-green-700 font-bold">{f.profit.toLocaleString('ar-SA')} ريال ربح</span>
                        <span className="text-gray-400">هامش {margin}%</span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-sky-400 to-blue-500 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                      <span>إيرادات: {f.revenue.toLocaleString('ar-SA')} ريال</span>
                      <span>مصروفات: {f.expenses.toLocaleString('ar-SA')} ريال</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─── الإيرادات والمصروفات ─── */}
      {tab === 'الإيرادات والمصروفات' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <GlassCard title="الإيرادات الشهرية" subtitle="ريال" accent="green">
              <LineChartMock data={accountingMonthly} xKey="month" yKey="revenue" color="#16a34a" height={200} label="ريال" />
            </GlassCard>
            <GlassCard title="المصروفات الشهرية" subtitle="ريال" accent="amber">
              <LineChartMock data={accountingMonthly} xKey="month" yKey="expenses" color="#f59e0b" height={200} label="ريال" />
            </GlassCard>
          </div>

          <GlassCard title="صافي الربح الشهري" subtitle="ريال" accent="sky">
            <LineChartMock data={accountingMonthly} xKey="month" yKey="profit" color="#0ea5e9" height={180} label="ريال" />
          </GlassCard>

          {/* Monthly table */}
          <GlassCard title="جدول الإيرادات والمصروفات" accent="purple">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-right border-b border-gray-100">
                    {['الشهر', 'الإيرادات', 'المصروفات', 'صافي الربح', 'هامش الربح'].map((h) => (
                      <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {accountingMonthly.map((m) => {
                    const margin = ((m.profit / m.revenue) * 100).toFixed(1);
                    return (
                      <tr key={m.month} className="hover:bg-gray-50/60">
                        <td className="py-3 pr-3 font-semibold text-gray-800">{m.month}</td>
                        <td className="py-3 pr-3 text-green-700 font-bold">{m.revenue.toLocaleString('ar-SA')} ريال</td>
                        <td className="py-3 pr-3 text-amber-600 font-semibold">{m.expenses.toLocaleString('ar-SA')} ريال</td>
                        <td className="py-3 pr-3 text-sky-700 font-bold">{m.profit.toLocaleString('ar-SA')} ريال</td>
                        <td className="py-3 pr-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            Number(margin) >= 35 ? 'bg-green-100 text-green-700' : 'bg-sky-100 text-sky-700'
                          }`}>
                            {margin}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─── توزيع المصروفات ─── */}
      {tab === 'توزيع المصروفات' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GlassCard title="توزيع المصروفات" subtitle="نسبة مئوية" accent="amber">
            <DonutChartMock data={donutData} height={260} />
          </GlassCard>

          <GlassCard title="تفاصيل المصروفات" subtitle="إجمالي هذا العام" accent="red">
            <div className="space-y-3">
              {expenseBreakdown.map((e) => (
                <div key={e.label} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: e.color }} />
                  <span className="text-sm text-gray-700 flex-1">{e.label}</span>
                  <span className="text-xs text-gray-400">{e.pct}%</span>
                  <span className="text-sm font-bold text-gray-800 w-28 text-left">{e.value.toLocaleString('ar-SA')} ريال</span>
                </div>
              ))}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-3 mt-1">
                <div className="w-3 h-3 flex-shrink-0" />
                <span className="text-sm font-bold text-gray-800 flex-1">الإجمالي</span>
                <span className="text-sm font-extrabold text-amber-700 w-28 text-left">
                  {expenseBreakdown.reduce((s, e) => s + e.value, 0).toLocaleString('ar-SA')} ريال
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─── المعاملات ─── */}
      {tab === 'المعاملات' && (
        <GlassCard title="آخر المعاملات" subtitle={`${transactions.length} معاملة`} accent="green"
          action={<ActionButton variant="secondary" size="sm" icon="📥">تصدير</ActionButton>}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right border-b border-gray-100">
                  {['التاريخ', 'النوع', 'الوصف', 'المزرعة', 'الفئة', 'المبلغ'].map((h) => (
                    <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/60">
                    <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{tx.date}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${TX_TYPE_COLOR[tx.type]}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-gray-700 max-w-[200px] truncate">{tx.desc}</td>
                    <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{tx.farm}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tx.category}</span>
                    </td>
                    <td className={`py-3 pr-3 font-bold whitespace-nowrap ${tx.amount > 0 ? 'text-green-700' : 'text-red-600'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('ar-SA')} ريال
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </PageContainer>
  );
}
