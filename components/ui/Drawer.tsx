import { ReactNode } from 'react';

export const Drawer = ({ open, children, onClose }: { open: boolean; children: ReactNode; onClose: () => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-panel p-4" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
