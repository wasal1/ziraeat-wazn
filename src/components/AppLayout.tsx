import { type ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface Props {
  currentPage: string;
  onNavigate: (page: string) => void;
  children: ReactNode;
}

export default function AppLayout({ currentPage, onNavigate, children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-sky-50">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} collapsed={collapsed} />
      <div className={`transition-all duration-300 ${collapsed ? 'mr-16' : 'mr-64'}`}>
        <Topbar currentPage={currentPage} onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="p-6 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
