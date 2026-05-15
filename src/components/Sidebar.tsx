type Page = string;

interface MenuItem {
  id: Page;
  label: string;
  icon: string;
  group?: string;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'الرئيسية', icon: '🏠' },
  { id: 'farms', label: 'المزارع والحقول', icon: '🌾', group: 'الإدارة' },
  { id: 'crops', label: 'المزروعات', icon: '🌿' },
  { id: 'cycles', label: 'الدورات الزراعية', icon: '🔄' },
  { id: 'operations', label: 'العمليات الزراعية', icon: '⚙️' },
  { id: 'openfield', label: 'الزراعة المكشوفة', icon: '🌤️', group: 'أنواع الزراعة' },
  { id: 'greenhouses', label: 'الزراعة المحمية', icon: '🏡' },
  { id: 'cooled', label: 'الزراعة المحمية المكيفة', icon: '❄️' },
  { id: 'nursery', label: 'الشتلات', icon: '🌱' },
  { id: 'irrigation', label: 'الري ومصادر المياه', icon: '💧', group: 'الموارد' },
  { id: 'energy', label: 'الكهرباء والتشغيل', icon: '⚡' },
  { id: 'inventory', label: 'المخزون', icon: '📦' },
  { id: 'workers', label: 'العمال', icon: '👷' },
  { id: 'accounting', label: 'المحاسبة', icon: '💰' },
  { id: 'reports', label: 'التقارير', icon: '📊', group: 'التحليل' },
  { id: 'analysis', label: 'التحليل الذكي', icon: '🤖' },
  { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
];

interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
}

export default function Sidebar({ currentPage, onNavigate, collapsed }: Props) {
  let lastGroup = '';

  return (
    <aside
      className={`fixed top-0 right-0 h-full bg-white border-l border-gray-100 shadow-lg z-30 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-white text-lg">🌾</span>
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-gray-800 text-sm leading-tight">منصة حصاد</p>
            <p className="text-xs text-gray-400">الذكية الزراعية</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {menuItems.map((item) => {
          const showGroup = !collapsed && item.group && item.group !== lastGroup;
          if (item.group) lastGroup = item.group;

          return (
            <div key={item.id}>
              {showGroup && (
                <p className="text-xs text-gray-400 font-medium px-3 pt-4 pb-1 uppercase tracking-wider">
                  {item.group}
                </p>
              )}
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'sidebar-active'
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={`px-4 py-4 border-t border-gray-100 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
              أ
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">أحمد الغامدي</p>
              <p className="text-xs text-gray-400">مدير المزرعة</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
            أ
          </div>
        )}
      </div>
    </aside>
  );
}
