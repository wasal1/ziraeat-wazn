import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import {
  subscriptionPlans,
  currentSubscription,
  subscriptionInvoices,
  aiReportAddOns,
  moduleAccessMap,
  type PlanId,
} from '../data/mockData';
// ─── helpers ────────────────────────────────────────────

const STATUS_CFG: Record<string, { label: string; cls: string; icon: string }> = {
  active:    { label: 'نشط',       cls: 'bg-green-50 text-green-700 border-green-200',  icon: '✅' },
  trial:     { label: 'تجريبي',    cls: 'bg-sky-50 text-sky-700 border-sky-200',        icon: '🔬' },
  expired:   { label: 'منتهي',     cls: 'bg-red-50 text-red-700 border-red-200',        icon: '⛔' },
  suspended: { label: 'موقوف',     cls: 'bg-amber-50 text-amber-700 border-amber-200',  icon: '⚠️' },
};

const PLAN_COLOR: Record<string, string> = {
  green:  'from-green-500 to-emerald-600',
  sky:    'from-sky-500 to-blue-600',
  purple: 'from-purple-500 to-violet-600',
  amber:  'from-amber-500 to-orange-600',
};

const PLAN_RING: Record<string, string> = {
  green:  'ring-green-400',
  sky:    'ring-sky-400',
  purple: 'ring-purple-400',
  amber:  'ring-amber-400',
};

const PLAN_BG: Record<string, string> = {
  green:  'bg-green-50 border-green-200',
  sky:    'bg-sky-50 border-sky-200',
  purple: 'bg-purple-50 border-purple-200',
  amber:  'bg-amber-50 border-amber-200',
};

const PLAN_BTN: Record<string, string> = {
  green:  'bg-green-600 hover:bg-green-700',
  sky:    'bg-sky-600 hover:bg-sky-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
  amber:  'bg-amber-600 hover:bg-amber-700',
};

function fmtLimit(v: number | null) {
  return v === null ? 'غير محدود' : v.toLocaleString('ar-SA');
}

