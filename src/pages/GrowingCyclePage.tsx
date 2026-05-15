import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import { LineChartMock, BarChartMock } from '../components/MockChart';
import { growingCycle } from '../data/mockData';

const tabs = ['نظرة عامة', 'الري', 'التسميد', 'الأمراض والآفات', 'الحصاد', 'المصروفات', 'المبيعات', 'التحليل'];

function SummaryMetric({ label, value, unit, color = 'gray' }: { label: string; value: string | number; unit?: string; color?: string }) {
  return (
    <div className={`p-4 rounded-xl bg-${color}-50 text-center`}>
      <p className={`text-2xl font-bold text-${color}-700`}>
        {typeof value === 'number' ? value.toLocaleString('ar-SA') : value}
        {unit && <span className="text-sm font-normal mr-1">{unit}</span>}
      </p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}

export default function GrowingCyclePage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const gc = growingCycle;

  return (
    <div className="space-y-6">
      <SectionHeader
        title={`الدورة الزراعية: ${gc.title}`}
        subtitle={gc.cultivationType}
        action={<StatusBadge status={gc.status} />}
      />

      {/* Cycle header */}
      <div className="glass-card rounded-2xl p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center text-sm">
          {[
            { label: 'المزروع', value: gc.crop, icon: '🌱' },
            { label: 'الصنف', value: 'خيار بيت محمي', icon: '🏷️' },
            { label: 'تاريخ الزراعة', value: gc.startDate, icon: '📅' },
            { label: 'النهاية المتوقعة', value: gc.expectedEndDate, icon: '🎯' },
            { label: 'عدد النباتات', value: gc.plantCount.toLocaleString(), icon: '🌿' },
            { label: 'المساحة', value: gc.area, icon: '📐' },
            { label: 'عمر الدورة', value: `${gc.cycleAge} يوم`, icon: '⏱️' },
            { label: 'نوع الزراعة', value: 'مكيفة', icon: '❄️' },
          ].map((item) => (
            <div key={item.label} className="p-3 bg-gray-50 rounded-xl">
              <p className="text-lg mb-1">{item.icon}</p>
              <p className="font-semibold text-gray-800 text-xs leading-tight">{item.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <SummaryMetric label="إجمالي الإنتاج" value={gc.totalProduction} unit="كجم" color="green" />
        <SummaryMetric label="إجمالي المبيعات" value={gc.totalSales} unit="ريال" color="blue" />
        <SummaryMetric label="إجمالي التكاليف" value={gc.totalCosts} unit="ريال" color="amber" />
        <SummaryMetric label="صافي الربح" value={gc.netProfit} unit="ريال" color="emerald" />
        <SummaryMetric label="تكلفة الكيلو" value={gc.costPerKg} unit="ريال" color="sky" />
        <SummaryMetric label="ربحية الكيلو" value={gc.profitPerKg} unit="ريال" color="purple" />
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-green-600 text-white shadow-md'
                : 'glass-card text-gray-600 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'نظرة عامة' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard title="منحنى الإنتاج اليومي" subtitle="كجم">
            <LineChartMock data={gc.dailyProduction} xKey="day" yKey="value" color="#16a34a" height={220} />
          </GlassCard>
          <GlassCard title="توزيع التكاليف">
            <BarChartMock data={gc.expenses} xKey="category" yKey="amount" color="#0ea5e9" height={220} />
          </GlassCard>
        </div>
      )}

      {activeTab === 'الري' && (
        <GlassCard title="سجلات الري">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['التاريخ', 'مصدر المياه', 'طريقة الري', 'المدة', 'الكمية', 'التكلفة'].map((h) => (
                    <th key={h} className="text-right text-xs text-gray-400 pb-3 pl-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {gc.irrigationRecords.map((r, i) => (
                  <tr key={i} className="hover:bg-green-50/50">
                    <td className="py-3 pl-4 text-gray-700">{r.date}</td>
                    <td className="py-3 pl-4 text-gray-600">💧 {r.source}</td>
                    <td className="py-3 pl-4 text-gray-600">{r.method}</td>
                    <td className="py-3 pl-4 text-gray-600">⏱ {r.duration}</td>
                    <td className="py-3 pl-4 font-medium text-blue-700">{r.quantity}</td>
                    <td className="py-3 font-medium text-gray-800">{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {activeTab === 'المصروفات' && (
        <GlassCard title="تفصيل التكاليف">
          <div className="space-y-3">
            {gc.expenses.map((exp) => (
              <div key={exp.category} className="flex items-center gap-3">
                <span className="text-sm text-gray-700 w-32 flex-shrink-0">{exp.category}</span>
                <div className="flex-1">
                  <div className="h-6 bg-gray-100 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-l from-green-400 to-emerald-600 rounded-lg"
                      style={{ width: `${(exp.amount / 5000) * 100}%` }}
                    />
                    <span className="absolute inset-0 flex items-center px-2 text-xs font-medium text-white">
                      {exp.amount.toLocaleString()} ريال
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 w-20 text-left">{((exp.amount / gc.totalCosts) * 100).toFixed(1)}%</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 font-bold">
              <span className="text-gray-800">الإجمالي</span>
              <span className="text-gray-800">{gc.totalCosts.toLocaleString()} ريال</span>
            </div>
          </div>
        </GlassCard>
      )}

      {(activeTab !== 'نظرة عامة' && activeTab !== 'الري' && activeTab !== 'المصروفات') && (
        <div className="glass-card rounded-2xl p-16 text-center text-gray-400">
          <span className="text-5xl mb-4 block">📋</span>
          <p className="font-medium">بيانات {activeTab}</p>
          <p className="text-sm mt-2">سيتم عرض التفاصيل هنا في النظام الكامل</p>
          <button className="mt-6 px-4 py-2 bg-green-100 text-green-700 text-sm rounded-xl hover:bg-green-200">
            + إضافة {activeTab}
          </button>
        </div>
      )}
    </div>
  );
}
