import { PLATFORM } from '../data/mockData';
import { useLang } from '../contexts/LangContext';

type Page = string;

interface NavItem {
  id: Page;
  label: string;       // Arabic fallback
  labelKey: string;    // translation key
  icon: string;
  live?: boolean;
  group?: string;      // Arabic group name (used as key)
}

const NAV: NavItem[] = [
  { id: 'dashboard',     label: 'الرئيسية',                   labelKey: 'nav.dashboard',    icon: '🏠',  live: true                              },
  // ─── الإدارة
  { id: 'farms',         label: 'المزارع والحقول',             labelKey: 'nav.farms',         icon: '🌾',  live: true,  group: 'الإدارة'           },
  { id: 'crops',         label: 'المزروعات',                   labelKey: 'nav.crops',         icon: '🌿',  live: true                              },
  { id: 'cycles',        label: 'الدورات الزراعية',            labelKey: 'nav.cycles',        icon: '🔄',  live: true                              },
  { id: 'operations',    label: 'العمليات الزراعية',           labelKey: 'nav.operations',    icon: '⚙️',  live: true                              },
  // ─── الإنتاج
  { id: 'harvest',       label: 'الحصاد',                      labelKey: 'nav.harvest',       icon: '🌾',  live: true,  group: 'الإنتاج'           },
  { id: 'fertilization', label: 'التسميد',                     labelKey: 'nav.fertilization', icon: '🧪',  live: true                              },
  { id: 'pests',         label: 'الأمراض والآفات',              labelKey: 'nav.pests',         icon: '🛡️',  live: true                              },
  // ─── البنية التحتية
  { id: 'cooled',        label: 'الزراعة المحمية المكيفة',     labelKey: 'nav.cooled',        icon: '❄️',  live: true,  group: 'البنية التحتية'    },
  { id: 'irrigation',    label: 'الري ومصادر المياه',          labelKey: 'nav.irrigation',    icon: '💧',  live: true                              },
  // ─── المالية
  { id: 'sales',         label: 'المبيعات',                    labelKey: 'nav.sales',         icon: '🛒',  live: true,  group: 'المالية'           },
  { id: 'expenses',      label: 'المصروفات',                   labelKey: 'nav.expenses',      icon: '💸',  live: true                              },
  { id: 'accounting',    label: 'المحاسبة',                    labelKey: 'nav.accounting',    icon: '💰',  live: true                              },
  // ─── الموارد
  { id: 'workers',       label: 'العمال',                      labelKey: 'nav.workers',       icon: '👷',  live: true,  group: 'الموارد'           },
  { id: 'nursery',       label: 'الشتلات',                     labelKey: 'nav.nursery',       icon: '🌱',  live: true                              },
  { id: 'inventory',     label: 'المخزون',                     labelKey: 'nav.inventory',     icon: '📦',  live: true                              },
  // ─── التحليل
  { id: 'analysis',      label: 'التحليل الذكي',               labelKey: 'nav.analysis',      icon: '🤖',  live: true,  group: 'التحليل'           },
  { id: 'reports',       label: 'التقارير',                    labelKey: 'nav.reports',       icon: '📊',  live: true                              },
  // ─── المتابعة الذكية
  { id: 'mytoday',      label: 'عملي اليوم',                   labelKey: 'nav.mytoday',       icon: '🎯',  live: true,  group: 'المتابعة الذكية'  },
  { id: 'tasks',        label: 'المهام وأوامر العمل',           labelKey: 'nav.tasks',         icon: '✅',  live: true                              },
  { id: 'cameras',      label: 'الكاميرات والمراقبة',           labelKey: 'nav.cameras',       icon: '📷',  live: true                              },
  { id: 'pumps',        label: 'الري الكهربائي والمضخات',       labelKey: 'nav.pumps',         icon: '⚡',  live: true                              },
  { id: 'sensors',      label: 'الحساسات والقراءات',            labelKey: 'nav.sensors',       icon: '📡',  live: true                              },
  { id: 'maintenance',  label: 'الصيانة والأعطال',              labelKey: 'nav.maintenance',   icon: '🔧',  live: true                              },
  { id: 'waste',        label: 'تحليل الهدر والنفقات',          labelKey: 'nav.waste',         icon: '💡',  live: true                              },
  { id: 'alerts',       label: 'مركز التنبيهات',                labelKey: 'nav.alerts',        icon: '🔔',  live: true                              },
  // ─── النظام
  { id: 'subscription',  label: 'الاشتراك والباقات',           labelKey: 'nav.subscription',  icon: '💳',  live: true,  group: 'النظام'            },
  { id: 'settings',      label: 'الإعدادات',                   labelKey: 'nav.settings',      icon: '⚙️',  live: true                              },
];

