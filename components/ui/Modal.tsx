import { ReactNode } from 'react';

export const Modal = ({ open, children, onClose }: { open: boolean; children: ReactNode; onClose: () => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-panel p-4" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
