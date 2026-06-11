import { useState } from 'react';
import { getCounterfactual } from '../api/client';
import { ArrowRight, Activity } from 'lucide-react';

export default function CounterfactualSlider() {
  const [occupation, setOccupation] = useState('market vendor');
  const [subCounty, setSubCounty] = useState('Kakamega North');
  const [decision, setDecision] = useState('APPROVED');
  const [loading, setLoading] = useState(false);

  const handleToggleOccupation = async () => {
    const newOcc = occupation === 'market vendor' ? 'formal employee' : 'market vendor';
    setOccupation(newOcc);
    await updateSimulation(newOcc, subCounty);
  };

  const handleToggleSubCounty = async () => {
    const newLoc = subCounty === 'Kakamega North' ? 'Westlands Nairobi' : 'Kakamega North';
    setSubCounty(newLoc);
    await updateSimulation(occupation, newLoc);
  };

  const updateSimulation = async (occ: string, loc: string) => {
    setLoading(true);
    try {
      const res = await getCounterfactual(occ, loc);
      setDecision(res.routing_decision);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex flex-col gap-6" style={{ border: '1px solid var(--accent-green)' }}>
      <div className="flex items-center gap-2">
        <Activity color="var(--primary-green)" />
        <h3 style={{ margin: 0 }}>Counterfactual Simulator</h3>
      </div>
      
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Occupation Label</span>
            <button 
              className={occupation === 'market vendor' ? 'primary' : 'secondary'}
              onClick={handleToggleOccupation}
            >
              {occupation}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Sub-County</span>
            <button 
              className={subCounty === 'Kakamega North' ? 'primary' : 'secondary'}
              onClick={handleToggleSubCounty}
            >
              {subCounty}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 rounded" style={{ backgroundColor: 'var(--secondary-bg)' }}>
          <span style={{ fontSize: '0.875rem', color: '#666', marginBottom: '8px' }}>Routing Decision Update</span>
          {loading ? (
            <span className="badge" style={{ backgroundColor: '#ccc' }}>Simulating...</span>
          ) : (
            <div className="flex items-center gap-4">
               <span className="badge" style={{ backgroundColor: '#ccc', opacity: 0.5 }}>APPROVED</span>
               <ArrowRight size={16} color="#666" />
               <span className={`badge ${decision === 'APPROVED' ? 'green' : 'amber'}`} style={{ fontSize: '1rem', padding: '8px 16px' }}>
                 {decision}
               </span>
            </div>
          )}
          <p style={{ marginTop: '16px', fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>
            Changing labels instantly queries the routing logic.
          </p>
        </div>
      </div>
    </div>
  );
}
