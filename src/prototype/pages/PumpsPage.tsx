import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { pumps, pumpStats, irrigationSchedules } from '../data/mockData';

const STATUS_STYLE: Record<string, string> = {
  running:  'bg-green-100 text-green-700',
  idle:     'bg-gray-100 text-gray-500',
  off:      'bg-gray-100 text-gray-400',
  fault:    'bg-red-100 text-red-700',
};
const STATUS_LABEL: Record<string, string> = {
  running: 'تعمل', idle: 'خاملة', off: 'متوقفة', fault: 'عطل',
};
const SCHED_STATUS: Record<string, string> = {
  active:    'bg-green-100 text-green-700',
  scheduled: 'bg-blue-100 text-blue-700',
  completed: 'bg-gray-100 text-gray-500',
  paused:    'bg-amber-100 text-amber-700',
};
const SCHED_LABEL: Record<string, string> = {
  active: 'نشط', scheduled: 'مجدول', completed: 'منتهي', paused: 'موقوف',
};

export default function PumpsPage() {
  return (
    <PageContainer>
      <SectionHeader
        title="الري الكهربائي والمضخات"
        subtitle="مراقبة المضخات واستهلاك الطاقة وجدولة الري"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'مضخات نشطة', value: pumpStats.activePumps, icon: '💧', color: 'text-blue-600' },
          { label: 'تدفق اليوم (م³)', value: pumpStats.totalFlowToday, icon: '🌊', color: 'text-cyan-600' },
          { label: 'استهلاك كهربائي (كيلو)', value: pumpStats.totalKwhToday.toFixed(1), icon: '⚡', color: 'text-amber-600' },
          { label: 'تكلفة الكهرباء (ر.س)', value: pumpStats.totalCostToday.toFixed(1), icon: '💸', color: 'text-red-600' },
        ].map((s) => (
          <GlassCard key={s.label} className="text-center">
            <p className="text-3xl mb-1">{s.icon}</p>
            <p className={`font-bold text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Pumps list */}
      <GlassCard title="حالة المضخات" noPadding>
        <div className="divide-y divide-gray-100/80">
          {pumps.map((pump) => (
            <div key={pump.id} className="px-4 py-4 md:px-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${pump.status === 'running' ? 'bg-green-500 animate-pulse' : pump.status === 'fault' ? 'bg-red-500' : 'bg-gray-300'}`} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-gray-800 text-sm">{pump.name}</p>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[pump.status]}`}>
                        {STATUS_LABEL[pump.status]}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-500">{pump.location} · {pump.farm}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 text-center flex-shrink-0">
                  {[
                    { label: 'التدفق (م³/ساعة)', value: pump.flowRate },
                    { label: 'الضغط (بار)', value: pump.pressure.toFixed(1) },
                    { label: 'الطاقة (كيلو)', value: pump.powerKw.toFixed(1) },
                    { label: 'الاستهلاك اليوم', value: pump.dailyKwh.toFixed(1) },
                    { label: 'التكلفة اليوم', value: `${pump.dailyCost.toFixed(1)} ر.س` },
                  ].map((m) => (
                    <div key={m.label} className="bg-gray-50 rounded-xl p-2">
                      <p className="font-bold text-gray-800 text-sm">{m.value}</p>
                      <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              {pump.nextMaintenance && (
                <p className="text-[12px] text-amber-600 mt-2">⚠ صيانة مجدولة: {pump.nextMaintenance}</p>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Irrigation schedules */}
      <GlassCard title="جداول الري" noPadding>
        <div className="divide-y divide-gray-100/80">
          {irrigationSchedules.map((sch) => (
            <div key={sch.id} className="px-4 py-3 md:px-5 flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className="font-semibold text-gray-800 text-sm">{sch.name}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${SCHED_STATUS[sch.status]}`}>
                    {SCHED_LABEL[sch.status]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-gray-500">
                  <span>📍 {sch.farm} — {sch.field}</span>
                  <span>💧 {sch.pump}</span>
                  <span>🕐 {sch.startTime} ({sch.duration})</span>
                  <span>🔄 {sch.frequency}</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-blue-600 flex-shrink-0">
                {sch.waterVolume} م³ / جلسة
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageContainer>
  );
}
