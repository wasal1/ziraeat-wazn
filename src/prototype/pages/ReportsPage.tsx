import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatCard from '../components/StatCard';
import { reportTypes, kpiComparison, seasonComparison, accountingMonthly } from '../data/mockData';
import { LineChartMock, BarChartMock } from '../components/MockChart';

const COLOR_CFG: Record<string, { bg: string; text: string; border: string; btn: string }> = {
  green:  { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  btn: 'bg-green-600 hover:bg-green-700'  },
  sky:    { bg: 'bg-sky-50',    text: 'text-sky-700',    border: 'border-sky-200',    btn: 'bg-sky-600 hover:bg-sky-700'      },
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200',   btn: 'bg-blue-600 hover:bg-blue-700'    },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', btn: 'bg-purple-600 hover:bg-purple-700'},
  red:    { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200',    btn: 'bg-red-600 hover:bg-red-700'      },
  amber:  { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  btn: 'bg-amber-600 hover:bg-amber-700'  },
  lime:   { bg: 'bg-lime-50',   text: 'text-lime-700',   border: 'border-lime-200',   btn: 'bg-lime-600 hover:bg-lime-700'    },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', btn: 'bg-indigo-600 hover:bg-indigo-700'},
};

const TABS = ['لوحة المؤشرات', 'مقارنة المواسم', 'إنشاء تقارير'];

