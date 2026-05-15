import { PLATFORM } from '../data/mockData';

const TITLES: Record<string, { title: string; sub: string }> = {
  dashboard:     { title: 'لوحة التحكم الرئيسية',   sub: 'نظرة شاملة على أداء المنصة' },
  cycles:        { title: 'الدورة الزراعية',          sub: 'خيار — بيت محمي رقم 7' },
  cooled:        { title: 'الزراعة المحمية المكيفة',  sub: 'بيت محمي مكيف رقم 7' },
  irrigation:    { title: 'الري ومصادر المياه',        sub: 'إدارة المياه والري ومحطات التحلية' },
  analysis:      { title: 'التحليل الذكي',             sub: 'تحليل داخلي وتحليل عميق بالذكاء الاصطناعي' },
  farms:         { title: 'المزارع والحقول',           sub: 'إدارة جميع المواقع الزراعية' },
  crops:         { title: 'المزروعات',                 sub: 'كتالوج المحاصيل والأصناف' },
  operations:    { title: 'العمليات الزراعية',         sub: 'سجل العمليات اليومية' },
  workers:       { title: 'إدارة العمال',              sub: 'فرق العمل والحضور والرواتب' },
  accounting:    { title: 'المحاسبة والمالية',          sub: 'الإيرادات والمصروفات وصافي الربح' },
  harvest:       { title: 'إدارة الحصاد',              sub: 'سجلات الحصاد اليومي والجودة والإنتاجية' },
  fertilization: { title: 'إدارة التسميد',             sub: 'البرامج التسميدية والمخزون والتطبيقات' },
  pests:         { title: 'الأمراض والآفات',            sub: 'رصد الحوادث والعلاج والوقاية' },
  expenses:      { title: 'المصروفات التفصيلية',        sub: 'متابعة المصروفات مقارنة بالميزانية' },
  sales:         { title: 'إدارة المبيعات',             sub: 'سجلات المبيعات والعملاء وقنوات التوزيع' },
  reports:       { title: 'التقارير والتحليلات',        sub: 'مؤشرات الأداء ومقارنة المواسم' },
  nursery:       { title: 'إدارة الشتلات',              sub: 'دفعات الشتلات ونسب الإنبات وجداول النقل' },
  inventory:     { title: 'المخزون',                    sub: 'إدارة البذور والأسمدة والمبيدات وجميع المستلزمات' },
  settings:      { title: 'الإعدادات',                  sub: 'إعدادات المنصة والمستخدمين والصلاحيات' },
  subscription:  { title: 'الاشتراك والباقات',          sub: 'إدارة خطة الاشتراك والاستخدام والفواتير' },
};

interface Props {
  current: string;
  onToggle: () => void;
}

export default function Topbar({ current, onToggle }: Props) {
  const info = TITLES[current] ?? { title: current, sub: '' };

  return (
    <header className="h-[58px] md:h-[62px] bg-white/90 backdrop-blur-md border-b border-gray-100/80 flex items-center px-3 md:px-5 gap-2 md:gap-3 sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

      {/* Hamburger / toggle */}
      <button
        onClick={onToggle}
        className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
        aria-label="فتح القائمة"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page title — visible on mobile */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800 text-[14px] leading-tight truncate">{info.title}</p>
        <p className="text-[10px] text-gray-400 truncate hidden sm:block">{info.sub}</p>
      </div>

      {/* Notification bell */}
      <button className="relative w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
      </button>

      {/* Farm pill — hidden on mobile */}
      <div className="hidden sm:flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-1.5 flex-shrink-0">
        <span className="text-green-600 text-sm">🌾</span>
        <div>
          <p className="text-[11px] font-semibold text-green-800 leading-tight">{PLATFORM.farm}</p>
          <p className="text-[10px] text-green-500">{PLATFORM.location}</p>
        </div>
      </div>
    </header>
  );
}
