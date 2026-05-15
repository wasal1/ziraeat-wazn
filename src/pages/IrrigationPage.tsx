import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import AlertCard from '../components/AlertCard';
import SectionHeader from '../components/SectionHeader';
import { waterSources, irrigationRecords, waterStats } from '../data/mockData';

const tabs = ['مصادر المياه', 'محطات التحلية', 'عمليات الري', 'جودة المياه', 'تقارير المياه'];

export default function IrrigationPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const desal = waterSources.find((w) => w.desalination);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="الري ومصادر المياه"
        subtitle="إدارة شاملة لمصادر المياه وعمليات الري وجودة المياه"
        action={
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            + إضافة مصدر مياه
          </button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="إجمالي استهلاك المياه" value={waterStats.totalConsumption} unit="م³" icon="💧" color="blue" />
        <StatCard title="تكلفة المياه" value={waterStats.totalCost} unit="ريال" icon="💰" color="green" />
        <StatCard title="تكلفة المياه / كجم" value={waterStats.costPerKg} unit="ريال" icon="📊" color="purple" />
        <StatCard title="استهلاك المياه / كجم" value={waterStats.consumptionPerKg} unit="م³" icon="🔢" color="blue" />
        <div className="glass-card rounded-2xl p-5 border border-amber-100 flex flex-col justify-center">
          <p className="text-xs text-gray-500 mb-1">تنبيه الملوحة</p>
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <StatusBadge status={waterStats.salinityAlert} />
          </div>
        </div>
      </div>

      <AlertCard type="warning" title="ارتفاع ملوحة المياه" desc="محطة التحلية رقم 1 — EC الخارج: 1.8 (الحد المسموح: 1.2). يُنصح بالفحص الفوري." />

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'glass-card text-gray-600 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Water Sources */}
      {activeTab === 'مصادر المياه' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {waterSources.map((ws) => (
            <div key={ws.id} className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-800">{ws.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{ws.type}</p>
                </div>
                <StatusBadge status={ws.active ? 'نشط' : 'غير نشط'} size="sm" />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm font-bold text-blue-700">{ws.latestEC}</p>
                  <p className="text-xs text-gray-400">EC</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <p className="text-sm font-bold text-purple-700">{ws.latestTDS}</p>
                  <p className="text-xs text-gray-400">TDS</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-sm font-bold text-green-700">{ws.latestPH}</p>
                  <p className="text-xs text-gray-400">pH</p>
                </div>
              </div>
              {ws.costPerM3 > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">التكلفة التقديرية / م³</span>
                  <span className="font-bold text-gray-800">{ws.costPerM3} ريال</span>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">{ws.notes}</p>
            </div>
          ))}
        </div>
      )}

      {/* Desalination */}
      {activeTab === 'محطات التحلية' && desal && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GlassCard title="محطة التحلية رقم 1">
            <div className="space-y-3">
              {[
                { label: 'الطاقة اليومية', value: `${desal.desalination!.dailyCapacity} م³`, icon: '⚡' },
                { label: 'آخر صيانة', value: desal.desalination!.lastMaintenance, icon: '🔧' },
                { label: 'EC قبل التحلية', value: desal.desalination!.ecBefore, icon: '📊' },
                { label: 'EC بعد التحلية', value: desal.desalination!.ecAfter, icon: '✅' },
                { label: 'التكلفة التقريبية / م³', value: `${desal.costPerM3} ريال`, icon: '💰' },
                { label: 'الحالة', value: desal.desalination!.status, icon: '🟢' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <span>{item.icon}</span>
                    {item.label}
                  </span>
                  <span className="font-bold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard title="أداء التحلية">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl text-center">
                <p className="text-3xl font-bold text-green-700">81%</p>
                <p className="text-sm text-gray-500 mt-1">نسبة تخفيض الملوحة</p>
                <p className="text-xs text-gray-400 mt-0.5">من 4.8 إلى 0.9 EC</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm font-medium text-blue-800 mb-2">جودة المياه المنتجة</p>
                <div className="space-y-2">
                  {[
                    { label: 'EC', value: 0.9, max: 5, threshold: 1.2, color: 'bg-green-400' },
                    { label: 'TDS', value: 420, max: 2000, threshold: 600, color: 'bg-green-400' },
                  ].map((q) => (
                    <div key={q.label}>
                      <div className="flex justify-between text-xs mb-1 text-gray-600">
                        <span>{q.label}</span>
                        <span className="text-green-600 font-medium">{q.value} ✓</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${q.color} rounded-full`} style={{ width: `${(q.value / q.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Irrigation Records */}
      {activeTab === 'عمليات الري' && (
        <GlassCard title="سجلات عمليات الري" action={
          <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700">+ إضافة ري</button>
        }>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['الدورة الزراعية', 'مصدر المياه', 'طريقة الري', 'المدة', 'الكمية م³', 'التكلفة', 'التاريخ'].map((h) => (
                    <th key={h} className="text-right text-xs text-gray-400 pb-3 pl-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {irrigationRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="py-3 pl-4 font-medium text-gray-800">{r.cycle}</td>
                    <td className="py-3 pl-4 text-gray-600">💧 {r.source}</td>
                    <td className="py-3 pl-4 text-gray-600">{r.method}</td>
                    <td className="py-3 pl-4 text-gray-600">{r.duration}</td>
                    <td className="py-3 pl-4 font-medium text-blue-700">{r.quantity}</td>
                    <td className="py-3 pl-4 font-medium text-gray-800">{r.cost} ريال</td>
                    <td className="py-3 text-gray-500">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {(activeTab === 'جودة المياه' || activeTab === 'تقارير المياه') && (
        <div className="glass-card rounded-2xl p-16 text-center text-gray-400">
          <span className="text-5xl mb-4 block">💧</span>
          <p className="font-medium">{activeTab}</p>
          <p className="text-sm mt-2">سيتم عرض البيانات هنا في النظام الكامل</p>
        </div>
      )}
    </div>
  );
}
