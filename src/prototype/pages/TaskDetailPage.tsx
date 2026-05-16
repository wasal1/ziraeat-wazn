import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import {
  sampleTaskDetail, taskConversation, taskAttachments,
  taskTypeConfig, taskStatusConfig, msgTypeConfig, attachmentTypeConfig,
} from '../data/mockData';

type Tab = 'details' | 'chat' | 'attachments' | 'log' | 'cost' | 'approval';

const PRIORITY_STYLE: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high:     'bg-orange-100 text-orange-700',
  medium:   'bg-amber-100 text-amber-700',
  low:      'bg-gray-100 text-gray-500',
};
const PRIORITY_LABEL: Record<string, string> = {
  critical: 'حرجة', high: 'عالية', medium: 'متوسطة', low: 'منخفضة',
};
const ATT_STYLE: Record<string, string> = {
  before:    'bg-blue-100 text-blue-700',
  after:     'bg-green-100 text-green-700',
  disease:   'bg-red-100 text-red-700',
  pest:      'bg-orange-100 text-orange-700',
  meter:     'bg-purple-100 text-purple-700',
  invoice:   'bg-amber-100 text-amber-700',
  equipment: 'bg-gray-100 text-gray-600',
  breakdown: 'bg-red-100 text-red-700',
  harvest:   'bg-emerald-100 text-emerald-700',
  document:  'bg-sky-100 text-sky-700',
  other:     'bg-gray-100 text-gray-600',
};
const LOG_STYLE: Record<string, string> = {
  create:   'bg-purple-100 text-purple-700',
  assign:   'bg-blue-100 text-blue-700',
  material: 'bg-amber-100 text-amber-700',
  start:    'bg-sky-100 text-sky-700',
  progress: 'bg-orange-100 text-orange-700',
  done:     'bg-green-100 text-green-700',
  review:   'bg-teal-100 text-teal-700',
  system:   'bg-gray-100 text-gray-500',
};
const LOG_ICON: Record<string, string> = {
  create: '➕', assign: '👷', material: '📦', start: '▶️',
  progress: '⏳', done: '✅', review: '🔍', system: '⚙️',
};
const MSG_BUBBLE: Record<string, string> = {
  approval:         'bg-green-50 border border-green-200',
  approval_request: 'bg-orange-50 border border-orange-200',
  rejection:        'bg-red-50 border border-red-200',
  redo_request:     'bg-amber-50 border border-amber-200',
  note:             'bg-blue-50 border border-blue-200',
};
const MSG_BADGE: Record<string, string> = {
  approval:         'bg-green-50 border-green-300 text-green-700',
  approval_request: 'bg-orange-50 border-orange-300 text-orange-700',
  rejection:        'bg-red-50 border-red-300 text-red-700',
  redo_request:     'bg-amber-50 border-amber-300 text-amber-700',
  note:             'bg-blue-50 border-blue-300 text-blue-700',
};

