import { useState } from 'react';

interface Props {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState('admin@hasad.sa');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" dir="rtl"
      style={{ background: 'linear-gradient(135deg, #0f4c2a 0%, #166534 30%, #15803d 60%, #065f46 100%)' }}>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-emerald-400/10" />
        {/* Farm silhouette elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
          <svg viewBox="0 0 1440 100" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,60 Q180,20 360,60 Q540,100 720,60 Q900,20 1080,60 Q1260,100 1440,60 L1440,100 L0,100 Z"/>
          </svg>
        </div>
        {/* Palm tree */}
        <div className="absolute bottom-8 right-16 text-8xl opacity-20">🌴</div>
        <div className="absolute top-8 left-12 text-6xl opacity-20">🌾</div>
        <div className="absolute top-20 right-1/4 text-5xl opacity-15">☀️</div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/60">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/20 flex items-center justify-center mb-4 shadow-lg">
              <span className="text-3xl">🌾</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">منصة حصاد الذكية</h1>
            <p className="text-green-100 text-sm leading-relaxed">
              إدارة وتحليل المحاصيل الزراعية<br />من الزراعة إلى الربحية
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50 text-gray-800 text-sm"
                  placeholder="admin@hasad.sa"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50 text-gray-800 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-green-600" />
                <span className="text-sm text-gray-600">تذكرني</span>
              </label>
              <button className="text-sm text-green-600 hover:text-green-800 font-medium">نسيت كلمة المرور؟</button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:from-green-700 hover:to-emerald-800 active:scale-[0.98] transition-all disabled:opacity-70 text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  جارٍ تسجيل الدخول...
                </span>
              ) : 'تسجيل الدخول'}
            </button>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">منصة حصاد الذكية © 2026 — جميع الحقوق محفوظة</p>
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex justify-center gap-4 mt-6">
          {['🔒 آمن', '📱 متجاوب', '🌐 عربي RTL'].map((f) => (
            <span key={f} className="text-xs text-green-200 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
