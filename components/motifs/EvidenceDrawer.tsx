import { AuditRail } from '@/components/motifs/AuditRail';

export type EvidenceChunk = {
  chunkId: string;
  title: string;
  kind: string;
  snippet: string;
};

export const EvidenceDrawer = ({
  open,
  onClose,
  chunks
}: {
  open: boolean;
  onClose: () => void;
  chunks: EvidenceChunk[];
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end bg-black/40"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md bg-panel p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <AuditRail states={['evidence-grounded']} />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Evidence</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-subtext"
                aria-label="Close evidence drawer"
              >
                Close
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {chunks.map((chunk) => (
                <div key={chunk.chunkId} className="rounded-lg border border-stroke p-3">
                  <div className="text-xs uppercase text-subtext">
                    {chunk.kind} • {chunk.title}
                  </div>
                  <p className="mt-2 text-sm text-text">{chunk.snippet}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 rounded border border-stroke px-3 py-2 text-sm"
              onClick={() => {
                const payload = chunks.map((chunk) => chunk.chunkId).join(', ');
                navigator.clipboard.writeText(payload);
              }}
              aria-label="Copy citations"
            >
              Copy citations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
