import { ArrowUpRight, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
}

export default function MetricCard({ label, value, delta, deltaPositive }: MetricCardProps) {
  return (
    <div className="card hoverable flex flex-col gap-2" style={{ padding: '24px' }}>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        {value}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className={`badge ${deltaPositive ? 'green' : 'amber'} flex items-center gap-1`} style={{ display: 'inline-flex', padding: '4px 10px', fontSize: '0.75rem' }}>
          {deltaPositive ? <ArrowUpRight size={14} /> : <Minus size={14} />}
          {delta}
        </span>
      </div>
    </div>
  );
}
