import { ReactNode } from 'react';

export const QuestionPane = ({ prompt, children }: { prompt: string; children?: ReactNode }) => (
  <div className="space-y-3 rounded-xl border border-stroke bg-panel p-4">
    <h3 className="text-sm uppercase tracking-[0.2em] text-subtext">Question</h3>
    <p className="text-base text-text">{prompt}</p>
    {children}
  </div>
);
