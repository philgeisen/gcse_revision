export const MarkPointsPanel = ({ points }: { points: string[] }) => (
  <div className="rounded-lg border border-stroke p-3">
    <h4 className="text-xs uppercase tracking-[0.2em] text-subtext">Mark points</h4>
    <ul className="mt-2 space-y-1 text-sm">
      {points.map((point) => (
        <li key={point} className="text-text">
          {point}
        </li>
      ))}
    </ul>
  </div>
);
