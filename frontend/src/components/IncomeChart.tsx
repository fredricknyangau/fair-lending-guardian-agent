import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import { getGraceData } from '../api/client';
import { GraceData } from '../types';

export default function IncomeChart() {
  const [data, setData] = useState<GraceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGraceData().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return <div className="card p-8 text-center">Loading income data...</div>;
  }

  const chartData = data.weekly_inflows.map((amount, index) => ({
    week: `W${index + 1}`,
    amount,
    weekNum: index + 1
  }));

  return (
    <div className="card flex flex-col gap-4">
      <div className="text-center">
        <h3 style={{ margin: 0, color: 'var(--primary-green)' }}>Grace Achieng: 52-week M-Pesa income pattern</h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.875rem', color: '#666' }}>
          A traditional algorithm sees the dips and rejects this application. Fair Lending Guardian sees the full picture.
        </p>
      </div>

      <div style={{ height: 400, width: '100%', marginTop: '24px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} interval={3} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(val) => `KSh ${val}`} />
            <Tooltip formatter={(value: number) => [`KES ${value}`, 'Income']} />
            
            {/* School Fees Season (Jan, approx weeks 1-4) */}
            <ReferenceArea x1="W1" x2="W4" fill="var(--warning-amber)" fillOpacity={0.1} />
            <text x={40} y={20} fill="var(--warning-amber)" fontSize={12} fontWeight="bold">School fees season</text>
            
            {/* Harvest Season 1 (Mar-Apr, approx weeks 9-17) */}
            <ReferenceArea x1="W9" x2="W17" fill="var(--primary-green)" fillOpacity={0.1} />
            <text x={180} y={20} fill="var(--primary-green)" fontSize={12} fontWeight="bold">Harvest season</text>

            {/* Harvest Season 2 (Sep-Oct, approx weeks 36-44) */}
            <ReferenceArea x1="W36" x2="W44" fill="var(--primary-green)" fillOpacity={0.1} />
            <text x={650} y={20} fill="var(--primary-green)" fontSize={12} fontWeight="bold">Harvest season</text>

            <ReferenceLine y={data.average_weekly_inflow} stroke="#64748b" strokeDasharray="3 3" />
            <text x={10} y={220} fill="#64748b" fontSize={12}>Average weekly inflow</text>

            <Line type="monotone" dataKey="amount" stroke="var(--primary-green)" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
