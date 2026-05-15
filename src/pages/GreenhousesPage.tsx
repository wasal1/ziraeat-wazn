import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import { greenhouses } from '../data/mockData';

export default function GreenhousesPage() {
  const [view, setView] = useState<'cards' | 'table'>('cards');

  return (
    <div className="space-y-6">
      <SectionHeader
        title="البيوت المحمية"
        subtitle={`${greenhouses.length} بيوت محمية مسجلة`}
        action={
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl overflow-hidden border border-gray-200">
              <button onClick={() => setView('cards')} className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === 'cards' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>بطاقات</button>
              <button onClick={() => setView('table')} className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === 'table' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>جدول</button>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm">
              + إضافة بيت
            </button>
          </div>
        }
      />

      {view === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {greenhouses.map((gh) => (
            <div key={gh.id} className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
              {/* Header */}
              <div className={`px-5 py-4 ${gh.type === 'مكيف' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-green-600 to-emerald-700'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white">{gh.name}</h3>
                    <p className="text-xs text-white/80 mt-0.5">{gh.type === 'مكيف' ? '❄️ بيت مكيف' : '🏡 بيت عادي'}</p>
                  </div>
                  <StatusBadge status={gh.status} />
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                {/* Crop info */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-xl">
                  <span className="text-lg">🌱</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{gh.crop}</p>
                    <p className="text-xs text-gray-400">{gh.variety}</p>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-800">{gh.plants.toLocaleString('ar-SA')}</p>
                    <p className="text-xs text-gray-400">نبات</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <p className="text-lg font-bold text-green-700">{gh.dailyProduction}</p>
                    <p className="text-xs text-gray-400">كجم/يوم</p>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-700">{gh.temperature}°C</p>
                    <p className="text-xs text-gray-400">درجة حرارة</p>
                  </div>
                  <div className="text-center p-2 bg-cyan-50 rounded-lg">
                    <p className="text-lg font-bold text-cyan-700">{gh.humidity}%</p>
                    <p className="text-xs text-gray-400">رطوبة</p>
                  </div>
                </div>

                {/* Disease */}
                <div className={`flex items-center gap-2 p-2 rounded-lg text-xs ${gh.diseaseStatus === 'لا يوجد' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                  <span>{gh.diseaseStatus === 'لا يوجد' ? '✅' : '⚠️'}</span>
                  <span>{gh.diseaseStatus}</span>
                </div>

                {/* Profit */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">صافي الربح المتوقع</span>
                  <span className="text-sm font-bold text-green-700">{gh.estimatedProfit.toLocaleString('ar-SA')} ريال</span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                  <span>تاريخ الزراعة: {gh.plantDate}</span>
                  <span>⚡ {gh.electricityHours} ساعة</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['البيت', 'النوع', 'المحصول', 'الصنف', 'النباتات', 'الإنتاج/يوم', 'الأمراض', 'الربح المتوقع', 'الحالة'].map((h) => (
                    <th key={h} className="text-right text-xs text-gray-400 font-medium pb-3 pl-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {greenhouses.map((gh) => (
                  <tr key={gh.id} className="hover:bg-green-50/50 transition-colors">
                    <td className="py-3 pl-4 font-medium text-gray-800">{gh.name}</td>
                    <td className="py-3 pl-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${gh.type === 'مكيف' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{gh.type}</span>
                    </td>
                    <td className="py-3 pl-4 text-gray-700">{gh.crop}</td>
                    <td className="py-3 pl-4 text-gray-500 text-xs">{gh.variety}</td>
                    <td className="py-3 pl-4 text-gray-700">{gh.plants.toLocaleString()}</td>
                    <td className="py-3 pl-4 font-medium text-green-700">{gh.dailyProduction} كجم</td>
                    <td className="py-3 pl-4">
                      <span className={`text-xs ${gh.diseaseStatus === 'لا يوجد' ? 'text-green-600' : 'text-amber-600'}`}>{gh.diseaseStatus}</span>
                    </td>
                    <td className="py-3 pl-4 font-bold text-gray-800">{gh.estimatedProfit.toLocaleString()} ريال</td>
                    <td className="py-3">
                      <StatusBadge status={gh.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
