import { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

interface ConsentScriptProps {
  language: string;
  scriptText: string;
}

export default function ConsentScript({ language, scriptText }: ConsentScriptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
      <div className="flex items-center justify-between p-3" style={{ backgroundColor: '#1e293b', color: 'white' }}>
        <span className="badge" style={{ backgroundColor: 'var(--primary-green)', color: 'white' }}>
          {language.toUpperCase()}
        </span>
        <button 
          onClick={handleCopy} 
          style={{ background: 'transparent', color: 'white', border: 'none', minHeight: 'auto', padding: '4px' }}
          title="Copy script"
        >
          {copied ? <CheckCircle2 size={18} color="var(--accent-green)" /> : <Copy size={18} />}
        </button>
      </div>
      <div style={{ backgroundColor: '#0f172a', padding: '16px' }}>
        <pre style={{ margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.875rem' }}>
          {scriptText}
        </pre>
      </div>
    </div>
  );
}
