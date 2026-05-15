import GlassCard from '../components/GlassCard';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import { operations, operationTypes } from '../data/mockData';

export default function OperationsPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="العمليات الزراعية"
        subtitle="جميع العمليات المرتبطة بالدورات الزراعية"
        action={
          <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors shadow-sm">
            + إضافة عملية
          </button>
        }
      />

      {/* Operation type cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {operationTypes.map((op) => (
          <div key={op.name} className="glass-card rounded-2xl p-4 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer group">
            <div className="text-2xl mb-2">{op.icon}</div>
            <p className="text-sm font-semibold text-gray-800 mb-1">{op.name}</p>
            <p className="text-xs text-gray-400 mb-3">{op.records} سجل</p>
            <button className="w-full py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors group-hover:bg-green-600 group-hover:text-white">
              إضافة عملية
            </button>
          </div>
        ))}
      </div>

      {/* Recent Operations Table */}
      <GlassCard title="آخر العمليات المسجلة" subtitle="جميع العمليات مرتبطة بدوراتها الزراعية">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['التاريخ', 'العملية', 'الدورة الزراعية', 'المنفذ', 'التكلفة', 'الحالة', ''].map((h) => (
                  <th key={h} className="text-right text-xs text-gray-400 font-medium pb-3 pl-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {operations.map((op) => (
                <tr key={op.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="py-3 pl-4 text-gray-500">{op.date}</td>
                  <td className="py-3 pl-4 font-medium text-gray-800">{op.operation}</td>
                  <td className="py-3 pl-4 text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">🌱</span>
                      {op.cycle}
                    </span>
                  </td>
                  <td className="py-3 pl-4 text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">
                        {op.executor.charAt(0)}
                      </span>
                      {op.executor}
                    </span>
                  </td>
                  <td className="py-3 pl-4 font-medium text-gray-800">{op.cost}</td>
                  <td className="py-3 pl-4">
                    <StatusBadge status={op.status} size="sm" />
                  </td>
                  <td className="py-3">
                    <button className="text-green-600 hover:text-green-800 text-xs font-medium">تفاصيل</button>
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
