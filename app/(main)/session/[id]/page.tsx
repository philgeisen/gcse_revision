'use client';

import { useState } from 'react';
import { Stepper } from '@/components/ui/Stepper';
import { Timer } from '@/components/ui/Timer';
import { QuestionPane } from '@/components/session/QuestionPane';
import { WorkingPad } from '@/components/session/WorkingPad';
import { MarkPointsPanel } from '@/components/session/MarkPointsPanel';
import { ErrorTypeConfirm } from '@/components/session/ErrorTypeConfirm';
import { SessionMemoryStrip } from '@/components/session/SessionMemoryStrip';
import { RuleChipRow } from '@/components/motifs/RuleChipRow';
import { ProgressGlyphs } from '@/components/motifs/ProgressGlyphs';
import { SessionTape } from '@/components/motifs/SessionTape';
import { createEvent } from '@/lib/tape/tape';

export default function SessionPage() {
  const [step, setStep] = useState(3);
  const [seconds, setSeconds] = useState(300);
  const [events, setEvents] = useState([createEvent('mock', 'SESSION_START', {})]);

  const addEvent = (type: string, meta: Record<string, unknown>) => {
    setEvents((prev) => [...prev, createEvent('mock', type, meta)]);
  };

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Stepper step={step} />
        <Timer seconds={seconds} />
        <ProgressGlyphs step={step} totalSteps={5} timeTarget={45} timeElapsed={12} winsRemaining={2} />
      </div>
      <RuleChipRow
        rules={[
          { label: 'No Escalation', state: 'active', details: 'Difficulty stays stable.' },
          { label: 'Downgrade After 2 Fails', state: 'active', details: 'Protect confidence.' },
          { label: 'Retry Once', state: 'active', details: 'One retry.' },
          { label: 'End On Win', state: 'triggered', details: 'Lock-in pending.' },
          { label: 'Evidence-Grounded', state: 'inactive', details: 'No evidence yet.' }
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <QuestionPane prompt="Solve for x: 3x + 5 = 20">
            <textarea className="mt-3 w-full rounded border border-stroke bg-transparent p-2" rows={4} />
          </QuestionPane>
          <WorkingPad onSave={() => addEvent('WORKING_ATTACHED', { attemptId: 'mock' })} />
          <MarkPointsPanel points={['Correct rearrangement', 'Divide by 3', 'Final answer']} />
          <ErrorTypeConfirm errorType="Misread equation" onConfirm={() => addEvent('ERROR_CONFIRMED', { errorType: 'Misread equation' })} />
          <SessionMemoryStrip items={['Goal: Algebraic fractions', 'Missed: divide step']} />
        </div>
        <div className="space-y-4">
          <SessionTape events={events} />
        </div>
      </div>
    </main>
  );
}
