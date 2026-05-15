import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { smartAnalysis } from '../data/mockData';

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600';
  return (
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="40" fill="none" stroke={score >= 80 ? '#16a34a' : score >= 60 ? '#f59e0b' : '#ef4444'}
            strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 251.2} 251.2`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${color}`}>{score}%</span>
          <span className="text-xs text-gray-400">أداء</span>
        </div>
      </div>
    </div>
  );
}

function MetricLine({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`flex items-center gap-1.5 text-sm font-medium ${good ? 'text-green-700' : 'text-amber-600'}`}>
        <span>{good ? '✅' : '⚠️'}</span>
        {value}
      </span>
    </div>
  );
}

export default function SmartAnalysisPage() {
  const [showAI, setShowAI] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const sa = smartAnalysis;

  const handleExportAI = () => {
    setLoadingAI(true);
    setTimeout(() => {
      setLoadingAI(false);
      setShowAI(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="التحليل الذكي"
        subtitle="تحليل داخلي متقدم وإمكانية التحليل العميق بالذكاء الاصطناعي"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Internal Analysis */}
        <GlassCard title="درجة أداء الدورة" className="col-span-1">
          <ScoreGauge score={sa.performanceScore} />
          <div className="mt-4">
            <MetricLine label="مستوى المخاطر" value={sa.riskLevel} good={sa.riskLevel === 'منخفض'} />
            <MetricLine label="الربحية" value={sa.profitability} good={true} />
            <MetricLine label="كفاءة المياه" value={sa.waterEfficiency} good={true} />
            <MetricLine label="كفاءة الكهرباء" value={sa.electricityEfficiency} good={false} />
          </div>
        </GlassCard>

        {/* Risk Indicators */}
        <GlassCard title="مؤشرات المخاطر" className="col-span-2">
          <div className="space-y-3">
            {sa.risks.map((risk, i) => (
              <div key={i} className={`p-4 rounded-xl border ${
                risk.level === 'خطر' ? 'bg-red-50 border-red-200' :
                risk.level === 'تحذير' ? 'bg-amber-50 border-amber-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">
                    {risk.level === 'خطر' ? '🚨' : risk.level === 'تحذير' ? '⚠️' : 'ℹ️'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        risk.level === 'خطر' ? 'bg-red-200 text-red-800' :
                        risk.level === 'تحذير' ? 'bg-amber-200 text-amber-800' :
                        'bg-blue-200 text-blue-800'
                      }`}>{risk.level}</span>
                      <span className="font-semibold text-gray-800 text-sm">{risk.title}</span>
                    </div>
                    <p className="text-xs text-gray-600">{risk.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'تكلفة الكهرباء / كجم', value: '0.43 ريال', benchmark: '0.35 ريال', good: false },
          { label: 'استهلاك المياه / كجم', value: '0.044 م³', benchmark: '0.05 م³', good: true },
          { label: 'تكلفة الكيلو', value: '1.65 ريال', benchmark: '2.00 ريال', good: true },
          { label: 'إنتاج النبات / يوم', value: '0.30 كجم', benchmark: '0.28 كجم', good: true },
        ].map((kpi) => (
          <div key={kpi.label} className={`glass-card rounded-2xl p-4 border ${kpi.good ? 'border-green-100' : 'border-amber-100'}`}>
            <p className="text-xs text-gray-500 mb-2">{kpi.label}</p>
            <p className={`text-xl font-bold mb-1 ${kpi.good ? 'text-green-700' : 'text-amber-600'}`}>{kpi.value}</p>
            <p className="text-xs text-gray-400">المعيار: {kpi.benchmark}</p>
            <span className={`text-xs font-medium ${kpi.good ? 'text-green-600' : 'text-amber-600'}`}>
              {kpi.good ? '✓ ضمن المعيار' : '⚠ يتجاوز المعيار'}
            </span>
          </div>
        ))}
      </div>

      {/* AI Export section */}
      <GlassCard
        title="التحليل العميق بالذكاء الاصطناعي"
        subtitle="يتم التحليل عند الطلب فقط لتقليل التكلفة"
      >
        {!showAI ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-4xl mb-4">
              🤖
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">التحليل العميق بالذكاء الاصطناعي</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
              سيتم تصدير بيانات الدورة الزراعية الكاملة وتحليلها بواسطة الذكاء الاصطناعي للحصول على توصيات متقدمة وخطة تحسين الموسم القادم.
            </p>
            <button
              onClick={handleExportAI}
              disabled={loadingAI}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-70 text-sm"
            >
              {loadingAI ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  جارٍ تحليل البيانات...
                </span>
              ) : '🤖 تصدير للتحليل العميق بالذكاء الاصطناعي'}
            </button>
            <p className="text-xs text-gray-400 mt-3">التحليل يستغرق 30-60 ثانية</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-lg">🤖</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">تقرير الذكاء الاصطناعي</p>
                  <p className="text-xs text-gray-400">تم التحليل في {new Date().toLocaleDateString('ar-SA')}</p>
                </div>
              </div>
              <button onClick={() => setShowAI(false)} className="text-xs text-gray-400 hover:text-gray-600">إخفاء التقرير</button>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
              <h4 className="font-bold text-purple-800 mb-2 text-sm">📋 الملخص التنفيذي</h4>
              <p className="text-sm text-purple-700 leading-relaxed">{sa.aiReport.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                <h4 className="font-bold text-red-800 mb-3 text-sm">📉 أسباب الضعف</h4>
                <ul className="space-y-2">
                  {sa.aiReport.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-red-700">
                      <span className="flex-shrink-0 mt-0.5">•</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                <h4 className="font-bold text-green-800 mb-3 text-sm">📈 نقاط القوة</h4>
                <ul className="space-y-2">
                  {sa.aiReport.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-green-700">
                      <span className="flex-shrink-0 mt-0.5">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <h4 className="font-bold text-blue-800 mb-3 text-sm">💡 التوصيات</h4>
              <div className="space-y-2">
                {sa.aiReport.recommendations.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 bg-white/60 rounded-lg">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <p className="text-xs text-blue-700">{r}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <h4 className="font-bold text-amber-800 mb-2 text-sm">🌱 خطة الموسم القادم</h4>
              <p className="text-sm text-amber-700 leading-relaxed">{sa.aiReport.nextSeasonPlan}</p>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