interface Props {
  current: Page;
  onNav: (p: Page) => void;
  collapsed: boolean;
  mobileOpen: boolean;
}

export default function Sidebar({ current, onNav, collapsed, mobileOpen }: Props) {
  const { t, lang, dir } = useLang();
  const isRtl = dir === 'rtl';
  let lastGroup = '';

  // Sidebar position: right side for RTL, left side for LTR
  const sidePos   = isRtl ? 'right-0 border-l' : 'left-0 border-r';
  const slideOff  = isRtl ? 'translate-x-full' : '-translate-x-full';

  return (
    <aside className={`
      fixed top-0 ${sidePos} h-full z-50 flex flex-col bg-white border-gray-100/80 shadow-lg
      transition-all duration-300
      w-[260px] ${collapsed ? 'md:w-[68px]' : ''}
      ${mobileOpen ? 'translate-x-0 shadow-2xl' : `${slideOff} md:translate-x-0`}
    `}>

      {/* ─── Logo ─────────────────────────────────────────── */}
      <div className={`flex items-center gap-3 border-b border-gray-100/80 flex-shrink-0 ${collapsed ? 'md:px-3 md:py-4 md:justify-center px-5 py-4' : 'px-5 py-4'}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-[18px]">🌾</span>
        </div>
        <div className={`min-w-0 ${collapsed ? 'md:hidden' : ''}`}>
          <p className="font-extrabold text-gray-800 text-[13px] leading-tight truncate">{PLATFORM.name}</p>
          <p className="text-[10px] text-gray-400 truncate">{t('platform.systemTag')}</p>
        </div>
      </div>

      {/* ─── Navigation ───────────── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 scrollbar-thin scrollbar-thumb-gray-200">
        {NAV.map((item) => {
          const showGroup = item.group && item.group !== lastGroup;
          if (item.group) lastGroup = item.group;
          const isActive = current === item.id && item.live;
          const isCollapsedDesktop = collapsed;

          return (
            <div key={item.id}>
              {showGroup && (
                <p className={`text-[10px] text-gray-400 uppercase tracking-widest font-semibold px-3 pt-5 pb-1.5 ${isCollapsedDesktop ? 'md:hidden' : ''}`}>
                  {t(`group.${item.group}`)}
                </p>
              )}
              <button
                onClick={() => item.live && onNav(item.id)}
                title={t(item.labelKey)}
                className={`w-full flex items-center gap-3 rounded-xl mb-0.5 transition-all duration-150 group
                  px-3 py-2.5 ${isCollapsedDesktop ? 'md:px-2 md:py-2.5 md:justify-center' : ''}
                  ${isActive
                    ? 'bg-gradient-to-l from-green-600 to-emerald-700 text-white shadow-[0_4px_12px_rgba(22,163,74,0.35)]'
                    : item.live
                      ? 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                      : 'text-gray-300 cursor-default'
                  }`}
              >
                <span className={`text-[16px] flex-shrink-0 transition-transform duration-150 ${!isActive && item.live ? 'group-hover:scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className={`text-[13px] font-medium flex-1 text-right truncate ${lang === 'en' ? 'text-left' : 'text-right'} ${isActive ? 'text-white' : ''} ${isCollapsedDesktop ? 'md:hidden' : ''}`}>
                  {t(item.labelKey)}
                </span>
                {!item.live && (
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400 ${isCollapsedDesktop ? 'md:hidden' : ''}`}>
                    {t('common.comingSoon')}
                  </span>
                )}
                {isActive && (
                  <span className={`w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0 ${isCollapsedDesktop ? 'md:hidden' : ''}`} />
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* ─── User Footer ──────────── */}
      <div className={`border-t border-gray-100/80 flex-shrink-0 px-4 py-3 ${collapsed ? 'md:p-2 md:flex md:justify-center' : ''}`}>
        <div className={`${collapsed ? 'md:block hidden' : 'hidden'}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
            ع
          </div>
        </div>
        <div className={`flex items-center gap-3 ${collapsed ? 'md:hidden' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
            ع
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-gray-800 truncate">{PLATFORM.user}</p>
            <p className="text-[11px] text-gray-400 truncate">{PLATFORM.role}</p>
          </div>
          <button title={t('common.logout')} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
