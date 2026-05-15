import { useState } from 'react';
import PageContainer from '../components/PageContainer';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import ActionButton from '../components/ActionButton';
import StatCard from '../components/StatCard';
import { inventoryItems, inventoryStats, purchaseOrders } from '../data/mockData';

const CATEGORIES = ['الكل', 'بذور', 'أسمدة', 'مبيدات', 'تعبئة', 'مواد صرف'];

const CAT_ICON: Record<string, string> = {
  بذور:       '🌰',
  أسمدة:      '🧪',
  مبيدات:     '🛡️',
  تعبئة:      '📦',
  'مواد صرف': '🧤',
};

const STATUS_CFG: Record<string, string> = {
  'كافٍ':        'bg-green-50 text-green-700 border-green-100',
  'منخفض':       'bg-amber-50 text-amber-700 border-amber-100',
  'نفذ تقريباً': 'bg-red-50 text-red-700 border-red-100',
};

const PO_STATUS_CFG: Record<string, string> = {
  'مكتمل':            'bg-green-50 text-green-700 border-green-100',
  'قيد التوريد':      'bg-sky-50 text-sky-700 border-sky-100',
  'معتمد':            'bg-blue-50 text-blue-700 border-blue-100',
  'بانتظار موافقة':   'bg-amber-50 text-amber-700 border-amber-100',
};

const TABS = ['المخزون', 'طلبات الشراء'];

