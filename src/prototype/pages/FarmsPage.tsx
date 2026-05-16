import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { farms, fields } from '../data/mockData';
import { useLang } from '../contexts/LangContext';

export default function FarmsPage() {
  const { t } = useLang();

  const FIELD_TYPES = [
    { value: 'الكل',       label: 'common.all' },
    { value: 'بيت مكيف',  label: 'farms.typeAC' },
    { value: 'بيت مظلل',  label: 'farms.typeShaded' },
    { value: 'حقل مكشوف', label: 'farms.typeOpen' },
  ];

  const [selectedFarm, setSelectedFarm] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState('الكل');

  const filteredFields = fields.filter((f) => {
    const farmMatch = selectedFarm === null || farms.find((fm) => fm.id === selectedFarm)?.name === f.farm;
    const typeMatch = typeFilter === 'الكل' || f.type === typeFilter;
    return farmMatch && typeMatch;
  });

  return (
    <PageContainer>
      <SectionHeader
        title={t('page.farms.title')}
        subtitle={t('page.farms.sub')}
        action={<ActionButton size="sm" icon="➕">{t('farms.addFarm')}</ActionButton>}
      />

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t('farms.totalFarms')}    value={farms.length}                          unit="" icon="🏡" color="green" />
        <StatCard label={t('farms.fieldsAndHouses')}     value={fields.length}                         unit="" icon="🏠" color="sky" />
        <StatCard label={t('farms.dailyProduction')}    value={(farms.reduce((s, f) => s + f.dailyProduction, 0)).toLocaleString('ar-SA')} unit={t('common.kg')} icon="📦" color="amber" />
        <StatCard label={t('farms.monthlyRevenue')} value={(farms.reduce((s, f) => s + f.monthlyRevenue, 0) / 1000).toFixed(0) + 'K'} unit={t('common.currency')} icon="💰" color="purple" />
      </div>

      {/* Farm Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {farms.map((farm) => (
          <div
            key={farm.id}
            onClick={() => setSelectedFarm(selectedFarm === farm.id ? null : farm.id)}
            className={`bg-white/90 backdrop-blur-md rounded-2xl border shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden
              ${selectedFarm === farm.id ? 'border-green-400 ring-2 ring-green-200' : 'border-white/70 hover:border-green-200'}`}
          >
            {/* Card Header */}
            <div className="bg-gradient-to-l from-green-50 to-emerald-50 px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-lg shadow-sm">
                  🏡
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{farm.name}</p>
                  <p className="text-[11px] text-gray-400">{farm.location}</p>
                </div>
              </div>
              <StatusBadge status={farm.status} size="xs" />
            </div>

            {/* Card Body */}
            <div className="px-5 py-4 space-y-3">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: t('farms.greenhouses'), value: farm.greenhouses },
                  { label: t('farms.fields'),       value: farm.fields },
                  { label: t('farms.activeCycles'), value: farm.activeCycles },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 rounded-xl py-2.5">
                    <p className="text-lg font-extrabold text-gray-800">{s.value}</p>
                    <p className="text-[10px] text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm border-t border-gray-50 pt-3">
                <div>
                  <p className="text-[10px] text-gray-400">{t('farms.fieldsDailyProd')}</p>
                  <p className="font-bold text-green-700">{farm.dailyProduction.toLocaleString('ar-SA')} {t('common.kg')}</p>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400">{t('farms.monthRevenue')}</p>
                  <p className="font-bold text-sky-700">{farm.monthlyRevenue.toLocaleString('ar-SA')} {t('common.currency')}</p>
                </div>
              </div>

              {/* Crops */}
              <div className="flex flex-wrap gap-1.5">
                {farm.crops.map((c) => (
                  <span key={c} className="text-[11px] bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium border border-green-100">
                    {c}
                  </span>
                ))}
              </div>

              {/* Manager */}
              <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm">👤</span>
                <span>{farm.manager}</span>
                <span className="mr-auto font-medium text-gray-500 dir-ltr">{farm.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fields Table */}
      <GlassCard
        title={t('farms.fieldsTable')}
        subtitle={`${filteredFields.length} موقع`}
        accent="sky"
        action={
          <div className="flex items-center gap-2">
            {/* Farm filter */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedFarm(null)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${selectedFarm === null ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                {t('common.all')}
              </button>
              {farms.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFarm(selectedFarm === f.id ? null : f.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${selectedFarm === f.id ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  {f.name.replace('مزرعة ', '')}
                </button>
              ))}
            </div>
          </div>
        }
      >
        {/* Type filter chips */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {FIELD_TYPES.map((ft) => (
            <button
              key={ft.value}
              onClick={() => setTypeFilter(ft.value)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                typeFilter === ft.value
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'
              }`}
            >
              {t(ft.label)}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right border-b border-gray-100">
                {[t('common.name'), t('common.farm'), t('common.type'), t('farms.area'), t('common.crop'), t('farms.cycle'), t('farms.dailyProduction'), t('common.status')].map((h) => (
                  <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredFields.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 pr-3 font-semibold text-gray-800 whitespace-nowrap">{f.name}</td>
                  <td className="py-3 pr-3 text-gray-500 whitespace-nowrap">{f.farm}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">
                    <span className="text-xs bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full border border-sky-100">{f.type}</span>
                  </td>
                  <td className="py-3 pr-3 text-gray-500 whitespace-nowrap">{f.area}</td>
                  <td className="py-3 pr-3 font-medium text-gray-700 whitespace-nowrap">{f.crop}</td>
                  <td className="py-3 pr-3 text-gray-400 text-xs whitespace-nowrap">{f.cycle}</td>
                  <td className="py-3 pr-3 font-bold text-green-700 whitespace-nowrap">
                    {f.production > 0 ? `${f.production} ${t('common.kg')}` : '—'}
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap"><StatusBadge status={f.status} size="xs" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFields.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">{t('common.noResults')}</p>
          )}
        </div>
      </GlassCard>
    </PageContainer>
  );
}
