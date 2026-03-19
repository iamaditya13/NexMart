import { getMetadata } from '@/core/seo/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FiGlobe, FiPackage, FiShield, FiTruck } from 'react-icons/fi';

const storeHighlights = [
  {
    title: 'Global Assortment',
    description: 'Multi-category inventory curated for modern everyday shopping.',
    icon: FiGlobe,
  },
  {
    title: 'Secure Commerce',
    description: 'Transparent checkout flow with reliable payment protection.',
    icon: FiShield,
  },
  {
    title: 'Reliable Shipping',
    description: 'Fast dispatch and trackable delivery across supported regions.',
    icon: FiTruck,
  },
  {
    title: 'Smart Curation',
    description: 'High-value picks balanced for quality, ratings, and affordability.',
    icon: FiPackage,
  },
];

export const metadata: Metadata = getMetadata({
  title: 'About',
  description: 'Learn more about NexMart and our shopping experience.',
  pathname: '/about',
});

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-[radial-gradient(circle_at_10%_10%,rgba(255,69,0,0.2),transparent_40%),var(--surface)] p-6 md:p-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--primary)] uppercase">
          About NexMart
        </p>
        <h1 className="mt-2 text-4xl font-black text-[var(--text)]">
          Everything. Everywhere. Every Day.
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 md:text-base">
          NexMart is a portfolio-first, modern e-commerce storefront concept focused on
          fast discovery, clear product storytelling, and seamless checkout journeys.
          Built on Next.js and the Fake Store API, it showcases a complete front-end
          architecture for real-world commerce experiences.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/products"
            className="inline-flex rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
          >
            Browse Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            Contact Team
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {storeHighlights.map((entry) => (
          <article
            key={entry.title}
            className="rounded-2xl border border-zinc-200 bg-[var(--surface)] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/10 text-lg text-[var(--primary)]">
              <entry.icon />
            </div>
            <h2 className="mt-3 text-lg font-black text-[var(--text)]">{entry.title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{entry.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
