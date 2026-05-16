import { useState } from 'react';
import { LangProvider, useLang } from './contexts/LangContext';
import { api, saveTokens } from '../api';
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
import DailyOpsPage from './pages/DailyOpsPage';
import TasksPage from './pages/TasksPage';
import MessagesPage from './pages/MessagesPage';
import CamerasPage from './pages/CamerasPage';
import PumpsPage from './pages/PumpsPage';
import SensorsPage from './pages/SensorsPage';
import MaintenancePage from './pages/MaintenancePage';
import WastePage from './pages/WastePage';
import AlertsPage from './pages/AlertsPage';
import TaskDetailPage from './pages/TaskDetailPage';
import MyTodayPage from './pages/MyTodayPage';
import PlaceholderPage from './pages/PlaceholderPage';
import { PLATFORM } from './data/mockData';

const PLACEHOLDERS: Record<string, { title: string; icon: string; desc: string }> = {};

// ─── Login Screen ────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const { t, lang, setLang, dir } = useLang();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('admin@wazan.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api.login(email, password);
      saveTokens(data.access, data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin();
    } catch {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      dir={dir}
      style={{ background: 'linear-gradient(135deg, #052e16 0%, #14532d 35%, #166534 65%, #052e16 100%)' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-green-400/5 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-emerald-400/5 translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/3 left-1/4 text-[120px] opacity-5 select-none">🌾</div>
        <div className="absolute bottom-12 right-16 text-[100px] opacity-5 select-none">🌴</div>
        <div className="absolute top-10 left-8 text-[80px] opacity-5 select-none">🌱</div>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, white, white 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, white, white 1px, transparent 1px, transparent 50px)' }} />
      </div>

      {/* Language toggle */}
      <div className="absolute top-5 left-5 z-10">
        <button
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 rounded-full text-white text-xs font-semibold backdrop-blur-sm transition-all"
        >
          🌐 {lang === 'ar' ? 'English' : 'العربية'}
        </button>
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
            <p className="text-[11px] text-gray-400 leading-relaxed max-w-[260px] mx-auto">{t('login.systemTag')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('login.email')}</label>
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
                <label className="text-xs font-semibold text-gray-600">{t('login.password')}</label>
                <button type="button" className="text-[11px] text-green-600 hover:text-green-800 font-medium">{t('login.forgot')}</button>
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
              <label htmlFor="remember" className="text-xs text-gray-500 cursor-pointer">{t('login.remember')}</label>
            </div>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center">
                {error}
              </div>
            )}

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
                  {t('login.loading')}
                </>
              ) : t('login.submit')}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400">{PLATFORM.name} © 2026 — {t('login.rights')}</p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex justify-center gap-3 mt-5">
          {[t('login.pill1'), t('login.pill2'), t('login.pill3')].map((f) => (
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
function PageContent({ page, onNav }: { page: string; onNav: (p: string) => void }) {
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
    case 'dailyops':      return <DailyOpsPage onNav={onNav} />;
    case 'tasks':         return <TasksPage />;
    case 'messages':      return <MessagesPage />;
    case 'cameras':       return <CamerasPage />;
    case 'pumps':         return <PumpsPage />;
    case 'sensors':       return <SensorsPage />;
    case 'maintenance':   return <MaintenancePage />;
    case 'waste':         return <WastePage />;
    case 'alerts':        return <AlertsPage />;
    case 'taskdetail':    return <TaskDetailPage onNav={onNav} />;
    case 'mytoday':       return <MyTodayPage onNav={onNav} />;
    default: {
      const p = PLACEHOLDERS[page];
      return p
        ? <PlaceholderPage title={p.title} icon={p.icon} desc={p.desc} />
        : <DashboardPage />;
    }
  }
}

// ─── Root ────────────────────────────────────────────────
function AppRoot() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('dashboard');

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  return (
    <AppLayout current={page} onNav={setPage}>
      <PageContent page={page} onNav={setPage} />
    </AppLayout>
  );
}

export default function AgriculturePrototype() {
  return (
    <LangProvider>
      <AppRoot />
    </LangProvider>
  );
}