export default function ReportsPage() {
  const [tab, setTab] = useState('لوحة المؤشرات');
  const [period, setPeriod] = useState('هذا الشهر');

  return (
    <PageContainer>
      <SectionHeader
        title="التقارير والتحليلات"
        subtitle="مؤشرات الأداء ومقارنة المواسم وإنشاء التقارير"
        action={
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              {['هذا الشهر', 'هذا الموسم', 'كل المواسم'].map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`text-[11px] px-2.5 py-1.5 rounded-md transition-all ${period === p ? 'bg-white text-green-700 font-semibold shadow-sm' : 'text-gray-500'}`}
                >{p}</button>
              ))}
            </div>
            <ActionButton variant="secondary" size="sm" icon="📥">تصدير كـ PDF</ActionButton>
          </div>
        }
      />

      {/* KPI Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="هامش الربح"           value="33.9"  unit="%" icon="📈" color="green"  trend={{ val: 4.5, up: true  }} />
        <StatCard label="تكلفة الكيلو"          value="1.65"  unit="ريال" icon="⚖️" color="sky" trend={{ val: 9,   up: false }} />
        <StatCard label="نسبة الدرجة الأولى"    value="90.2"  unit="%" icon="⭐" color="amber"  trend={{ val: 2.7, up: true  }} />
        <StatCard label="كفاءة استهلاك المياه"  value="0.044" unit="م³/كجم" icon="💧" color="purple" trend={{ val: 15, up: false }} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100/70 rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${tab === t ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >{t}</button>
        ))}
      </div>

      {/* ─── لوحة المؤشرات ─── */}
      {tab === 'لوحة المؤشرات' && (
        <div className="space-y-5">
          {/* Revenue + Expenses + Profit chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <GlassCard title="الإيرادات الشهرية" subtitle="ريال" accent="green">
              <LineChartMock data={accountingMonthly} xKey="month" yKey="revenue" color="#16a34a" height={160} label="ريال" />
            </GlassCard>
            <GlassCard title="المصروفات الشهرية" subtitle="ريال" accent="amber">
              <LineChartMock data={accountingMonthly} xKey="month" yKey="expenses" color="#f59e0b" height={160} label="ريال" />
            </GlassCard>
            <GlassCard title="صافي الربح الشهري" subtitle="ريال" accent="sky">
              <LineChartMock data={accountingMonthly} xKey="month" yKey="profit" color="#0ea5e9" height={160} label="ريال" />
            </GlassCard>
          </div>

          {/* KPI comparison table */}
          <GlassCard title="مؤشرات الأداء الرئيسية" subtitle="مقارنة بالمعيار" accent="purple">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-right">
                    {['المؤشر', 'الحالي', 'الفترة السابقة', 'المستهدف', 'التغيير', 'الحالة'].map((h) => (
                      <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {kpiComparison.map((k) => {
                    const change = k.current - k.prev;
                    // For cost metrics, lower is better
                    const isCostMetric = ['تكلفة الكيلو', 'تكلفة الكهرباء / كجم', 'كفاءة استهلاك المياه'].includes(k.kpi);
                    const isGood = isCostMetric ? change <= 0 : change >= 0;
                    const metTarget = isCostMetric ? k.current <= k.target : k.current >= k.target;
                    const changePct = Math.abs(Math.round((change / k.prev) * 100));
                    return (
                      <tr key={k.kpi} className="hover:bg-gray-50/60">
                        <td className="py-3 pr-3 font-medium text-gray-800 whitespace-nowrap">{k.kpi}</td>
                        <td className="py-3 pr-3 font-bold text-gray-800 whitespace-nowrap">{k.current} {k.unit}</td>
                        <td className="py-3 pr-3 text-gray-400 whitespace-nowrap">{k.prev} {k.unit}</td>
                        <td className="py-3 pr-3 text-gray-500 whitespace-nowrap">{k.target} {k.unit}</td>
                        <td className="py-3 pr-3 whitespace-nowrap">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isGood ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isGood ? '▲' : '▼'} {changePct}%
                          </span>
                        </td>
                        <td className="py-3 pr-3 whitespace-nowrap">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${metTarget ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {metTarget ? '✅ حقق الهدف' : '⚠️ دون الهدف'}
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

      {/* ─── مقارنة المواسم ─── */}
      {tab === 'مقارنة المواسم' && (
        <div className="space-y-5">
          <GlassCard title="مقارنة المواسم الزراعية" subtitle="2024 — 2025 — 2026 (حتى الآن)" accent="purple">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-right">
                    <th className="pb-3 pr-3 text-xs font-semibold text-gray-400">المؤشر</th>
                    <th className="pb-3 pr-3 text-xs font-semibold text-gray-400">موسم 2024</th>
                    <th className="pb-3 pr-3 text-xs font-semibold text-gray-400">موسم 2025</th>
                    <th className="pb-3 pr-3 text-xs font-semibold text-green-600">موسم 2026 (حتى الآن)</th>
                    <th className="pb-3 pr-3 text-xs font-semibold text-gray-400">التحسن</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {seasonComparison.map((s) => {
                    const change = ((s.season2025 - s.season2024) / s.season2024 * 100).toFixed(1);
                    const up = s.season2025 > s.season2024;
                    return (
                      <tr key={s.metric} className="hover:bg-gray-50/60">
                        <td className="py-3 pr-3 font-medium text-gray-800">{s.metric}</td>
                        <td className="py-3 pr-3 text-gray-500">{s.season2024}</td>
                        <td className="py-3 pr-3 text-gray-500">{s.season2025}</td>
                        <td className="py-3 pr-3 font-bold text-green-700">{s.season2026}</td>
                        <td className="py-3 pr-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {up ? '▲' : '▼'} {Math.abs(Number(change))}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <GlassCard title="الإنتاج عبر المواسم" subtitle="طن" accent="green">
              <BarChartMock
                data={[
                  { season: '2024', value: 38.2 },
                  { season: '2025', value: 42.6 },
                  { season: '2026*', value: 18.4 },
                ]}
                xKey="season" yKey="value" color="#16a34a" height={180} label="طن"
              />
            </GlassCard>
            <GlassCard title="صافي الربح عبر المواسم" subtitle="ألف ريال" accent="sky">
              <BarChartMock
                data={[
                  { season: '2024', value: 98 },
                  { season: '2025', value: 124 },
                  { season: '2026*', value: 67 },
                ]}
                xKey="season" yKey="value" color="#0ea5e9" height={180} label="ألف ر"
              />
            </GlassCard>
          </div>
        </div>
      )}

      {/* ─── إنشاء تقارير ─── */}
      {tab === 'إنشاء تقارير' && (
        <div className="space-y-5">
          {/* Date range */}
          <GlassCard title="نطاق التقرير" accent="green">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">من تاريخ</label>
                <input type="date" defaultValue="2026-05-01"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">إلى تاريخ</label>
                <input type="date" defaultValue="2026-05-15"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">المزرعة</label>
                <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400">
                  <option>كل المزارع</option>
                  <option>مزرعة النخيل</option>
                  <option>مزرعة الواحة</option>
                  <option>مزرعة الربوة</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Report type cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTypes.map((r) => {
              const cfg = COLOR_CFG[r.color] ?? COLOR_CFG['green'];
              return (
                <div key={r.id} className={`bg-white/90 backdrop-blur-md rounded-2xl border ${cfg.border} p-4 hover:shadow-md transition-all group cursor-pointer`}>
                  <div className={`w-12 h-12 rounded-2xl ${cfg.bg} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                    {r.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{r.title}</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-4">{r.desc}</p>
                  <button className={`w-full py-2 ${cfg.btn} text-white text-xs font-semibold rounded-xl transition-colors shadow-sm`}>
                    إنشاء التقرير
                  </button>
                </div>
              );
            })}
          </div>

          {/* Recent reports */}
          <GlassCard title="آخر التقارير المولّدة" accent="sky">
            <div className="space-y-2">
              {[
                { name: 'تقرير الإنتاج — أبريل 2026',  date: '2026-05-01', size: '1.2 MB', type: 'إنتاج'  },
                { name: 'التقرير المالي — الربع الأول', date: '2026-04-15', size: '2.4 MB', type: 'مالي'   },
                { name: 'تقرير الدورات الزراعية 2025',  date: '2026-01-10', size: '3.1 MB', type: 'دورة'   },
                { name: 'تقرير استهلاك المياه — مارس',  date: '2026-04-02', size: '0.8 MB', type: 'مياه'   },
              ].map((rp) => (
                <div key={rp.name} className="flex items-center gap-3 p-3 bg-gray-50/70 rounded-xl hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-lg flex-shrink-0">📄</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{rp.name}</p>
                    <p className="text-[10px] text-gray-400">{rp.date} — {rp.size}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex-shrink-0">{rp.type}</span>
                  <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-green-600 transition-colors flex-shrink-0">
                    ⬇️
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </PageContainer>
  );
}
