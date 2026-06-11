import { Users } from 'lucide-react';

const ELDERS = [
  { role: 'Community Elder (Veto)', name: 'Mama Nafula', area: 'Kakamega', isVeto: true },
  { role: 'Lead Loan Officer', name: 'James Omondi', area: 'Credit Dept', isVeto: false },
  { role: 'Data Steward', name: 'Dr. Kiprop', area: 'IT & Security', isVeto: false },
  { role: 'Legal Rep', name: 'Wanjiku & Co.', area: 'Compliance', isVeto: false },
  { role: 'Women\'s Rep', name: 'Sarah A.', area: 'Market Committee', isVeto: false },
  { role: 'Agricultural Expert', name: 'Peter M.', area: 'Agri-extension', isVeto: false },
  { role: 'Youth Rep', name: 'Brian K.', area: 'Boda-Boda SACCO', isVeto: false },
];

export default function EldersCouncil() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Users color="var(--primary-green)" size={28} />
        <h2 style={{ margin: 0 }}>The Elders Council (Oversight Board)</h2>
      </div>

      <div className="grid grid-cols-3">
        {ELDERS.map((elder, idx) => (
          <div 
            key={idx} 
            className="card flex flex-col gap-2" 
            style={{ 
              borderColor: elder.isVeto ? 'var(--alert-red)' : 'var(--border-color)',
              borderWidth: elder.isVeto ? '2px' : '1px'
            }}
          >
            <div className="flex justify-between items-start">
              <span style={{ fontWeight: 600, color: 'var(--primary-green)', fontSize: '0.875rem' }}>{elder.role}</span>
              {elder.isVeto && (
                <span className="badge red" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>Binding veto</span>
              )}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{elder.name}</div>
            <div style={{ color: '#666', fontSize: '0.875rem' }}>{elder.area}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
