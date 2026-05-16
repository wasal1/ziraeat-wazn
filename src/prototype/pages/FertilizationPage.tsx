import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatCard from '../components/StatCard';
import { fertilizerInventory, fertilizerProgram, fertilizerApplications, fertilizerCostChart } from '../data/mockData';
import { LineChartMock } from '../components/MockChart';
import { useLang } from '../contexts/LangContext';

const STOCK_COLOR: Record<string, string> = {
  'كافٍ':        'bg-green-50 text-green-700 border-green-100',
  'منخفض':       'bg-amber-50 text-amber-700 border-amber-100',
  'نفذ تقريباً': 'bg-red-50 text-red-700 border-red-100',
};

export default function FertilizationPage() {
  const { t } = useLang();

  const TABS = [
    { value: 'البرنامج التسميدي', label: 'fert.tabProgram' },
    { value: 'سجل التطبيقات',     label: 'fert.tabLog' },
    { value: 'المخزون',           label: 'fert.tabInventory' },
  ];

  const [tab, setTab] = useState('البرنامج التسميدي');

  const totalCostMonth  = fertilizerApplications.reduce((s, a) => s + a.cost, 0);
  const lowStock        = fertilizerInventory.filter((f) => f.status !== 'كافٍ').length;
  const lastApplication = fertilizerApplications[0].date;

  return (
    <PageContainer>
      <SectionHeader
        title={t('page.fertilization.title')}
        subtitle={t('page.fertilization.sub')}
        action={<ActionButton size="sm" icon="➕">{t('fert.addRecord')}</ActionButton>}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t('fert.monthlyApps')}  value={fertilizerApplications.length} unit=""                    icon="🧪" color="green"  />
        <StatCard label={t('fert.monthlyCost')}   value={totalCostMonth}                unit={t('common.currency')} icon="💰" color="amber"  />
        <StatCard label={t('fert.lowStock')}      value={lowStock}                      unit=""                    icon="⚠️" color="red"    />
        <StatCard label={t('fert.lastApp')}       value={lastApplication}               unit=""                    icon="📅" color="sky"    />
      </div>

      {/* Cost Trend */}
      <GlassCard title={t('fert.weeklyCost')} subtitle={t('common.currency')} accent="green">
        <LineChartMock data={fertilizerCostChart} xKey="week" yKey="cost" color="#16a34a" height={180} label={t('common.currency')} />
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100/70 rounded-xl p-1 w-fit">
        {TABS.map((tb) => (
          <button key={tb.value} onClick={() => setTab(tb.value)}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${tab === tb.value ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >{t(tb.label)}</button>
        ))}
      </div>

      {/* ─── البرنامج التسميدي ─── */}
      {tab === 'البرنامج التسميدي' && (
        <GlassCard title={t('fert.programTitle')} subtitle={`6 ${t('fert.weeks')}`} accent="green">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {[t('fert.week'), t('fert.stage'), t('fert.formula'), 'آزوت N', 'فوسفور P', 'بوتاسيوم K', t('fert.ecTarget'), t('common.notes')].map((h) => (
                    <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {fertilizerProgram.map((w, i) => (
                  <tr key={w.week} className={`hover:bg-gray-50/60 ${i < 2 ? 'opacity-60' : ''}`}>
                    <td className="py-3 pr-3 font-bold text-gray-800 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold ${
                          i < 2 ? 'bg-gray-100 text-gray-400' : i === 2 ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-500'
                        }`}>{w.week}</span>
                        {i === 2 && <span className="text-[9px] bg-green-600 text-white px-1.5 py-0.5 rounded-full">{t('fert.current')}</span>}
                      </div>
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">{w.stage}</span>
                    </td>
                    <td className="py-3 pr-3 text-xs font-mono text-gray-600 whitespace-nowrap">{w.formula}</td>
                    <td className="py-3 pr-3 font-semibold text-blue-600 whitespace-nowrap">{w.n} ppm</td>
                    <td className="py-3 pr-3 font-semibold text-red-500 whitespace-nowrap">{w.p} ppm</td>
                    <td className="py-3 pr-3 font-semibold text-purple-600 whitespace-nowrap">{w.k} ppm</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span className="text-xs font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-100">{w.ec} mS/cm</span>
                    </td>
                    <td className="py-3 pr-3 text-xs text-gray-400 max-w-[180px]">{w.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-3">
            {[
              { color: 'bg-blue-500',   label: 'آزوت N'       },
              { color: 'bg-red-400',    label: 'فوسفور P'     },
              { color: 'bg-purple-500', label: 'بوتاسيوم K'   },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* ─── سجل التطبيقات ─── */}
      {tab === 'سجل التطبيقات' && (
        <GlassCard title={t('fert.logTitle')} subtitle={`${fertilizerApplications.length} تطبيق`} accent="sky"
          action={<ActionButton variant="secondary" size="sm" icon="📥">{t('common.export')}</ActionButton>}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {[t('common.date'), t('fert.cycle'), t('fert.fertType'), t('common.quantity'), t('fert.method'), 'EC', 'pH', t('common.cost'), t('common.worker'), t('common.notes')].map((h) => (
                    <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {fertilizerApplications.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50/60">
                    <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{a.date}</td>
                    <td className="py-3 pr-3 text-xs font-medium text-gray-700 whitespace-nowrap">{a.cycle}</td>
                    <td className="py-3 pr-3 font-semibold text-gray-800 whitespace-nowrap">{a.type}</td>
                    <td className="py-3 pr-3 text-gray-600 whitespace-nowrap">{a.qty} {a.unit}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span className="text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-100">{a.method}</span>
                    </td>
                    <td className="py-3 pr-3 text-xs font-mono text-gray-600 whitespace-nowrap">{a.ec > 0 ? a.ec : '—'}</td>
                    <td className="py-3 pr-3 text-xs font-mono text-gray-600 whitespace-nowrap">{a.ph > 0 ? a.ph : '—'}</td>
                    <td className="py-3 pr-3 font-bold text-amber-700 whitespace-nowrap">{a.cost} ر</td>
                    <td className="py-3 pr-3 text-xs text-gray-500 whitespace-nowrap">{a.worker}</td>
                    <td className="py-3 pr-3 text-xs text-gray-400">{a.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* ─── المخزون ─── */}
      {tab === 'المخزون' && (
        <GlassCard title={t('fert.inventoryTitle')} subtitle={`${fertilizerInventory.length} صنف`} accent="amber"
          action={<ActionButton size="sm" icon="🛒">{t('fert.buyOrder')}</ActionButton>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fertilizerInventory.map((f) => {
              const pct = Math.min((f.stock / (f.minStock * 3)) * 100, 100);
              return (
                <div key={f.id} className="bg-gray-50/70 rounded-xl p-4 border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{f.name}</p>
                      <p className="text-xs font-mono text-gray-400">{f.formula}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STOCK_COLOR[f.status]}`}>{f.status}</span>
                  </div>

                  {/* NPK mini bars */}
                  <div className="flex gap-3 mb-3">
                    {[
                      { label: 'N', value: f.n, color: 'bg-blue-400' },
                      { label: 'P', value: f.p, color: 'bg-red-400' },
                      { label: 'K', value: f.k, color: 'bg-purple-400' },
                    ].map((e) => (
                      <div key={e.label} className="flex-1 text-center">
                        <p className="text-[10px] text-gray-400 mb-1">{e.label}</p>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${e.color}`} style={{ width: `${Math.min(e.value * 1.5, 100)}%` }} />
                        </div>
                        <p className="text-[10px] font-bold text-gray-600 mt-1">{e.value}%</p>
                      </div>
                    ))}
                  </div>

                  {/* Stock bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">{t('fert.currentStock')}</span>
                      <span className="font-bold text-gray-800">{f.stock} {f.unit}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pct < 30 ? 'bg-red-400' : pct < 60 ? 'bg-amber-400' : 'bg-green-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>{t('fert.minStock')} {f.minStock} {f.unit}</span>
                      <span>{f.cost} ريال/{f.unit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}
    </PageContainer>
  );
}
