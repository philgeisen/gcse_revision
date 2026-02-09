import { AuditRail } from '@/components/motifs/AuditRail';
import { RuleChipRow } from '@/components/motifs/RuleChipRow';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';

export default function TodayPage() {
  return (
    <main className="space-y-6">
      <Card title="Next up">
        <div className="flex items-center gap-4">
          <AuditRail states={['planned', 'running', 'lock_in_pending']} />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Chip>Maths</Chip>
              <span className="text-sm text-subtext">Exam in 12 days</span>
            </div>
            <a
              href="/session/mock"
              className="rounded border border-stroke px-4 py-2 text-sm"
              aria-label="Start session"
            >
              Start Session
            </a>
          </div>
        </div>
        <div className="mt-4">
          <RuleChipRow
            rules={[
              { label: 'No Escalation', state: 'active', details: 'Difficulty stays stable.' },
              { label: 'Downgrade After 2 Fails', state: 'active', details: 'Protect confidence.' },
              { label: 'Retry Once', state: 'active', details: 'One retry per question.' },
              { label: 'End On Win', state: 'active', details: 'Session ends with wins.' },
              { label: 'Evidence-Grounded', state: 'inactive', details: 'No evidence yet.' }
            ]}
          />
        </div>
      </Card>
      <Card title="Today’s Focus">
        <div className="flex items-center gap-3">
          <AuditRail states={['planned', 'marking', 'lock_in_pending']} />
          <div>
            <p className="text-sm text-text">Algebraic fractions</p>
            <p className="text-xs text-subtext">Why: exam proximity + decay risk</p>
          </div>
        </div>
      </Card>
    </main>
  );
}
