import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatCard from '../components/StatCard';
import { salesRecords, salesStats, salesByChannel, salesPriceChart, topCustomers } from '../data/mockData';
import { LineChartMock, DonutChartMock } from '../components/MockChart';
import { useLang } from '../contexts/LangContext';

const CROP_FILTER = ['الكل', 'خيار', 'طماطم', 'فلفل', 'باذنجان'];

const CHANNEL_CFG: Record<string, string> = {
  جملة:   'bg-green-50 text-green-700 border-green-100',
  عقود:   'bg-sky-50 text-sky-700 border-sky-100',
  مطاعم: 'bg-amber-50 text-amber-700 border-amber-100',
  تجزئة: 'bg-purple-50 text-purple-700 border-purple-100',
};

const CROP_ICON: Record<string, string> = { خيار: '🥒', طماطم: '🍅', فلفل: '🫑', باذنجان: '🍆' };

export default function SalesPage() {
  const { t } = useLang();
  const [cropFilter, setCropFilter] = useState('الكل');

  const filtered = salesRecords.filter(
    (s) => cropFilter === 'الكل' || s.crop === cropFilter,
  );

  const totalRevenue = filtered.reduce((s, r) => s + r.total, 0);
  const totalQty     = filtered.reduce((s, r) => s + r.qty, 0);
  const avgPrice     = totalQty > 0 ? (totalRevenue / totalQty).toFixed(2) : '0';

  const donutData = salesByChannel.map((c) => ({
    name: c.channel, value: c.pct, color: c.color,
  }));

  return (
    <PageContainer>
      <SectionHeader
        title={t('page.sales.title')}
        subtitle={t('page.sales.sub')}
        action={
          <div className="flex gap-2">
            <ActionButton variant="secondary" size="sm" icon="📥">{t('common.export')}</ActionButton>
            <ActionButton size="sm" icon="➕">{t('sales.invoice')}</ActionButton>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t('sales.todayRevenue')}   value={salesStats.todayRevenue}   unit={t('common.currency')} icon="💰" color="green"  trend={{ val: 8,  up: true }} />
        <StatCard label={t('sales.weeklyRevenue')}  value={salesStats.weeklyRevenue}  unit={t('common.currency')} icon="📈" color="sky"    trend={{ val: 12, up: true }} />
        <StatCard label={t('sales.avgPriceKg')}     value={salesStats.avgPriceKg}     unit={t('common.currency')} icon="⚖️" color="amber"  />
        <StatCard label={t('sales.topCrop')}        value={salesStats.topCrop}        unit=""                    icon="🥒" color="purple" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <GlassCard title={t('sales.channels')} subtitle={t('sales.byRevenue')} accent="green" className="lg:col-span-2">
          <DonutChartMock data={donutData} height={220} />
          <div className="grid grid-cols-2 gap-2 mt-3">
            {salesByChannel.map((c) => (
              <div key={c.channel} className="bg-gray-50 rounded-lg p-2 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-700 truncate">{c.channel}</p>
                  <p className="text-[10px] text-gray-400">{c.revenue.toLocaleString('ar-SA')} {t('common.currency')}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title={t('sales.pricesTrend')} subtitle={`${t('common.currency')}/${t('common.kg')}`} accent="sky" className="lg:col-span-3">
          <LineChartMock data={salesPriceChart} xKey="week" yKey="خيار" color="#16a34a" height={200} label="ريال/كجم" />
          <div className="flex gap-4 mt-3 text-xs text-gray-500">
            {[['#16a34a','خيار'],['#ef4444','طماطم'],['#f59e0b','فلفل']].map(([c,l]) => (
              <div key={l} className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full" style={{ background: c }} />
                {l}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Top Customers */}
      <GlassCard title={t('sales.topCustomers')} subtitle={t('sales.byVolume')} accent="amber">
        <div className="space-y-3">
          {topCustomers.map((c, i) => {
            const maxPurchases = topCustomers[0].purchases;
            const pct = (c.purchases / maxPurchases) * 100;
            return (
              <div key={c.name} className="flex items-center gap-4 p-3 bg-gray-50/70 rounded-xl hover:bg-white transition-all border border-transparent hover:border-gray-100">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0 ${
                  i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-50 text-orange-600'
                }`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="font-semibold text-gray-800 text-sm truncate">{c.name}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CHANNEL_CFG[c.channel]}`}>{c.channel}</span>
                      <span className="font-bold text-green-700 text-sm">{c.purchases.toLocaleString('ar-SA')} {t('common.currency')}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-l from-green-400 to-emerald-600 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{c.qty.toLocaleString('ar-SA')} {t('common.kg')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Sales Records */}
      <GlassCard
        title={t('sales.log')}
        subtitle={`${filtered.length} فاتورة — ${totalRevenue.toLocaleString('ar-SA')} ${t('common.currency')}`}
        accent="green"
        action={
          <div className="flex gap-1">
            {CROP_FILTER.map((c) => (
              <button key={c} onClick={() => setCropFilter(c)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${cropFilter === c ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-400 hover:bg-gray-100'}`}
              >{c}</button>
            ))}
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-right">
                {[t('common.date'), t('common.crop'), t('common.quantity'), t('sales.pricePerKg'), t('sales.totalRevenue'), t('sales.customer'), t('sales.channel'), t('common.status')].map((h) => (
                  <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/60">
                  <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{r.date}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span>{CROP_ICON[r.crop] ?? '🌿'}</span>
                      <span className="font-medium text-gray-800">{r.crop}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-gray-600 whitespace-nowrap">{r.qty.toLocaleString('ar-SA')} {t('common.kg')}</td>
                  <td className="py-3 pr-3 text-gray-600 whitespace-nowrap">{r.pricePerKg.toFixed(2)} {t('common.currency')}</td>
                  <td className="py-3 pr-3 font-bold text-green-700 whitespace-nowrap">{r.total.toLocaleString('ar-SA')} {t('common.currency')}</td>
                  <td className="py-3 pr-3 text-xs text-gray-600 max-w-[140px] truncate">{r.customer}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${CHANNEL_CFG[r.channel]}`}>{r.channel}</span>
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap">
                    <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full font-medium">{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 bg-gray-50/50">
                <td colSpan={2} className="py-3 pr-3 font-bold text-gray-700">{t('common.total')}</td>
                <td className="py-3 pr-3 font-extrabold text-gray-800">{totalQty.toLocaleString('ar-SA')} {t('common.kg')}</td>
                <td className="py-3 pr-3 font-bold text-gray-600">{avgPrice} {t('common.currency')} {t('common.average')}</td>
                <td className="py-3 pr-3 font-extrabold text-green-700">{totalRevenue.toLocaleString('ar-SA')} {t('common.currency')}</td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
