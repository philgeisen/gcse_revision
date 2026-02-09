export const Stepper = ({ step }: { step: number }) => (
  <div className="flex gap-2" aria-label="Session steps">
    {[1, 2, 3, 4, 5].map((index) => (
      <div
        key={index}
        className={`h-2 w-8 rounded-full ${index <= step ? 'bg-text' : 'bg-stroke'}`}
      />
    ))}
  </div>
);
