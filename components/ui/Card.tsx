import { ReactNode } from 'react';

export const Card = ({ title, children }: { title?: string; children: ReactNode }) => (
  <div className="rounded-xl border border-stroke bg-panel p-4">
    {title && <h3 className="text-sm uppercase tracking-[0.2em] text-subtext">{title}</h3>}
    <div className="mt-3">{children}</div>
  </div>
);
