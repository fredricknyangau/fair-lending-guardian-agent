import { useState } from 'react';
import { checkGuard } from '../api/client';
import { GuardCheckResult } from '../types';
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function GuardPlayground() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<GuardCheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await checkGuard(message, { "message_content": message });
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderStatusRow = (name: string, fired: boolean, action: string, actionColor: string) => (
    <div className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border-color)' }}>
      <div className="flex items-center gap-3">
        {fired ? <AlertTriangle color={actionColor} size={20} /> : <CheckCircle2 color="var(--primary-green)" size={20} />}
        <span style={{ fontWeight: 600 }}>{name}</span>
      </div>
      {fired && <span className={`badge`} style={{ backgroundColor: actionColor, color: 'white' }}>{action}</span>}
      {!fired && <span className="badge green">Passed</span>}
    </div>
  );

  return (
    <div className="card flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert color="var(--primary-green)" />
          GUARD Safety Rules Playground
        </h2>
        <p style={{ margin: 0, color: '#666' }}>Type any message to test the 4 pure Python safety functions.</p>
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Try words like: loan shark, gender, unreliable, drop 30..."
          rows={3}
          style={{ resize: 'vertical' }}
        />
        <button onClick={handleCheck} disabled={loading} className="primary w-[150px]" style={{ width: '150px' }}>
          {loading ? 'Testing...' : 'Check Message'}
        </button>
      </div>

      {result && (
        <div className="flex flex-col gap-3 mt-4">
          {result.all_clear && (
            <div className="p-4 rounded flex items-center gap-2" style={{ backgroundColor: 'var(--light-green-bg)', color: 'var(--primary-green)' }}>
              <CheckCircle2 size={24} />
              <span style={{ fontWeight: 600 }}>ALL CLEAR — No flags detected.</span>
            </div>
          )}
          
          {renderStatusRow('Kill Switch', result.kill_switch_fired, 'Escalate', 'var(--alert-red)')}
          {renderStatusRow('Proxy Block', result.proxy_block_fired, 'Block', 'var(--warning-amber)')}
          {renderStatusRow('Dignity Filter', result.dignity_filter_fired, 'Dignity Replace', '#F97316')}
          {renderStatusRow('Unusual Pattern', result.unusual_pattern_fired, 'SASRA Alert', '#3B82F6')}
        </div>
      )}
    </div>
  );
}
