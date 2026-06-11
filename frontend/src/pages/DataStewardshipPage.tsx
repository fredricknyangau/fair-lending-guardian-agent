import ConsentScript from '../components/ConsentScript';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Database, Lock, Server } from 'lucide-react';

const SWAHILI_SCRIPT = `Halo! Sisi ni Ujima SACCO.
Ili kukusaidia na mkopo wako, tunahitaji kuangalia ujumbe wako mfupi (SMS) kuhusu m-pesa na kilimo.
Haturuhusiwi kuuza data yako.
Je, unakubali? Jibu NDIO au HAPANA.`;

const LUHYA_SCRIPT = `Mirembe! Efwe khuli Ujima SACCO.
Khwenya khukenye SMS tsio tsia m-pesa nende obulimi khukhonye khu loan.
Sekhufuna khukusia data yio tawe.
Wikanile? Injusia NDIO naho HAPANA.`;

const DATA_RETENTION = [
  { name: 'Deleted < 24h', value: 75, color: 'var(--primary-green)' },
  { name: 'Anonymised Archive', value: 20, color: 'var(--accent-green)' },
  { name: 'Active Case File', value: 5, color: 'var(--warning-amber)' },
];

export default function DataStewardshipPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 style={{ margin: 0 }}>Data Stewardship (OASIS Framework)</h1>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="card flex flex-col gap-4">
            <h2 style={{ margin: 0 }}>OASIS Sovereignty Flow</h2>
            
            <div className="flex flex-col gap-0 relative">
              <div style={{ position: 'absolute', left: '16px', top: '24px', bottom: '24px', width: '2px', backgroundColor: 'var(--border-color)' }}></div>
              {[
                { o: 'O', title: 'Opt-in Consent', desc: 'Verified local language consent via SMS before any data extraction.' },
                { o: 'A', title: 'Anonymisation', desc: 'PII stripped at the edge device before hitting the CrewAI orchestration.' },
                { o: 'S', title: 'Sovereign Hosting', desc: '100% hosted in AWS Africa (Cape Town) region. Data never leaves the continent.' },
                { o: 'I', title: 'Intent Validation', desc: 'Algorithms audited for tracking only credit-relevant cashflows.' },
                { o: 'S', title: 'Sunset Protocol', desc: 'Auto-deletion of raw transaction data within 24 hours of decision.' }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 relative z-10" style={{ padding: '16px 0' }}>
                  <div className="flex items-center justify-center" style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', color: 'white', fontWeight: 'bold' }}>
                    {step.o}
                  </div>
                  <div className="flex flex-col">
                    <span style={{ fontWeight: 600 }}>{step.title}</span>
                    <span style={{ fontSize: '0.875rem', color: '#666' }}>{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ margin: '0 0 16px 0' }}>Data Retention Distribution</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DATA_RETENTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {DATA_RETENTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number) => [`${value}%`, 'Volume']} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card flex flex-col gap-4">
            <h2 style={{ margin: 0 }}>Localised Consent Scripts</h2>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>Culturally relevant opt-in requests delivered before data extraction.</p>
            <ConsentScript language="Swahili" scriptText={SWAHILI_SCRIPT} />
            <ConsentScript language="Luhya (Bukusu)" scriptText={LUHYA_SCRIPT} />
          </div>

          <div className="card flex flex-col gap-4">
            <h3 style={{ margin: 0 }}>Technical Security Specs</h3>
            
            <div className="grid grid-cols-2">
              <div className="flex items-start gap-3 p-4 rounded" style={{ backgroundColor: 'var(--secondary-bg)' }}>
                <Server color="var(--primary-green)" size={24} />
                <div>
                  <span style={{ fontWeight: 600, display: 'block', fontSize: '0.875rem' }}>Infrastructure</span>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>AWS af-south-1</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded" style={{ backgroundColor: 'var(--secondary-bg)' }}>
                <Lock color="var(--primary-green)" size={24} />
                <div>
                  <span style={{ fontWeight: 600, display: 'block', fontSize: '0.875rem' }}>Encryption</span>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>AES-256 / TLS 1.3</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded" style={{ backgroundColor: 'var(--secondary-bg)' }}>
                <Database color="var(--primary-green)" size={24} />
                <div>
                  <span style={{ fontWeight: 600, display: 'block', fontSize: '0.875rem' }}>Telemetry</span>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>Disabled locally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
