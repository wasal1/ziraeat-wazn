import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { messageThreads, mockMessages } from '../data/mockData';

const TYPE_ICON: Record<string, string> = {
  internal: '💬', supplier: '🏭', client: '🤝', system: '🔔',
};

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState<number>(messageThreads[0]?.id ?? 1);
  const [newMsg, setNewMsg] = useState('');

  const thread = messageThreads.find((t) => t.id === activeThread);
  const messages = mockMessages[activeThread] ?? [];

  return (
    <PageContainer>
      <SectionHeader
        title="المراسلات والمرفقات"
        subtitle="محادثات الفريق والموردين وتبادل الملفات"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ minHeight: 600 }}>
        {/* Thread list */}
        <GlassCard noPadding className="lg:col-span-1">
          <div className="px-4 py-3 border-b border-gray-100/80">
            <input
              placeholder="بحث في المحادثات..."
              className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="divide-y divide-gray-100/80 overflow-y-auto" style={{ maxHeight: 560 }}>
            {messageThreads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveThread(t.id)}
                className={`w-full text-right px-4 py-3 hover:bg-gray-50/60 transition-colors ${activeThread === t.id ? 'bg-green-50/60 border-r-2 border-r-green-500' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-lg flex-shrink-0">
                    {TYPE_ICON[t.type] ?? '💬'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800 text-[13px] truncate">{t.title}</span>
                      {t.unread > 0 && (
                        <span className="bg-green-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                          {t.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-500 truncate">{t.lastMessage}</p>
                    <div className="flex gap-2 mt-0.5 text-[11px] text-gray-400">
                      <span>{t.lastTime}</span>
                      <span>·</span>
                      <span>{t.participants} مشارك</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Chat area */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {thread && (
            <GlassCard className="flex-shrink-0" accent="green">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
                  {TYPE_ICON[thread.type] ?? '💬'}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{thread.title}</p>
                  <p className="text-[11px] text-gray-400">{thread.participants} مشاركين · {thread.farm}</p>
                </div>
                {thread.attachmentsCount > 0 && (
                  <div className="mr-auto flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl text-[12px] font-medium">
                    <span>📎</span>
                    <span>{thread.attachmentsCount} مرفق</span>
                  </div>
                )}
              </div>
            </GlassCard>
          )}

          {/* Messages */}
          <GlassCard noPadding className="flex-1">
            <div className="p-4 space-y-3 overflow-y-auto" style={{ minHeight: 340, maxHeight: 400 }}>
              {messages.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <p className="text-4xl mb-2">💬</p>
                  <p className="text-sm">لا توجد رسائل في هذه المحادثة</p>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`flex ${m.isMe ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${m.isMe ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      {!m.isMe && (
                        <p className="text-[11px] font-semibold text-green-700 mb-0.5">{m.sender}</p>
                      )}
                      <p className="text-sm leading-relaxed">{m.text}</p>
                      {m.attachment && (
                        <div className={`mt-1.5 flex items-center gap-1.5 text-[12px] ${m.isMe ? 'text-green-100' : 'text-blue-600'}`}>
                          <span>📎</span>
                          <span>{m.attachment}</span>
                        </div>
                      )}
                      <p className={`text-[10px] mt-1 ${m.isMe ? 'text-green-200' : 'text-gray-400'}`}>{m.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-100/80 px-4 py-3 flex gap-2">
              <input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="اكتب رسالة..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button className="px-3 py-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors text-sm">
                📎
              </button>
              <button
                onClick={() => setNewMsg('')}
                className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
              >
                إرسال
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
