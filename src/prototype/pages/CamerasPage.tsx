import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { cameras, cameraStats } from '../data/mockData';

const STATUS_STYLE: Record<string, string> = {
  active:          'bg-green-100 text-green-700',
  offline:         'bg-red-100 text-red-700',
  needsMaintenance:'bg-amber-100 text-amber-700',
};
const STATUS_LABEL: Record<string, string> = {
  active: 'نشطة', offline: 'غير متصلة', needsMaintenance: 'تحتاج صيانة',
};

export default function CamerasPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const cam = cameras.find((c) => c.id === selected);

  return (
    <PageContainer>
      <SectionHeader
        title="الكاميرات والمراقبة"
        subtitle="مراقبة المزارع والبيوت المحمية بشبكة الكاميرات الذكية"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'إجمالي الكاميرات', value: cameraStats.total, icon: '📷', color: 'text-gray-700' },
          { label: 'نشطة', value: cameraStats.active, icon: '🟢', color: 'text-green-600' },
          { label: 'غير متصلة', value: cameraStats.offline, icon: '🔴', color: 'text-red-600' },
          { label: 'تحتاج صيانة', value: cameraStats.needsMaintenance, icon: '🟡', color: 'text-amber-600' },
        ].map((s) => (
          <GlassCard key={s.label} className="flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className={`font-bold text-2xl ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-gray-400">{s.label}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Camera grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cameras.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id === selected ? null : c.id)}
              className={`text-right rounded-2xl border overflow-hidden transition-all ${selected === c.id ? 'border-green-400 shadow-lg shadow-green-100' : 'border-white/70 shadow-sm'} bg-white/90`}
            >
              {/* Simulated camera feed */}
              <div className="relative h-36 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {c.hasStream && c.status === 'active' ? (
                  <>
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: 'repeating-linear-gradient(0deg, white, white 1px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, white, white 1px, transparent 1px, transparent 30px)' }} />
                    <div className="text-center">
                      <p className="text-5xl mb-1">🌿</p>
                      <p className="text-[10px] text-gray-400">محاكاة بث مباشر</p>
                    </div>
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-4xl opacity-30">📷</p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {c.status === 'offline' ? 'غير متصلة' : 'لا يوجد بث'}
                    </p>
                  </div>
                )}
                <div className="absolute bottom-2 left-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLE[c.status]}`}>
                    {STATUS_LABEL[c.status]}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-800 text-sm">{c.name}</p>
                <p className="text-[12px] text-gray-500">{c.location}</p>
                <div className="flex gap-2 mt-1.5 text-[11px] text-gray-400">
                  <span>{c.resolution}</span>
                  <span>·</span>
                  <span>{c.type === 'ptz' ? 'PTZ' : 'ثابتة'}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div>
          {cam ? (
            <GlassCard title="تفاصيل الكاميرا" accent="green">
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] text-gray-400">الاسم</p>
                  <p className="font-semibold text-gray-800">{cam.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'الموقع', value: cam.location },
                    { label: 'المزرعة', value: cam.farm },
                    { label: 'الدقة', value: cam.resolution },
                    { label: 'النوع', value: cam.type === 'ptz' ? 'PTZ متحرك' : 'ثابتة' },
                    { label: 'آخر صيانة', value: cam.lastMaintenance },
                    { label: 'عمر التسجيل', value: `${cam.storageRetentionDays} يوم` },
                  ].map((r) => (
                    <div key={r.label}>
                      <p className="text-[11px] text-gray-400 mb-0.5">{r.label}</p>
                      <p className="text-sm text-gray-700">{r.value}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-[11px] text-gray-400 mb-1.5">الحالة</p>
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${STATUS_STYLE[cam.status]}`}>
                    {STATUS_LABEL[cam.status]}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: 'رؤية ليلية', val: cam.nightVision },
                    { label: 'كشف حركة', val: cam.motionDetection },
                    { label: 'بث مباشر', val: cam.hasStream },
                  ].map((f) => (
                    <div key={f.label} className="flex justify-between text-sm">
                      <span className="text-gray-600">{f.label}</span>
                      <span className={f.val ? 'text-green-600 font-medium' : 'text-gray-400'}>
                        {f.val ? '✓ متاحة' : '✗ غير متاحة'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-sm text-amber-800">
                  <p className="font-semibold mb-1">⚠ تنبيه</p>
                  <p className="text-[12px]">تحليل الفيديو الذكي غير متاح في النموذج التجريبي. سيُفعَّل عند الإطلاق الرسمي.</p>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard>
              <div className="py-12 text-center text-gray-400">
                <p className="text-4xl mb-3">📷</p>
                <p className="text-sm">اختر كاميرا لعرض التفاصيل</p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
