import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import { reports } from '../data/mockData';

const reportIcons: Record<string, string> = {
  'تقرير الإنتاج': '📦',
  'تقرير التكاليف': '💸',
  'تقرير الربحية': '💰',
  'تقرير المياه والري': '💧',
  'تقرير الكهرباء والتشغيل': '⚡',
  'تقرير الأمراض والآفات': '🔬',
  'تقرير العمال': '👷',
  'تقرير المخزون': '📦',
  'تقرير الدورة الزراعية': '🔄',
  'تقرير المقارنة بين المواسم': '📊',
  'تقرير المحصول': '🌾',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="التقارير"
        subtitle="توليد وعرض تقارير شاملة عن أداء المنصة"
        action={
          <div className="flex gap-2">
            <button className="px-3 py-2 text-sm text-gray-600 glass-card rounded-xl hover:bg-gray-50 transition-colors">
              📥 تحميل الكل
            </button>
            <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm">
              + تقرير مخصص
            </button>
          </div>
        }
      />

      {/* Report cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                  {reportIcons[report.name] ?? '📄'}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{report.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">آخر تحديث: {report.lastGenerated}</p>
                </div>
              </div>
              <StatusBadge status={report.status} size="sm" />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">{report.desc}</p>
            <button className="w-full py-2 text-sm font-medium text-green-700 bg-green-50 rounded-xl hover:bg-green-600 hover:text-white transition-all">
              عرض التقرير
            </button>
          </div>
        ))}
      </div>

      {/* Reports summary table */}
      <GlassCard title="سجل التقارير">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['التقرير', 'الفترة', 'الحالة', 'آخر تحديث', ''].map((h) => (
                  <th key={h} className="text-right text-xs text-gray-400 font-medium pb-3 pl-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.slice(0, 6).map((r) => (
                <tr key={r.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="py-3 pl-4">
                    <span className="flex items-center gap-2">
                      <span>{reportIcons[r.name] ?? '📄'}</span>
                      <span className="font-medium text-gray-800">{r.name}</span>
                    </span>
                  </td>
                  <td className="py-3 pl-4 text-gray-500">فبراير 2026</td>
                  <td className="py-3 pl-4">
                    <StatusBadge status={r.status} size="sm" />
                  </td>
                  <td className="py-3 pl-4 text-gray-500">{r.lastGenerated}</td>
                  <td className="py-3">
                    <button className="text-green-600 hover:text-green-800 text-xs font-medium">عرض</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
