const pageTitles: Record<string, string> = {
  dashboard: 'لوحة التحكم الرئيسية',
  farms: 'المزارع والحقول',
  crops: 'المزروعات والتصنيفات',
  cycles: 'الدورات الزراعية',
  operations: 'العمليات الزراعية',
  openfield: 'الزراعة المكشوفة',
  greenhouses: 'البيوت المحمية',
  cooled: 'الزراعة المحمية المكيفة',
  nursery: 'الشتلات',
  irrigation: 'الري ومصادر المياه',
  energy: 'الكهرباء والتشغيل',
  inventory: 'المخزون',
  workers: 'العمال',
  accounting: 'المحاسبة',
  reports: 'التقارير',
  analysis: 'التحليل الذكي',
  settings: 'الإعدادات',
};

interface Props {
  currentPage: string;
  onToggleSidebar: () => void;
}

export default function Topbar({ currentPage, onToggleSidebar }: Props) {
  const today = new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center px-6 gap-4 sticky top-0 z-20 shadow-sm">
      <button
        onClick={onToggleSidebar}
        className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1">
        <h1 className="text-base font-bold text-gray-800">{pageTitles[currentPage] ?? currentPage}</h1>
        <p className="text-xs text-gray-400">{today}</p>
      </div>

      {/* Notifications */}
      <button className="relative w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {/* Date badge */}
      <div className="hidden sm:flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
        <span className="text-green-600 text-sm">📅</span>
        <div>
          <p className="text-xs font-medium text-green-800">مزرعة النخيل</p>
          <p className="text-xs text-green-600">الرياض</p>
        </div>
      </div>
    </header>
  );
}
