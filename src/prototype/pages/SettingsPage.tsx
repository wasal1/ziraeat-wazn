import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import { systemUsers, farmSettings, notificationSettings, PLATFORM } from '../data/mockData';

const TABS = ['إعدادات المزرعة', 'المستخدمون والصلاحيات', 'التنبيهات', 'النظام'];

const ROLE_COLOR: Record<string, string> = {
  'مدير المنصة': 'bg-purple-100 text-purple-700',
  'مشرف مزرعة': 'bg-green-100 text-green-700',
  'محاسب':       'bg-sky-100 text-sky-700',
  'فني ري':      'bg-blue-100 text-blue-700',
  'مشاهدة فقط': 'bg-gray-100 text-gray-500',
};

const PERM_LABEL: Record<string, string> = {
  all: 'كامل', farms: 'المزارع', operations: 'العمليات', harvest: 'الحصاد',
  accounting: 'المحاسبة', sales: 'المبيعات', expenses: 'المصروفات',
  irrigation: 'الري', dashboard: 'الرئيسية', reports: 'التقارير',
};

function Toggle({ checked }: { checked: boolean }) {
  const [on, setOn] = useState(checked);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${on ? 'bg-green-500' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${on ? '-translate-x-6' : '-translate-x-1'}`} />
    </button>
  );
}

function Field({ label, value, type = 'text' }: { label: string; value: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <input
        type={type} defaultValue={value}
        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
      />
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState('إعدادات المزرعة');

  return (
    <PageContainer>
      <SectionHeader
        title="الإعدادات"
        subtitle="إعدادات المنصة والمستخدمين والتنبيهات"
        action={<ActionButton size="sm" icon="💾">حفظ التغييرات</ActionButton>}
      />

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100/70 backdrop-blur-sm rounded-xl p-1 w-fit flex-wrap">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${tab === t ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >{t}</button>
        ))}
      </div>

      {/* ─── إعدادات المزرعة ─── */}
      {tab === 'إعدادات المزرعة' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GlassCard title="بيانات المزرعة الرئيسية" accent="green">
            <div className="space-y-4">
              <Field label="اسم المزرعة (عربي)"   value={farmSettings.name} />
              <Field label="اسم المزرعة (إنجليزي)" value={farmSettings.nameEn} />
              <Field label="الموقع"                value={farmSettings.location} />
              <Field label="المساحة الإجمالية"     value={farmSettings.area} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="رقم الجوال"          value={farmSettings.phone}  type="tel" />
                <Field label="البريد الإلكتروني"   value={farmSettings.email}  type="email" />
              </div>
            </div>
          </GlassCard>

          <div className="space-y-5">
            <GlassCard title="الترخيص والتسجيل" accent="sky">
              <div className="space-y-4">
                <Field label="رقم الترخيص الزراعي"   value={farmSettings.licenseNo} />
                <Field label="تاريخ التأسيس"          value={farmSettings.established} type="date" />
              </div>
              <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <p className="text-sm font-semibold text-green-700">الترخيص ساري ومفعّل</p>
                    <p className="text-xs text-green-500">ينتهي في: 2027-03-15</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard title="تفضيلات النظام" accent="amber">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">المنطقة الزمنية</label>
                  <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400">
                    <option>Asia/Riyadh (توقيت الرياض)</option>
                    <option>Asia/Dubai</option>
                    <option>Africa/Cairo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">العملة</label>
                  <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400">
                    <option>ريال سعودي (SAR)</option>
                    <option>درهم إماراتي (AED)</option>
                    <option>دولار أمريكي (USD)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">الوضع الليلي</p>
                    <p className="text-xs text-gray-400">تغيير مظهر المنصة</p>
                  </div>
                  <Toggle checked={false} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">عرض إحداثيات GPS</p>
                    <p className="text-xs text-gray-400">عرض الموقع الجغرافي</p>
                  </div>
                  <Toggle checked={true} />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* ─── المستخدمون والصلاحيات ─── */}
      {tab === 'المستخدمون والصلاحيات' && (
        <GlassCard title="إدارة المستخدمين" subtitle={`${systemUsers.length} مستخدمين`} accent="purple"
          action={<ActionButton size="sm" icon="➕">مستخدم جديد</ActionButton>}
        >
          <div className="space-y-3">
            {systemUsers.map((u) => (
              <div key={u.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-sm ${u.status === 'معطل' ? 'bg-gray-50/50 border-gray-200 opacity-70' : 'bg-white border-gray-100 hover:border-green-200'}`}>
                {/* Avatar */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-extrabold flex-shrink-0 shadow-sm ${u.status === 'معطل' ? 'bg-gray-200 text-gray-400' : 'bg-gradient-to-br from-green-400 to-emerald-600 text-white'}`}>
                  {u.name[0]}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <p className="font-bold text-gray-800 text-sm">{u.name}</p>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${ROLE_COLOR[u.role] ?? 'bg-gray-100 text-gray-600'}`}>{u.role}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {u.status === 'نشط' ? '🟢' : '⚪'} {u.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{u.email} — آخر دخول: {u.lastLogin}</p>

                  {/* Permissions */}
                  <div className="flex flex-wrap gap-1.5">
                    {u.permissions.map((p) => (
                      <span key={p} className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${p === 'all' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                        {PERM_LABEL[p] ?? p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 flex-shrink-0">
                  <button className="w-8 h-8 rounded-lg hover:bg-sky-50 flex items-center justify-center text-gray-400 hover:text-sky-600 transition-colors" title="تعديل">✏️</button>
                  <button className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors" title="حذف">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* ─── التنبيهات ─── */}
      {tab === 'التنبيهات' && (
        <GlassCard title="إعدادات التنبيهات" subtitle="تحكم في التنبيهات وقنوات الإرسال" accent="amber">
          <div className="space-y-2">
            {notificationSettings.map((n, i) => (
              <div key={n.id}>
                {i > 0 && <div className="border-t border-gray-50" />}
                <div className="flex items-center justify-between py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{n.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">القناة: {n.channel}</p>
                  </div>
                  <Toggle checked={n.enabled} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-3">قنوات التنبيه</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: '📱', name: 'تطبيق الجوال',  status: 'متصل',     color: 'border-green-200 bg-green-50' },
                { icon: '💬', name: 'واتساب',         status: '+966501234567', color: 'border-green-200 bg-green-50' },
                { icon: '📧', name: 'البريد الإلكتروني', status: farmSettings.email, color: 'border-sky-200 bg-sky-50' },
              ].map((ch) => (
                <div key={ch.name} className={`rounded-xl border p-3 ${ch.color}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{ch.icon}</span>
                    <p className="text-sm font-semibold text-gray-800">{ch.name}</p>
                  </div>
                  <p className="text-[11px] text-gray-500">{ch.status}</p>
                  <button className="mt-2 text-[10px] text-green-600 hover:underline font-medium">إدارة</button>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      )}

      {/* ─── النظام ─── */}
      {tab === 'النظام' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GlassCard title="معلومات النظام" accent="sky">
            <div className="space-y-3">
              {[
                { label: 'اسم المنصة',         value: PLATFORM.name },
                { label: 'الإصدار',             value: '2.4.1 (Build 2026.05)' },
                { label: 'نوع الاشتراك',        value: 'Enterprise — 3 مزارع' },
                { label: 'تاريخ الاشتراك',      value: '2024-01-01' },
                { label: 'تاريخ التجديد',       value: '2027-01-01' },
                { label: 'الشعار',               value: 'Anthropic AI' },
                { label: 'محرك قاعدة البيانات', value: 'PostgreSQL 16.2' },
                { label: 'آخر نسخة احتياطية',   value: '2026-05-15 03:00' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-500">{s.label}</span>
                  <span className="text-sm font-semibold text-gray-800">{s.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="space-y-5">
            <GlassCard title="استخدام النظام" accent="green">
              {[
                { label: 'التخزين المستخدم', used: 2.4, total: 10, unit: 'GB', color: 'bg-green-400' },
                { label: 'قاعدة البيانات',   used: 185, total: 500, unit: 'MB', color: 'bg-sky-400' },
                { label: 'الملفات المرفوعة', used: 1.1, total: 5,   unit: 'GB', color: 'bg-purple-400' },
              ].map((s) => (
                <div key={s.label} className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-500">{s.label}</span>
                    <span className="font-bold text-gray-700">{s.used} / {s.total} {s.unit}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${(s.used / s.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </GlassCard>

            <GlassCard title="إجراءات النظام" accent="red">
              <div className="space-y-3">
                {[
                  { label: 'نسخة احتياطية فورية',   icon: '💾', color: 'hover:bg-sky-50 hover:text-sky-700',    desc: 'حفظ نسخة من جميع البيانات الآن' },
                  { label: 'مسح الكاش والمؤقت',     icon: '🗑️', color: 'hover:bg-amber-50 hover:text-amber-700', desc: 'تحرير مساحة التخزين المؤقت' },
                  { label: 'تصدير كامل للبيانات',   icon: '📤', color: 'hover:bg-green-50 hover:text-green-700', desc: 'تصدير JSON أو Excel' },
                  { label: 'إعادة تعيين الإعدادات', icon: '⚠️', color: 'hover:bg-red-50 hover:text-red-700',     desc: 'استعادة الإعدادات الافتراضية' },
                ].map((action) => (
                  <button key={action.label} className={`w-full flex items-center gap-3 p-3 rounded-xl border border-gray-100 transition-all text-gray-500 ${action.color} text-right`}>
                    <span className="text-xl flex-shrink-0">{action.icon}</span>
                    <div className="text-right flex-1">
                      <p className="text-sm font-semibold text-gray-800">{action.label}</p>
                      <p className="text-[11px] text-gray-400">{action.desc}</p>
                    </div>
                    <span className="text-gray-300 flex-shrink-0">‹</span>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
