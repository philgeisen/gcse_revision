import { AuditRail } from '@/components/motifs/AuditRail';
import { Card } from '@/components/ui/Card';

export default function CardsPage() {
  return (
    <main className="space-y-6">
      <Card title="Cards">
        <div className="flex items-center gap-3">
          <AuditRail states={['planned', 'lock_in_pending']} />
          <div>
            <p className="text-sm text-text">6 cards due</p>
            <p className="text-xs text-subtext">Queue ready</p>
          </div>
        </div>
      </Card>
    </main>
  );
}
