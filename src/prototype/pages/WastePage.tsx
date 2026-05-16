import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { wasteCategories, wasteTotalLoss, wasteSavingPotential, wasteMonthlyTrend } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const PRIORITY_STYLE: Record<string, string> = {
  high:   'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low:    'bg-gray-100 text-gray-500',
};
const PRIORITY_LABEL: Record<string, string> = {
  high: 'أولوية عالية', medium: 'متوسطة', low: 'منخفضة',
};

export default function WastePage() {
  const savingPct = Math.round((wasteSavingPotential / Math.max(1, wasteTotalLoss)) * 100);

  return (
    <PageContainer>
      <SectionHeader
        title="تحليل الهدر وتقليل النفقات"
        subtitle="رصد مصادر الهدر وفرص توفير التكاليف في المزرعة"
      />

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <GlassCard className="text-center" accent="red">
          <p className="text-4xl mb-2">📉</p>
          <p className="font-bold text-2xl text-red-600">{wasteTotalLoss.toLocaleString()} ر.س</p>
          <p className="text-[12px] text-gray-500 mt-1">إجمالي الخسارة الشهرية</p>
        </GlassCard>
        <GlassCard className="text-center" accent="green">
          <p className="text-4xl mb-2">💰</p>
          <p className="font-bold text-2xl text-green-600">{wasteSavingPotential.toLocaleString()} ر.س</p>
          <p className="text-[12px] text-gray-500 mt-1">إمكانية التوفير الشهري</p>
        </GlassCard>
        <GlassCard className="text-center" accent="sky">
          <p className="text-4xl mb-2">🎯</p>
          <p className="font-bold text-2xl text-sky-600">{savingPct}%</p>
          <p className="text-[12px] text-gray-500 mt-1">نسبة خفض الهدر المحتملة</p>
        </GlassCard>
      </div>

      {/* Chart */}
      <GlassCard title="اتجاه الهدر الشهري">
        <div style={{ direction: 'ltr' }}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={wasteMonthlyTrend} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value) => [`${Number(value).toLocaleString()} ر.س`, '']}
                contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 12 }}
              />
              <Bar dataKey="total" name="الهدر الكلي" fill="#f87171" radius={[6, 6, 0, 0]} />
              <Bar dataKey="saved" name="تم توفيره" fill="#34d399" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-5 mt-2 text-[12px]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-400 inline-block" /> الهدر الكلي</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" /> تم توفيره</span>
        </div>
      </GlassCard>

      {/* Categories */}
      <GlassCard title="تصنيف مصادر الهدر" noPadding>
        <div className="divide-y divide-gray-100/80">
          {wasteCategories.map((cat) => {
            const pct = Math.round((cat.monthlyLoss / Math.max(1, wasteTotalLoss)) * 100);
            const savePct = Math.round((cat.savingPotential / Math.max(1, cat.monthlyLoss)) * 100);
            return (
              <div key={cat.id} className="px-4 py-4 md:px-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="font-semibold text-gray-800 text-sm">{cat.name}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLE[cat.priority]}`}>
                        {PRIORITY_LABEL[cat.priority]}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-500">{cat.description}</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <p className="font-bold text-red-600 text-sm">{cat.monthlyLoss.toLocaleString()} ر.س/شهر</p>
                    <p className="text-[11px] text-green-600 mt-0.5">يمكن توفير {cat.savingPotential.toLocaleString()} ر.س</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>نسبة من إجمالي الهدر</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>إمكانية التوفير</span>
                    <span>{savePct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: `${savePct}%` }} />
                  </div>
                </div>

                {cat.actions && cat.actions.length > 0 && (
                  <div className="mt-3">
                    <p className="text-[11px] text-gray-400 mb-1.5">إجراءات التحسين المقترحة:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.actions.map((a, i) => (
                        <span key={i} className="text-[12px] bg-green-50 text-green-700 px-2.5 py-1 rounded-lg border border-green-100">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>
    </PageContainer>
  );
}
