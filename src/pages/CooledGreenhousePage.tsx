import GlassCard from '../components/GlassCard';
import AlertCard from '../components/AlertCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import { greenhouses } from '../data/mockData';

const gh7 = greenhouses.find((g) => g.id === 7)!;

function MetricRow({ label, value, unit, icon }: { label: string; value: string | number; unit?: string; icon: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <span className="flex items-center gap-2 text-sm text-gray-600">
        <span>{icon}</span>
        <span>{label}</span>
      </span>
      <span className="font-bold text-gray-800 text-sm">
        {value}{unit && <span className="text-xs font-normal text-gray-400 mr-1">{unit}</span>}
      </span>
    </div>
  );
}

function GaugeBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function CooledGreenhousePage() {
  const cd = gh7.coolingData!;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="بيت محمي مكيف — رقم 7"
        subtitle="تفاصيل التشغيل والتكاليف والتحليل"
        action={<StatusBadge status={gh7.status} />}
      />

      <AlertCard
        type="warning"
        title="تكلفة كهرباء مرتفعة"
        desc="تكلفة الكهرباء مرتفعة بنسبة 18% مقارنة بمتوسط البيوت المشابهة. يُنصح بمراجعة جدول تشغيل التبريد."
      />

      {/* Main Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Climate Card */}
        <GlassCard title="المناخ الداخلي" className="col-span-1">
          <div className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <p className="text-4xl font-bold text-blue-700">{gh7.temperature}°C</p>
              <p className="text-sm text-gray-500 mt-1">درجة الحرارة الحالية</p>
              <GaugeBar value={gh7.temperature} max={45} color="bg-blue-400" />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0°</span>
                <span className="text-green-600 font-medium">المثالي: 22-28°</span>
                <span>45°</span>
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl">
              <p className="text-4xl font-bold text-cyan-700">{gh7.humidity}%</p>
              <p className="text-sm text-gray-500 mt-1">الرطوبة النسبية</p>
              <GaugeBar value={gh7.humidity} max={100} color="bg-cyan-400" />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span className="text-green-600 font-medium">المثالي: 60-75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Operation Hours */}
        <GlassCard title="ساعات التشغيل اليوم" className="col-span-1">
          <div className="space-y-3">
            {[
              { label: 'المراوح', hours: cd.fanHours, max: 24, icon: '🌀', color: 'bg-green-400' },
              { label: 'خلايا التبريد', hours: cd.coolingCellHours, max: 24, icon: '❄️', color: 'bg-blue-400' },
              { label: 'الضباب', hours: 3, max: 24, icon: '💨', color: 'bg-cyan-400' },
              { label: 'المضخات', hours: 12, max: 24, icon: '⚡', color: 'bg-amber-400' },
              { label: 'الإضاءة', hours: 6, max: 24, icon: '💡', color: 'bg-yellow-400' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <span className="font-bold text-gray-800">{item.hours} ساعة</span>
                </div>
                <GaugeBar value={item.hours} max={item.max} color={item.color} />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Electricity & Production */}
        <GlassCard title="الكهرباء والإنتاج" className="col-span-1">
          <MetricRow label="استهلاك الكهرباء اليوم" value={cd.electricityKwh} unit="kWh" icon="⚡" />
          <MetricRow label="تكلفة الكهرباء اليوم" value={cd.electricityCost} unit="ريال" icon="💰" />
          <MetricRow label="الإنتاج اليومي" value={gh7.dailyProduction} unit="كجم" icon="📦" />
          <MetricRow label="تكلفة الكهرباء / كجم" value={cd.costPerKg} unit="ريال" icon="🔢" />
          <MetricRow label="عدد النباتات" value={gh7.plants.toLocaleString()} icon="🌱" />
          <MetricRow label="تاريخ الزراعة" value={gh7.plantDate} icon="📅" />
        </GlassCard>
      </div>

      {/* Economic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <GlassCard title="هل التكييف مجدٍ اقتصادياً؟">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-green-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-green-700">{gh7.dailyProduction} كجم</p>
                <p className="text-xs text-gray-500">إنتاج يومي</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-red-600">{cd.electricityCost} ريال</p>
                <p className="text-xs text-gray-500">تكلفة كهرباء يومية</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-blue-700">{cd.costPerKg} ريال</p>
                <p className="text-xs text-gray-500">تكلفة الكهرباء/كجم</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-amber-700">2.50 ريال</p>
                <p className="text-xs text-gray-500">سعر بيع الكجم</p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span>⚠️</span>
                <span className="font-bold text-amber-800 text-sm">يحتاج متابعة</span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                تكلفة الكهرباء لكل كجم (0.43 ريال) أعلى من المعدل المقبول (0.35 ريال) بنسبة 23%.
                يُنصح بتقليل ساعات تشغيل خلايا التبريد بمقدار 2 ساعة خلال فترات انخفاض درجة الحرارة.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="مقارنة بالبيوت المشابهة">
          <div className="space-y-3">
            {[
              { name: 'بيت رقم 7 (الحالي)', kwh: 320, cost: 176, color: 'bg-red-400', isCurrent: true },
              { name: 'متوسط البيوت المكيفة', kwh: 272, cost: 150, color: 'bg-green-400', isCurrent: false },
              { name: 'بيت رقم 3', kwh: 280, cost: 154, color: 'bg-blue-400', isCurrent: false },
              { name: 'أفضل بيت أداءً', kwh: 240, cost: 132, color: 'bg-emerald-400', isCurrent: false },
            ].map((item) => (
              <div key={item.name} className={`p-3 rounded-xl ${item.isCurrent ? 'bg-red-50 border border-red-100' : 'bg-gray-50'}`}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className={`font-medium ${item.isCurrent ? 'text-red-700' : 'text-gray-700'}`}>{item.name}</span>
                  <span className="text-gray-500">{item.kwh} kWh — {item.cost} ريال</span>
                </div>
                <GaugeBar value={item.kwh} max={400} color={item.color} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
