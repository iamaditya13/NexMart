'use client';

import { useState } from 'react';

const COOKIE_KEY = 'nexmart.cookie.accepted';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem(COOKIE_KEY);
  });

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 z-50 mx-auto w-full max-w-2xl rounded-2xl border border-zinc-200 bg-[var(--surface)] p-4 shadow-[0_24px_48px_rgba(0,0,0,0.18)]">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        We use cookies to improve shopping experience and analytics. By continuing,
        you agree to our cookie policy.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(COOKIE_KEY, 'yes');
            setIsVisible(false);
          }}
          className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
          }}
          className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
