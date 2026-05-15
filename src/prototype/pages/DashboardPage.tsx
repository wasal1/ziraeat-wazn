import PageContainer from '../components/PageContainer';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import AlertCard from '../components/AlertCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import { BarChartMock, DonutChartMock } from '../components/MockChart';
import {
  dashboardKPIs, dashboardAlerts, weeklyProduction,
  cropDistribution, topCrops, topGreenhouses,
} from '../data/mockData';

export default function DashboardPage() {
  const firstRow = dashboardKPIs.slice(0, 4);
  const secondRow = dashboardKPIs.slice(4);

  return (
    <PageContainer>
      <SectionHeader
        title="لوحة التحكم الرئيسية"
        subtitle="آخر تحديث: اليوم — 15 مايو 2026"
        action={<ActionButton variant="secondary" size="sm" icon="📥">تصدير تقرير</ActionButton>}
      />

      {/* Row 1 — farm stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {firstRow.map((k) => (
          <StatCard key={k.id} label={k.label} value={k.value} unit={k.unit} icon={k.icon} color={k.color as 'green' | 'sky' | 'amber' | 'purple'} trend={k.trend} />
        ))}
      </div>

      {/* Row 2 — financial stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {secondRow.map((k) => (
          <StatCard key={k.id} label={k.label} value={k.value} unit={k.unit} icon={k.icon} color={k.color as 'green' | 'sky' | 'amber' | 'red'} trend={k.trend} />
        ))}
      </div>

      {/* Alerts */}
      <GlassCard accent="red"
        title="التنبيهات الحرجة"
        subtitle={`${dashboardAlerts.length} تنبيهات تحتاج اهتمامك`}
        action={<span className="text-xs text-green-600 font-medium cursor-pointer hover:underline">عرض الكل</span>}
      >
        <div className="space-y-2.5">
          {dashboardAlerts.map((a) => (
            <AlertCard key={a.id} level={a.level as 'danger' | 'warning'} title={a.title} desc={a.desc} time={a.time} />
          ))}
        </div>
      </GlassCard>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <GlassCard title="الإنتاج الأسبوعي" subtitle="كيلوجرام" className="lg:col-span-3" accent="green">
          <BarChartMock data={weeklyProduction} xKey="day" yKey="value" color="#16a34a" height={210} label="كجم" />
        </GlassCard>

        <GlassCard title="توزيع المحاصيل" subtitle="حسب النوع" className="lg:col-span-2" accent="sky">
          <DonutChartMock data={cropDistribution} height={230} />
        </GlassCard>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top crops */}
        <GlassCard title="أكثر المحاصيل ربحية" accent="green"
          action={<span className="text-xs text-gray-400">هذا الموسم</span>}
        >
          <div className="space-y-4">
            {topCrops.map((crop, i) => {
              const maxProfit = topCrops[0].profit;
              const pct = Math.round((crop.profit / maxProfit) * 100);
              return (
                <div key={crop.name} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                    i === 0 ? 'bg-amber-100 text-amber-700' :
                    i === 1 ? 'bg-gray-100 text-gray-600' :
                             'bg-orange-50 text-orange-600'
                  }`}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1.5 text-sm">
                      <span className="font-semibold text-gray-800">{crop.name}</span>
                      <span className="font-bold text-green-700">{crop.profit.toLocaleString('ar-SA')} ريال</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-green-400 to-emerald-600 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">إنتاج: {crop.production.toLocaleString('ar-SA')} كجم</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Top greenhouses */}
        <GlassCard title="أعلى البيوت المحمية إنتاجاً" accent="sky"
          action={<span className="text-xs text-gray-400">اليوم</span>}
        >
          <div className="divide-y divide-gray-50">
            {topGreenhouses.map((gh, i) => (
              <div key={gh.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className={`w-8 h-8 rounded-xl text-sm font-extrabold flex items-center justify-center flex-shrink-0 ${
                  i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-50 text-gray-500'
                }`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{gh.name}</p>
                  <p className="text-xs text-gray-400">{gh.crop}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-800">{gh.production} كجم</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">اليوم</p>
                </div>
                <StatusBadge status={gh.status} size="xs" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
}
