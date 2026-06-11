import EldersCouncil from '../components/EldersCouncil';
import CycleEngine from '../components/CycleEngine';
import AuditLog from '../components/AuditLog';
import GuardPlayground from '../components/GuardPlayground';
import { ChevronDown } from 'lucide-react';

export default function GovernancePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <h1 style={{ margin: 0 }}>Governance & Oversight</h1>
      </div>

      <EldersCouncil />

      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="card">
            <h2 style={{ margin: '0 0 24px 0' }}>The PRIDE Loop</h2>
            <div className="flex flex-col gap-3">
              {[
                { title: 'Purpose-Driven Metrics', content: 'Optimising for financial inclusion uplift, not just default minimisation.' },
                { title: 'Rights of the Individual', content: 'Member appeal right (*#123#) built into every decline SMS.' },
                { title: 'Inclusive Data Representation', content: 'Seasonal agricultural cashflows explicitly modeled as expected, not anomalous.' },
                { title: 'Dignity in Design', content: 'Hard block on words like "unreliable", "risky", "informal", and "irregular" in all agent outputs.' },
                { title: 'Ecosystem Responsibility', content: 'SASRA integration and automated regulatory alerts.' },
              ].map((item, idx) => (
                <details key={idx} style={{ 
                  backgroundColor: 'var(--secondary-bg)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, cursor: 'pointer', listStyle: 'none' }}>
                    {item.title}
                    <ChevronDown size={18} />
                  </summary>
                  <p style={{ margin: '12px 0 0 0', fontSize: '0.875rem', color: '#444' }}>{item.content}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ margin: '0 0 16px 0' }}>Kill Switch Protocol</h3>
            <table style={{ width: '100%', fontSize: '0.875rem', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '8px' }}>Switch</th>
                  <th style={{ padding: '8px' }}>Dial</th>
                  <th style={{ padding: '8px' }}>Scope</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px', fontWeight: 600 }}>Scout Kill Switch</td>
                  <td style={{ padding: '8px' }}>700</td>
                  <td style={{ padding: '8px' }}>Pauses Scout outbound SMS</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px', fontWeight: 600 }}>Guardian Kill Switch</td>
                  <td style={{ padding: '8px' }}>733</td>
                  <td style={{ padding: '8px' }}>Pauses Guardian scoring</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px', fontWeight: 600, color: 'var(--alert-red)' }}>Full System Kill Switch</td>
                  <td style={{ padding: '8px', color: 'var(--alert-red)', fontWeight: 'bold' }}>799</td>
                  <td style={{ padding: '8px', color: 'var(--alert-red)' }}>Pauses all agents, convenes Council</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', fontWeight: 600 }}>Member Appeal</td>
                  <td style={{ padding: '8px' }}>*#123#</td>
                  <td style={{ padding: '8px' }}>Free, zero credit score impact</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <CycleEngine />
        </div>
      </div>
      
      <div className="grid grid-cols-2">
        <GuardPlayground />
        
        <div className="card">
          <h2 style={{ margin: '0 0 16px 0' }}>Known Limitations Tracker</h2>
          <table style={{ width: '100%', fontSize: '0.875rem', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px' }}>Limitation</th>
                <th style={{ padding: '8px' }}>Planned Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px' }}>M-Pesa inflow data is hardcoded</td>
                <td style={{ padding: '8px', color: '#666' }}>Connect to real M-Pesa statement parser</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px' }}>52-week inflows are not fetched live</td>
                <td style={{ padding: '8px', color: '#666' }}>Integrate Safaricom Open API</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px' }}>No multilingual SMS output</td>
                <td style={{ padding: '8px', color: '#666' }}>Add Swahili and Dholuo output modes</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px' }}>SASRA notification is a stub</td>
                <td style={{ padding: '8px', color: '#666' }}>Wire to real alerting channel (email/SMS)</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>Gemini 503 transient errors on Hunter turn</td>
                <td style={{ padding: '8px', color: '#666' }}>Add explicit retry loop (Done)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mt-8">
        <AuditLog />
      </div>
    </div>
  );
}
