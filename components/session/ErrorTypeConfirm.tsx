export const ErrorTypeConfirm = ({ errorType, onConfirm }: { errorType: string; onConfirm: () => void }) => (
  <div className="rounded-lg border border-stroke p-3">
    <p className="text-sm text-subtext">Suggested error type</p>
    <p className="text-sm text-text">{errorType}</p>
    <button type="button" className="mt-2 rounded border border-stroke px-3 py-1 text-xs" onClick={onConfirm}>
      Confirm
    </button>
  </div>
);
