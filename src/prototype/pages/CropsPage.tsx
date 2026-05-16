import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { crops, cropMonthlyProduction } from '../data/mockData';
import { BarChartMock } from '../components/MockChart';
import { useLang } from '../contexts/LangContext';

const MARGIN_COLOR = (m: number) =>
  m >= 50 ? 'text-green-700 bg-green-50' :
  m >= 30 ? 'text-sky-700 bg-sky-50' :
             'text-amber-700 bg-amber-50';

export default function CropsPage() {
  const { t } = useLang();

  const CATEGORIES = [
    { value: 'الكل',    label: 'crops.categoryAll' },
    { value: 'خضروات', label: 'crops.categoryVeg' },
    { value: 'أعشاب',  label: 'crops.categoryHerbs' },
  ];

  const [category, setCategory] = useState('الكل');
  const [selected, setSelected] = useState<number>(1);

  const filtered = crops.filter((c) => category === 'الكل' || c.category === category);
  const crop = crops.find((c) => c.id === selected) ?? crops[0];

  const totalCycles   = crops.reduce((s, c) => s + c.activeCycles, 0);
  const bestMargin    = Math.max(...crops.map((c) => c.avgMargin));
  const avgCostPerKg  = (crops.reduce((s, c) => s + c.avgCostPerKg, 0) / crops.length).toFixed(2);

  return (
    <PageContainer>
      <SectionHeader
        title={t('crops.catalogue')}
        subtitle={t('page.crops.sub')}
        action={<ActionButton size="sm" icon="➕">{t('crops.addCrop')}</ActionButton>}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t('crops.totalTypes')}    value={crops.length}           unit=""      icon="🌿" color="green"  />
        <StatCard label={t('crops.activeCycles')}  value={totalCycles}            unit=""      icon="🔄" color="sky"    />
        <StatCard label={t('crops.bestMargin')}    value={bestMargin.toFixed(1)}  unit="%"     icon="📈" color="amber"  />
        <StatCard label={t('crops.avgCostPerKg')}  value={avgCostPerKg}           unit={t('common.currency')} icon="💰" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Crop List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Category filter */}
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  category === cat.value
                    ? 'bg-green-600 text-white border-green-600 shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`bg-white/90 backdrop-blur-md rounded-xl border p-4 cursor-pointer transition-all duration-150 hover:shadow-md
                  ${selected === c.id ? 'border-green-400 ring-2 ring-green-100 shadow-sm' : 'border-white/70 hover:border-green-200'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
                    style={{ background: c.color + '18' }}
                  >
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-gray-800 text-sm">{c.name}</p>
                      <StatusBadge status={c.status} size="xs" />
                    </div>
                    <p className="text-[11px] text-gray-400 truncate">{c.variety}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[
                    { label: t('crops.activeCyclesLabel'), value: c.activeCycles },
                    { label: t('crops.riyalPerKg'),        value: c.avgPricePerKg.toFixed(2) },
                    { label: t('crops.profitMargin'),      value: c.avgMargin.toFixed(1) + '%' },
                  ].map((s) => (
                    <div key={s.label} className="bg-gray-50 rounded-lg py-1.5 px-2 text-center">
                      <p className="text-xs font-bold text-gray-700">{s.value}</p>
                      <p className="text-[9px] text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Detail */}
        <div className="lg:col-span-3 space-y-4">
          {/* Header Card */}
          <div
            className="rounded-2xl p-5 text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${crop.color}dd, ${crop.color}99)` }}
          >
            <div className="flex items-center gap-4">
              <span className="text-5xl">{crop.icon}</span>
              <div>
                <h2 className="text-xl font-extrabold">{crop.name}</h2>
                <p className="text-sm opacity-80">{crop.variety}</p>
                <p className="text-xs opacity-70 mt-1">{crop.category} — {crop.activeCycles} {t('crops.activeCyclesLabel')}</p>
              </div>
              <div className="mr-auto text-left">
                <p className="text-2xl font-extrabold">{crop.avgMargin.toFixed(1)}%</p>
                <p className="text-xs opacity-70">{t('crops.profitMargin')}</p>
              </div>
            </div>
          </div>

          {/* Specs Grid */}
          <GlassCard title={t('crops.specsCard')} accent="green">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t('crops.growthPeriod'),   value: `${crop.growthDays.min}–${crop.growthDays.max} ${t('crops.day')}` },
                { label: t('crops.tempRange'),       value: crop.tempRange },
                { label: t('crops.idealHumidity'),   value: crop.humidRange },
                { label: t('crops.dailyIrrigation'), value: crop.waterPerDay },
                { label: t('crops.avgYieldM2'),      value: `${crop.avgYieldPerM2} ${t('common.kg')}` },
                { label: t('crops.costPerKg'),       value: `${crop.avgCostPerKg} ${t('common.currency')}` },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{s.label}</span>
                  <span className="text-sm font-bold text-gray-800">{s.value}</span>
                </div>
              ))}
            </div>
            {crop.notes && (
              <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                💡 {crop.notes}
              </div>
            )}
          </GlassCard>

          {/* Profitability */}
          <GlassCard title={t('crops.profitability')} accent="sky">
            <div className="space-y-3">
              {crops.map((c) => {
                const maxMargin = Math.max(...crops.map((x) => x.avgMargin));
                const pct = (c.avgMargin / maxMargin) * 100;
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <span className="text-xl w-7 flex-shrink-0 text-center">{c.icon}</span>
                    <span className="text-sm font-medium text-gray-700 w-16 flex-shrink-0">{c.name}</span>
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: c.color }}
                      />
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${MARGIN_COLOR(c.avgMargin)}`}>
                      {c.avgMargin.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Monthly Production Chart */}
          <GlassCard title={t('crops.monthlyProd')} subtitle={t('common.kg')} accent="purple">
            <BarChartMock
              data={cropMonthlyProduction}
              xKey="month"
              yKey="خيار"
              color="#16a34a"
              height={180}
              label={t('common.kg')}
            />
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
