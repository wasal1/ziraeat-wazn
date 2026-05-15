interface Props {
  status: string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  'ممتاز': { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
  'جيد': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  'نشط': { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  'نشطة': { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  'يحتاج متابعة': { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
  'تحت التجهيز': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  'خطر': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  'مكتمل': { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
  'مرتفع': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  'طبيعي': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  'جاهز': { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
  'قديم': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  'متوسط': { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
  'منخفض': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  'لا يوجد': { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
};

export default function StatusBadge({ status, size = 'md' }: Props) {
  const config = statusConfig[status] ?? { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' };
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 ${padding} rounded-full font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}
