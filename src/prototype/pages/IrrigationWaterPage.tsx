import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import AlertCard from '../components/AlertCard';
import { waterSources, waterStats, irrigationRecords, waterQuality } from '../data/mockData';

const TABS = ['مصادر المياه', 'محطات التحلية', 'عمليات الري', 'جودة المياه', 'تقارير المياه'];

// ─── EC/TDS/pH indicator ─────────────────────────
function QualityBadge({ val, threshold, unit }: { val: number; threshold: number; unit: string }) {
  const ok = val <= threshold;
  return (
    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {val} {unit}
    </span>
  );
}

// ─── Source type icon ─────────────────────────────
const SRC_ICON: Record<string, string> = {
  'بئر': '🪣', 'محطة تحلية': '🏭', 'خزان': '🏺', 'صهاريج': '🚛',
};

export default function IrrigationWaterPage() {
  const [tab, setTab] = useState(TABS[0]);
  const desal = waterSources.find((w) => w.desalination);

  return (
    <PageContainer>
      <SectionHeader
        title="الري ومصادر المياه"
        subtitle="إدارة شاملة لمصادر المياه وعمليات الري وجودة المياه ومحطات التحلية"
        action={<ActionButton variant="primary" size="sm" icon="＋">إضافة مصدر مياه</ActionButton>}
      />

      {/* ─── Summary stats ────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="إجمالي استهلاك المياه" value={waterStats.totalM3}    unit="م³"   icon="💧" color="sky"    />
        <StatCard label="تكلفة المياه الإجمالية" value={waterStats.totalCost}  unit="ريال" icon="💰" color="green"  />
        <StatCard label="تكلفة المياه / كجم"     value={waterStats.costPerKg}  unit="ريال" icon="📊" color="purple" />
        <StatCard label="استهلاك المياه / كجم"   value={waterStats.m3PerKg}   unit="م³"   icon="🔢" color="sky"    />
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-amber-100 shadow-sm p-5">
          <p className="text-[11px] text-gray-400 mb-2">تنبيه الملوحة</p>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <StatusBadge status={waterStats.salinityAlert} size="md" />
          </div>
          <p className="text-[10px] text-gray-400 mt-2">EC: 1.8 في محطة التحلية رقم 1</p>
        </div>
      </div>

      <AlertCard
        level="danger"
        title="ارتفاع ملوحة المياه — محطة التحلية رقم 1"
        desc="EC الخارج: 1.8 mS/cm — الحد المسموح: 1.2 mS/cm. يُنصح بالفحص الفوري للمحطة وتأجيل الري حتى تتحسن جودة المياه."
      />

      {/* ─── Tabs ─────────────────────────────────── */}
      <div className="flex overflow-x-auto gap-1.5 pb-0.5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white/80 text-gray-500 hover:bg-sky-50 hover:text-sky-700 border border-gray-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ─── Tab: مصادر المياه ─────────────────────── */}
      {tab === 'مصادر المياه' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {waterSources.map((ws) => (
            <GlassCard key={ws.id} accent={ws.active ? 'sky' : undefined}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-xl">
                    {SRC_ICON[ws.type] ?? '💧'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-[15px]">{ws.name}</h3>
                    <p className="text-xs text-gray-400">{ws.type}</p>
                  </div>
                </div>
                <StatusBadge status={ws.active ? 'نشط' : 'غير نشط'} size="sm" />
              </div>

              {/* Quality indicators */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'EC (mS/cm)', val: ws.ec,  threshold: 1.5, unit: '' },
                  { label: 'TDS (ppm)',  val: ws.tds, threshold: 800, unit: '' },
                  { label: 'pH',         val: ws.ph,  threshold: 8.0, unit: '' },
                ].map((q) => (
                  <div key={q.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                    <QualityBadge val={q.val} threshold={q.threshold} unit={q.unit} />
                    <p className="text-[10px] text-gray-400 mt-1">{q.label}</p>
                  </div>
                ))}
              </div>

              {ws.cost > 0 && (
                <div className="flex items-center justify-between text-sm border-t border-gray-50 pt-3">
                  <span className="text-gray-500">التكلفة التقديرية / م³</span>
                  <span className="font-bold text-gray-800">{ws.cost} ريال</span>
                </div>
              )}
              {ws.notes && <p className="text-[11px] text-gray-400 mt-2">{ws.notes}</p>}
            </GlassCard>
          ))}
        </div>
      )}

      {/* ─── Tab: محطات التحلية ───────────────────── */}
      {tab === 'محطات التحلية' && desal && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GlassCard title={`${desal.name} — بيانات المحطة`} accent="sky">
            <div className="space-y-0">
              {[
                { icon: '⚡', label: 'الطاقة الإنتاجية اليومية',     value: `${desal.desalination!.dailyCapacity} م³` },
                { icon: '🔧', label: 'آخر صيانة',                   value: desal.desalination!.lastMaintenance     },
                { icon: '📊', label: 'EC قبل التحلية',               value: `${desal.desalination!.ecBefore} mS/cm` },
                { icon: '✅', label: 'EC بعد التحلية',               value: `${desal.desalination!.ecAfter} mS/cm`  },
                { icon: '💰', label: 'التكلفة التقريبية / م³',       value: `${desal.cost} ريال`                    },
                { icon: '🟢', label: 'حالة المحطة',                  value: desal.desalination!.status              },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 text-sm">
                  <span className="flex items-center gap-2 text-gray-600"><span>{r.icon}</span>{r.label}</span>
                  <span className="font-bold text-gray-800">{r.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard title="كفاءة التحلية" accent="green">
            <div className="text-center py-4 mb-4 bg-green-50 rounded-xl">
              <p className="text-5xl font-extrabold text-green-700">{desal.desalination!.reduction}%</p>
              <p className="text-sm text-gray-500 mt-2">نسبة تخفيض الملوحة</p>
              <p className="text-xs text-gray-400 mt-1">من {desal.desalination!.ecBefore} إلى {desal.desalination!.ecAfter} mS/cm</p>
            </div>

            <div className="space-y-3">
              {[
                { label: 'EC',  before: desal.desalination!.ecBefore,  after: desal.desalination!.ecAfter,  max: 6,    unit: 'mS/cm', threshold: 1.5 },
                { label: 'TDS', before: desal.desalination!.tdsBefore, after: desal.desalination!.tdsAfter, max: 3000, unit: 'ppm',  threshold: 800 },
              ].map((q) => (
                <div key={q.label} className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-600 mb-2">{q.label} ({q.unit})</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-red-500">قبل: {q.before}</span>
                        <span className="text-green-600">بعد: {q.after}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 rounded-full" style={{ width: `${(q.after / q.max) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─── Tab: عمليات الري ─────────────────────── */}
      {tab === 'عمليات الري' && (
        <GlassCard
          title="سجلات عمليات الري"
          subtitle={`${irrigationRecords.length} سجلات حديثة`}
          action={<ActionButton variant="primary" size="sm" icon="＋">تسجيل ري</ActionButton>}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['التاريخ', 'الدورة الزراعية', 'مصدر المياه', 'طريقة الري', 'المدة', 'الكمية م³', 'التكلفة'].map((h) => (
                    <th key={h} className="text-right text-[11px] text-gray-400 font-medium pb-3 pl-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/80">
                {irrigationRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-sky-50/30 transition-colors">
                    <td className="py-3 pl-4 text-xs text-gray-400">{r.date}</td>
                    <td className="py-3 pl-4 text-[13px] font-medium text-gray-800">{r.cycle}</td>
                    <td className="py-3 pl-4 text-xs text-gray-600">💧 {r.source}</td>
                    <td className="py-3 pl-4 text-xs text-gray-600">{r.method}</td>
                    <td className="py-3 pl-4 text-xs text-gray-600">⏱ {r.duration}</td>
                    <td className="py-3 pl-4 text-xs font-bold text-sky-700">{r.qty}</td>
                    <td className="py-3 text-xs font-bold text-gray-800">{r.cost} ريال</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* ─── Tab: جودة المياه ─────────────────────── */}
      {tab === 'جودة المياه' && (
        <GlassCard title="سجل قراءات جودة المياه" action={<ActionButton variant="primary" size="sm" icon="＋">إضافة قراءة</ActionButton>}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['المصدر', 'التاريخ', 'EC (mS/cm)', 'TDS (ppm)', 'pH', 'التقييم'].map((h) => (
                    <th key={h} className="text-right text-[11px] text-gray-400 font-medium pb-3 pl-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/80">
                {waterQuality.map((q, i) => (
                  <tr key={i} className="hover:bg-sky-50/30 transition-colors">
                    <td className="py-3 pl-4 text-[13px] font-medium text-gray-800">{q.source}</td>
                    <td className="py-3 pl-4 text-xs text-gray-400">{q.date}</td>
                    <td className="py-3 pl-4"><QualityBadge val={q.ec} threshold={1.5} unit="" /></td>
                    <td className="py-3 pl-4"><QualityBadge val={q.tds} threshold={800} unit="" /></td>
                    <td className="py-3 pl-4"><QualityBadge val={q.ph} threshold={8.0} unit="" /></td>
                    <td className="py-3"><StatusBadge status={q.status} size="xs" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* ─── Tab: تقارير المياه ───────────────────── */}
      {tab === 'تقارير المياه' && (
        <div className="bg-white/80 rounded-2xl border border-gray-100 p-14 text-center text-gray-400">
          <span className="text-5xl mb-4 block">📊</span>
          <p className="font-semibold text-gray-600 mb-1">تقارير المياه والري</p>
          <p className="text-sm">ستظهر هنا في النظام الكامل — تقارير استهلاك المياه، تكلفة الري، تحليل الملوحة</p>
          <ActionButton variant="secondary" size="sm" className="mt-5 mx-auto">طلب عرض تجريبي</ActionButton>
        </div>
      )}
    </PageContainer>
  );
}
