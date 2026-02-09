import { ReactNode } from 'react';

export const Chip = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-stroke px-2 py-1 text-xs text-subtext">
    {children}
  </span>
);
