import { useState } from 'react';

type Command = {
  label: string;
  onSelect: () => void;
};

export const CommandPalette = ({ commands }: { commands: Command[] }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <button
        type="button"
        className="rounded border border-stroke px-3 py-2 text-xs text-subtext"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
      >
        Cmd+K
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-xl bg-panel p-4" onClick={(e) => e.stopPropagation()}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm"
              placeholder="Type a command"
              aria-label="Command palette search"
            />
            <div className="mt-3 space-y-2">
              {filtered.map((command) => (
                <button
                  key={command.label}
                  type="button"
                  className="flex w-full items-center justify-between rounded border border-stroke px-3 py-2 text-sm"
                  onClick={() => {
                    command.onSelect();
                    setOpen(false);
                  }}
                >
                  {command.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
