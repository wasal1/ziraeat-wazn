import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { useLang } from '../contexts/LangContext';
import {
  myTodayRoles, fullStatusConfig, myTodayData, taskTypeConfig,
  dailyOperations, dailyOpStats, opTypeConfig,
} from '../data/mockData';
import { type MyTodayRoleId, type MyTask } from '../data/mockData';

// ─── Lookup maps ──────────────────────────────────────────
const PRIORITY_STYLE: Record<string, string> = {
  high:   'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low:    'bg-gray-100 text-gray-500',
};

// ─── Daily ops lookups (for farmops view) ─────────────────
const OPS_STATUS_STYLE: Record<string, string> = {
  completed:  'bg-green-100 text-green-700',
  inProgress: 'bg-blue-100 text-blue-700',
  scheduled:  'bg-amber-100 text-amber-700',
  cancelled:  'bg-gray-100 text-gray-500',
};
const OPS_STATUS_LABEL: Record<string, string> = {
  completed: 'منجزة', inProgress: 'جارية', scheduled: 'مجدولة', cancelled: 'ملغاة',
};
const OPS_PRIORITY_STYLE: Record<string, string> = {
  high: 'bg-red-100 text-red-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-gray-100 text-gray-500',
};
const OPS_PRIORITY_LABEL: Record<string, string> = {
  high: 'عالية', medium: 'متوسطة', low: 'منخفضة',
};

const SUPERVISORY_ROLES = new Set(['owner', 'manager', 'engineer', 'supervisor']);

const VALUE_POINTS = [
  { icon: '📌', text: 'كل شخص يعرف المطلوب منه في الوقت المناسب — لا انتظار ولا تخمين' },
  { icon: '🔄', text: 'تقليل ضياع التعليمات بين الفرق — المحادثة داخل المهمة وليس في واتساب' },
  { icon: '📸', text: 'توثيق التنفيذ بالصور قبل وبعد العمل — إثبات مهني وقانوني' },
  { icon: '💸', text: 'تقليل تكرار العمل وإعادة التنفيذ — كشف الخطأ قبل إغلاق المهمة' },
  { icon: '⏱️', text: 'كشف التأخير وتحديد المسؤولية بوضوح في سجل المهمة التلقائي' },
  { icon: '💰', text: 'ربط التكلفة بالمهمة والدورة الزراعية للمقارنة والتحسين المستمر' },
  { icon: '✅', text: 'تسريع اعتماد المهام الفنية والمالية بدون اجتماعات أو انتظار' },
  { icon: '🔗', text: 'عند إكمال المهمة تتحول تلقائياً إلى سجل عملية في الدورة الزراعية' },
];

const LIFECYCLE = [
  ['📝', 'إنشاء'], ['👤', 'إسناد'], ['▶️', 'تنفيذ'], ['📸', 'توثيق'],
  ['👷', 'مراجعة'], ['🔬', 'اعتماد'], ['✅', 'إغلاق'], ['📊', 'سجل'],
];

