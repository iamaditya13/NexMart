import Link from 'next/link';

export function LimitedEditionBanner() {
  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-4">
      <article className="grid gap-5 rounded-3xl border border-zinc-200 bg-[linear-gradient(120deg,#111,#23262f)] p-6 text-white md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.16em] text-zinc-300 uppercase">
            Special Drop
          </p>
          <h2 className="text-3xl font-black">Limited Edition Collection</h2>
          <p className="max-w-2xl text-sm text-zinc-300">
            Curated pieces with premium finish and short seasonal availability.
            Grab your favorites before stock runs out.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
        >
          Shop Collection
        </Link>
      </article>
    </section>
  );
}
