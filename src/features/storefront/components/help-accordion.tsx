import { storefrontFaq } from '../data/content.js';

export function HelpAccordion() {
  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-4" id="faq">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6">
        <h2 className="text-center text-2xl font-black text-[var(--text)]">
          Frequently Asked Questions
        </h2>

        <div className="mx-auto mt-6 max-w-3xl space-y-3">
          {storefrontFaq.map((entry, index) => (
            <details
              key={entry.question}
              open={index === 0}
              className="group overflow-hidden rounded-xl border border-zinc-200"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 bg-white px-4 py-3 text-sm font-semibold text-[var(--text)]">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                {entry.question}
              </summary>
              <div className="border-t border-zinc-200 bg-[var(--secondary-bg)] px-4 py-3 text-sm leading-7 text-zinc-600">
                {entry.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
