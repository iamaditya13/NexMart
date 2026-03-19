import { getMetadata } from '@/core/seo/utils';
import Link from 'next/link';

export const metadata = getMetadata({
  title: 'Not Found',
  description: 'The page you requested does not exist in NexMart.',
  pathname: '/404',
});

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[65vh] w-full max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-[var(--primary)] uppercase">
        Error 404
      </p>
      <h1 className="mt-3 text-4xl font-black text-[var(--text)] md:text-5xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600 md:text-base">
        The link may be outdated or moved. Continue shopping from the homepage or
        browse the full product catalog.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/"
          className="inline-flex rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="inline-flex rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
}
