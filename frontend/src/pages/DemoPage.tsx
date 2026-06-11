import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AgentTimeline from '../components/AgentTimeline';
import BriefingPacket from '../components/BriefingPacket';
import IncomeChart from '../components/IncomeChart';
import { applyForLoan } from '../api/client';
import { LoanApplication, AgentResult } from '../types';
import { Play } from 'lucide-react';

const DEFAULT_FORM: LoanApplication = {
  applicant_name: 'Grace Achieng',
  age: 42,
  occupation: 'maize farmer',
  sub_county: 'Kakamega North',
  loan_amount: 28000,
  loan_purpose: 'school fees Term 1',
  num_children: 3,
  previous_repayment: true,
  member_sms: 'No money for school fees this term',
  language: 'english'
};

export default function DemoPage() {
  const location = useLocation();
  const [form, setForm] = useState<LoanApplication>(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AgentResult | null>(null);

  useEffect(() => {
    if (location.state?.autoStart) {
      handleRunDemo();
    }
  }, [location.state]);

  const handleRunDemo = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await applyForLoan(form);
      setResult(res);
    } catch (e) {
      console.error(e);
      alert('Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  const steps = result ? [
    { id: 'scout', label: 'Scout Agent (Financial Stress Context)', output: result.scout_output || 'Analysis complete.' },
    { id: 'guardian', label: 'Guardian Agent (52-week Cashflow Score)', output: result.guardian_output || 'Scoring complete.' },
    { id: 'guard', label: 'GUARD Safety Layer', output: result.guard_checks_passed ? 'All safety checks passed.' : 'Safety checks failed.' },
    { id: 'hunter', label: 'Hunter Agent (Briefing Packet)', output: result.hunter_output ? 'Briefing packet generated.' : 'Failed to generate packet.' }
  ] : [];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 style={{ margin: 0 }}>Live Simulation</h1>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="card">
            <h2 style={{ margin: '0 0 16px 0' }}>Applicant Profile</h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Name</label>
                  <input value={form.applicant_name} onChange={e => setForm({...form, applicant_name: e.target.value})} />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Age</label>
                  <input type="number" value={form.age} onChange={e => setForm({...form, age: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Occupation</label>
                  <input value={form.occupation} onChange={e => setForm({...form, occupation: e.target.value})} />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Sub-county</label>
                  <input value={form.sub_county} onChange={e => setForm({...form, sub_county: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Loan Amount (KES)</label>
                  <input type="number" value={form.loan_amount} onChange={e => setForm({...form, loan_amount: parseFloat(e.target.value)})} />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Loan Purpose</label>
                  <input value={form.loan_purpose} onChange={e => setForm({...form, loan_purpose: e.target.value})} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Member SMS Message</label>
                <textarea rows={3} value={form.member_sms} onChange={e => setForm({...form, member_sms: e.target.value})} />
              </div>
              <button 
                className="primary w-full flex items-center justify-center gap-2 mt-4"
                onClick={handleRunDemo}
                disabled={loading}
              >
                <Play size={18} /> {loading ? 'Running AI Safari...' : 'Run Agent Pride — Process Application'}
              </button>
            </div>
          </div>
          
          <IncomeChart />
        </div>

        <div className="flex flex-col gap-6">
          <div className="card h-full" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <h2 style={{ margin: '0 0 24px 0' }}>Agent Orchestration Timeline</h2>
            {(!loading && !result) ? (
              <div style={{ color: '#666', textAlign: 'center', padding: '48px 0' }}>
                Submit an application to see the agents in action.
              </div>
            ) : (
              <AgentTimeline steps={steps} isLoading={loading} />
            )}
            
            {result && result.briefing_packet && (
              <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
                <BriefingPacket packet={result.briefing_packet} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
