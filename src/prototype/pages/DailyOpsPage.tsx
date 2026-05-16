import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { dailyOperations, dailyOpStats, opTypeConfig } from '../data/mockData';

const STATUS_STYLE: Record<string, string> = {
  completed:   'bg-green-100 text-green-700',
  inProgress:  'bg-blue-100 text-blue-700',
  scheduled:   'bg-amber-100 text-amber-700',
  cancelled:   'bg-gray-100 text-gray-500',
};
const STATUS_LABEL: Record<string, string> = {
  completed:  'منجزة',
  inProgress: 'جارية',
  scheduled:  'مجدولة',
  cancelled:  'ملغاة',
};
const PRIORITY_STYLE: Record<string, string> = {
  high:   'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low:    'bg-gray-100 text-gray-500',
};
const PRIORITY_LABEL: Record<string, string> = {
  high: 'عالية', medium: 'متوسطة', low: 'منخفضة',
};

type FilterStatus = 'all' | 'completed' | 'inProgress' | 'scheduled';

export default function DailyOpsPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');

  const filtered = dailyOperations.filter((op) => {
    const matchStatus = filter === 'all' || op.status === filter;
    const matchSearch = search === '' || op.title.includes(search) || op.farm.includes(search) || op.worker.includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <PageContainer>
      <SectionHeader
        title="العمليات اليومية"
        subtitle="متابعة ومراقبة جميع العمليات الزراعية اليومية"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'الإجمالي اليوم', value: dailyOpStats.totalToday, icon: '📋', color: 'text-gray-700' },
          { label: 'منجزة', value: dailyOpStats.completed, icon: '✅', color: 'text-green-600' },
          { label: 'جارية', value: dailyOpStats.inProgress, icon: '⏳', color: 'text-blue-600' },
          { label: 'مجدولة', value: dailyOpStats.scheduled, icon: '🗓️', color: 'text-amber-600' },
          { label: 'التكلفة اليومية', value: `${dailyOpStats.totalCost.toLocaleString()} ر.س`, icon: '💸', color: 'text-purple-600' },
          { label: 'وفر عن المعدل', value: `${dailyOpStats.savedVsAvg.toLocaleString()} ر.س`, icon: '💰', color: 'text-emerald-600' },
        ].map((s) => (
          <GlassCard key={s.label} className="text-center">
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className={`font-bold text-lg ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Filter + Search */}
      <GlassCard>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث في العمليات..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <div className="flex gap-2 flex-wrap">
            {(['all', 'inProgress', 'scheduled', 'completed'] as FilterStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === s ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {s === 'all' ? 'الكل' : STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Operations list */}
      <GlassCard title={`العمليات (${filtered.length})`} noPadding>
        <div className="divide-y divide-gray-100/80">
          {filtered.map((op) => {
            const cfg = opTypeConfig[op.type] ?? { label: op.type, icon: '📌' };
            return (
              <div key={op.id} className="px-4 py-3 md:px-5 md:py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0">
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{op.title}</span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLE[op.status]}`}>
                        {STATUS_LABEL[op.status]}
                      </span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLE[op.priority]}`}>
                        {PRIORITY_LABEL[op.priority]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-500">
                      <span>📍 {op.farm} — {op.field}</span>
                      <span>👷 {op.worker}</span>
                      <span>🏷️ {cfg.label}</span>
                    </div>
                    {op.notes && (
                      <p className="text-[12px] text-gray-400 mt-1 truncate">{op.notes}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-left text-[12px] text-gray-500 space-y-1">
                    <p className="font-semibold text-green-700">{op.cost.toLocaleString()} ر.س</p>
                    <p>{op.startTime}</p>
                    <p className="text-gray-400">{op.duration}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-sm">لا توجد عمليات مطابقة</p>
            </div>
          )}
        </div>
      </GlassCard>
    </PageContainer>
  );
}
