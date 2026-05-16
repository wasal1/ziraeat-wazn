import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { nurseryBatches, nurseryStats, germinationChart } from '../data/mockData';
import { BarChartMock } from '../components/MockChart';
import { useLang } from '../contexts/LangContext';

const STATUS_CFG: Record<string, { bg: string; icon: string; progress: string }> = {
  'جاهزة للنقل': { bg: 'bg-green-50 border-green-200',  icon: '✅', progress: 'bg-green-500'  },
  'تم النقل':    { bg: 'bg-gray-50 border-gray-200',    icon: '📦', progress: 'bg-gray-400'   },
  'في الإنبات':  { bg: 'bg-sky-50 border-sky-200',      icon: '🌱', progress: 'bg-sky-400'    },
  'نمو خضري':   { bg: 'bg-emerald-50 border-emerald-200',icon:'🌿', progress: 'bg-emerald-500'},
};

const STAGE_STEPS = ['البذر', 'الإنبات', 'نمو خضري', 'جاهز للنقل', 'تم النقل'];

function stageIndex(status: string) {
  const map: Record<string, number> = {
    'في الإنبات': 1, 'نمو خضري': 2, 'جاهزة للنقل': 3, 'تم النقل': 4,
  };
  return map[status] ?? 0;
}

export default function NurseryPage() {
  const { t } = useLang();
  const [selected, setSelected] = useState<number | null>(null);

  const active     = nurseryBatches.filter((b) => b.status !== 'تم النقل');
  const completed  = nurseryBatches.filter((b) => b.status === 'تم النقل');

  return (
    <PageContainer>
      <SectionHeader
        title={t('page.nursery.title')}
        subtitle={t('page.nursery.sub')}
        action={<ActionButton size="sm" icon="➕">{t('nursery.newBatch')}</ActionButton>}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t('nursery.activeBatches')}   value={nurseryStats.activeBatches}              unit=""                    icon="🌱" color="green"  />
        <StatCard label={t('nursery.readyToTransfer')} value={nurseryStats.readyToTransfer}             unit=""                    icon="✅" color="sky"    />
        <StatCard label={t('nursery.avgGermination')}  value={nurseryStats.avgGerminationRate.toFixed(1)} unit="%"                icon="📊" color="amber"  />
        <StatCard label={t('nursery.monthlyCost')}     value={nurseryStats.totalSeedlingsCost}          unit={t('common.currency')} icon="💰" color="purple" />
      </div>

      {/* Germination chart */}
      <GlassCard title={t('nursery.germinationChart')} subtitle="%" accent="green">
        <BarChartMock data={germinationChart} xKey="batch" yKey="rate" color="#16a34a" height={180} label="%" />
      </GlassCard>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Active batches */}
        <GlassCard title={t('nursery.activeBatchesList')} subtitle={`${active.length} دفعة`} accent="green">
          <div className="space-y-3">
            {active.map((b) => {
              const cfg = STATUS_CFG[b.status] ?? STATUS_CFG['في الإنبات'];
              const germinatedPct = Math.round((b.germinated / b.totalSeeds) * 100);
              const si = stageIndex(b.status);
              return (
                <div
                  key={b.id}
                  onClick={() => setSelected(selected === b.id ? null : b.id)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all duration-150 hover:shadow-sm ${cfg.bg} ${selected === b.id ? 'ring-2 ring-green-300' : ''}`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{b.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-800 text-sm">{b.crop}</p>
                        <StatusBadge status={b.status} size="xs" />
                        {b.daysToTransfer > 0 && (
                          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">
                            {t('nursery.transferAfter')} {b.daysToTransfer} {t('nursery.days')}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 truncate">{b.variety}</p>
                    </div>
                    <span className="text-lg">{cfg.icon}</span>
                  </div>

                  {/* Progress pipeline */}
                  <div className="flex items-center gap-1 mb-3">
                    {STAGE_STEPS.map((step, i) => (
                      <div key={step} className="flex items-center flex-1">
                        <div className={`h-1.5 flex-1 rounded-full transition-all ${i <= si ? cfg.progress : 'bg-gray-200'}`} />
                        {i < STAGE_STEPS.length - 1 && <div className={`w-2 h-2 rounded-full mx-0.5 flex-shrink-0 ${i < si ? cfg.progress : 'bg-gray-200'}`} />}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-400 mb-3 px-0.5">
                    {STAGE_STEPS.map((s) => <span key={s}>{s}</span>)}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: t('nursery.seeds'),           value: b.totalSeeds.toLocaleString('ar-SA') },
                      { label: t('nursery.germinated'),      value: b.germinated.toLocaleString('ar-SA') },
                      { label: t('nursery.germinationRate'), value: germinatedPct + '%' },
                      { label: t('common.cost'),             value: b.totalCost.toLocaleString('ar-SA') + ' ر' },
                    ].map((s) => (
                      <div key={s.label} className="text-center bg-white/60 rounded-lg py-1.5">
                        <p className="text-xs font-bold text-gray-800">{s.value}</p>
                        <p className="text-[9px] text-gray-400">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Detail expand */}
                  {selected === b.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200/60 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-600">
                      <div><span className="text-gray-400">{t('nursery.seedDate')}</span> {b.seedDate}</div>
                      <div><span className="text-gray-400">{t('nursery.germinationDate')}</span> {b.germinationDate}</div>
                      <div><span className="text-gray-400">{t('nursery.transferDate')}</span> <span className="font-semibold text-green-700">{b.transferDate}</span></div>
                      <div><span className="text-gray-400">{t('nursery.destination')}</span> {b.destination}</div>
                      <div><span className="text-gray-400">{t('common.farm')}</span> {b.farm}</div>
                      <div><span className="text-gray-400">{t('nursery.tray')}</span> {b.tray}</div>
                      <div><span className="text-gray-400">{t('nursery.costPerSeedling')}</span> {b.costPerSeedling} ريال</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Completed */}
        <GlassCard title={t('nursery.completedBatches')} subtitle={`${completed.length} دفعة مكتملة`} accent="sky">
          <div className="space-y-3">
            {completed.map((b) => (
              <div key={b.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-2xl flex-shrink-0">{b.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-700 text-sm">{b.crop}</p>
                    <StatusBadge status={b.status} size="xs" />
                  </div>
                  <p className="text-[11px] text-gray-400 truncate">{b.variety}</p>
                  <div className="flex gap-3 mt-1 text-[10px] text-gray-400">
                    <span>🌱 {b.germinated.toLocaleString('ar-SA')} شتلة</span>
                    <span>📊 {b.germinationRate}% إنبات</span>
                    <span>🏠 {b.destination}</span>
                  </div>
                </div>
                <div className="text-left flex-shrink-0">
                  <p className="text-sm font-bold text-gray-800">{b.totalCost.toLocaleString('ar-SA')} ريال</p>
                  <p className="text-[10px] text-gray-400">{b.transferDate}</p>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <p className="text-xs font-semibold text-gray-500">{t('nursery.monthlySummary')}</p>
              {[
                { label: t('nursery.totalSeeds'),    value: nurseryBatches.reduce((s, b) => s + b.totalSeeds, 0).toLocaleString('ar-SA') + ' بذرة' },
                { label: t('nursery.totalProduced'), value: nurseryBatches.reduce((s, b) => s + b.germinated, 0).toLocaleString('ar-SA') + ' شتلة' },
                { label: t('nursery.avgGerRate'),    value: nurseryStats.avgGerminationRate.toFixed(1) + '%' },
                { label: t('nursery.totalCost'),     value: nurseryBatches.reduce((s, b) => s + b.totalCost, 0).toLocaleString('ar-SA') + ' ريال' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{s.label}</span>
                  <span className="font-bold text-gray-800">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
}
