function SkeletonTile() {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="h-40 animate-pulse bg-zinc-200" />
      <div className="space-y-2 p-4">
        <div className="h-2.5 w-20 animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200" />
        <div className="h-5 w-24 animate-pulse rounded bg-zinc-200" />
      </div>
    </article>
  );
}

export function NexmartHomeSkeleton() {
  return (
    <main className="pb-8">
      <section className="mx-auto mt-4 w-full max-w-7xl px-4">
        <div className="h-[420px] animate-pulse rounded-3xl border border-zinc-200 bg-zinc-200" />
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl px-4">
        <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, idx) => (
            <div key={idx} className="h-16 animate-pulse rounded-xl bg-zinc-200" />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }, (_, idx) => (
            <SkeletonTile key={idx} />
          ))}
        </div>
      </section>
    </main>
  );
}
