export const SessionMemoryStrip = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2" aria-label="Session memory strip">
    {items.map((item) => (
      <span key={item} className="rounded-full border border-stroke px-3 py-1 text-xs text-subtext">
        {item}
      </span>
    ))}
  </div>
);
