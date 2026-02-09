import { v4 as uuidv4 } from 'uuid';

export type SessionTapeEvent = {
  id: string;
  sessionPlanId: string;
  ts: string;
  type: string;
  meta: Record<string, unknown>;
  externalId?: string;
};

export const formatEventSummary = (event: SessionTapeEvent) => {
  switch (event.type) {
    case 'MARK_COMPLETE':
      return `${event.meta.marksAwarded}/${event.meta.maxMarks}`;
    case 'DOWNGRADE_TRIGGERED':
      return `downgrade → diff ${event.meta.toDifficulty}`;
    case 'LOCKIN_PROGRESS':
      return `wins left ${event.meta.winsRemaining}`;
    default:
      return '';
  }
};

export const createEvent = (sessionPlanId: string, type: string, meta: Record<string, unknown>) => {
  return {
    id: uuidv4(),
    sessionPlanId,
    ts: new Date().toISOString(),
    type,
    meta,
    externalId: uuidv4()
  } satisfies SessionTapeEvent;
};
