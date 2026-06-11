import { useNavigate } from 'react-router-dom';
import MetricCard from './MetricCard';
import { Play, FileEdit } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, var(--primary-green) 0%, #0d5e4a 100%)', 
      padding: '64px 32px', 
      borderRadius: 'var(--radius-card)', 
      color: 'white',
      boxShadow: 'var(--shadow-lg)'
    }}>
      <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 700, letterSpacing: '-0.03em', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          Fair Lending Guardian
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9, fontWeight: 300, maxWidth: '600px' }}>
          Ethical AI for African Smallholder Farmers
        </p>
      </div>

      <div className="grid grid-cols-4 mb-12">
        <MetricCard label="Female vendor approval uplift" value="+37pp" delta="vs 68% baseline" deltaPositive={true} />
        <MetricCard label="Portfolio default ceiling" value="< 3%" delta="-portfolio target" deltaPositive={true} />
        <MetricCard label="Data sovereignty" value="100%" delta="+AWS Africa region" deltaPositive={true} />
        <MetricCard label="Human-in-loop limit" value="KES 15,000" delta="-all loans above" deltaPositive={false} />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 max-w-[600px] mx-auto mobile-col" style={{ maxWidth: 600, margin: '0 auto' }}>
        <button 
          className="secondary w-full"
          style={{ height: '54px', fontSize: '1.05rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          onClick={() => navigate('/demo', { state: { autoStart: true } })}
        >
          <Play size={20} /> Run Grace Demo
        </button>
        <button 
          className="secondary w-full"
          style={{ height: '54px', fontSize: '1.05rem', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
          onClick={() => navigate('/demo')}
        >
          <FileEdit size={20} /> Submit Custom Application
        </button>
      </div>
    </div>
  );
}
