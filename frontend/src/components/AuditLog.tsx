import { useEffect, useState } from 'react';
import { getAuditLog } from '../api/client';
import { AuditLogEntry } from '../types';
import { ListTodo } from 'lucide-react';

export default function AuditLog() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuditLog().then(data => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="card text-center p-8">Loading audit logs...</div>;

  const getBorderColor = (decision: string) => {
    if (decision === 'APPROVED') return 'var(--primary-green)';
    if (decision === 'DECLINED') return 'var(--alert-red)';
    return 'var(--warning-amber)'; // ESCALATED or other
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-4">
        <ListTodo color="var(--primary-green)" />
        <h2 style={{ margin: 0 }}>System Audit Log</h2>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', textAlign: 'left' }}>
          <thead>
            <tr style={{ color: '#666', fontSize: '0.875rem' }}>
              <th style={{ padding: '0 16px' }}>Timestamp</th>
              <th>Applicant</th>
              <th>Amount (KES)</th>
              <th>Routing Decision</th>
              <th>Officer Assigned</th>
              <th>GUARD Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} style={{ backgroundColor: 'var(--neutral-bg)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <td style={{ padding: '16px', borderLeft: `4px solid ${getBorderColor(log.routing_decision)}`, borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                  <span style={{ fontSize: '0.875rem', color: '#666' }}>{log.timestamp}</span>
                </td>
                <td style={{ fontWeight: 600 }}>{log.applicant_name}</td>
                <td>{log.loan_amount.toLocaleString()}</td>
                <td>
                  <span className={`badge ${log.routing_decision === 'APPROVED' ? 'green' : log.routing_decision === 'DECLINED' ? 'red' : 'amber'}`}>
                    {log.routing_decision}
                  </span>
                </td>
                <td>{log.officer_assigned || '-'}</td>
                <td style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>
                  <span className={`badge ${log.guard_checks_passed ? 'green' : 'red'}`}>
                    {log.guard_checks_passed ? 'Passed' : 'Failed'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
