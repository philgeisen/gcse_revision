import { useState } from 'react';
import { formatEventSummary, SessionTapeEvent } from '@/lib/tape/tape';

const filters = ['All', 'Marks', 'Rules', 'System'] as const;

type Filter = (typeof filters)[number];

const filterEvent = (event: SessionTapeEvent, filter: Filter) => {
  if (filter === 'All') return true;
  if (filter === 'Marks') return event.type.includes('MARK');
  if (filter === 'Rules') return event.type.includes('RETRY') || event.type.includes('DOWNGRADE') || event.type.includes('LOCKIN');
  return event.type.includes('SESSION') || event.type.includes('STEP') || event.type.includes('TIMER');
};

export const SessionTape = ({ events, onToggle }: { events: SessionTapeEvent[]; onToggle?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = events.filter((event) => filterEvent(event, filter));

  return (
    <div className="rounded-lg border border-stroke bg-panel p-3" aria-label="Session tape">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
            onToggle?.();
          }}
          className="text-xs uppercase tracking-[0.3em] text-subtext"
          aria-label="Toggle tape"
        >
          Tape
        </button>
        <div className="flex gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`text-[10px] uppercase tracking-[0.2em] ${filter === item ? 'text-text' : 'text-subtext'}`}
              onClick={() => setFilter(item)}
              aria-label={`Filter ${item}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {(open ? filtered : filtered.slice(-2)).map((event) => (
          <button
            key={event.id}
            type="button"
            className="flex w-full items-center justify-between rounded border border-stroke px-2 py-1 text-left text-xs"
            aria-label={`Tape event ${event.type}`}
            title={JSON.stringify(event.meta, null, 2)}
            onClick={() => navigator.clipboard.writeText(`${event.ts} — ${event.type} — ${formatEventSummary(event)}`)}
          >
            <span className="text-subtext">{new Date(event.ts).toLocaleTimeString()}</span>
            <span className="text-text">{event.type.replaceAll('_', ' ')}</span>
            <span className="text-subtext">{formatEventSummary(event)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
