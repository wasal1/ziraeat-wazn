import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

// ─── Bar Chart ───────────────────────────────
interface BarProps {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  label?: string;
}

export function BarChartMock({ data, xKey, yKey, color = '#16a34a', height = 200, label }: BarProps) {
  return (
    <div style={{ direction: 'ltr' }}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Tahoma, Arial' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontFamily: 'Tahoma, Arial', fontSize: 12 }}
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
            formatter={(v) => [String(v != null ? Number(v).toLocaleString('ar-SA') : '') + (label ? ' ' + label : ''), '']}
          />
          <Bar dataKey={yKey} fill={color} radius={[5, 5, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Line Chart ──────────────────────────────
interface LineProps {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  label?: string;
}

export function LineChartMock({ data, xKey, yKey, color = '#16a34a', height = 200, label }: LineProps) {
  return (
    <div style={{ direction: 'ltr' }}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Tahoma, Arial' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontFamily: 'Tahoma, Arial', fontSize: 12 }}
            formatter={(v) => [String(v != null ? Number(v).toLocaleString('ar-SA') : '') + (label ? ' ' + label : ''), '']}
          />
          <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2.5} dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Pie / Donut Chart ───────────────────────
interface PieProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
}

export function DonutChartMock({ data, height = 220 }: PieProps) {
  return (
    <div style={{ direction: 'ltr' }}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%" cy="50%"
            innerRadius={55} outerRadius={80}
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontFamily: 'Tahoma, Arial', fontSize: 12 }}
            formatter={(v) => [String(v) + '%', '']}
          />
          <Legend
            iconType="circle" iconSize={8}
            formatter={(v) => <span style={{ fontFamily: 'Tahoma, Arial', fontSize: 12, color: '#374151' }}>{v}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