// ─── Task row component ───────────────────────────────────
function TaskRow({ task, onNav }: { task: MyTask; onNav: (p: string) => void }) {
  const { t } = useLang();
  const cfg  = taskTypeConfig[task.type] ?? { label: task.type, icon: '📌' };
  const sCfg = fullStatusConfig[task.status];
  const isLate      = task.status === 'late';
  const isMustDoNow = task.status === 'mustDoNow';
  const isDone      = task.status === 'completed';

  return (
    <div className={`px-4 py-3 md:px-5 md:py-4 transition-colors ${isLate ? 'bg-red-50/40' : isMustDoNow ? 'bg-orange-50/40' : 'hover:bg-gray-50/50'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${isLate ? 'bg-red-100' : isMustDoNow ? 'bg-orange-100' : isDone ? 'bg-green-50' : 'bg-gray-50'}`}>
          {cfg.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`font-semibold text-sm ${isDone ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
              {task.title}
            </span>
            {sCfg && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sCfg.style}`}>
                {sCfg.icon} {t(`taskStatus.${task.status}`) || sCfg.label}
              </span>
            )}
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLE[task.priority]}`}>
              {t(`priority.${task.priority}`)}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[12px] text-gray-500">
            <span>📍 {task.field}</span>
            <span>👤 {task.assignedTo}</span>
            <span>🕐 {task.scheduledTime}</span>
            {task.estimatedCost !== undefined && (
              <span className="text-green-700 font-medium">💸 {task.estimatedCost.toLocaleString()} {t('common.currency')}</span>
            )}
          </div>

          {task.myRole && (
            <span className="inline-block mt-1.5 text-[11px] bg-green-50 text-green-700 border border-green-100 px-2.5 py-0.5 rounded-full">
              {t('mytoday.myRole')} {task.myRole}
            </span>
          )}

          {task.waitingAction && (
            <div className="mt-2 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
              <span className="text-amber-600 text-sm">⚡</span>
              <p className="text-[12px] font-semibold text-amber-700">{task.waitingAction}</p>
            </div>
          )}

          {task.notes && !isDone && (
            <p className="mt-1 text-[12px] text-gray-400 truncate">{task.notes}</p>
          )}
        </div>

        <button
          onClick={() => onNav('taskdetail')}
          className="flex-shrink-0 text-[11px] font-medium text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
        >
          {t('common.details')}
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────
interface Props { onNav: (p: string) => void; }

export default function MyTodayPage({ onNav }: Props) {
  const { t } = useLang();
  const [roleId, setRoleId]             = useState<MyTodayRoleId>('manager');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView]                 = useState<'mywork' | 'farmops'>('mywork');
  const [opsFilter, setOpsFilter]       = useState('all');
  const [opsSearch, setOpsSearch]       = useState('');

  const handleRoleChange = (id: MyTodayRoleId) => {
    setRoleId(id);
    setStatusFilter('all');
    if (!SUPERVISORY_ROLES.has(id)) setView('mywork');
  };

  const { summary, tasks } = myTodayData[roleId];

  const urgentTask   = tasks.find((t) => t.status === 'mustDoNow') ?? tasks.find((t) => t.status === 'late');
  const waitingTasks = tasks.filter((t) => !!t.waitingAction);
  const lateTasks    = tasks.filter((t) => t.status === 'late');
  const nextTask     = tasks.find((t) => t.status === 'scheduled');
  const donePct      = Math.round((summary.done / Math.max(1, summary.total)) * 100);

  const presentStatuses = Array.from(new Set(tasks.map((t) => t.status)));
  const filtered = statusFilter === 'all'
    ? tasks
    : tasks.filter((t) => t.status === statusFilter);

  const isWorker      = roleId === 'worker';
  const isSupervision = SUPERVISORY_ROLES.has(roleId);
  const currentWorkerTask = isWorker ? tasks.find((t) => t.status === 'mustDoNow') : null;

  const filteredOps = dailyOperations.filter((op) => {
    const matchStatus = opsFilter === 'all' || op.status === opsFilter;
    const matchSearch = opsSearch === '' || op.title.includes(opsSearch) || op.farm.includes(opsSearch) || op.worker.includes(opsSearch);
    return matchStatus && matchSearch;
  });

  return (
    <PageContainer>
      <SectionHeader
        title={t('page.mytoday.title')}
        subtitle={t('page.mytoday.sub')}
      />

      {/* ─── Role selector ─── */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {myTodayRoles.map((r) => {
          const isActive = r.id === roleId;
          return (
            <button
              key={r.id}
              onClick={() => handleRoleChange(r.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all
                ${isActive
                  ? `bg-gradient-to-l ${r.accent} text-white shadow-md`
                  : 'bg-white/90 border border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50'
                }`}
            >
              <span>{r.icon}</span>
              <span>{t(`role.${r.id}`)}</span>
            </button>
          );
        })}
      </div>

      {/* ─── View toggle — supervisory roles only ─── */}
      {isSupervision && (
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          <button
            onClick={() => setView('mywork')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
              ${view === 'mywork' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t('mytoday.viewMyWork')}
          </button>
          <button
            onClick={() => setView('farmops')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
              ${view === 'farmops' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t('mytoday.viewFarmOps')}
          </button>
        </div>
      )}

      {/* ═══ FARMOPS VIEW ═══ */}
      {view === 'farmops' && isSupervision && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: t('farmops.totalToday'),  value: dailyOpStats.totalToday,                                              icon: '📋', color: 'text-gray-700'   },
              { label: t('farmops.completed'),   value: dailyOpStats.completed,                                               icon: '✅', color: 'text-green-600'  },
              { label: t('farmops.inProgress'),  value: dailyOpStats.inProgress,                                              icon: '⏳', color: 'text-blue-600'   },
              { label: t('farmops.scheduled'),   value: dailyOpStats.scheduled,                                               icon: '🗓️', color: 'text-amber-600'  },
              { label: t('farmops.dailyCost'),   value: `${dailyOpStats.totalCost.toLocaleString()} ${t('common.currency')}`, icon: '💸', color: 'text-purple-600' },
              { label: t('farmops.savedVsAvg'),  value: `${dailyOpStats.savedVsAvg.toLocaleString()} ${t('common.currency')}`,icon: '💰', color: 'text-emerald-600'},
            ].map((s) => (
              <GlassCard key={s.label} className="text-center">
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className={`font-bold text-lg ${s.color}`}>{s.value}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{s.label}</p>
              </GlassCard>
            ))}
          </div>

          {/* Filter + Search */}
          <GlassCard>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={opsSearch}
                onChange={(e) => setOpsSearch(e.target.value)}
                placeholder={t('farmops.searchPlaceholder')}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <div className="flex gap-2 flex-wrap">
                {(['all', 'inProgress', 'scheduled', 'completed'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setOpsFilter(s)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${opsFilter === s ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {s === 'all' ? t('common.all') : t(`status.${s}`)}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Operations list */}
          <GlassCard title={`${t('farmops.opsCount')} (${filteredOps.length})`} noPadding>
            <div className="divide-y divide-gray-100/80">
              {filteredOps.map((op) => {
                const cfg = opTypeConfig[op.type] ?? { label: op.type, icon: '📌' };
                return (
                  <div key={op.id} className="px-4 py-3 md:px-5 md:py-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0">
                        {cfg.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800 text-sm">{op.title}</span>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${OPS_STATUS_STYLE[op.status]}`}>
                            {OPS_STATUS_LABEL[op.status]}
                          </span>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${OPS_PRIORITY_STYLE[op.priority]}`}>
                            {OPS_PRIORITY_LABEL[op.priority]}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-500">
                          <span>📍 {op.farm} — {op.field}</span>
                          <span>👷 {op.worker}</span>
                          <span>🏷️ {cfg.label}</span>
                        </div>
                        {op.notes && (
                          <p className="text-[12px] text-gray-400 mt-1 truncate">{op.notes}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0 text-left text-[12px] text-gray-500 space-y-1">
                        <p className="font-semibold text-green-700">{op.cost.toLocaleString()} {t('common.currency')}</p>
                        <p>{op.startTime}</p>
                        <p className="text-gray-400">{op.duration}</p>
                        <button
                          onClick={() => onNav('taskdetail')}
                          className="mt-1 text-[11px] font-medium text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          {t('farmops.viewDetails')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredOps.length === 0 && (
                <div className="py-16 text-center text-gray-400">
                  <p className="text-4xl mb-3">📋</p>
                  <p className="text-sm">{t('farmops.noOps')}</p>
                </div>
              )}
            </div>
          </GlassCard>
        </>
      )}

      {/* ═══ MY WORK VIEW ═══ */}
      {view === 'mywork' && (
      <>

      {/* ─── Stats ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: t('mytoday.totalToday'), value: summary.total,   icon: '📋', color: 'text-gray-700'   },
          { label: t('mytoday.completed'),  value: summary.done,    icon: '✅', color: 'text-green-600'  },
          { label: t('mytoday.urgent'),     value: summary.urgent,  icon: '🚨', color: 'text-red-600'    },
          { label: t('mytoday.late'),       value: summary.late,    icon: '⏰', color: 'text-amber-600'  },
          { label: t('mytoday.waiting'),    value: summary.waiting, icon: '⏳', color: 'text-purple-600' },
        ].map((s) => (
          <GlassCard key={s.label} className="text-center">
            <p className="text-xl mb-0.5">{s.icon}</p>
            <p className={`font-bold text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* ─── Progress bar ─── */}
      <GlassCard>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            {t('mytoday.progressOf')} {t(`role.${roleId}`)} {t('mytoday.progressDay')}
          </span>
          <span className="text-sm font-bold text-green-700">{donePct}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-l from-green-500 to-emerald-400 transition-all"
            style={{ width: `${donePct}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-gray-400 mt-1.5">
          <span>{summary.done} {t('mytoday.tasksDone')}</span>
          <span>{summary.total - summary.done} {t('mytoday.tasksLeft')} {summary.total}</span>
        </div>
      </GlassCard>

      {/* ═══ WORKER — واجهة مبسطة ═══ */}
      {isWorker && currentWorkerTask && (
        <div className="relative overflow-hidden rounded-3xl p-6 text-white bg-gradient-to-l from-teal-600 to-green-700 shadow-xl">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg,white,white 1px,transparent 1px,transparent 20px)' }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full font-bold animate-pulse">
                {t('mytoday.mustDoNow')}
              </span>
            </div>
            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl">{taskTypeConfig[currentWorkerTask.type]?.icon ?? '📌'}</span>
              <div>
                <h3 className="text-xl font-extrabold leading-tight mb-1">{currentWorkerTask.title}</h3>
                <p className="text-white/70 text-sm">📍 {currentWorkerTask.farm} — {currentWorkerTask.field}</p>
                <p className="text-white/70 text-sm">🕐 {currentWorkerTask.scheduledTime}</p>
              </div>
            </div>
            {currentWorkerTask.notes && (
              <div className="bg-white/20 rounded-2xl p-4 mb-4 border border-white/30">
                <p className="text-xs font-bold text-white/80 mb-1.5">{t('mytoday.instructions')}</p>
                <p className="text-sm text-white/90 leading-relaxed">{currentWorkerTask.notes}</p>
              </div>
            )}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => onNav('taskdetail')}
                className="flex-1 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors text-sm"
              >
                {t('mytoday.startWork')}
              </button>
              <button className="px-4 py-3 bg-white/20 border border-white/30 text-white rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                {t('mytoday.uploadPhoto')}
              </button>
              <button
                onClick={() => onNav('taskdetail')}
                className="px-4 py-3 bg-white/20 border border-white/30 text-white rounded-xl text-sm font-medium hover:bg-white/30 transition-colors"
              >
                {t('mytoday.taskChat')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ NON-WORKER — "المطلوب الآن" card ═══ */}
      {!isWorker && urgentTask && (
        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-l from-red-500 to-orange-500 text-white shadow-lg">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg,white,white 1px,transparent 1px,transparent 20px)' }}
          />
          <div className="relative z-10">
            <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest mb-3">
              {urgentTask.status === 'mustDoNow' ? t('mytoday.mustDoNow') : t('mytoday.lateAlert')}
            </p>
            <div className="flex items-start gap-3">
              <span className="text-4xl">{taskTypeConfig[urgentTask.type]?.icon ?? '📌'}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-white text-lg leading-tight truncate">{urgentTask.title}</h3>
                <p className="text-white/70 text-sm mt-0.5">📍 {urgentTask.farm} — {urgentTask.field}</p>
                <p className="text-white/70 text-sm">👷 {urgentTask.assignedTo} · 🕐 {urgentTask.scheduledTime}</p>
                {urgentTask.waitingAction && (
                  <div className="mt-2 inline-block bg-white/20 border border-white/30 rounded-lg px-3 py-1">
                    <p className="text-sm font-semibold text-white">⚡ {urgentTask.waitingAction}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => onNav('taskdetail')}
                className="flex-shrink-0 px-4 py-2 bg-white text-red-700 font-bold rounded-xl text-sm hover:bg-red-50 transition-colors whitespace-nowrap"
              >
                {t('common.view')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Quick cards: بانتظارك | التالي | المتأخر ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        {/* بانتظارك */}
        <GlassCard accent="purple" className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⏳</span>
            <p className="font-bold text-gray-800 text-sm">{t('mytoday.waitingFor')}</p>
            <span className={`mr-auto text-xs font-bold px-2 py-0.5 rounded-full ${waitingTasks.length > 0 ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
              {waitingTasks.length}
            </span>
          </div>
          {waitingTasks.length === 0 ? (
            <div className="flex flex-col items-center py-4 gap-1">
              <span className="text-2xl">✅</span>
              <p className="text-[12px] text-green-600 font-medium">{t('mytoday.noWaiting')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {waitingTasks.slice(0, 2).map((t) => (
                <button
                  key={t.id}
                  onClick={() => onNav('taskdetail')}
                  className="w-full text-right bg-purple-50 border border-purple-100 rounded-xl p-2.5 hover:border-purple-300 transition-colors"
                >
                  <p className="text-[12px] font-semibold text-gray-800 truncate">{t.title}</p>
                  <p className="text-[11px] text-purple-600 mt-0.5">{t.waitingAction}</p>
                </button>
              ))}
              {waitingTasks.length > 2 && (
                <p className="text-[11px] text-gray-400 text-center">+{waitingTasks.length - 2} أخرى</p>
              )}
            </div>
          )}
        </GlassCard>

        {/* التالي */}
        <GlassCard accent="sky" className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🗓️</span>
            <p className="font-bold text-gray-800 text-sm">{t('mytoday.nextTask')}</p>
          </div>
          {nextTask ? (
            <button
              onClick={() => onNav('taskdetail')}
              className="w-full text-right bg-sky-50 border border-sky-100 rounded-xl p-3 hover:border-sky-300 transition-colors"
            >
              <div className="flex items-start gap-2">
                <span className="text-xl">{taskTypeConfig[nextTask.type]?.icon ?? '📌'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-gray-800 truncate">{nextTask.title}</p>
                  <p className="text-[11px] text-gray-500 truncate">📍 {nextTask.field}</p>
                  <p className="text-[11px] text-sky-600 font-semibold mt-1">🕐 {nextTask.scheduledTime}</p>
                </div>
              </div>
            </button>
          ) : (
            <p className="text-[12px] text-gray-400 text-center py-4">{t('mytoday.noNext')}</p>
          )}
        </GlassCard>

        {/* المتأخر */}
        <GlassCard accent="red" className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">⏰</span>
            <p className="font-bold text-gray-800 text-sm">{t('mytoday.lateTitle')}</p>
            <span className={`mr-auto text-xs font-bold px-2 py-0.5 rounded-full ${lateTasks.length > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
              {lateTasks.length}
            </span>
          </div>
          {lateTasks.length === 0 ? (
            <div className="flex flex-col items-center py-4 gap-1">
              <span className="text-2xl">✅</span>
              <p className="text-[12px] text-green-600 font-medium">{t('mytoday.noLate')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {lateTasks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onNav('taskdetail')}
                  className="w-full text-right bg-red-50 border border-red-100 rounded-xl p-2.5 hover:border-red-300 transition-colors"
                >
                  <p className="text-[12px] font-semibold text-red-800 truncate">{t.title}</p>
                  <p className="text-[11px] text-red-500 mt-0.5">
                    ⏰ مجدول {t.scheduledTime}{t.dueTime ? ` — انتهى {t.dueTime}` : ''}
                  </p>
                </button>
              ))}
            </div>
          )}
        </GlassCard>
      </div>

      {/* ─── Full task list ─── */}
      <GlassCard
        title={`${t('mytoday.allTasks')} ${t(`role.${roleId}`)} ${t('mytoday.allTasksDay')}`}
        subtitle={`${tasks.length} — ${summary.done} ${t('mytoday.completed')}`}
        noPadding
      >
        {/* Status filter */}
        <div className="px-4 pt-4 pb-3 flex gap-2 overflow-x-auto border-b border-gray-100/80">
          <button
            onClick={() => setStatusFilter('all')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 transition-all
              ${statusFilter === 'all' ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {t('common.all')} ({tasks.length})
          </button>
          {presentStatuses.map((s) => {
            const sCfg = fullStatusConfig[s];
            if (!sCfg) return null;
            const count = tasks.filter((t) => t.status === s).length;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 transition-all
                  ${statusFilter === s ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {sCfg.icon} {t(`taskStatus.${s}`) || sCfg.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100/80">
          {filtered.map((task) => (
            <TaskRow key={task.id} task={task} onNav={onNav} />
          ))}
          {filtered.length === 0 && (
            <div className="py-14 text-center text-gray-400">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-sm">{t('mytoday.noFilter')}</p>
            </div>
          )}
        </div>
      </GlassCard>

      {/* ─── Business value card ─── */}
      <GlassCard accent="amber">
        <div className="flex items-start gap-3 mb-5">
          <span className="text-3xl">💡</span>
          <div>
            <h3 className="font-bold text-gray-800 text-[15px]">{t('mytoday.valueTitle')}</h3>
            <p className="text-[12px] text-gray-400 mt-0.5">{t('mytoday.valueSub')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {VALUE_POINTS.map((p, i) => (
            <div key={i} className="flex items-start gap-3 bg-amber-50/70 border border-amber-100 rounded-xl p-3">
              <span className="text-xl flex-shrink-0">{p.icon}</span>
              <p className="text-[12px] text-gray-700 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Lifecycle flow */}
        <div className="border-t border-amber-100 pt-5">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
            {t('mytoday.lifecycle')}
          </p>
          <div className="flex items-start gap-1 flex-wrap">
            {LIFECYCLE.map(([icon, label], i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-lg">{icon}</span>
                  <span className="text-[9px] text-gray-500 text-center leading-tight max-w-[50px]">{label}</span>
                </div>
                {i < LIFECYCLE.length - 1 && (
                  <span className="text-gray-300 text-lg mx-0.5 mb-3">›</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      </> /* end mywork view */
      )}

    </PageContainer>
  );
}
