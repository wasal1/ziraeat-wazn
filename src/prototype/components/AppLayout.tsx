import { type ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useLang } from '../contexts/LangContext';

interface Props {
  current: string;
  onNav: (p: string) => void;
  children: ReactNode;
}

export default function AppLayout({ current, onNav, children }: Props) {
  const { dir } = useLang();
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRtl = dir === 'rtl';

  const handleNav = (page: string) => {
    setMobileOpen(false);
    onNav(page);
  };

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setMobileOpen((o) => !o);
    } else {
      setCollapsed((c) => !c);
    }
  };

  // Sidebar width margin applied to the correct side based on direction
  const contentMargin = collapsed
    ? (isRtl ? 'md:mr-[68px]' : 'md:ml-[68px]')
    : (isRtl ? 'md:mr-[260px]' : 'md:ml-[260px]');

  return (
    <div dir={dir} className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0f9ff 100%)' }}>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar current={current} onNav={handleNav} collapsed={collapsed} mobileOpen={mobileOpen} />

      {/* Content area — margin side flips with language direction */}
      <div className={`transition-all duration-300 min-h-screen flex flex-col ${contentMargin}`}>
        <Topbar current={current} onToggle={handleToggle} />
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
