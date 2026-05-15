import ActionButton from '../components/ActionButton';

interface Props {
  title: string;
  icon: string;
  desc?: string;
}

export default function PlaceholderPage({ title, icon, desc }: Props) {
  return (
    <div className="flex items-center justify-center min-h-[65vh]">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white/70 shadow-lg p-14 text-center max-w-sm w-full">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center text-4xl mb-5 shadow-sm">
          {icon}
        </div>
        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">قريباً</p>
        <h2 className="text-lg font-extrabold text-gray-800 mb-3">{title}</h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          {desc ?? 'هذه الشاشة ستكون جاهزة في النسخة الكاملة من المنصة.'}
        </p>
        <div className="flex flex-col gap-2">
          <ActionButton size="md" className="w-full justify-center bg-green-600 text-white hover:bg-green-700 shadow-sm rounded-xl">
            طلب عرض تجريبي
          </ActionButton>
          <ActionButton variant="ghost" size="md" className="w-full justify-center text-gray-400 hover:text-gray-600">
            رجوع للرئيسية
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
