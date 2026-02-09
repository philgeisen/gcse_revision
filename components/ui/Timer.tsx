export const Timer = ({ seconds }: { seconds: number }) => {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return (
    <div className="rounded-full border border-stroke px-3 py-1 text-xs" aria-label="Timer">
      {minutes}:{remaining.toString().padStart(2, '0')}
    </div>
  );
};
