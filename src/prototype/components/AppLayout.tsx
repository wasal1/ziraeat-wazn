import { type ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface Props {
  current: string;
  onNav: (p: string) => void;
  children: ReactNode;
}

export default function AppLayout({ current, onNav, children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const offset = collapsed ? 'mr-[68px]' : 'mr-[260px]';

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0f9ff 100%)' }}>
      <Sidebar current={current} onNav={onNav} collapsed={collapsed} />
      <div className={`${offset} transition-all duration-300 min-h-screen flex flex-col`}>
        <Topbar current={current} onToggle={() => setCollapsed(!collapsed)} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
