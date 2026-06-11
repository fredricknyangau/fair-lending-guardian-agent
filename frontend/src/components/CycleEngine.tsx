import { useEffect, useState } from 'react';
import { getCycleMetrics } from '../api/client';
import { CycleMetrics as CycleMetricsType } from '../types';
import MetricCard from './MetricCard';
import { Settings, RefreshCw } from 'lucide-react';

export default function CycleEngine() {
  const [metrics, setMetrics] = useState<CycleMetricsType | null>(null);

  useEffect(() => {
    getCycleMetrics().then(setMetrics);
  }, []);

  if (!metrics) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <Settings color="var(--primary-green)" size={28} />
        <h2 style={{ margin: 0 }}>CYCLE Engine Dashboard</h2>
      </div>

      <div className="grid grid-cols-4">
        <MetricCard label="Member CSAT" value={metrics.csat.toString()} delta="" deltaPositive={true} />
        <MetricCard label="Escalation Rate" value={`${metrics.escalation_rate}%`} delta="" deltaPositive={true} />
        <MetricCard label="Resolution Time" value={`${metrics.avg_resolution_mins}m`} delta="" deltaPositive={true} />
        <MetricCard label="Dignity Blocks" value={metrics.dignity_blocks.toString()} delta="" deltaPositive={false} />
      </div>

      <div className="card" style={{ backgroundColor: 'var(--light-green-bg)', borderColor: 'var(--accent-green)' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--primary-green)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCw size={20} />
          Sunday 2AM EAT Analysis Summary
        </h3>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Automated scan completed. Top failure mode: <strong>{metrics.top_failure_mode}</strong>. 
          Corrective action: {metrics.fix_deployed}. System performance remains within target thresholds.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 style={{ margin: 0 }}>The Five CYCLE Steps</h3>
        {[
          { label: 'Capture', text: 'System ingested 142 applications and user feedback this week.' },
          { label: 'Yield', text: 'Identified that Scout agent was missing harvest data when member did not mention it explicitly in SMS.' },
          { label: 'Course-Correct', text: 'Updated Scout system prompt to infer likely harvest season based on sub-county location.' },
          { label: 'Loop Validation', text: 'Ran regression suite on 50 past cases; confirmed inference accuracy is >92%.' },
          { label: 'Explain', text: 'Deployed Sunday 2AM. Governance board and loan officers notified of the logic update.' }
        ].map((step, idx) => (
          <div key={idx} className="card flex items-center gap-6" style={{ padding: '16px 24px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-green)', opacity: 0.5 }}>
              0{idx + 1}
            </span>
            <div className="flex flex-col">
              <span style={{ fontWeight: 600, color: 'var(--primary-green)' }}>{step.label}</span>
              <span style={{ color: '#444' }}>{step.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
