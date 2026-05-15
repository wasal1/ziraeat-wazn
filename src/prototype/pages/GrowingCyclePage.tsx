import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import AlertCard from '../components/AlertCard';
import { LineChartMock, BarChartMock } from '../components/MockChart';
import { growingCycle } from '../data/mockData';

const TABS = ['نظرة عامة', 'الري', 'التسميد', 'الأمراض والآفات', 'الحصاد', 'المصروفات', 'المبيعات', 'التحليل'];

const OP_ICON: Record<string, string> = {
  'ري': '💧', 'تسميد': '🧪', 'حصاد': '🌾', 'رش وقائي': '🛡️', 'تقليم': '✂️',
};

function InfoGrid({ items }: { items: { label: string; value: string; icon: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {items.map((it) => (
        <div key={it.label} className="bg-gray-50/80 rounded-xl p-3 text-center">
          <span className="text-xl block mb-1.5">{it.icon}</span>
          <p className="text-[11px] font-bold text-gray-800 leading-tight">{it.value}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{it.label}</p>
        </div>
      ))}
    </div>
  );
}

function SummaryKPI({ label, value, unit, color }: { label: string; value: string | number; unit?: string; color: string }) {
  return (
    <div className={`rounded-xl p-4 text-center bg-${color}-50`}>
      <p className={`text-2xl font-extrabold text-${color}-700 leading-none`}>
        {typeof value === 'number' ? value.toLocaleString('ar-SA') : value}
        {unit && <span className="text-sm font-normal mr-1">{unit}</span>}
      </p>
      <p className="text-[11px] text-gray-500 mt-1.5">{label}</p>
    </div>
  );
}

export default function GrowingCyclePage() {
  const [tab, setTab] = useState(TABS[0]);
  const gc = growingCycle;

  return (
    <PageContainer>
      <SectionHeader
        title={`الدورة الزراعية: ${gc.title}`}
        subtitle={gc.cultivationType}
        action={
          <div className="flex items-center gap-2">
            <StatusBadge status={gc.status} size="md" />
            <ActionButton variant="secondary" size="sm" icon="📥">تصدير</ActionButton>
          </div>
        }
      />

      {/* ─── Cycle info grid ──────────────── */}
      <GlassCard>
        <InfoGrid items={[
          { label: 'المزروع',          value: gc.crop,         icon: '🌱' },
          { label: 'الصنف',            value: 'خيار بيت محمي', icon: '🏷️' },
          { label: 'تاريخ الزراعة',    value: gc.startDate,    icon: '📅' },
          { label: 'النهاية المتوقعة', value: gc.expectedEnd,  icon: '🎯' },
          { label: 'عدد النباتات',      value: gc.plantCount.toLocaleString(), icon: '🌿' },
          { label: 'المساحة',          value: gc.area,         icon: '📐' },
          { label: 'عمر الدورة',       value: `${gc.agedays} يوم`, icon: '⏱️' },
          { label: 'نوع الزراعة',      value: 'مكيفة',          icon: '❄️' },
        ]} />
      </GlassCard>

      {/* ─── Summary KPIs ─────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <SummaryKPI label="إجمالي الإنتاج"  value={gc.summary.production}  unit="كجم"  color="green"  />
        <SummaryKPI label="إجمالي المبيعات" value={gc.summary.sales}       unit="ريال" color="sky"    />
        <SummaryKPI label="إجمالي التكاليف" value={gc.summary.costs}       unit="ريال" color="amber"  />
        <SummaryKPI label="صافي الربح"       value={gc.summary.profit}      unit="ريال" color="emerald"/>
        <SummaryKPI label="تكلفة الكيلو"     value={gc.summary.costPerKg}   unit="ريال" color="blue"   />
        <SummaryKPI label="ربحية الكيلو"     value={gc.summary.profitPerKg} unit="ريال" color="purple" />
      </div>

      {/* ─── Tabs ─────────────────────────── */}
      <div className="flex overflow-x-auto gap-1 pb-0.5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white/80 text-gray-500 hover:bg-green-50 hover:text-green-700 border border-gray-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ─── Tab: نظرة عامة ──────────────── */}
      {tab === 'نظرة عامة' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GlassCard title="منحنى الإنتاج الأسبوعي" subtitle="كجم" accent="green">
            <LineChartMock data={gc.productionChart} xKey="week" yKey="value" color="#16a34a" height={220} label="كجم" />
          </GlassCard>
          <GlassCard title="توزيع التكاليف" subtitle="ريال" accent="amber">
            <BarChartMock data={gc.costBreakdown} xKey="label" yKey="value" color="#f59e0b" height={220} label="ريال" />
          </GlassCard>
        </div>
      )}

      {/* ─── Tab: الري ───────────────────── */}
      {tab === 'الري' && (
        <GlassCard title="سجلات الري" action={<ActionButton variant="primary" size="sm" icon="＋">إضافة ري</ActionButton>}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['التاريخ', 'مصدر المياه', 'طريقة الري', 'المدة', 'الكمية', 'التكلفة'].map((h) => (
                    <th key={h} className="text-right text-[11px] text-gray-400 font-medium pb-3 pl-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/80">
                {gc.irrigation.map((r, i) => (
                  <tr key={i} className="hover:bg-green-50/40 transition-colors">
                    <td className="py-3 pl-4 text-gray-600 text-xs">{r.date}</td>
                    <td className="py-3 pl-4"><span className="flex items-center gap-1.5 text-xs text-gray-700">💧 {r.source}</span></td>
                    <td className="py-3 pl-4 text-xs text-gray-600">{r.method}</td>
                    <td className="py-3 pl-4 text-xs text-gray-600">⏱ {r.duration}</td>
                    <td className="py-3 pl-4 text-xs font-semibold text-blue-700">{r.qty}</td>
                    <td className="py-3 text-xs font-semibold text-gray-800">{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* ─── Tab: المصروفات ──────────────── */}
      {tab === 'المصروفات' && (
        <GlassCard title="تفصيل التكاليف" subtitle={`الإجمالي: ${gc.summary.costs.toLocaleString('ar-SA')} ريال`}>
          <div className="space-y-3">
            {gc.costBreakdown.map((exp) => (
              <div key={exp.label} className="flex items-center gap-3">
                <span className="text-[13px] text-gray-700 w-28 flex-shrink-0">{exp.label}</span>
                <div className="flex-1">
                  <div className="h-7 bg-gray-50 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-l from-amber-400/90 to-amber-500 rounded-lg transition-all"
                      style={{ width: `${exp.pct}%` }}
                    />
                    <span className="absolute inset-0 flex items-center px-3 text-[11px] font-semibold text-gray-700 mix-blend-multiply">
                      {exp.value.toLocaleString('ar-SA')} ريال
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-gray-400 w-10 text-left flex-shrink-0">{exp.pct}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* ─── Other tabs placeholder ───────── */}
      {!['نظرة عامة', 'الري', 'المصروفات'].includes(tab) && (
        <div className="bg-white/80 rounded-2xl border border-gray-100 p-14 text-center text-gray-400">
          <span className="text-5xl mb-4 block">📋</span>
          <p className="font-semibold text-gray-600 mb-1">بيانات {tab}</p>
          <p className="text-sm">ستظهر هنا في النظام الكامل</p>
          <ActionButton variant="secondary" size="sm" className="mt-5 mx-auto">
            + إضافة {tab}
          </ActionButton>
        </div>
      )}

      {/* ─── Recent Operations ────────────── */}
      <GlassCard title="آخر العمليات المسجلة" action={<ActionButton variant="primary" size="sm" icon="＋">إضافة عملية</ActionButton>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['التاريخ', 'نوع العملية', 'التفاصيل', 'المنفذ', 'التكلفة'].map((h) => (
                  <th key={h} className="text-right text-[11px] text-gray-400 font-medium pb-3 pl-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/80">
              {gc.recentOps.map((op, i) => (
                <tr key={i} className="hover:bg-green-50/40 transition-colors">
                  <td className="py-3 pl-4 text-xs text-gray-400">{op.date}</td>
                  <td className="py-3 pl-4">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                      {OP_ICON[op.type] ?? '📌'} {op.type}
                    </span>
                  </td>
                  <td className="py-3 pl-4 text-xs text-gray-500">{op.detail}</td>
                  <td className="py-3 pl-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold flex items-center justify-center">{op.worker[0]}</span>
                      {op.worker}
                    </span>
                  </td>
                  <td className="py-3 text-xs font-semibold text-gray-800">{op.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <AlertCard level="info" title="تنبيه داخلي" desc="انخفض إنتاج الأسبوع الرابع بنسبة 9% مقارنة بالأسبوع الثالث. يُنصح بمراجعة برنامج التسميد وساعات الري." />
    </PageContainer>
  );
}