export default function InventoryPage() {
  const [tab, setTab]     = useState('المخزون');
  const [cat, setCat]     = useState('الكل');
  const [statusF, setStatusF] = useState('الكل');

  const filtered = inventoryItems.filter((i) => {
    const catOk = cat === 'الكل' || i.category === cat;
    const stOk  = statusF === 'الكل' || i.status === statusF;
    return catOk && stOk;
  });

  const lowItems  = inventoryItems.filter((i) => i.status !== 'كافٍ');
  const poTotal   = purchaseOrders.reduce((s, p) => s + p.cost, 0);

  return (
    <PageContainer>
      <SectionHeader
        title="المخزون"
        subtitle="إدارة البذور والأسمدة والمبيدات وجميع المستلزمات"
        action={
          <div className="flex gap-2">
            <ActionButton variant="secondary" size="sm" icon="🛒">طلب شراء</ActionButton>
            <ActionButton size="sm" icon="➕">إضافة صنف</ActionButton>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي الأصناف"      value={inventoryStats.totalItems}  unit=""     icon="📦" color="green"  />
        <StatCard label="قيمة المخزون"         value={Math.round(inventoryStats.totalValue / 1000).toString() + 'K'} unit="ريال" icon="💰" color="sky" />
        <StatCard label="أصناف بمخزون منخفض"  value={inventoryStats.lowStockCount} unit=""   icon="⚠️" color="red"    />
        <StatCard label="الفئات"              value={inventoryStats.categories}  unit=""     icon="🗂️" color="purple" />
      </div>

      {/* Low stock alert strip */}
      {lowItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🚨</span>
          <div className="flex-1">
            <p className="font-bold text-red-700 text-sm mb-2">{lowItems.length} أصناف تحتاج تجديداً فورياً</p>
            <div className="flex flex-wrap gap-2">
              {lowItems.map((i) => (
                <span key={i.id} className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_CFG[i.status]}`}>
                  {i.name} — {i.qty} {i.unit} (الحد الأدنى: {i.minQty})
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100/70 rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${tab === t ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >{t}</button>
        ))}
      </div>

      {/* ─── المخزون ─── */}
      {tab === 'المخزون' && (
        <GlassCard
          title="قائمة المخزون"
          subtitle={`${filtered.length} صنف — قيمة: ${filtered.reduce((s, i) => s + i.totalValue, 0).toLocaleString('ar-SA')} ريال`}
          accent="green"
          action={
            <div className="flex gap-1 items-center flex-wrap">
              {['الكل', 'كافٍ', 'منخفض', 'نفذ تقريباً'].map((s) => (
                <button key={s} onClick={() => setStatusF(s)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${statusF === s ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-400 hover:bg-gray-100'}`}
                >{s}</button>
              ))}
            </div>
          }
        >
          {/* Category chips */}
          <div className="flex gap-2 flex-wrap mb-4">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${cat === c ? 'bg-green-600 text-white border-green-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'}`}
              >{CAT_ICON[c] ?? ''} {c}</button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-right">
                  {['الصنف', 'الفئة', 'الكمية', 'الحد الأدنى', 'سعر الوحدة', 'القيمة الإجمالية', 'الموقع', 'آخر تحديث', 'الحالة'].map((h) => (
                    <th key={h} className="pb-3 pr-3 text-xs font-semibold text-gray-400 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((item) => {
                  const pct = Math.min((item.qty / (item.minQty * 3)) * 100, 100);
                  return (
                    <tr key={item.id} className={`hover:bg-gray-50/60 transition-colors ${item.status !== 'كافٍ' ? 'bg-red-50/20' : ''}`}>
                      <td className="py-3 pr-3 font-semibold text-gray-800 whitespace-nowrap">{item.name}</td>
                      <td className="py-3 pr-3 whitespace-nowrap">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {CAT_ICON[item.category]} {item.category}
                        </span>
                      </td>
                      <td className="py-3 pr-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${pct < 30 ? 'bg-red-400' : pct < 60 ? 'bg-amber-400' : 'bg-green-400'}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="font-bold text-gray-800">{item.qty} {item.unit}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-3 text-gray-400 text-xs whitespace-nowrap">{item.minQty} {item.unit}</td>
                      <td className="py-3 pr-3 text-gray-600 whitespace-nowrap">{item.cost} ريال</td>
                      <td className="py-3 pr-3 font-bold text-sky-700 whitespace-nowrap">{item.totalValue.toLocaleString('ar-SA')} ريال</td>
                      <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{item.location}</td>
                      <td className="py-3 pr-3 text-xs text-gray-400 whitespace-nowrap">{item.lastUpdated}</td>
                      <td className="py-3 pr-3 whitespace-nowrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_CFG[item.status]}`}>{item.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Category breakdown */}
          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-3">توزيع القيمة حسب الفئة</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {CATEGORIES.filter((c) => c !== 'الكل').map((c) => {
                const catItems = inventoryItems.filter((i) => i.category === c);
                const val = catItems.reduce((s, i) => s + i.totalValue, 0);
                return (
                  <div key={c} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-2xl mb-1">{CAT_ICON[c]}</p>
                    <p className="text-xs font-bold text-gray-800">{val.toLocaleString('ar-SA')} ر</p>
                    <p className="text-[10px] text-gray-400">{c}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>
      )}

      {/* ─── طلبات الشراء ─── */}
      {tab === 'طلبات الشراء' && (
        <GlassCard
          title="طلبات الشراء"
          subtitle={`${purchaseOrders.length} طلب — إجمالي: ${poTotal.toLocaleString('ar-SA')} ريال`}
          accent="sky"
          action={<ActionButton size="sm" icon="➕">طلب جديد</ActionButton>}
        >
          <div className="space-y-3">
            {purchaseOrders.map((po) => (
              <div key={po.id} className="flex items-center gap-4 p-4 bg-gray-50/70 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                {/* Number */}
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-extrabold flex-shrink-0">
                  #{po.id}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-sm">{po.item}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{po.supplier}</p>
                </div>

                {/* Details */}
                <div className="flex items-center gap-4 text-sm flex-shrink-0">
                  <div className="text-center">
                    <p className="font-semibold text-gray-700">{po.qty} {po.unit}</p>
                    <p className="text-[10px] text-gray-400">الكمية</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-green-700">{po.cost.toLocaleString('ar-SA')} ريال</p>
                    <p className="text-[10px] text-gray-400">التكلفة</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">{po.date}</p>
                    <p className="text-[10px] text-gray-400">التاريخ</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1.5 rounded-full border font-medium whitespace-nowrap ${PO_STATUS_CFG[po.status]}`}>
                    {po.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* PO Summary */}
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-3">
            {[
              { label: 'مكتملة',            count: purchaseOrders.filter((p) => p.status === 'مكتمل').length,            color: 'text-green-700 bg-green-50' },
              { label: 'قيد التنفيذ',       count: purchaseOrders.filter((p) => ['قيد التوريد','معتمد'].includes(p.status)).length, color: 'text-sky-700 bg-sky-50' },
              { label: 'بانتظار موافقة',    count: purchaseOrders.filter((p) => p.status === 'بانتظار موافقة').length,   color: 'text-amber-700 bg-amber-50' },
            ].map((s) => (
              <div key={s.label} className={`${s.color} rounded-xl p-3 text-center`}>
                <p className="text-xl font-extrabold">{s.count}</p>
                <p className="text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </PageContainer>
  );
}