export default function TaskDetailPage({ onNav }: { onNav: (p: string) => void }) {
  const [tab, setTab] = useState<Tab>('chat');
  const [newMsg, setNewMsg] = useState('');
  const task = sampleTaskDetail;
  const typeCfg = taskTypeConfig[task.type];
  const statusCfg = taskStatusConfig[task.status];

  const TABS: { id: Tab; icon: string; label: string; badge?: number }[] = [
    { id: 'details',     icon: '📋', label: 'التفاصيل'     },
    { id: 'chat',        icon: '💬', label: 'المحادثة',   badge: taskConversation.length },
    { id: 'attachments', icon: '📎', label: 'المرفقات',   badge: taskAttachments.length  },
    { id: 'log',         icon: '🕐', label: 'سجل التنفيذ' },
    { id: 'cost',        icon: '💸', label: 'التكلفة'     },
    { id: 'approval',    icon: '✅', label: 'الاعتماد'    },
  ];

  return (
    <div className="space-y-4 md:space-y-5 animate-[fadeIn_0.2s_ease]">

      {/* Back + Header */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => onNav('dailyops')}
          className="flex-shrink-0 w-9 h-9 mt-1 rounded-xl bg-white/90 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors font-bold text-lg"
        >
          ›
        </button>
        <SectionHeader
          title={task.title}
          subtitle={`${task.farm} · ${task.cycle}`}
          action={
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[12px] font-semibold px-3 py-1.5 rounded-full ${PRIORITY_STYLE[task.priority]}`}>
                {PRIORITY_LABEL[task.priority]}
              </span>
              <span className={`text-[12px] font-semibold px-3 py-1.5 rounded-full ${statusCfg?.style ?? 'bg-gray-100 text-gray-600'}`}>
                {statusCfg?.label}
              </span>
            </div>
          }
        />
      </div>

      {/* Quick info row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'نوع المهمة',      value: `${typeCfg?.icon ?? ''} ${typeCfg?.label ?? task.type}` },
          { label: 'المنفذ',          value: task.participants.find((p) => p.role === 'العامل')?.name ?? '—' },
          { label: 'الموعد المجدول', value: task.scheduledTime },
          { label: 'التكلفة المقدرة', value: `${task.estimatedCost} ر.س` },
        ].map((info) => (
          <GlassCard key={info.label} className="text-center">
            <p className="text-[11px] text-gray-400 mb-0.5">{info.label}</p>
            <p className="font-bold text-gray-800 text-sm leading-tight">{info.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Participants */}
      <GlassCard>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">المشاركون في المهمة</p>
        <div className="flex flex-wrap gap-3">
          {task.participants.map((p) => (
            <div key={p.name} className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
              <div className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0`}>
                {p.initials}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-[13px] leading-tight">{p.name}</p>
                <p className="text-[11px] text-gray-400">{p.role}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-[12px] text-gray-400 self-center mr-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            جميع الرسائل مرتبطة بهذه المهمة
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${tab === t.id ? 'bg-green-600 text-white shadow-md' : 'bg-white/90 text-gray-600 border border-gray-200 hover:border-green-300 hover:bg-green-50'}`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
            {t.badge !== undefined && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab === t.id ? 'bg-white/25 text-white' : 'bg-green-100 text-green-700'}`}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ─── DETAILS ─── */}
      {tab === 'details' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard title="معلومات المهمة">
            <div className="divide-y divide-gray-100/80">
              {[
                { label: 'الدورة الزراعية', value: task.cycle },
                { label: 'المزرعة والحقل',  value: `${task.farm} — ${task.field}` },
                { label: 'تاريخ الإنشاء',   value: task.createdDate },
                { label: 'الموعد المجدول',  value: task.scheduledTime },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2.5 gap-3">
                  <span className="text-[12px] text-gray-500 flex-shrink-0">{row.label}</span>
                  <span className="text-[13px] font-medium text-gray-800 text-left">{row.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard title="التعليمات والمواصفات" accent="green">
            <p className="text-sm text-gray-700 leading-relaxed">{task.instructions}</p>
          </GlassCard>

          <GlassCard title="المواد المطلوبة" className="md:col-span-2" noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[400px]">
                <thead className="bg-gray-50/80">
                  <tr>
                    {['المادة', 'الكمية', 'الوحدة', 'التكلفة'].map((h) => (
                      <th key={h} className="text-right text-[12px] font-semibold text-gray-500 px-4 py-3 first:pr-5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/80">
                  {task.materials.map((m, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 pr-5 font-medium text-gray-800">{m.name}</td>
                      <td className="px-4 py-3 text-gray-600">{m.qty}</td>
                      <td className="px-4 py-3 text-gray-600">{m.unit}</td>
                      <td className="px-4 py-3 font-semibold text-green-700">{m.cost > 0 ? `${m.cost} ر.س` : '—'}</td>
                    </tr>
                  ))}
                  <tr className="bg-green-50/60">
                    <td colSpan={3} className="px-4 py-3 pr-5 font-bold text-gray-800">الإجمالي المقدر</td>
                    <td className="px-4 py-3 font-bold text-green-700 text-base">{task.estimatedCost} ر.س</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─── CHAT ─── */}
      {tab === 'chat' && (
        <GlassCard noPadding>
          {/* Chat header */}
          <div className="px-4 py-3 bg-gradient-to-l from-green-50/50 to-transparent border-b border-gray-100/80 flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-gray-800 text-[13px]">سجل محادثة المهمة</p>
              <p className="text-[11px] text-gray-400">كل رسالة محفوظة توثيقاً دائماً في سجل المهمة</p>
            </div>
            <span className="text-[11px] bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full flex-shrink-0">
              {taskConversation.length} رسالة
            </span>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 overflow-y-auto" style={{ minHeight: 380, maxHeight: 520 }}>
            {taskConversation.map((msg) => {
              if (msg.isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-1">
                    <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 bg-gray-100 rounded-full px-4 py-1.5 text-[11px] text-gray-500 max-w-[90%]">
                      <span>⚙️</span>
                      <span>{msg.text}</span>
                      {('statusChange' in msg) && msg.statusChange && (
                        <span className="bg-white text-green-700 font-semibold px-2.5 py-0.5 rounded-full text-[10px] border border-green-200">
                          {msg.statusChange}
                        </span>
                      )}
                      <span className="text-gray-400 text-[10px]">· {msg.time}</span>
                    </div>
                  </div>
                );
              }

              const mCfg = msgTypeConfig[msg.type] ?? msgTypeConfig.text;
              const isMine = msg.sender === 'المهندس أحمد';
              const bubbleClass = MSG_BUBBLE[msg.type] ?? (isMine ? 'bg-green-600' : 'bg-gray-100');
              const badgeClass = MSG_BADGE[msg.type];

              return (
                <div key={msg.id} className={`flex gap-2.5 ${isMine ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full ${msg.color} flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 mt-1 shadow-sm`}>
                    {msg.initials}
                  </div>
                  <div className={`max-w-[78%] space-y-1 flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-center gap-1.5 flex-wrap ${isMine ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[12px] font-semibold text-gray-700">{msg.sender}</span>
                      <span className="text-[10px] text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{msg.role}</span>
                      {msg.type !== 'text' && msg.type !== 'image' && badgeClass && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                          {mCfg.icon} {mCfg.label}
                        </span>
                      )}
                    </div>

                    <div className={`rounded-2xl px-4 py-2.5 ${bubbleClass} ${isMine && !MSG_BUBBLE[msg.type] ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}>
                      <p className={`text-sm leading-relaxed ${isMine && !MSG_BUBBLE[msg.type] ? 'text-white' : 'text-gray-800'}`}>
                        {msg.text}
                      </p>
                      {('attachments' in msg) && msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                          {msg.attachments.map((att, i) => {
                            const aCfg = attachmentTypeConfig[att.type];
                            return (
                              <div key={i} className="flex items-center gap-2 bg-white/70 border border-gray-100 rounded-lg px-2.5 py-1.5 text-[12px]">
                                <span>{aCfg?.icon ?? '📎'}</span>
                                <span className="font-medium text-gray-700">{att.label}</span>
                                <span className="text-gray-400 truncate">{att.filename}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 px-1">{msg.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="border-t border-gray-100/80 px-4 py-3 bg-gray-50/40">
            <div className="flex gap-2 items-end">
              <div className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 shadow-sm">
                <input
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  placeholder="اكتب رسالتك — ستُحفظ في سجل المهمة..."
                  className="w-full text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
              <button className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center transition-colors">
                📎
              </button>
              <button
                onClick={() => setNewMsg('')}
                className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
              >
                إرسال
              </button>
            </div>
            <div className="flex gap-2 mt-2.5 overflow-x-auto">
              {([['طلب اعتماد', '🔔'], ['ملاحظة تنفيذ', '📝'], ['تغيير الحالة', '🔀'], ['رفض', '❌']] as [string, string][]).map(([label, icon]) => (
                <button key={label} className="flex items-center gap-1 text-[11px] text-gray-500 bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 px-3 py-1.5 rounded-full whitespace-nowrap transition-all flex-shrink-0">
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      )}

      {/* ─── ATTACHMENTS ─── */}
      {tab === 'attachments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {taskAttachments.map((att) => {
              const aCfg = attachmentTypeConfig[att.type];
              return (
                <GlassCard key={att.id} noPadding className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <div className="text-center">
                      <p className="text-6xl">{att.emoji}</p>
                      <p className="text-[10px] text-gray-400 mt-1">نموذج صورة</p>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${ATT_STYLE[att.type] ?? 'bg-gray-100 text-gray-600'}`}>
                        {aCfg?.icon} {aCfg?.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-gray-800 text-sm">{att.label}</p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{att.filename}</p>
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-2 text-[11px] text-gray-400">
                      <span>👤 {att.uploadedBy}</span>
                      <span>· 🕐 {att.time}</span>
                      <span>· {att.size}</span>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <GlassCard title="إضافة مرفق جديد">
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-green-300 transition-colors cursor-pointer">
              <p className="text-4xl mb-2">📎</p>
              <p className="text-sm text-gray-500 mb-1">اسحب الملفات هنا أو</p>
              <p className="text-sm font-semibold text-green-600">اختر من الجهاز</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(attachmentTypeConfig).map(([key, cfg]) => (
                <span key={key} className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  {cfg.icon} {cfg.label}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─── LOG ─── */}
      {tab === 'log' && (
        <GlassCard title="سجل التنفيذ" subtitle="جميع الأحداث محفوظة تلقائياً بالتاريخ والمسؤول">
          <div className="relative pr-2">
            <div className="absolute right-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-green-300 to-gray-100" />
            <div className="space-y-0">
              {task.executionLog.map((entry, i) => (
                <div key={i} className="flex gap-4 pb-5 last:pb-0 relative">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-base shadow-sm ${LOG_STYLE[entry.type] ?? 'bg-gray-100 text-gray-500'}`}>
                    {LOG_ICON[entry.type] ?? '•'}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-semibold text-gray-800 text-sm">{entry.actor}</span>
                        {entry.role && <span className="text-[11px] text-gray-400 mr-2">({entry.role})</span>}
                      </div>
                      <span className="text-[11px] text-gray-400 font-mono flex-shrink-0">{entry.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{entry.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      )}

      {/* ─── COST ─── */}
      {tab === 'cost' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard title="تفاصيل التكلفة" accent="green">
            <div className="divide-y divide-gray-100/80">
              {task.materials.map((m, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 gap-2">
                  <span className="text-sm text-gray-700">
                    {m.name}
                    <span className="text-[11px] text-gray-400 mr-1">({m.qty} {m.unit})</span>
                  </span>
                  <span className={`font-semibold text-sm flex-shrink-0 ${m.cost > 0 ? 'text-green-700' : 'text-gray-400'}`}>
                    {m.cost > 0 ? `${m.cost} ر.س` : '—'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="font-bold text-gray-800">الإجمالي المقدر</span>
              <span className="font-bold text-green-700 text-xl">{task.estimatedCost} ر.س</span>
            </div>
          </GlassCard>

          <GlassCard title="مقارنة المقدر بالفعلي" accent="sky">
            <div className="space-y-4">
              {[
                { label: 'التكلفة المقدرة', value: task.estimatedCost, style: 'text-gray-700' },
                { label: 'التكلفة الفعلية', value: task.actualCost,   style: 'text-green-700' },
                { label: 'الوفر المحقق',    value: task.estimatedCost - task.actualCost, style: 'text-blue-700' },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{row.label}</span>
                  <span className={`font-bold text-2xl ${row.style}`}>{row.value} ر.س</span>
                </div>
              ))}
              <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                <p className="text-sm text-green-700 font-medium">
                  ✅ تم التنفيذ بتكلفة أقل من التقدير بـ {task.estimatedCost - task.actualCost} ر.س
                  ({Math.round(((task.estimatedCost - task.actualCost) / task.estimatedCost) * 100)}% وفر)
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ─── APPROVAL ─── */}
      {tab === 'approval' && (
        <div className="space-y-4">
          <GlassCard title="مسار الاعتماد" accent="green">
            <div className="space-y-4">
              {[
                { role: 'العامل يوسف',   step: 'تنفيذ المهمة',     status: 'done', time: '18:10' },
                { role: 'المشرف خالد',   step: 'مراجعة ميدانية',   status: 'done', time: '18:25' },
                { role: 'المشرف خالد',   step: 'طلب اعتماد',       status: 'done', time: '18:28' },
                { role: 'المهندس أحمد',  step: 'اعتماد نهائي',     status: 'done', time: '18:45' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-sm ${step.status === 'done' ? 'bg-green-100 text-green-700' : step.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400'}`}>
                    {step.status === 'done' ? '✓' : step.status === 'pending' ? '…' : '○'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{step.step}</p>
                    <p className="text-[12px] text-gray-500">{step.role}</p>
                  </div>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${step.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {step.status === 'done' ? `✓ ${step.time}` : 'بانتظار'}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Business value card */}
          <GlassCard accent="amber">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">💡</span>
              <div>
                <h3 className="font-bold text-gray-800 text-[15px]">كيف تقلل هذه الميزة النفقات؟</h3>
                <p className="text-[12px] text-gray-400 mt-0.5">المحادثة داخل المهمة — لا واتساب ولا رسائل ضائعة</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: '📌', text: 'توثيق التعليمات داخل المهمة بدلاً من ضياعها في واتساب أو الرسائل الشخصية' },
                { icon: '🔄', text: 'تقليل تكرار العمل بسبب سوء التواصل بين الفريق والمشرفين' },
                { icon: '📸', text: 'إثبات التنفيذ بالصور قبل وبعد العمل — يمنع النزاعات ويرفع المساءلة' },
                { icon: '💰', text: 'ربط التكلفة الفعلية بالمهمة والدورة الزراعية للمقارنة والتحسين المستمر' },
                { icon: '✅', text: 'تسهيل اعتماد المشرف والمهندس دون اجتماعات أو انتظار' },
                { icon: '📊', text: 'كشف التأخير وتحديد المسؤولية بوضوح في سجل المهمة التلقائي' },
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3 pb-2.5 border-b border-amber-50 last:border-0 last:pb-0">
                  <span className="text-xl flex-shrink-0 mt-0.5">{point.icon}</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{point.text}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
