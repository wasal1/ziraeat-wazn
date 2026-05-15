import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import AlertCard from '../components/AlertCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import { BarChartMock } from '../components/MockChart';
import { electricityData } from '../data/mockData';

export default function EnergyPage() {
  const ed = electricityData;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="الكهرباء والتشغيل"
        subtitle="مراقبة استهلاك الكهرباء وتشغيل البيوت المحمية"
        action={
          <button className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-xl hover:bg-amber-600 transition-colors shadow-sm">
            + تسجيل قراءة عداد
          </button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="الاستهلاك الإجمالي اليوم" value={ed.totalKwh} unit="kWh" icon="⚡" color="amber" />
        <StatCard title="تكلفة الكهرباء اليوم" value={ed.totalCost} unit="ريال" icon="💰" color="red" />
        <StatCard title="أعلى بيت استهلاكاً" value={ed.topConsumer} icon="🏆" color="amber" />
        <StatCard title="تكلفة الكهرباء / كجم" value={ed.costPerKg} unit="ريال" icon="🔢" color="purple" />
        <div className="glass-card rounded-2xl p-5 border border-red-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🔧</span>
            <span className="text-xs text-gray-500">أعطال مفتوحة</span>
          </div>
          <p className="text-3xl font-bold text-red-600">{ed.openFaults}</p>
          <p className="text-xs text-red-500 mt-1">تحتاج معالجة</p>
        </div>
      </div>

      <AlertCard type="warning" title="تجاوز الاستهلاك المعتاد" desc="البيت المحمي رقم 7 تجاوز متوسط الاستهلاك بنسبة 18%. استهلاك اليوم: 320 kWh مقابل متوسط 272 kWh." />

      {/* Weekly chart */}
      <GlassCard title="استهلاك الكهرباء الأسبوعي" subtitle="kWh">
        <BarChartMock data={ed.weeklyConsumption} xKey="day" yKey="value" color="#f59e0b" height={200} />
      </GlassCard>

      {/* Greenhouse operation table */}
      <GlassCard title="تشغيل البيوت المحمية اليوم">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['البيت المحمي', 'المراوح', 'خلايا التبريد', 'الضباب', 'المضخات', 'الإضاءة', 'الاستهلاك', 'التكلفة', 'الحالة'].map((h) => (
                  <th key={h} className="text-right text-xs text-gray-400 font-medium pb-3 pl-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ed.greenhouseOps.map((op) => (
                <tr key={op.name} className={`hover:bg-amber-50/50 transition-colors ${op.status === 'مرتفع' ? 'bg-red-50/30' : ''}`}>
                  <td className="py-3 pl-3 font-medium text-gray-800">{op.name}</td>
                  <td className="py-3 pl-3 text-gray-600 text-xs">🌀 {op.fans}</td>
                  <td className="py-3 pl-3 text-gray-600 text-xs">❄️ {op.cooling}</td>
                  <td className="py-3 pl-3 text-gray-600 text-xs">💨 {op.fog}</td>
                  <td className="py-3 pl-3 text-gray-600 text-xs">⚡ {op.pumps}</td>
                  <td className="py-3 pl-3 text-gray-600 text-xs">💡 {op.lighting}</td>
                  <td className="py-3 pl-3 font-bold text-amber-700">{op.kwh} kWh</td>
                  <td className="py-3 pl-3 font-bold text-gray-800">{op.cost} ريال</td>
                  <td className="py-3">
                    <StatusBadge status={op.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50">
                <td colSpan={6} className="py-3 pl-3 font-bold text-gray-700">الإجمالي</td>
                <td className="py-3 pl-3 font-bold text-amber-700">{ed.totalKwh} kWh</td>
                <td className="py-3 pl-3 font-bold text-gray-800">{ed.totalCost} ريال</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </GlassCard>

      {/* Cost distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <GlassCard title="توزيع التكلفة على البيوت">
          <div className="space-y-3">
            {ed.greenhouseOps.map((op) => (
              <div key={op.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{op.name}</span>
                  <span className={`font-medium ${op.status === 'مرتفع' ? 'text-red-600' : 'text-gray-700'}`}>{op.cost} ريال</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${op.status === 'مرتفع' ? 'bg-red-400' : 'bg-amber-400'}`}
                    style={{ width: `${(op.cost / ed.totalCost) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="الأعطال والصيانة">
          <div className="space-y-3">
            {[
              { name: 'خلية تبريد رقم 3 — بيت 7', type: 'عطل', date: '2026-02-18', status: 'مفتوح', priority: 'عاجل' },
              { name: 'مضخة مياه رئيسية — بيت 2', type: 'صيانة دورية', date: '2026-02-15', status: 'مفتوح', priority: 'عادي' },
              { name: 'مراوح طارد — بيت 12', type: 'صيانة', date: '2026-02-10', status: 'مغلق', priority: 'عادي' },
            ].map((fault, i) => (
              <div key={i} className={`p-3 rounded-xl border ${fault.status === 'مفتوح' ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{fault.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{fault.type} — {fault.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={fault.status === 'مفتوح' ? 'يحتاج متابعة' : 'مكتمل'} size="sm" />
                    <span className={`text-xs font-medium ${fault.priority === 'عاجل' ? 'text-red-600' : 'text-gray-400'}`}>{fault.priority}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
