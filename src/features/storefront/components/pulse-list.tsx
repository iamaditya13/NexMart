import { routes } from '@/core/routing/utils';
import type { LiveCatalogCard } from '../normalizers';
import { usdFormatter } from '../utils';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa6';
import { FiArrowRight } from 'react-icons/fi';

type PulseListProps = {
  items: LiveCatalogCard[];
};

function getItemPath(item: LiveCatalogCard) {
  return routes.product({ productId: String(item.fakeProductId) });
}

export function PulseList({ items }: PulseListProps) {
  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-4">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black text-[var(--text)]">Trending Items</h2>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]"
        >
          View All
          <FiArrowRight />
        </Link>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.fakeProductId}
            className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-3 shadow-[0_6px_18px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_15px_26px_rgba(0,0,0,0.13)]"
          >
            <Link
              href={getItemPath(item)}
              className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--secondary-bg)]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="96px"
                className="object-contain p-2"
              />
            </Link>

            <div className="space-y-1">
              <p className="text-[0.65rem] tracking-[0.16em] text-zinc-500 uppercase">
                {item.categoryLabel}
              </p>
              <h3 className="text-sm font-semibold text-[var(--text)] md:text-base">
                <Link href={getItemPath(item)}>
                  {item.shortTitle}
                </Link>
              </h3>
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <FaStar className="text-[var(--primary)]" />
                <span>{item.rating.toFixed(1)}</span>
                <span>({item.reviews})</span>
              </div>
              <p className="text-sm font-bold text-[var(--text)]">
                {usdFormatter.format(item.price)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
