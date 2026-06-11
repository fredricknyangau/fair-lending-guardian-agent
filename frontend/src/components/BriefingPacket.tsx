import { ShieldAlert, UserCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BriefingPacketProps {
  packet: string;
}

export default function BriefingPacket({ packet }: BriefingPacketProps) {
  if (!packet) return null;

  return (
    <div className="card hoverable" style={{ borderLeft: '6px solid var(--primary-green)' }}>
      <div className="flex items-center gap-2 mb-6">
        <UserCheck size={28} color="var(--primary-green)" />
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Final Briefing Packet</h2>
      </div>
      
      <div className="prose w-full" style={{ maxWidth: 'none' }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{packet}</ReactMarkdown>
      </div>

      <div className="mt-8 p-4 rounded" style={{ backgroundColor: 'var(--light-green-bg)', border: '1px solid var(--accent-green)' }}>
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert size={20} color="var(--primary-green)" />
          <span style={{ fontWeight: 600, color: 'var(--primary-green)' }}>PRIDE Loop Pause Point</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          This briefing packet is advisory only. A named human loan officer must make the final decision.
          Officer SLA: 15 minutes. Member appeal right: dial *#123#
        </p>
      </div>
    </div>
  );
}
