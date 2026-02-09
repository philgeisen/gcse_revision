export const ProgressGlyphs = ({
  step,
  totalSteps,
  timeTarget,
  timeElapsed,
  winsRemaining
}: {
  step: number;
  totalSteps: number;
  timeTarget: number;
  timeElapsed: number;
  winsRemaining: number;
}) => {
  return (
    <div className="flex items-center gap-3 rounded-full border border-stroke px-3 py-2 text-xs" aria-label="Progress glyphs">
      <span className="text-subtext">S{step}/{totalSteps}</span>
      <span className="text-subtext">{timeElapsed}/{timeTarget}m</span>
      <span className="text-text">WIN x{winsRemaining}</span>
    </div>
  );
};
