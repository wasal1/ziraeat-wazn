import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { workOrders, workOrderStats } from '../data/mockData';

const STATUS_STYLE: Record<string, string> = {
  pending:    'bg-gray-100 text-gray-600',
  inProgress: 'bg-blue-100 text-blue-700',
  completed:  'bg-green-100 text-green-700',
  planned:    'bg-purple-100 text-purple-700',
};
const STATUS_LABEL: Record<string, string> = {
  pending: 'معلقة', inProgress: 'جارية', completed: 'منجزة', planned: 'مخططة',
};
const PRIORITY_STYLE: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high:     'bg-orange-100 text-orange-700',
  medium:   'bg-amber-100 text-amber-700',
  low:      'bg-gray-100 text-gray-500',
};
const PRIORITY_LABEL: Record<string, string> = {
  critical: 'حرجة', high: 'عالية', medium: 'متوسطة', low: 'منخفضة',
};

export default function TasksPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const detail = workOrders.find((w) => w.id === selected);

  return (
    <PageContainer>
      <SectionHeader
        title="المهام وأوامر العمل"
        subtitle="إدارة ومتابعة أوامر العمل وتوزيع المهام"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: 'الإجمالي', value: workOrderStats.total, color: 'text-gray-700' },
          { label: 'معلقة', value: workOrderStats.pending, color: 'text-gray-600' },
          { label: 'جارية', value: workOrderStats.inProgress, color: 'text-blue-600' },
          { label: 'منجزة', value: workOrderStats.completed, color: 'text-green-600' },
          { label: 'مخططة', value: workOrderStats.planned, color: 'text-purple-600' },
          { label: 'متأخرة', value: workOrderStats.overdue, color: 'text-red-600' },
          { label: 'التكلفة ر.س', value: workOrderStats.totalCost.toLocaleString(), color: 'text-emerald-700' },
        ].map((s) => (
          <GlassCard key={s.label} className="text-center">
            <p className={`font-bold text-xl ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Work orders list */}
        <div className="lg:col-span-2">
          <GlassCard title="قائمة أوامر العمل" noPadding>
            <div className="divide-y divide-gray-100/80">
              {workOrders.map((wo) => (
                <button
                  key={wo.id}
                  onClick={() => setSelected(wo.id === selected ? null : wo.id)}
                  className={`w-full text-right px-4 py-3 md:px-5 hover:bg-gray-50/60 transition-colors ${selected === wo.id ? 'bg-green-50/60' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800 text-sm">{wo.title}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[wo.status]}`}>
                          {STATUS_LABEL[wo.status]}
                        </span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLE[wo.priority]}`}>
                          {PRIORITY_LABEL[wo.priority]}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-gray-500">
                        <span>📍 {wo.farm}</span>
                        <span>👷 {wo.assignedTo}</span>
                        <span>📅 {wo.dueDate}</span>
                      </div>
                    </div>
                    <div className="text-left flex-shrink-0">
                      <p className="font-bold text-green-700 text-sm">{wo.estimatedCost.toLocaleString()} ر.س</p>
                      {wo.overdue && <span className="text-[11px] text-red-500 font-medium">⚠ متأخرة</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Detail panel */}
        <div>
          {detail ? (
            <GlassCard title="تفاصيل أمر العمل" accent="green">
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] text-gray-400 mb-0.5">العنوان</p>
                  <p className="font-semibold text-gray-800">{detail.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">المزرعة</p>
                    <p className="text-sm text-gray-700">{detail.farm}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">المعيّن له</p>
                    <p className="text-sm text-gray-700">{detail.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">الأولوية</p>
                    <span className={`text-[12px] px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLE[detail.priority]}`}>
                      {PRIORITY_LABEL[detail.priority]}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">الحالة</p>
                    <span className={`text-[12px] px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[detail.status]}`}>
                      {STATUS_LABEL[detail.status]}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">تاريخ الإنشاء</p>
                    <p className="text-sm text-gray-700">{detail.createdDate}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">الموعد النهائي</p>
                    <p className={`text-sm font-medium ${detail.overdue ? 'text-red-600' : 'text-gray-700'}`}>{detail.dueDate}</p>
                  </div>
                </div>
                {detail.description && (
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">الوصف</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{detail.description}</p>
                  </div>
                )}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-[11px] text-gray-400 mb-0.5">التكلفة التقديرية</p>
                  <p className="font-bold text-green-700 text-lg">{detail.estimatedCost.toLocaleString()} ر.س</p>
                </div>
                {detail.materials && detail.materials.length > 0 && (
                  <div>
                    <p className="text-[11px] text-gray-400 mb-1.5">المواد المطلوبة</p>
                    <div className="space-y-1.5">
                      {detail.materials.map((m, i) => (
                        <div key={i} className="flex justify-between text-sm bg-gray-50 rounded-lg px-3 py-1.5">
                          <span className="text-gray-700">{m.name}</span>
                          <span className="text-gray-500">{m.qty} {m.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          ) : (
            <GlassCard>
              <div className="py-12 text-center text-gray-400">
                <p className="text-4xl mb-3">📋</p>
                <p className="text-sm">اختر أمر عمل لعرض التفاصيل</p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
