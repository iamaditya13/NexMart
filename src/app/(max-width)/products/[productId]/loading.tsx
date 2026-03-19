export default function ProductLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="h-5 w-32 animate-pulse rounded bg-zinc-200" />

      <section className="mt-4 grid gap-6 rounded-3xl border border-zinc-200 bg-[var(--surface)] p-5 md:grid-cols-[minmax(280px,400px)_1fr]">
        <div className="h-[420px] animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-700/60" />

        <div className="space-y-3">
          <div className="h-6 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700/60" />
          <div className="h-8 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700/60" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700/60" />
          <div className="h-8 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700/60" />
          <div className="h-28 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700/60" />
          <div className="h-11 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700/60" />
        </div>
      </section>
    </main>
  );
}