function UsageMeter({
  label, icon, used, limit,
}: { label: string; icon: string; used: number; limit: number | null; color: string }) {
  const pct   = limit ? Math.min((used / limit) * 100, 100) : 0;
  const over  = limit ? pct >= 85 : false;
  const bar   = pct < 60 ? 'bg-green-400' : pct < 85 ? 'bg-amber-400' : 'bg-red-400';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
        {over && <span className="text-[10px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-semibold">قريب من الحد</span>}
      </div>
      <div className="flex items-end gap-1 mb-2">
        <span className="text-3xl font-extrabold text-gray-800">{used}</span>
        <span className="text-sm text-gray-400 mb-1">/ {fmtLimit(limit)}</span>
      </div>
      {limit !== null ? (
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${bar}`} style={{ width: `${pct}%` }} />
        </div>
      ) : (
        <div className="h-2 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full" />
      )}
      <p className="text-[10px] text-gray-400 mt-1.5 text-left">
        {limit !== null ? `${Math.round(pct)}% مستخدم` : 'غير محدود'}
      </p>
    </div>
  );
}

export default function SubscriptionPage() {
  const TABS = ['نظرة عامة', 'مقارنة الباقات', 'الفواتير', 'الإضافات'];
  const [tab, setTab]       = useState('نظرة عامة');
  const [selected, setSelected] = useState<string | null>(null);

  const plan    = subscriptionPlans.find((p) => p.id === currentSubscription.planId)!;
  const status  = STATUS_CFG[currentSubscription.status];
  const u       = currentSubscription.usage;
  const planLimits = plan.limits;
  const totalAI = (planLimits.aiReports ?? 0) + u.aiReportsAddon;

  const daysUrgent = currentSubscription.daysRemaining <= 30;
  const modules    = moduleAccessMap[currentSubscription.planId as PlanId] ?? [];

  return (
    <PageContainer>
      <SectionHeader
        title="الاشتراك والباقات"
        subtitle="إدارة اشتراكك وتفاصيل الباقة"
        action={
          <div className="flex gap-2">
            <ActionButton variant="secondary" size="sm" icon="🔄">تجديد الاشتراك</ActionButton>
            <ActionButton size="sm" icon="⬆️">ترقية الباقة</ActionButton>
          </div>
        }
      />

      {/* ─── Current Plan Hero ──────────────────────── */}
      <div className={`relative overflow-hidden rounded-3xl p-6 text-white bg-gradient-to-l ${PLAN_COLOR[plan.accentClass]} shadow-xl`}>
        {/* bg pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,white,white 1px,transparent 1px,transparent 20px)' }} />
        <div className="absolute top-4 left-4 text-[100px] opacity-5 select-none">🌾</div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
          {/* Plan info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${status.cls}`}>
                {status.icon} {status.label}
              </span>
              {plan.badge && (
                <span className="text-xs bg-white/20 border border-white/30 px-2.5 py-1 rounded-full font-semibold">
                  {plan.badge}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-extrabold mb-1">{plan.name}</h2>
            <p className="text-white/70 text-sm">{plan.tagline}</p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[
              { label: 'تاريخ البدء',       value: currentSubscription.startDate },
              { label: 'تاريخ الانتهاء',    value: currentSubscription.endDate   },
              { label: 'الأيام المتبقية',   value: currentSubscription.daysRemaining + ' يوم', highlight: daysUrgent },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className={`text-xl font-extrabold ${item.highlight ? 'text-red-200' : 'text-white'}`}>
                  {item.value}
                </p>
                <p className="text-[11px] text-white/60 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="text-center bg-white/15 rounded-2xl px-6 py-4 border border-white/20">
            <p className="text-3xl font-extrabold">
              {plan.price !== null ? plan.price.toLocaleString('ar-SA') : 'مخصص'}
            </p>
            <p className="text-[11px] text-white/60 mt-0.5">
              {plan.price !== null ? 'ريال / سنة' : 'حسب الاتفاقية'}
            </p>
            <p className="text-[10px] text-white/50 mt-1">
              {currentSubscription.autoRenew ? 'تجديد تلقائي' : 'بدون تجديد تلقائي'}
            </p>
          </div>
        </div>

        {/* Expiry warning */}
        {daysUrgent && (
          <div className="relative z-10 mt-4 bg-red-500/30 border border-red-300/40 rounded-xl p-3 flex items-center gap-3">
            <span className="text-xl">🚨</span>
            <p className="text-sm font-semibold">
              اشتراكك ينتهي خلال {currentSubscription.daysRemaining} يوماً — جدد الآن لتجنب انقطاع الخدمة.
            </p>
            <button className="mr-auto text-xs bg-white text-red-700 font-bold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap">
              جدد الآن
            </button>
          </div>
        )}

        {/* Grace / Suspended info */}
        {currentSubscription.status === 'expired' && (
          <div className="relative z-10 mt-4 bg-amber-500/30 border border-amber-300/40 rounded-xl p-3 text-sm font-semibold">
            ⚠️ الاشتراك منتهٍ — حسابك في وضع القراءة فقط لمدة 15 يوماً. بعدها يُعلَّق الحساب مؤقتاً وتبقى بياناتك محفوظة حتى التجديد.
          </div>
        )}
      </div>

      {/* ─── Tabs ──────────────────────────────────────── */}
      <div className="flex gap-1 bg-gray-100/70 rounded-xl p-1 w-fit">
        {TABS.map((tb) => (
          <button key={tb} onClick={() => setTab(tb)}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${tab === tb ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >{tb}</button>
        ))}
      </div>

      {/* ════════════════ نظرة عامة ════════════════ */}
      {tab === 'نظرة عامة' && (
        <div className="space-y-5">
          {/* Usage meters */}
          <GlassCard title="استخدامك الحالي" subtitle="مقارنة بحدود باقتك" accent="green">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <UsageMeter label="المزارع"          icon="🌾" used={u.farms}        limit={planLimits.farms}        color="green"  />
              <UsageMeter label="المستخدمون"       icon="👤" used={u.users}        limit={planLimits.users}        color="sky"    />
              <UsageMeter label="الحقول"           icon="🗺️" used={u.fields}       limit={planLimits.fields}       color="amber"  />
              <UsageMeter label="البيوت المحمية"   icon="🏡" used={u.greenhouses}  limit={planLimits.greenhouses}  color="purple" />
              <UsageMeter label="الدورات النشطة"   icon="🔄" used={u.activeCycles} limit={planLimits.activeCycles} color="red"    />
              <UsageMeter label="تقارير الذكاء"    icon="🤖" used={u.aiReports}    limit={totalAI}                  color="blue"   />
            </div>

            {/* AI Reports detail */}
            <div className="mt-4 p-4 bg-purple-50 border border-purple-100 rounded-xl flex flex-wrap gap-4 items-center">
              <span className="text-2xl">🤖</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-purple-800">تقارير الذكاء الاصطناعي</p>
                <p className="text-xs text-purple-600 mt-0.5">
                  {u.aiReports} مستخدم من أصل {planLimits.aiReports} في الباقة + {u.aiReportsAddon} إضافي = {totalAI} إجمالي
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-full font-semibold">
                  {totalAI - u.aiReports} تقرير متبقٍ
                </span>
                <button
                  onClick={() => setTab('الإضافات')}
                  className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-full font-semibold hover:bg-purple-700 transition-colors"
                >
                  شراء المزيد
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Module access */}
          <GlassCard title="الوحدات المفعّلة" subtitle="وفق باقتك الحالية" accent="sky">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {modules.map((m) => (
                <div key={m} className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                  <span className="text-green-500 text-sm font-bold flex-shrink-0">✓</span>
                  <span className="text-xs text-gray-700 font-medium">{m}</span>
                </div>
              ))}
              {(plan.lockedModules ?? []).map((m) => (
                <div key={m} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 opacity-60">
                  <span className="text-gray-400 text-sm flex-shrink-0">🔒</span>
                  <span className="text-xs text-gray-400 font-medium">{m}</span>
                </div>
              ))}
            </div>
            {(plan.lockedModules ?? []).length > 0 && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-3">
                <span className="text-lg">⬆️</span>
                <p className="text-xs text-amber-700 font-medium flex-1">
                  {plan.lockedModules!.length} وحدة غير مفعّلة في باقتك
                </p>
                <button
                  onClick={() => setTab('مقارنة الباقات')}
                  className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-amber-700 transition-colors whitespace-nowrap"
                >
                  مقارنة الباقات
                </button>
              </div>
            )}
          </GlassCard>

          {/* Quick invoice summary */}
          <GlassCard title="آخر الفواتير" subtitle="سجل المدفوعات" accent="amber"
            action={<button onClick={() => setTab('الفواتير')} className="text-xs text-green-600 font-semibold hover:text-green-800">عرض الكل ←</button>}
          >
            <div className="space-y-2">
              {subscriptionInvoices.slice(0, 3).map((inv) => (
                <div key={inv.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-lg">🧾</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{inv.plan}</p>
                    <p className="text-[11px] text-gray-400">{inv.date} · {inv.method}</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <p className="text-sm font-bold text-gray-800">{inv.amount.toLocaleString('ar-SA')} ريال</p>
                    <span className="text-[10px] bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full">{inv.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* ════════════════ مقارنة الباقات ════════════════ */}
      {tab === 'مقارنة الباقات' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {subscriptionPlans.map((p) => {
              const isCurrent = p.id === currentSubscription.planId;
              const isSelected = selected === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelected(isSelected ? null : p.id)}
                  className={`relative flex flex-col rounded-3xl border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-xl
                    ${isCurrent ? `${PLAN_BG[p.accentClass]} ring-2 ${PLAN_RING[p.accentClass]}` : 'bg-white border-gray-100 hover:border-gray-300'}
                    ${isSelected ? `ring-2 ${PLAN_RING[p.accentClass]}` : ''}
                  `}
                >
                  {/* Badge */}
                  {p.badge && (
                    <div className={`absolute -top-3 right-1/2 translate-x-1/2 text-[11px] font-bold px-3 py-1 rounded-full text-white bg-gradient-to-l ${PLAN_COLOR[p.accentClass]} shadow-md whitespace-nowrap`}>
                      {p.badge}
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute -top-3 left-4 text-[11px] font-bold px-3 py-1 rounded-full bg-green-600 text-white shadow-md whitespace-nowrap">
                      باقتك الحالية
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${PLAN_COLOR[p.accentClass]} flex items-center justify-center mb-3 shadow-lg`}>
                      <span className="text-2xl text-white">
                        {p.id === 'starter' ? '🌱' : p.id === 'professional' ? '🌿' : p.id === 'company' ? '🌾' : '🏢'}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-gray-800 text-[15px] leading-tight mb-1">{p.name}</h3>
                    <p className="text-xs text-gray-500">{p.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-5 pb-5 border-b border-gray-100">
                    {p.price !== null ? (
                      <div>
                        <span className="text-4xl font-extrabold text-gray-800">{p.price.toLocaleString('ar-SA')}</span>
                        <span className="text-sm text-gray-500 mr-1">ريال / سنة</span>
                        <p className="text-[11px] text-gray-400 mt-1">≈ {Math.round(p.price / 12).toLocaleString('ar-SA')} ريال / شهر</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-extrabold text-amber-600">مخصص</span>
                        <p className="text-[11px] text-gray-400 mt-1">حسب الاتفاقية</p>
                      </div>
                    )}
                  </div>

                  {/* Limits */}
                  <div className="mb-5 space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">الحدود</p>
                    {[
                      { icon: '🌾', label: 'مزارع',         val: p.limits.farms        },
                      { icon: '👤', label: 'مستخدمين',      val: p.limits.users        },
                      { icon: '🗺️', label: 'حقول',          val: p.limits.fields       },
                      { icon: '🏡', label: 'بيوت محمية',    val: p.limits.greenhouses  },
                      { icon: '🔄', label: 'دورات نشطة',    val: p.limits.activeCycles },
                      { icon: '🤖', label: 'تقارير ذكاء',   val: p.limits.aiReports    },
                    ].map((lim) => (
                      <div key={lim.label} className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{lim.icon} {lim.label}</span>
                        <span className="font-bold text-gray-800">{fmtLimit(lim.val)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex-1 space-y-1.5 mb-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">المميزات</p>
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <span className={`mt-0.5 text-[10px] font-bold flex-shrink-0`}
                          style={{ color: p.color }}>✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  {isCurrent ? (
                    <div className="w-full py-2.5 text-center text-sm font-bold rounded-xl border-2 border-current text-gray-500 border-gray-200">
                      باقتك الحالية
                    </div>
                  ) : p.price === null ? (
                    <button className={`w-full py-2.5 text-white text-sm font-bold rounded-xl transition-colors ${PLAN_BTN[p.accentClass]}`}>
                      تواصل معنا
                    </button>
                  ) : (
                    <button className={`w-full py-2.5 text-white text-sm font-bold rounded-xl transition-colors ${PLAN_BTN[p.accentClass]}`}>
                      {subscriptionPlans.findIndex((x) => x.id === p.id) >
                       subscriptionPlans.findIndex((x) => x.id === currentSubscription.planId)
                        ? 'ترقية إلى هذه الباقة' : 'الرجوع لهذه الباقة'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Feature comparison table */}
          <GlassCard title="جدول مقارنة تفصيلي" subtitle="جميع المميزات" accent="purple">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 pr-3 text-right text-xs font-semibold text-gray-400">الميزة</th>
                    {subscriptionPlans.map((p) => (
                      <th key={p.id} className="pb-3 px-3 text-center text-xs font-semibold whitespace-nowrap"
                        style={{ color: p.color }}>
                        {p.id === currentSubscription.planId ? '⭐ ' : ''}{p.name.replace('السنوية', '').trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { label: 'المزارع',                 starter: '1',          professional: '3',         company: '10',         enterprise: 'غير محدود' },
                    { label: 'المستخدمون',              starter: '3',          professional: '10',        company: '30',         enterprise: 'غير محدود' },
                    { label: 'البيوت المحمية',          starter: '5',          professional: '30',        company: '150',        enterprise: 'غير محدود' },
                    { label: 'الدورات الزراعية النشطة', starter: '10',         professional: '50',        company: '250',        enterprise: 'غير محدود' },
                    { label: 'الحساسات والقراءات',      starter: '—',          professional: 'حتى 10',    company: 'غير محدود',  enterprise: 'غير محدود' },
                    { label: 'الكاميرات والمراقبة',     starter: '—',          professional: 'حتى 4',     company: 'غير محدود',  enterprise: 'غير محدود' },
                    { label: 'الري الكهربائي والمضخات', starter: '—',          professional: 'حتى 5',     company: 'غير محدود',  enterprise: 'غير محدود' },
                    { label: 'التحليل الذكي (AI)',       starter: '—',          professional: '10/سنة',    company: '40/سنة',     enterprise: 'غير محدود' },
                    { label: 'إدارة المخزون',           starter: '—',          professional: '✓',         company: '✓',          enterprise: '✓'         },
                    { label: 'إدارة العمال',            starter: '—',          professional: '✓',         company: '✓',          enterprise: '✓'         },
                    { label: 'تصدير PDF / Excel',       starter: '—',          professional: '✓',         company: '✓',          enterprise: '✓'         },
                    { label: 'لوحات متعددة المزارع',    starter: '—',          professional: '—',         company: '✓',          enterprise: '✓'         },
                    { label: 'مقارنة المزارع',          starter: '—',          professional: '—',         company: '✓',          enterprise: '✓'         },
                    { label: 'شعار مخصص في التقارير',   starter: '—',          professional: '—',         company: '✓',          enterprise: '✓'         },
                    { label: 'دعم أولوية',              starter: '—',          professional: '—',         company: '✓',          enterprise: '✓'         },
                    { label: 'مدير حساب مخصص',         starter: '—',          professional: '—',         company: '—',          enterprise: '✓'         },
                    { label: 'تكاملات مخصصة',          starter: '—',          professional: '—',         company: '—',          enterprise: '✓'         },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 pr-3 text-gray-600 font-medium whitespace-nowrap">{row.label}</td>
                      {(['starter', 'professional', 'company', 'enterprise'] as const).map((pid) => {
                        const val = row[pid];
                        const p   = subscriptionPlans.find((x) => x.id === pid)!;
                        const isC = pid === currentSubscription.planId;
                        return (
                          <td key={pid} className={`py-3 px-3 text-center whitespace-nowrap ${isC ? 'bg-green-50/40' : ''}`}>
                            {val === '✓' ? (
                              <span className="font-bold" style={{ color: p.color }}>✓</span>
                            ) : val === '—' ? (
                              <span className="text-gray-300 text-lg">—</span>
                            ) : (
                              <span className={`text-xs font-semibold ${isC ? 'text-green-700' : 'text-gray-700'}`}>{val}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ════════════════ الفواتير ════════════════ */}
      {tab === 'الفواتير' && (
        <GlassCard title="سجل الفواتير" subtitle={`${subscriptionInvoices.length} فاتورة`} accent="amber"
          action={<ActionButton size="sm" icon="📥" variant="secondary">تصدير Excel</ActionButton>}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['رقم الفاتورة', 'التاريخ', 'الخدمة', 'طريقة الدفع', 'المبلغ', 'الحالة', ''].map((h) => (
                    <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subscriptionInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 pr-3 font-mono text-xs text-gray-500 whitespace-nowrap">{inv.id}</td>
                    <td className="py-3 pr-3 text-gray-600 whitespace-nowrap">{inv.date}</td>
                    <td className="py-3 pr-3 font-semibold text-gray-800">{inv.plan}</td>
                    <td className="py-3 pr-3 text-gray-500 whitespace-nowrap">{inv.method}</td>
                    <td className="py-3 pr-3 font-bold text-gray-800 whitespace-nowrap">
                      {inv.amount.toLocaleString('ar-SA')} ريال
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full font-medium">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <button className="text-xs text-sky-600 hover:text-sky-800 font-semibold">📄 PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200">
                  <td colSpan={4} className="pt-3 pr-3 text-xs font-semibold text-gray-500">الإجمالي</td>
                  <td className="pt-3 pr-3 font-extrabold text-gray-800">
                    {subscriptionInvoices.reduce((s, i) => s + i.amount, 0).toLocaleString('ar-SA')} ريال
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment methods */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-3">طرق الدفع المحفوظة</p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: '💳', label: 'Visa ****4523', default: true  },
                { icon: '🏦', label: 'تحويل بنكي — IBAN محفوظ', default: false },
              ].map((pm) => (
                <div key={pm.label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${pm.default ? 'bg-green-50 border-green-200 text-green-800' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  <span className="text-xl">{pm.icon}</span>
                  <span>{pm.label}</span>
                  {pm.default && <span className="text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded-full font-bold">افتراضي</span>}
                </div>
              ))}
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-green-300 hover:text-green-600 transition-colors">
                <span>+</span> إضافة طريقة دفع
              </button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* ════════════════ الإضافات ════════════════ */}
      {tab === 'الإضافات' && (
        <div className="space-y-5">
          {/* AI reports add-ons */}
          <GlassCard title="إضافات تقارير الذكاء الاصطناعي" subtitle="اشترِ تقارير إضافية بأي وقت" accent="purple">
            <div className="mb-4 p-4 bg-purple-50 border border-purple-100 rounded-xl flex items-center gap-4">
              <span className="text-3xl">🤖</span>
              <div>
                <p className="text-sm font-bold text-purple-800">رصيدك الحالي من تقارير الذكاء الاصطناعي</p>
                <p className="text-xs text-purple-600 mt-0.5">
                  {totalAI - u.aiReports} تقرير متبقٍ من أصل {totalAI} (الباقة + الإضافات)
                </p>
              </div>
              <div className="mr-auto text-left">
                <p className="text-2xl font-extrabold text-purple-700">{totalAI - u.aiReports}</p>
                <p className="text-[10px] text-purple-400">متبقي</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiReportAddOns.map((addon) => (
                <div key={addon.id}
                  className={`relative rounded-2xl border-2 p-5 text-center transition-all cursor-pointer hover:shadow-lg
                    ${addon.popular ? 'border-purple-400 bg-purple-50 ring-2 ring-purple-300' : 'border-gray-100 bg-white hover:border-purple-200'}`}
                >
                  {addon.popular && (
                    <div className="absolute -top-3 right-1/2 translate-x-1/2 text-[11px] font-bold px-3 py-1 rounded-full bg-purple-600 text-white shadow-md whitespace-nowrap">
                      الأكثر طلباً
                    </div>
                  )}
                  <div className="text-4xl mb-3">🤖</div>
                  <p className="font-extrabold text-gray-800 text-lg mb-1">{addon.reports}</p>
                  <p className="text-xs text-gray-500 mb-3">تقرير إضافي</p>
                  <p className="text-2xl font-extrabold text-purple-700 mb-1">{addon.price.toLocaleString('ar-SA')}</p>
                  <p className="text-xs text-gray-400 mb-4">ريال (دفعة واحدة)</p>
                  <p className="text-[10px] text-gray-400 mb-4">
                    ≈ {Math.round(addon.price / addon.reports)} ريال / تقرير
                  </p>
                  <button className={`w-full py-2 text-sm font-bold rounded-xl text-white transition-colors
                    ${addon.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-800'}`}>
                    شراء الآن
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                💡 <strong>ملاحظة:</strong> تقارير الذكاء الاصطناعي الإضافية لا تنتهي بانتهاء الاشتراك السنوي — تبقى مرتبطة بحسابك حتى استهلاكها.
                يمكنك شراء الإضافات في أي وقت دون الحاجة لترقية الباقة.
              </p>
            </div>
          </GlassCard>

          {/* Future add-ons */}
          <GlassCard title="إضافات قادمة" subtitle="قريباً" accent="amber">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: '📊', title: 'تقارير مخصصة',      desc: 'بناء تقارير بمعايير خاصة بك',  eta: 'الربع الثالث 2026' },
                { icon: '🔗', title: 'تكامل مع جهات خارجية', desc: 'ZATCA، وزارة البيئة، البنوك', eta: 'الربع الرابع 2026' },
                { icon: '📱', title: 'تطبيق الجوال',       desc: 'متابعة المزرعة من أي مكان',    eta: '2027' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 opacity-70">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-gray-700 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold mt-2 inline-block">
                      {item.eta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Grace period policy */}
          <GlassCard title="سياسة انتهاء الاشتراك" subtitle="ماذا يحدث عند انتهاء الاشتراك؟" accent="red">
            <div className="space-y-3">
              {[
                { day: 'عند انتهاء الاشتراك',     icon: '📅', color: 'text-amber-700 bg-amber-50 border-amber-100', desc: 'يتحول الحساب إلى وضع القراءة فقط لمدة 15 يوماً — يمكن الاطلاع على جميع البيانات دون إضافة أو تعديل.' },
                { day: 'بعد فترة السماح',          icon: '⏸️', color: 'text-red-700 bg-red-50 border-red-100',     desc: 'يتم تعليق الحساب مؤقتاً حتى تجديد الاشتراك. تبقى البيانات محفوظة وفق سياسة الاحتفاظ بالبيانات.' },
                { day: 'ضمان حفظ البيانات',        icon: '🔐', color: 'text-gray-700 bg-gray-50 border-gray-100',  desc: 'لا يتم التصرف في البيانات إلا وفق الشروط والأحكام وبعد إشعارات مسبقة كافية عبر البريد الإلكتروني والجوال.' },
                { day: 'استعادة الوصول الكامل',    icon: '✅', color: 'text-green-700 bg-green-50 border-green-100', desc: 'يعود الحساب فوراً لوضع النشاط الكامل مع جميع البيانات السابقة بمجرد تجديد الاشتراك في أي وقت.' },
              ].map((item) => (
                <div key={item.day} className={`flex items-start gap-4 p-4 rounded-xl border ${item.color}`}>
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-sm mb-1">{item.day}</p>
                    <p className="text-xs opacity-80 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-3">
              <span className="text-lg flex-shrink-0">💡</span>
              <p className="text-xs text-gray-500 leading-relaxed">
                تهدف هذه السياسة إلى حماية بيانات العميل ومنحه فرصة كافية للتجديد دون فقدان بياناته.
              </p>
            </div>
          </GlassCard>
        </div>
      )}
    </PageContainer>
  );
}
