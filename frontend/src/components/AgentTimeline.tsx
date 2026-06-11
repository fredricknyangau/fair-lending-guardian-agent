import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Step {
  id: string;
  label: string;
  output: string;
}

interface AgentTimelineProps {
  steps: Step[];
  isLoading: boolean;
}

export default function AgentTimeline({ steps, isLoading }: AgentTimelineProps) {
  const [visibleSteps, setVisibleSteps] = useState<number>(0);

  useEffect(() => {
    if (steps.length === 0) {
      setVisibleSteps(0);
      return;
    }

    let interval: any;
    if (!isLoading && steps.length > 0) {
      // Simulate sequential appearance with 500ms delay
      interval = setInterval(() => {
        setVisibleSteps(prev => {
          if (prev < steps.length) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 500);
    } else if (isLoading) {
      setVisibleSteps(0);
    }

    return () => clearInterval(interval);
  }, [isLoading, steps.length]);

  if (steps.length === 0 && !isLoading) return null;

  return (
    <div className="flex flex-col gap-6">
      {isLoading && (
        <div className="flex items-center gap-4 text-gray-600">
          <Loader2 className="animate-spin" size={24} color="var(--primary-green)" />
          <span style={{ fontWeight: 600 }}>Agents are analyzing application...</span>
        </div>
      )}

      {!isLoading && steps.slice(0, visibleSteps).map((step, index) => (
        <div key={step.id} className="flex gap-4" style={{ opacity: 1, transition: 'opacity 0.3s ease-in' }}>
          <div className="flex flex-col items-center">
            <CheckCircle2 color="var(--accent-green)" size={28} />
            {index < steps.length - 1 && (
              <div style={{ width: 2, height: '100%', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />
            )}
          </div>
          <div className="flex flex-col gap-2 pb-6 flex-1">
            <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{step.label}</span>
            <div className="card hoverable" style={{ padding: '20px', backgroundColor: 'var(--secondary-bg)', border: '1px solid rgba(8, 80, 65, 0.1)' }}>
              <div className="prose w-full" style={{ maxWidth: 'none' }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{step.output}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
