interface Props {
  title: string;
  icon: string;
  description?: string;
}

export default function PlaceholderPage({ title, icon, description }: Props) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="glass-card rounded-3xl p-12 text-center max-w-md w-full">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-5xl mb-6 shadow-sm">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          {description ?? 'هذه الشاشة ستكون متاحة في النسخة الكاملة من المنصة. تواصل معنا للحصول على عرض تفصيلي.'}
        </p>
        <div className="flex flex-col gap-2">
          <button className="w-full py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors">
            طلب عرض تجريبي
          </button>
          <button className="w-full py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors">
            رجوع للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
