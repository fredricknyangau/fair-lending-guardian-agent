import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BiasChartProps {
  denialData: any[];
  trackData: any[];
}

export default function BiasChart({ denialData, trackData }: BiasChartProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="card">
        <h3 style={{ marginBottom: '24px' }}>Denial Rates: Before vs After Guardian</h3>
        <div style={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={denialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="group" />
              <YAxis tickFormatter={(val) => `${val}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, 'Denial Rate']} />
              <Legend />
              <Bar dataKey="before" name="Traditional Score" fill="var(--alert-red)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" name="Fair Lending Guardian" fill="var(--primary-green)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '24px' }}>TRACK Severity Scores (5 Dimensions)</h3>
        <div style={{ height: 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trackData} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="dimension" type="category" />
              <Tooltip formatter={(value: number) => [`${value}/100`, 'Score']} />
              <Bar dataKey="score" name="Severity Score" fill="var(--accent-green)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
