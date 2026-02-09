import { AuditRail } from '@/components/motifs/AuditRail';
import { RuleChipRow } from '@/components/motifs/RuleChipRow';
import { Card } from '@/components/ui/Card';

export default function TestsPage() {
  return (
    <main className="space-y-6">
      <Card title="Tests">
        <div className="flex items-center gap-3">
          <AuditRail states={['planned']} />
          <div>
            <p className="text-sm text-text">Micro test • 10 mins</p>
            <p className="text-xs text-subtext">Generated from weak topics</p>
          </div>
        </div>
        <div className="mt-4">
          <RuleChipRow
            rules={[
              { label: 'No Escalation', state: 'active', details: 'No difficulty climb.' },
              { label: 'Retry Once', state: 'active', details: 'One retry.' },
              { label: 'End On Win', state: 'inactive', details: 'Applies to sessions.' },
              { label: 'Evidence-Grounded', state: 'inactive', details: 'Await content packs.' },
              { label: 'Downgrade After 2 Fails', state: 'active', details: 'Protect confidence.' }
            ]}
          />
        </div>
      </Card>
    </main>
  );
}
