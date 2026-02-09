'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { useState } from 'react';

const tabs = [
  { href: '/today', label: 'Today' },
  { href: '/plan', label: 'Plan' },
  { href: '/tests', label: 'Tests' },
  { href: '/cards', label: 'Cards' },
  { href: '/analytics', label: 'Analytics' }
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <div className="min-h-screen pb-20">
      <div className="p-6">{children}</div>
      <div className="fixed bottom-0 left-0 right-0 border-t border-stroke bg-panel">
        <nav className="flex items-center justify-around p-3">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`text-xs uppercase tracking-[0.2em] ${pathname === tab.href ? 'text-text' : 'text-subtext'}`}
            >
              {tab.label}
            </Link>
          ))}
          <CommandPalette
            commands={tabs.map((tab) => ({
              label: tab.label,
              onSelect: () => (window.location.href = tab.href)
            }))}
          />
          <button
            type="button"
            className="text-xs uppercase tracking-[0.2em] text-subtext"
            onClick={() => setShowShortcuts(true)}
            aria-label="Show shortcuts"
          >
            ?
          </button>
        </nav>
      </div>
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowShortcuts(false)}>
          <div className="w-full max-w-md rounded-xl bg-panel p-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-sm uppercase tracking-[0.2em] text-subtext">Shortcuts</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Cmd/Ctrl+K: Command palette</li>
              <li>T/P/E/C/A: Navigate</li>
              <li>?: Shortcuts</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
