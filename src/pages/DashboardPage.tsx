import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import AlertCard from '../components/AlertCard';
import StatusBadge from '../components/StatusBadge';
import { BarChartMock, PieChartMock } from '../components/MockChart';
import {
  dashboardStats, alerts, topCrops, topGreenhouses,
  weeklyProduction, cropDistribution,
} from '../data/mockData';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="عدد المزارع" value={dashboardStats.farms} icon="🏡" color="green" />
        <StatCard title="عدد الحقول" value={dashboardStats.fields} icon="🌾" color="blue" />
        <StatCard title="البيوت المحمية" value={dashboardStats.greenhouses} icon="🏠" color="amber" />
        <StatCard title="الدورات النشطة" value={dashboardStats.activeCycles} icon="🔄" color="purple" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="إنتاج اليوم" value={dashboardStats.todayProduction} unit="كجم" icon="📦" trend={{ value: 7, positive: true }} color="green" />
        <StatCard title="مبيعات اليوم" value={dashboardStats.todaySales} unit="ريال" icon="💰" trend={{ value: 12, positive: true }} color="blue" />
        <StatCard title="مصروفات اليوم" value={dashboardStats.todayExpenses} unit="ريال" icon="💸" trend={{ value: 3, positive: false }} color="amber" />
        <StatCard title="صافي الربح المتوقع" value={dashboardStats.netProfit} unit="ريال" icon="📈" trend={{ value: 15, positive: true }} color="green" />
      </div>

      {/* Alerts */}
      <GlassCard title="التنبيهات الحرجة" subtitle={`${alerts.length} تنبيهات تحتاج اهتمامك`}>
        <div className="space-y-3">
          {alerts.map((a) => (
            <AlertCard key={a.id} type={a.type as 'danger' | 'warning'} title={a.title} desc={a.desc} time={a.time} />
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Production */}
        <GlassCard title="ملخص الإنتاج الأسبوعي" subtitle="بالكيلوجرام">
          <BarChartMock data={weeklyProduction} xKey="day" yKey="value" color="#16a34a" height={200} />
        </GlassCard>

        {/* Crop Distribution */}
        <GlassCard title="توزيع المحاصيل" subtitle="حسب النوع">
          <PieChartMock data={cropDistribution} height={220} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Crops */}
        <GlassCard title="أكثر المحاصيل ربحية">
          <div className="space-y-3">
            {topCrops.map((crop, i) => (
              <div key={crop.name} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800">{crop.name}</span>
                    <span className="text-sm font-bold text-green-700">{crop.profit.toLocaleString('ar-SA')} ريال</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-green-400 to-emerald-600"
                      style={{ width: `${(crop.profit / 10000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Top Greenhouses */}
        <GlassCard title="أعلى البيوت المحمية إنتاجاً">
          <div className="divide-y divide-gray-50">
            {topGreenhouses.map((gh) => (
              <div key={gh.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">بيت محمي {gh.id}</p>
                  <p className="text-xs text-gray-400">{gh.crop}</p>
                </div>
                <div className="text-left flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">{gh.production} كجم</p>
                    <p className="text-xs text-gray-400">اليوم</p>
                  </div>
                  <StatusBadge status={gh.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
