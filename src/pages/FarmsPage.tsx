import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import { farms } from '../data/mockData';

export default function FarmsPage() {
  const [selectedFarm, setSelectedFarm] = useState(farms[0]);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="المزارع والحقول"
        subtitle="إدارة جميع المزارع والحقول المرتبطة"
        action={
          <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm">
            + إضافة مزرعة
          </button>
        }
      />

      {/* Farm cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {farms.map((farm) => (
          <button
            key={farm.id}
            onClick={() => setSelectedFarm(farm)}
            className={`glass-card rounded-2xl p-5 text-right transition-all hover:shadow-lg ${
              selectedFarm.id === farm.id ? 'ring-2 ring-green-500 shadow-lg' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <StatusBadge status={farm.status} size="sm" />
              <span className="text-2xl">🌾</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">{farm.name}</h3>
            <p className="text-xs text-gray-400 mb-3">📍 {farm.location}</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-green-50 rounded-lg p-2">
                <p className="text-lg font-bold text-green-700">{farm.fields}</p>
                <p className="text-xs text-gray-500">حقول</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-2">
                <p className="text-lg font-bold text-blue-700">{farm.greenhouses}</p>
                <p className="text-xs text-gray-500">بيوت</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-2">
                <p className="text-sm font-bold text-amber-700">{farm.area}</p>
                <p className="text-xs text-gray-500">مساحة</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">👷 المدير: {farm.manager}</p>
          </button>
        ))}
      </div>

      {/* Selected Farm Fields */}
      <GlassCard
        title={`حقول ${selectedFarm.name}`}
        subtitle={`${selectedFarm.fields_data.length} حقول مسجلة`}
        action={
          <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors">
            + إضافة حقل
          </button>
        }
      >
        {selectedFarm.fields_data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['الحقل', 'المحصول', 'المساحة', 'طريقة الري', 'الإنتاج المتوقع', 'مستوى الخطر', 'الحالة', ''].map((h) => (
                    <th key={h} className="text-right text-xs text-gray-400 font-medium pb-3 pl-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {selectedFarm.fields_data.map((field) => (
                  <tr key={field.id} className="hover:bg-green-50/50 transition-colors">
                    <td className="py-3 pl-4 font-medium text-gray-800">{field.name}</td>
                    <td className="py-3 pl-4">
                      <span className="flex items-center gap-1.5">
                        <span>🌱</span>
                        <span>{field.crop}</span>
                      </span>
                    </td>
                    <td className="py-3 pl-4 text-gray-600">{field.area}</td>
                    <td className="py-3 pl-4 text-gray-600">💧 {field.irrigation}</td>
                    <td className="py-3 pl-4 text-gray-600">{field.production}</td>
                    <td className="py-3 pl-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        field.risk === 'منخفض' ? 'bg-green-100 text-green-700' :
                        field.risk === 'متوسط' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>{field.risk}</span>
                    </td>
                    <td className="py-3 pl-4">
                      <StatusBadge status={field.status} size="sm" />
                    </td>
                    <td className="py-3">
                      <button className="text-green-600 hover:text-green-800 text-xs font-medium">تفاصيل</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <span className="text-4xl mb-3 block">🌾</span>
            <p>لم يتم إضافة حقول لهذه المزرعة بعد</p>
            <button className="mt-4 px-4 py-2 bg-green-100 text-green-700 text-sm rounded-xl hover:bg-green-200 transition-colors">
              إضافة أول حقل
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
