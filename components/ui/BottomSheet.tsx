import { ReactNode } from 'react';

export const BottomSheet = ({ open, children, onClose }: { open: boolean; children: ReactNode; onClose: () => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="w-full rounded-t-2xl bg-panel p-4" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
