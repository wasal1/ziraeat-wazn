import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import AlertCard from '../components/AlertCard';
import { BarChartMock } from '../components/MockChart';
import { cooledGreenhouse as gh, cooledComparison } from '../data/mockData';

// ─── Gauge component ─────────────────────────────────────
function GaugeArc({ value, min, max, label, unit, idealMin, idealMax, color }:
  { value: number; min: number; max: number; label: string; unit: string; idealMin: number; idealMax: number; color: string }) {
  const range = max - min;
  const pct = Math.min(Math.max((value - min) / range, 0), 1);
  const angle = -140 + pct * 280;
  const isIdeal = value >= idealMin && value <= idealMax;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-24 overflow-hidden">
        {/* Track */}
        <svg className="absolute inset-0 w-36 h-36 -top-18" viewBox="0 0 144 144">
          <path d="M 18 108 A 54 54 0 1 1 126 108" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
          <path d="M 18 108 A 54 54 0 1 1 126 108" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${pct * 274} 274`} className="transition-all duration-700" />
        </svg>
        {/* Needle */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-16 flex items-end justify-center">
          <div
            className="w-0.5 h-10 bg-gray-700 rounded-full origin-bottom transition-transform duration-700"
            style={{ transform: `rotate(${angle}deg)` }}
          />
          <div className="absolute bottom-0 w-3 h-3 rounded-full bg-gray-700" />
        </div>
      </div>
      <div className="text-center -mt-2">
        <p className={`text-2xl font-extrabold ${isIdeal ? 'text-green-700' : 'text-amber-600'}`}>{value}{unit}</p>
        <p className="text-xs text-gray-400 mt-0.5">{label}</p>
        <p className="text-[10px] text-gray-300 mt-0.5">المثالي: {idealMin}–{idealMax}{unit}</p>
      </div>
    </div>
  );
}

// ─── Equipment bar ───────────────────────────────────────
function EquipBar({ label, icon, hours, max = 24, color }: { label: string; icon: string; hours: number; max?: number; color: string }) {
  const pct = (hours / max) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-600 flex items-center gap-1.5"><span>{icon}</span>{label}</span>
        <span className="text-xs font-bold text-gray-800">{hours} ساعة</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── Metric row ──────────────────────────────────────────
function MetRow({ icon, label, value, alert }: { icon: string; label: string; value: string; alert?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="flex items-center gap-2 text-sm text-gray-600"><span>{icon}</span>{label}</span>
      <span className={`text-sm font-bold ${alert ? 'text-amber-600' : 'text-gray-800'}`}>{value}</span>
    </div>
  );
}

const weeklyKwh = [
  { day: 'السبت', value: 260 },
  { day: 'الأحد', value: 280 },
  { day: 'الإثنين', value: 300 },
  { day: 'الثلاثاء', value: 310 },
  { day: 'الأربعاء', value: 320 },
  { day: 'الخميس', value: 315 },
  { day: 'الجمعة', value: 320 },
];

export default function CooledGreenhousePage() {
  const { climate, operation, electricity, production, viability } = gh;

  return (
    <PageContainer>
      <SectionHeader
        title={gh.name}
        subtitle={`${gh.crop} — ${gh.variety} | زُرع: ${gh.plantDate}`}
        action={
          <div className="flex items-center gap-2">
            <StatusBadge status={gh.status} size="md" />
            <ActionButton variant="secondary" size="sm" icon="📊">تقرير كامل</ActionButton>
          </div>
        }
      />

      <AlertCard
        level="warning"
        title="تكلفة الكهرباء مرتفعة"
        desc={viability.message + ' ' + viability.suggestion}
      />

      {/* ─── Row 1: Climate + Equipment + Electricity ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Climate gauges */}
        <GlassCard title="المناخ الداخلي" subtitle="قراءة حية" accent="sky">
          <div className="flex justify-around items-start pt-2 pb-1">
            <GaugeArc
              value={climate.temp} min={0} max={45} label="درجة الحرارة" unit="°C"
              idealMin={climate.tempIdeal.min} idealMax={climate.tempIdeal.max} color="#f59e0b"
            />
            <div className="w-px h-28 bg-gray-100 self-center" />
            <GaugeArc
              value={climate.humidity} min={0} max={100} label="الرطوبة النسبية" unit="%"
              idealMin={climate.humidIdeal.min} idealMax={climate.humidIdeal.max} color="#0ea5e9"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="flex-1 bg-amber-50 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-gray-500">المثالي للحرارة</p>
              <p className="text-xs font-bold text-amber-700">{climate.tempIdeal.min}–{climate.tempIdeal.max}°C</p>
            </div>
            <div className="flex-1 bg-sky-50 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-gray-500">المثالي للرطوبة</p>
              <p className="text-xs font-bold text-sky-700">{climate.humidIdeal.min}–{climate.humidIdeal.max}%</p>
            </div>
          </div>
        </GlassCard>

        {/* Equipment hours */}
        <GlassCard title="ساعات التشغيل اليوم" accent="green">
          <div className="space-y-4 mt-1">
            <EquipBar label="المراوح"           icon="🌀" hours={operation.fans}     color="bg-green-400" />
            <EquipBar label="خلايا التبريد"      icon="❄️" hours={operation.cooling}  color="bg-blue-400" />
            <EquipBar label="الضباب (mist)"      icon="💨" hours={operation.fog}      color="bg-cyan-400" />
            <EquipBar label="المضخات"            icon="⚡" hours={operation.pumps}    color="bg-amber-400" />
            <EquipBar label="الإضاءة"            icon="💡" hours={operation.lighting} color="bg-yellow-400" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>إجمالي ساعات التشغيل</span>
              <span className="font-bold text-gray-800">
                {operation.fans + operation.cooling + operation.fog + operation.pumps + operation.lighting} ساعة
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Electricity & production metrics */}
        <GlassCard title="الكهرباء والإنتاج" accent="amber">
          <MetRow icon="⚡" label="استهلاك الكهرباء اليوم"  value={`${electricity.kwh} kWh`}       alert={electricity.kwh > electricity.avgKwh} />
          <MetRow icon="💰" label="تكلفة الكهرباء اليوم"    value={`${electricity.cost} ريال`}      alert={electricity.cost > electricity.avgCost} />
          <MetRow icon="📦" label="الإنتاج اليومي"           value={`${production.daily} كجم`}       />
          <MetRow icon="🔢" label="تكلفة الكهرباء / كجم"    value={`${electricity.costPerKg} ريال`}  alert />
          <MetRow icon="🌿" label="عدد النباتات"              value={gh.plantCount.toLocaleString()}   />
          <MetRow icon="📐" label="المساحة"                   value={gh.area}                          />
          <MetRow icon="⭐" label="جودة الإنتاج — درجة أولى" value={`${production.qualityA}%`}       />
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
            <div className="bg-amber-50 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-gray-500">متوسط البيوت المشابهة</p>
              <p className="text-sm font-bold text-amber-700">{electricity.avgKwh} kWh</p>
            </div>
            <div className="bg-red-50 rounded-xl p-2.5 text-center">
              <p className="text-[10px] text-gray-500">الفارق عن المتوسط</p>
              <p className="text-sm font-bold text-red-600">+{electricity.kwh - electricity.avgKwh} kWh</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* ─── Row 2: Economic analysis + Comparison ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Viability analysis */}
        <GlassCard title="هل التكييف مجدٍ اقتصادياً؟" accent="amber">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-green-700">{production.daily} كجم</p>
              <p className="text-[11px] text-gray-500 mt-1">إنتاج يومي</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-red-600">{electricity.cost} ريال</p>
              <p className="text-[11px] text-gray-500 mt-1">تكلفة كهرباء يومية</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-amber-700">{electricity.costPerKg} ريال</p>
              <p className="text-[11px] text-gray-500 mt-1">تكلفة الكهرباء / كجم</p>
            </div>
            <div className="bg-sky-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-sky-700">2.50 ريال</p>
              <p className="text-[11px] text-gray-500 mt-1">سعر بيع الكجم</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-2">
              <span>⚠️</span>
              <div>
                <p className="text-sm font-bold text-amber-800">{viability.status}</p>
                <p className="text-xs text-amber-700 leading-relaxed mt-1">{viability.suggestion}</p>
              </div>
            </div>
          </div>

          <GlassCard title="استهلاك الكهرباء الأسبوعي" subtitle="kWh" className="mt-4 !shadow-none !bg-gray-50/50 !border-gray-100">
            <BarChartMock data={weeklyKwh} xKey="day" yKey="value" color="#f59e0b" height={150} label="kWh" />
          </GlassCard>
        </GlassCard>

        {/* Comparison table */}
        <GlassCard title="مقارنة البيوت المحمية المكيفة" subtitle="أداء اليوم">
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-gray-100">
                  {['البيت', 'المحصول', 'الإنتاج', 'الكهرباء', 'ريال/كجم', 'الحالة'].map((h) => (
                    <th key={h} className="text-right text-[11px] text-gray-400 font-medium pb-3 pl-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {cooledComparison.map((row) => (
                  <tr key={row.name} className={`transition-colors ${row.name === gh.name ? 'bg-amber-50/60' : 'hover:bg-gray-50/50'}`}>
                    <td className="py-3 pl-3">
                      <span className={`text-[13px] font-semibold ${row.name === gh.name ? 'text-amber-700' : 'text-gray-800'}`}>
                        {row.name} {row.name === gh.name ? '←' : ''}
                      </span>
                    </td>
                    <td className="py-3 pl-3 text-xs text-gray-600">{row.crop}</td>
                    <td className="py-3 pl-3 text-xs font-bold text-green-700">{row.production} كجم</td>
                    <td className="py-3 pl-3 text-xs font-semibold text-gray-700">{row.kwh} kWh</td>
                    <td className={`py-3 pl-3 text-xs font-bold ${row.costPerKg > 0.38 ? 'text-red-600' : 'text-green-600'}`}>
                      {row.costPerKg}
                    </td>
                    <td className="py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        row.status === 'جيد' ? 'bg-green-100 text-green-700' :
                        row.status === 'ممتاز' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bar comparison */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <p className="text-[11px] text-gray-400 font-medium">مقارنة الاستهلاك الكهربائي</p>
            {cooledComparison.map((row) => {
              const maxKwh = Math.max(...cooledComparison.map((r) => r.kwh));
              return (
                <div key={row.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={row.name === gh.name ? 'text-amber-700 font-bold' : 'text-gray-600'}>{row.name}</span>
                    <span className="text-gray-500">{row.kwh} kWh</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.name === gh.name ? 'bg-red-400' : 'bg-green-400'}`}
                      style={{ width: `${(row.kwh / maxKwh) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
}
