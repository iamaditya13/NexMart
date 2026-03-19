'use client';

import { useRouter } from 'next/navigation';

export function StorefrontFallback() {
  const router = useRouter();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-[var(--primary)] uppercase">
        Temporary Service Issue
      </p>
      <h1 className="text-3xl font-black text-[var(--text)] md:text-4xl">
        Something went wrong. Please try again.
      </h1>
      <p className="max-w-xl text-sm leading-7 text-zinc-600 md:text-base">
        The storefront could not fetch inventory from the Fake Store API. Please
        refresh and retry in a moment.
      </p>
      <button
        type="button"
        onClick={() => {
          router.refresh();
        }}
        className="inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
      >
        Retry
      </button>
    </main>
  );
}
