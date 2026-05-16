import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatCard from '../components/StatCard';
import { harvestRecords, harvestStats, harvestDailyChart, harvestByCrop } from '../data/mockData';
import { BarChartMock, DonutChartMock } from '../components/MockChart';
import { useLang } from '../contexts/LangContext';

const CROP_FILTER = ['الكل', 'خيار', 'طماطم', 'فلفل'];

export default function HarvestPage() {
  const { t } = useLang();
  const [cropFilter, setCropFilter] = useState('الكل');

  const filtered = harvestRecords.filter(
    (r) => cropFilter === 'الكل' || r.crop === cropFilter,
  );

  const totalQty     = filtered.reduce((s, r) => s + r.qty, 0);
  const totalGradeA  = filtered.reduce((s, r) => s + r.gradeA, 0);
  const totalDamaged = filtered.reduce((s, r) => s + r.damaged, 0);
  const gradeAPct    = totalQty > 0 ? ((totalGradeA / totalQty) * 100).toFixed(1) : '0';

  const qualityDonut = [
    { name: t('harvest.gradeA'),   value: Math.round(Number(gradeAPct)), color: '#16a34a' },
    { name: t('harvest.gradeB'),   value: Math.round((filtered.reduce((s, r) => s + r.gradeB, 0) / totalQty) * 100) || 0, color: '#0ea5e9' },
    { name: t('harvest.damaged'),  value: Math.round((totalDamaged / totalQty) * 100) || 0,                                 color: '#ef4444' },
  ];

  return (
    <PageContainer>
      <SectionHeader
        title={t('page.harvest.title')}
        subtitle={t('page.harvest.sub')}
        action={<ActionButton size="sm" icon="➕">{t('harvest.addRecord')}</ActionButton>}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t('harvest.todayProd')}   value={harvestStats.todayTotal}   unit={t('common.kg')}  icon="🌾" color="green"
          trend={{ val: Math.round((harvestStats.todayTotal / harvestStats.targetDaily) * 100 - 100), up: harvestStats.todayTotal >= harvestStats.targetDaily }}
        />
        <StatCard label={t('harvest.weeklyProd')}  value={harvestStats.weeklyTotal}  unit={t('common.kg')}  icon="📦" color="sky"    />
        <StatCard label={t('harvest.gradeARate')}  value={harvestStats.gradeARate.toFixed(1)} unit="%"   icon="⭐" color="amber"  />
        <StatCard label={t('harvest.targetAchieved')} value={harvestStats.achievedPct.toFixed(1)} unit="%"   icon="🎯" color="purple" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <GlassCard title={t('harvest.dailyProd')} subtitle={t('harvest.last7days')} accent="green" className="lg:col-span-3">
          <BarChartMock data={harvestDailyChart} xKey="day" yKey="qty" color="#16a34a" height={200} label={t('common.kg')} />
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
              <div className="h-full bg-green-400 rounded-full" style={{ width: `${harvestStats.achievedPct}%` }} />
              <div className="absolute top-0 h-full border-l-2 border-dashed border-red-400" style={{ left: '100%', transform: 'none', right: `${100 - (harvestStats.targetDaily / 900) * 100}%` }} />
            </div>
            <span>{t('harvest.dailyTarget')} {harvestStats.targetDaily} {t('common.kg')}</span>
          </div>
        </GlassCard>

        <GlassCard title={t('harvest.qualityDist')} subtitle={t('harvest.currentPeriod')} accent="sky" className="lg:col-span-2">
          <DonutChartMock data={qualityDonut} height={220} />
        </GlassCard>
      </div>

      {/* By Crop */}
      <GlassCard title={t('harvest.byCrop')} accent="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {harvestByCrop.map((c) => {
            const achievedPct = Math.round((c.monthly / c.target) * 100);
            const CROP_ICON: Record<string, string> = { خيار: '🥒', طماطم: '🍅', فلفل: '🫑' };
            return (
              <div key={c.crop} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{CROP_ICON[c.crop] ?? '🌿'}</span>
                  <div>
                    <p className="font-bold text-gray-800">{c.crop}</p>
                    <p className="text-xs text-gray-400">{t('harvest.gradeAPercent')} {c.gradeA}%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('harvest.monthlyProd')}</span>
                    <span className="font-bold text-gray-800">{c.monthly.toLocaleString('ar-SA')} {t('common.kg')}</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-green-400 to-emerald-600 rounded-full transition-all"
                      style={{ width: `${Math.min(achievedPct, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{t('harvest.target')} {c.target.toLocaleString('ar-SA')} {t('common.kg')}</span>
                    <span className={achievedPct >= 100 ? 'text-green-600 font-bold' : 'text-amber-600 font-bold'}>
                      {achievedPct}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Records Table */}
      <GlassCard title={t('harvest.log')}
        subtitle={`${filtered.reduce((s, r) => s + r.qty, 0).toLocaleString('ar-SA')} ${t('common.kg')} — ${t('harvest.gradeAPercent')} ${gradeAPct}%`}
        accent="green"
        action={
          <div className="flex gap-1 items-center">
            {CROP_FILTER.map((c) => (
              <button key={c} onClick={() => setCropFilter(c)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${cropFilter === c ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-400 hover:bg-gray-100'}`}
              >{c}</button>
            ))}
            <ActionButton variant="secondary" size="sm" icon="📥">{t('common.export')}</ActionButton>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-right">
                {[t('common.date'), t('harvest.greenhouse'), t('common.crop'), t('harvest.totalKg'), t('harvest.gradeA'), t('harvest.gradeB'), t('harvest.damaged'), t('harvest.gradeAPct'), t('common.worker'), t('common.notes')].map((h) => (
                  <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((r) => {
                const aPct = Math.round((r.gradeA / r.qty) * 100);
                return (
                  <tr key={r.id} className="hover:bg-gray-50/60">
                    <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{r.date}</td>
                    <td className="py-3 pr-3 font-medium text-gray-800 whitespace-nowrap">{r.greenhouse}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">{r.crop}</span>
                    </td>
                    <td className="py-3 pr-3 font-bold text-gray-800 whitespace-nowrap">{r.qty.toLocaleString('ar-SA')}</td>
                    <td className="py-3 pr-3 text-green-700 font-semibold whitespace-nowrap">{r.gradeA}</td>
                    <td className="py-3 pr-3 text-sky-600 whitespace-nowrap">{r.gradeB}</td>
                    <td className="py-3 pr-3 text-red-500 whitespace-nowrap">{r.damaged}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${aPct >= 92 ? 'bg-green-100 text-green-700' : aPct >= 88 ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>
                        {aPct}%
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-xs text-gray-500 whitespace-nowrap">{r.worker}</td>
                    <td className="py-3 pr-3 text-xs text-gray-400">{r.notes || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50/50">
                <td colSpan={3} className="py-3 pr-3 font-bold text-gray-700">{t('common.total')}</td>
                <td className="py-3 pr-3 font-extrabold text-gray-800">{totalQty.toLocaleString('ar-SA')}</td>
                <td className="py-3 pr-3 font-bold text-green-700">{totalGradeA.toLocaleString('ar-SA')}</td>
                <td className="py-3 pr-3 font-bold text-sky-600">{filtered.reduce((s, r) => s + r.gradeB, 0)}</td>
                <td className="py-3 pr-3 font-bold text-red-500">{totalDamaged}</td>
                <td className="py-3 pr-3 font-extrabold text-green-700">{gradeAPct}%</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
