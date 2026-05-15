import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import AlertCard from '../components/AlertCard';
import { smartAnalysis as sa } from '../data/mockData';

// ─── Circular gauge ───────────────────────────────────────
function ScoreGauge({ score }: { score: number }) {
  const r = 52, cx = 64, cy = 64;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? '#16a34a' : score >= 60 ? '#f59e0b' : '#ef4444';
  const textColor = score >= 80 ? 'text-green-700' : score >= 60 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="128" height="128" viewBox="0 0 128 128">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle
            cx={cx} cy={cy} r={r} fill="none"
            stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            transform="rotate(-90 64 64)"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-extrabold leading-none ${textColor}`}>{score}%</span>
          <span className="text-[10px] text-gray-400 mt-0.5">أداء الدورة</span>
        </div>
      </div>
    </div>
  );
}

// ─── Metric line ─────────────────────────────────────────
function MetLine({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`flex items-center gap-1.5 text-sm font-bold ${good ? 'text-green-700' : 'text-amber-600'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${good ? 'bg-green-500' : 'bg-amber-500'}`} />
        {value}
      </span>
    </div>
  );
}

// ─── Risk badge ──────────────────────────────────────────
const RISK_CFG = {
  'خطر':    { wrap: 'bg-red-50 border-red-200',    head: 'text-red-800',    body: 'text-red-600',    badge: 'bg-red-200 text-red-800',    icon: '🚨' },
  'تحذير':  { wrap: 'bg-amber-50 border-amber-200',head: 'text-amber-800',  body: 'text-amber-600',  badge: 'bg-amber-200 text-amber-800', icon: '⚠️' },
  'معلومة': { wrap: 'bg-sky-50 border-sky-200',    head: 'text-sky-800',    body: 'text-sky-600',    badge: 'bg-sky-200 text-sky-800',     icon: 'ℹ️' },
};

export default function SmartAnalysisPage() {
  const [showAI, setShowAI] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerAI = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setShowAI(true); }, 2200);
  };

  return (
    <PageContainer>
      <SectionHeader
        title="التحليل الذكي"
        subtitle="تحليل داخلي مستمر + تحليل عميق بالذكاء الاصطناعي عند الطلب"
        action={<ActionButton variant="secondary" size="sm" icon="📥">تصدير التقرير</ActionButton>}
      />

      {/* ─── Internal analysis ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Score */}
        <GlassCard title="درجة الأداء" subtitle="التحليل الداخلي الآلي" accent="green">
          <div className="flex flex-col items-center py-2">
            <ScoreGauge score={sa.score} />
            <div className="w-full mt-5 space-y-0">
              <MetLine label="مستوى المخاطر"      value={sa.riskLevel}      good={sa.riskLevel === 'منخفض'} />
              <MetLine label="الربحية"              value={sa.profitability}  good={true} />
              <MetLine label="كفاءة المياه"         value={sa.waterEff}       good={true} />
              <MetLine label="كفاءة الكهرباء"       value={sa.electricityEff} good={false} />
            </div>
          </div>
        </GlassCard>

        {/* Risk indicators */}
        <GlassCard title="مؤشرات المخاطر" className="lg:col-span-2" accent="amber">
          <div className="space-y-3">
            {sa.risks.map((risk, i) => {
              const c = RISK_CFG[risk.level as keyof typeof RISK_CFG];
              return (
                <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl border ${c.wrap}`}>
                  <span className="text-lg flex-shrink-0 leading-none mt-0.5">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>{risk.level}</span>
                      <p className={`text-[13px] font-bold ${c.head}`}>{risk.title}</p>
                    </div>
                    <p className={`text-xs leading-relaxed ${c.body}`}>{risk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* ─── KPI grid ──────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sa.kpis.map((kpi) => (
          <div key={kpi.label} className={`bg-white/90 rounded-2xl border shadow-sm p-4 ${kpi.good ? 'border-green-100' : 'border-amber-100'}`}>
            <p className="text-[10px] text-gray-400 mb-2 leading-tight">{kpi.label}</p>
            <p className={`text-xl font-extrabold mb-1 ${kpi.good ? 'text-green-700' : 'text-amber-600'}`}>{kpi.value}</p>
            <div className="flex items-center gap-1">
              <span className={`text-[9px] font-semibold ${kpi.good ? 'text-green-600' : 'text-amber-600'}`}>
                {kpi.good ? '✓ ضمن المعيار' : '⚠ يتجاوز'}
              </span>
            </div>
            <p className="text-[9px] text-gray-300 mt-0.5">معيار: {kpi.benchmark}</p>
          </div>
        ))}
      </div>

      {/* ─── AI Analysis section ───────────────────────── */}
      <GlassCard
        title="التحليل العميق بالذكاء الاصطناعي"
        subtitle="اختياري — يتم عند الطلب فقط لتقليل التكلفة"
        accent="purple"
        action={
          showAI
            ? <button onClick={() => setShowAI(false)} className="text-xs text-gray-400 hover:text-gray-600">إخفاء التقرير</button>
            : undefined
        }
      >
        {!showAI ? (
          <div className="flex flex-col items-center py-8">
            {/* Illustration */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-4xl mb-5 shadow-sm">
              🤖
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-2">تحليل عميق بالذكاء الاصطناعي</h3>
            <p className="text-sm text-gray-500 text-center max-w-lg leading-relaxed mb-2">
              سيتم تصدير بيانات الدورة الزراعية الكاملة (الإنتاج، التكاليف، الري، الكهرباء، الأمراض)
              وتحليلها بالذكاء الاصطناعي للحصول على توصيات متخصصة.
            </p>
            <p className="text-[11px] text-purple-600 bg-purple-50 border border-purple-100 rounded-full px-3 py-1 mb-6">
              💡 لا يعمل تلقائياً — فقط عند الضغط على الزر
            </p>
            <ActionButton
              onClick={triggerAI}
              disabled={loading}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg rounded-2xl"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  جارٍ تحليل البيانات...
                </span>
              ) : (
                <span className="flex items-center gap-2">🤖 تصدير للتحليل العميق</span>
              )}
            </ActionButton>
            <p className="text-[10px] text-gray-400 mt-3">التحليل يستغرق 30–60 ثانية</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Report header */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">🤖</div>
              <div>
                <p className="font-bold text-gray-800">تقرير الذكاء الاصطناعي</p>
                <p className="text-xs text-gray-400">تحليل دورة الخيار — بيت محمي رقم 7 | {new Date().toLocaleDateString('ar-SA')}</p>
              </div>
              <div className="mr-auto flex items-center gap-2">
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">مكتمل</span>
                <ActionButton variant="secondary" size="sm" icon="📥">تحميل PDF</ActionButton>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl">
              <p className="text-xs font-bold text-purple-700 mb-2 flex items-center gap-1.5"><span>📋</span>الملخص التنفيذي</p>
              <p className="text-sm text-purple-800 leading-relaxed">{sa.aiReport.summary}</p>
            </div>

            {/* Weak + Strong */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                <p className="text-xs font-bold text-red-700 mb-3 flex items-center gap-1.5"><span>📉</span>أسباب الضعف</p>
                <ul className="space-y-2">
                  {sa.aiReport.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-red-700">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-red-200 text-red-700 text-[9px] font-bold flex items-center justify-center mt-0.5">{i+1}</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-green-50 border border-green-100 rounded-2xl">
                <p className="text-xs font-bold text-green-700 mb-3 flex items-center gap-1.5"><span>📈</span>نقاط القوة</p>
                <ul className="space-y-2">
                  {sa.aiReport.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-green-700">
                      <span className="flex-shrink-0 mt-0.5 text-green-500">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
              <p className="text-xs font-bold text-blue-700 mb-3 flex items-center gap-1.5"><span>💡</span>التوصيات</p>
              <div className="space-y-2.5">
                {sa.aiReport.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 bg-white/60 rounded-xl">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-[10px] font-bold flex items-center justify-center">{i+1}</span>
                    <p className="text-xs text-blue-800 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next season */}
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
              <p className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-1.5"><span>🌱</span>خطة الموسم القادم</p>
              <p className="text-sm text-amber-800 leading-relaxed">{sa.aiReport.nextSeason}</p>
            </div>

            <AlertCard level="success" title="تم حفظ التقرير" desc="تم حفظ تقرير الذكاء الاصطناعي في سجل الدورة الزراعية ويمكن الرجوع إليه في أي وقت." />
          </div>
        )}
      </GlassCard>
    </PageContainer>
  );
}
