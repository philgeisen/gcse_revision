import { useEffect } from 'react';

type Shortcut = {
  key: string;
  handler: (event: KeyboardEvent) => void;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
};

export const useShortcuts = (shortcuts: Shortcut[]) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const matchesKey = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const matchesMeta = shortcut.metaKey === undefined || shortcut.metaKey === event.metaKey;
        const matchesCtrl = shortcut.ctrlKey === undefined || shortcut.ctrlKey === event.ctrlKey;
        const matchesShift = shortcut.shiftKey === undefined || shortcut.shiftKey === event.shiftKey;
        if (matchesKey && matchesMeta && matchesCtrl && matchesShift) {
          shortcut.handler(event);
        }
      });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shortcuts]);
};
