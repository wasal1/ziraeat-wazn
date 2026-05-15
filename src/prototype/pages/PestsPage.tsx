import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';
import { pestIncidents, preventionCalendar, pestStats, pesticideUsed } from '../data/mockData';

const SEVERITY_CFG: Record<string, { bar: string; badge: string; icon: string }> = {
  'شديدة':  { bar: 'bg-red-400',   badge: 'bg-red-50 text-red-700 border-red-100',     icon: '🔴' },
  'متوسطة': { bar: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700 border-amber-100', icon: '🟡' },
  'خفيفة':  { bar: 'bg-sky-400',   badge: 'bg-sky-50 text-sky-700 border-sky-100',       icon: '🔵' },
};

const TYPE_CFG: Record<string, { color: string; icon: string }> = {
  مرض:   { color: 'bg-purple-50 text-purple-700 border-purple-100', icon: '🦠' },
  حشرة:  { color: 'bg-amber-50 text-amber-700 border-amber-100',    icon: '🐛' },
};

const PREVENTION_STATUS: Record<string, string> = {
  مكتمل: 'bg-green-100 text-green-700',
  مجدول: 'bg-gray-100 text-gray-500',
};

const TABS = ['الحوادث', 'المبيدات المستخدمة', 'جدول الوقاية'];

export default function PestsPage() {
  const [tab, setTab] = useState('الحوادث');
  const [severityFilter, setSeverityFilter] = useState('الكل');

  const severities = ['الكل', 'شديدة', 'متوسطة', 'خفيفة'];
  const filtered = pestIncidents.filter(
    (i) => severityFilter === 'الكل' || i.severity === severityFilter,
  );

  const active   = pestIncidents.filter((i) => i.status !== 'منتهية').length;
  const resolved = pestIncidents.filter((i) => i.status === 'منتهية').length;
  const totalPesticideCost = pesticideUsed.reduce((s, p) => s + p.cost, 0);

  return (
    <PageContainer>
      <SectionHeader
        title="الأمراض والآفات"
        subtitle="رصد الحوادث والعلاج والوقاية"
        action={<ActionButton size="sm" icon="➕">تسجيل حادثة</ActionButton>}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="حوادث نشطة"           value={active}                              unit=""      icon="🚨" color="red"    />
        <StatCard label="تم علاجها هذا الشهر"  value={resolved}                            unit=""      icon="✅" color="green"  />
        <StatCard label="بيوت متأثرة"           value={pestStats.affectedGreenhouses}       unit=""      icon="🏠" color="amber"  />
        <StatCard label="تكلفة العلاج / شهر"    value={totalPesticideCost}                 unit="ريال"  icon="💊" color="purple" />
      </div>

      {/* Risk Map */}
      <GlassCard title="خريطة المخاطر — البيوت المحمية" accent="red">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { name: 'بيت 1',  risk: 'منخفض',   crop: 'خيار'  },
            { name: 'بيت 2',  risk: 'عالٍ',     crop: 'خيار'  },
            { name: 'بيت 3',  risk: 'متوسط',   crop: 'فلفل'  },
            { name: 'بيت 5',  risk: 'منخفض',   crop: 'طماطم' },
            { name: 'بيت 7',  risk: 'متوسط',   crop: 'خيار'  },
            { name: 'بيت 12', risk: 'منخفض',   crop: 'طماطم' },
          ].map((gh) => {
            const cfg = {
              'عالٍ':   { bg: 'bg-red-100 border-red-300',     dot: 'bg-red-500',   text: 'text-red-700'   },
              'متوسط':  { bg: 'bg-amber-50 border-amber-200',  dot: 'bg-amber-400', text: 'text-amber-700' },
              'منخفض':  { bg: 'bg-green-50 border-green-200',  dot: 'bg-green-400', text: 'text-green-700' },
            }[gh.risk] ?? { bg: '', dot: '', text: '' };
            return (
              <div key={gh.name} className={`rounded-xl p-3 border text-center ${cfg.bg}`}>
                <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot} mx-auto mb-2`} />
                <p className="text-xs font-bold text-gray-800">{gh.name}</p>
                <p className="text-[10px] text-gray-400">{gh.crop}</p>
                <p className={`text-[10px] font-semibold mt-1 ${cfg.text}`}>{gh.risk}</p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          {[['bg-red-500','عالٍ'],['bg-amber-400','متوسط'],['bg-green-400','منخفض']].map(([c,l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${c}`} />
              {l}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100/70 rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${tab === t ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >{t}</button>
        ))}
      </div>

      {/* ─── الحوادث ─── */}
      {tab === 'الحوادث' && (
        <GlassCard title="سجل الحوادث" subtitle={`${filtered.length} حادثة`} accent="red"
          action={
            <div className="flex gap-1">
              {severities.map((s) => (
                <button key={s} onClick={() => setSeverityFilter(s)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${severityFilter === s ? 'bg-red-100 text-red-700 font-semibold' : 'text-gray-400 hover:bg-gray-100'}`}
                >{s}</button>
              ))}
            </div>
          }
        >
          <div className="space-y-3">
            {filtered.map((inc) => {
              const sv = SEVERITY_CFG[inc.severity] ?? SEVERITY_CFG['خفيفة'];
              const tp = TYPE_CFG[inc.type] ?? TYPE_CFG['مرض'];
              return (
                <div key={inc.id} className="bg-gray-50/70 rounded-xl p-4 border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    {/* Type icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${tp.color.split(' ')[0]} border ${tp.color.split(' ')[2]}`}>
                      {tp.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-gray-800 text-sm">{inc.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tp.color}`}>{inc.type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${sv.badge}`}>{sv.icon} {inc.severity}</span>
                        <StatusBadge status={inc.status} size="xs" />
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-500">
                        <span>🏠 {inc.greenhouse}</span>
                        <span>🌿 {inc.crop}</span>
                        <span>📅 {inc.date}</span>
                        <span>📊 المتأثر: <span className="font-semibold text-red-600">{inc.affected}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-500">
                    <div><span className="font-medium text-gray-600">العلاج:</span> {inc.treatment}</div>
                    <div><span className="font-medium text-gray-600">العامل:</span> {inc.worker}</div>
                    <div><span className="font-medium text-gray-600">متابعة:</span> {inc.followup}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      {/* ─── المبيدات المستخدمة ─── */}
      {tab === 'المبيدات المستخدمة' && (
        <GlassCard title="المبيدات المستخدمة هذا الشهر" accent="purple"
          action={<span className="text-xs text-gray-400">إجمالي: {totalPesticideCost} ريال</span>}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['اسم المبيد', 'الكمية', 'التكلفة', 'النوع', 'الهدف'].map((h) => (
                    <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pesticideUsed.map((p) => (
                  <tr key={p.name} className="hover:bg-gray-50/60">
                    <td className="py-3 pr-3 font-semibold text-gray-800">{p.name}</td>
                    <td className="py-3 pr-3 text-gray-600">{p.qty} {p.unit}</td>
                    <td className="py-3 pr-3 font-bold text-red-600">{p.cost} ريال</td>
                    <td className="py-3 pr-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                        p.type === 'بيولوجي' ? 'bg-green-50 text-green-700 border-green-100' :
                        p.type === 'وقائي'   ? 'bg-sky-50 text-sky-700 border-sky-100' :
                        p.type === 'فطري'    ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                               'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>{p.type}</span>
                    </td>
                    <td className="py-3 pr-3 text-gray-500 text-xs">{p.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* ─── جدول الوقاية ─── */}
      {tab === 'جدول الوقاية' && (
        <GlassCard title="جدول الوقاية الدوري" subtitle="الموسم الحالي" accent="sky">
          <div className="space-y-3">
            {preventionCalendar.map((w, i) => (
              <div key={w.week}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  w.status === 'مكتمل' ? 'bg-green-50/50 border-green-100' : 'bg-gray-50 border-gray-100 hover:bg-white'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold flex-shrink-0 ${
                  w.status === 'مكتمل' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm">{w.task}</p>
                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                    <span>🧴 {w.material}</span>
                    {w.dose !== '—' && <span>💊 {w.dose}</span>}
                    <span>📅 {w.week}</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0 ${PREVENTION_STATUS[w.status]}`}>
                  {w.status === 'مكتمل' ? '✅' : '⏳'} {w.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-center">
            <div className="bg-green-50 rounded-xl py-3">
              <p className="text-xl font-extrabold text-green-700">{preventionCalendar.filter((w) => w.status === 'مكتمل').length}</p>
              <p className="text-xs text-gray-400">مهام مكتملة</p>
            </div>
            <div className="bg-gray-50 rounded-xl py-3">
              <p className="text-xl font-extrabold text-gray-600">{preventionCalendar.filter((w) => w.status === 'مجدول').length}</p>
              <p className="text-xs text-gray-400">مهام مجدولة</p>
            </div>
          </div>
        </GlassCard>
      )}
    </PageContainer>
  );
}
