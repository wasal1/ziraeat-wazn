import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { cropCategories } from '../data/mockData';

export default function CropsPage() {
  const [selectedCat, setSelectedCat] = useState(cropCategories[0]);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="المزروعات والتصنيفات"
        subtitle="إدارة المزروعات والأصناف وخصائص كل محصول"
      />

      {/* Category tabs */}
      <div className="flex flex-wrap gap-3">
        {cropCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              selectedCat.id === cat.id
                ? 'bg-green-600 text-white shadow-md'
                : 'glass-card text-gray-600 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedCat.id === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Crops grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {selectedCat.crops.map((crop) => (
          <div key={crop.name} className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-800 text-base">{crop.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">دورة: {crop.cycleDays} يوم</p>
              </div>
              <span className="text-2xl">{selectedCat.icon}</span>
            </div>

            {/* Suitability */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: 'مكشوف', value: crop.openField, icon: '🌤️' },
                { label: 'محمي', value: crop.greenhouse, icon: '🏡' },
                { label: 'مكيف', value: crop.cooled, icon: '❄️' },
                { label: 'شتلات', value: crop.nursery, icon: '🌱' },
              ].map((item) => (
                <div key={item.label} className={`flex items-center gap-1.5 p-2 rounded-lg text-xs ${item.value ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-300'}`}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="mr-auto">{item.value ? '✓' : '✗'}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>📦 الإنتاج المتوقع</span>
              <span className="font-medium text-gray-800">{crop.yield}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
