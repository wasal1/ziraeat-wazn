import { useState } from 'react';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import GrowingCyclePage from './pages/GrowingCyclePage';
import CooledGreenhousePage from './pages/CooledGreenhousePage';
import IrrigationWaterPage from './pages/IrrigationWaterPage';
import SmartAnalysisPage from './pages/SmartAnalysisPage';
import FarmsPage from './pages/FarmsPage';
import CropsPage from './pages/CropsPage';
import OperationsPage from './pages/OperationsPage';
import WorkersPage from './pages/WorkersPage';
import AccountingPage from './pages/AccountingPage';
import FertilizationPage from './pages/FertilizationPage';
import PestsPage from './pages/PestsPage';
import HarvestPage from './pages/HarvestPage';
import ExpensesPage from './pages/ExpensesPage';
import SalesPage from './pages/SalesPage';
import ReportsPage from './pages/ReportsPage';
import NurseryPage from './pages/NurseryPage';
import InventoryPage from './pages/InventoryPage';
import SettingsPage from './pages/SettingsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import PlaceholderPage from './pages/PlaceholderPage';
import { PLATFORM } from './data/mockData';

const PLACEHOLDERS: Record<string, { title: string; icon: string; desc: string }> = {};

// ─── Login Screen ────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('admin@hasad.sa');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      dir="rtl"
      style={{ background: 'linear-gradient(135deg, #052e16 0%, #14532d 35%, #166534 65%, #052e16 100%)' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-green-400/5 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-emerald-400/5 translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/3 left-1/4 text-[120px] opacity-5 select-none">🌾</div>
        <div className="absolute bottom-12 right-16 text-[100px] opacity-5 select-none">🌴</div>
        <div className="absolute top-10 left-8 text-[80px] opacity-5 select-none">🌱</div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, white, white 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, white, white 1px, transparent 1px, transparent 50px)' }} />
      </div>

      <div className="relative z-10 w-full max-w-[420px] mx-4">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/40">

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center bg-gradient-to-b from-green-600/10 to-transparent border-b border-gray-100">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-xl mb-4">
              <span className="text-3xl">🌾</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800 mb-1">{PLATFORM.name}</h1>
            <p className="text-[11px] text-gray-400 leading-relaxed max-w-[260px] mx-auto">{PLATFORM.tagline}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">البريد الإلكتروني</label>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📧</span>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-300 transition-all"
                  placeholder="admin@hasad.sa"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-600">كلمة المرور</label>
                <button type="button" className="text-[11px] text-green-600 hover:text-green-800 font-medium">نسيت كلمة المرور؟</button>
              </div>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-300 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" defaultChecked className="w-4 h-4 rounded accent-green-600 cursor-pointer" />
              <label htmlFor="remember" className="text-xs text-gray-500 cursor-pointer">تذكرني</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-l from-green-600 to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-800 active:scale-[0.98] transition-all disabled:opacity-70 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  جارٍ الدخول...
                </>
              ) : 'تسجيل الدخول'}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400">{PLATFORM.name} © 2026 — جميع الحقوق محفوظة</p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex justify-center gap-3 mt-5">
          {['🔒 آمن 100%', '📱 متجاوب', '🌐 RTL عربي'].map((f) => (
            <span key={f} className="text-[11px] text-green-200/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page router ─────────────────────────────────────────
function PageContent({ page }: { page: string }) {
  switch (page) {
    case 'dashboard':  return <DashboardPage />;
    case 'cycles':     return <GrowingCyclePage />;
    case 'cooled':     return <CooledGreenhousePage />;
    case 'irrigation': return <IrrigationWaterPage />;
    case 'analysis':   return <SmartAnalysisPage />;
    case 'farms':      return <FarmsPage />;
    case 'crops':      return <CropsPage />;
    case 'operations': return <OperationsPage />;
    case 'workers':       return <WorkersPage />;
    case 'accounting':    return <AccountingPage />;
    case 'fertilization': return <FertilizationPage />;
    case 'pests':         return <PestsPage />;
    case 'harvest':       return <HarvestPage />;
    case 'expenses':      return <ExpensesPage />;
    case 'sales':         return <SalesPage />;
    case 'reports':       return <ReportsPage />;
    case 'nursery':       return <NurseryPage />;
    case 'inventory':     return <InventoryPage />;
    case 'settings':      return <SettingsPage />;
    case 'subscription':  return <SubscriptionPage />;
    default: {
      const p = PLACEHOLDERS[page];
      return p
        ? <PlaceholderPage title={p.title} icon={p.icon} desc={p.desc} />
        : <DashboardPage />;
    }
  }
}

// ─── Root ────────────────────────────────────────────────
export default function AgriculturePrototype() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('dashboard');

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <AppLayout current={page} onNav={setPage}>
      <PageContent page={page} />
    </AppLayout>
  );
}
