import {
  FiHeadphones,
  FiRotateCcw,
  FiShield,
  FiTruck,
} from 'react-icons/fi';

const credibilityPills = [
  {
    title: 'Responsive',
    description: 'Customer support available 24/7',
    icon: FiHeadphones,
  },
  {
    title: 'Secure',
    description: 'Certified marketplace since 2017',
    icon: FiShield,
  },
  {
    title: 'Shipping',
    description: 'Free, fast, and reliable worldwide',
    icon: FiTruck,
  },
  {
    title: 'Transparent',
    description: 'Hassle-free return policy',
    icon: FiRotateCcw,
  },
];

export function CredibilityRow() {
  return (
    <section className="mx-auto mt-8 w-full max-w-7xl px-4" aria-label="Trust badges">
      <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-[var(--surface)] p-4 md:grid-cols-2 xl:grid-cols-4">
        {credibilityPills.map((pill) => (
          <article
            key={pill.title}
            className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-[var(--secondary-bg)] p-3 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface)] text-lg text-[var(--primary)] shadow-sm">
              <pill.icon />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text)]">{pill.title}</h3>
              <p className="text-xs text-zinc-500">{pill.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
