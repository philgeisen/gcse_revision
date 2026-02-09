import { AuditRail } from '@/components/motifs/AuditRail';
import { Card } from '@/components/ui/Card';

export default function PlanPage() {
  return (
    <main className="space-y-6">
      <Card title="Plan">
        <div className="space-y-3">
          {['Today', 'Tomorrow', 'Next'].map((label) => (
            <div key={label} className="flex items-center gap-3 rounded border border-stroke p-3">
              <AuditRail states={['planned']} />
              <div>
                <p className="text-sm text-text">{label} • Maths • 50m</p>
                <p className="text-xs text-subtext">Reason: Exam soon</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
