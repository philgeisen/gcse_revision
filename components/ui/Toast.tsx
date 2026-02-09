export const Toast = ({ message }: { message: string }) => (
  <div className="rounded-full border border-stroke bg-panel px-3 py-2 text-xs text-subtext" aria-live="polite">
    {message}
  </div>
);
