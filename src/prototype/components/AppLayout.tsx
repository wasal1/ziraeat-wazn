import { type ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface Props {
  current: string;
  onNav: (p: string) => void;
  children: ReactNode;
}

export default function AppLayout({ current, onNav, children }: Props) {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: string) => {
    setMobileOpen(false);
    onNav(page);
  };

  const handleToggle = () => {
    setCollapsed((c) => !c);
    setMobileOpen((o) => !o);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0f9ff 100%)' }}>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar current={current} onNav={handleNav} collapsed={collapsed} mobileOpen={mobileOpen} />

      {/* Content — no margin on mobile, sidebar-width margin on md+ */}
      <div className={`transition-all duration-300 min-h-screen flex flex-col ${collapsed ? 'md:mr-[68px]' : 'md:mr-[260px]'}`}>
        <Topbar current={current} onToggle={handleToggle} />
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
