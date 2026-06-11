import BiasChart from '../components/BiasChart';
import CounterfactualSlider from '../components/CounterfactualSlider';
import { CheckCircle2 } from 'lucide-react';

const MOCK_DENIAL_DATA = [
  { group: 'Female Market Vendors', before: 32, after: 14 },
  { group: 'Male Formal Employees', before: 18, after: 17 },
  { group: 'Rural Smallholders', before: 45, after: 22 },
];

const MOCK_TRACK_DATA = [
  { dimension: 'Traceability', score: 95 },
  { dimension: 'Reliability', score: 88 },
  { dimension: 'Accountability', score: 92 },
  { dimension: 'Contextual Accuracy', score: 85 },
  { dimension: 'Knowledge Transfer', score: 78 },
];

export default function BiasAuditPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 style={{ margin: 0 }}>Bias Audit & TRACK Metrics</h1>
      </div>

      <div className="grid grid-cols-2">
        <BiasChart denialData={MOCK_DENIAL_DATA} trackData={MOCK_TRACK_DATA} />

        <div className="flex flex-col gap-6">
          <CounterfactualSlider />
          
          <div className="card">
            <h3 style={{ margin: '0 0 16px 0' }}>Resolved Bias Incidents</h3>
            <div className="flex flex-col gap-4">
              {[
                { id: 'Bug 1', text: 'Guardian routing gap (KES > 15,000 loans were not always escalated)' },
                { id: 'Bug 2', text: 'Guardian over-penalised seasonal income' },
                { id: 'Bug 3', text: 'Hunter Agent lost applicant age and dependant ages' }
              ].map(bug => (
                <div key={bug.id} className="flex items-start gap-3 p-3 rounded" style={{ backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border-color)' }}>
                  <CheckCircle2 color="var(--primary-green)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontWeight: 600, display: 'block' }}>{bug.id} Resolved</span>
                    <span style={{ fontSize: '0.875rem', color: '#444' }}>{bug.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
