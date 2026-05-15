import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

interface BarProps {
  data: { [key: string]: string | number }[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
}

interface LineProps {
  data: { [key: string]: string | number }[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
}

interface PieProps {
  data: { name: string; value: number }[];
  height?: number;
}

const COLORS = ['#16a34a', '#0ea5e9', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

export function BarChartMock({ data, xKey, yKey, color = '#16a34a', height = 200 }: BarProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#6b7280', fontFamily: 'Tahoma' }} />
        <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontFamily: 'Tahoma' }}
        />
        <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LineChartMock({ data, xKey, yKey, color = '#16a34a', height = 200 }: LineProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#6b7280', fontFamily: 'Tahoma' }} />
        <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontFamily: 'Tahoma' }}
        />
        <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2.5} dot={{ r: 4, fill: color }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PieChartMock({ data, height = 200 }: PieProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={true}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 8, border: 'none', fontFamily: 'Tahoma' }} />
        <Legend iconType="circle" formatter={(value) => <span style={{ fontFamily: 'Tahoma', fontSize: 12 }}>{value}</span>} />
      </PieChart>
    </ResponsiveContainer>
  );
}
