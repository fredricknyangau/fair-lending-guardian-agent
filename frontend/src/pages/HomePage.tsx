import Hero from '../components/Hero';
import { Shield, BarChart3, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      
      <div className="grid grid-cols-3">
        <Link to="/bias-audit" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card hoverable h-full flex flex-col gap-4">
            <BarChart3 color="var(--primary-green)" size={32} />
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Bias Audit</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>Review before/after approval rates and TRACK severity scores.</p>
          </div>
        </Link>

        <Link to="/data-stewardship" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card hoverable h-full flex flex-col gap-4">
            <Database color="var(--primary-green)" size={32} />
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Data Stewardship</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>OASIS framework compliance, data sovereignty, and consent scripts.</p>
          </div>
        </Link>

        <Link to="/governance" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card hoverable h-full flex flex-col gap-4">
            <Shield color="var(--primary-green)" size={32} />
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Governance</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>Elders council, CYCLE engine metrics, and PRIDE loop controls.</p>
          </div>
        </Link>
      </div>

      <div className="card hoverable" style={{ padding: '40px' }}>
        <div className="prose w-full" style={{ maxWidth: 'none' }}>
          <h2>The Problem</h2>
          <p>Traditional credit scoring algorithms penalize rural farmers and market vendors in Kenya and Uganda. Because agricultural income is seasonal, these algorithms flag their cashflow dips as "high risk" or "unstable", leading to systemic financial exclusion.</p>
          
          <h2>The Solution: Agent Savannah</h2>
          <p>We replaced the static algorithms with a CrewAI orchestration of three distinct AI personas, protected by the GUARD safety layer:</p>
          <ul>
            <li><strong>Scout Agent</strong>: Parses raw SMS text to identify localized financial stress signals.</li>
            <li><strong>Guardian Agent</strong>: Re-evaluates 52-week cashflow patterns to explicitly separate expected seasonal dips from actual default risk.</li>
            <li><strong>Hunter Agent</strong>: Coordinates the final hand-off, passing the analysis securely to a specialized human loan officer.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
