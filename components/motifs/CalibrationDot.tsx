export const CalibrationDot = ({ points }: { points: { x: number; y: number }[] }) => {
  return (
    <div className="relative h-28 w-28 rounded border border-stroke" aria-label="Calibration dot">
      {points.map((point, index) => (
        <span
          key={`${point.x}-${point.y}-${index}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-text"
          style={{
            left: `${point.x * 100}%`,
            bottom: `${point.y * 100}%`,
            transform: 'translate(-50%, 50%)'
          }}
        />
      ))}
      <div className="absolute bottom-1 left-1 text-[10px] text-subtext">Unsure</div>
      <div className="absolute bottom-1 right-1 text-[10px] text-subtext">Confident</div>
      <div className="absolute top-1 left-1 text-[10px] text-subtext">Right</div>
      <div className="absolute top-1 right-1 text-[10px] text-subtext">Wrong</div>
    </div>
  );
};
