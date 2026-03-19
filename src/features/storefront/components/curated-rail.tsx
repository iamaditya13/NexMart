import ProductCard from '../../../../components/ProductCard';
import type { LiveCatalogCard } from '../normalizers';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

type CuratedRailProps = {
  items: LiveCatalogCard[];
};

export function CuratedRail({ items }: CuratedRailProps) {
  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-4">
      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-zinc-200 bg-[var(--secondary-bg)] p-6">
          <p className="text-xs font-semibold tracking-[0.16em] text-zinc-600 uppercase">
            Handpicked
          </p>
          <h2 className="mt-2 text-3xl font-black text-[var(--text)]">
            Recommended Products
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Discover picks chosen by our merch team for quality, value, and
            customer ratings.
          </p>
          <Link
            href="/products"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]"
          >
            View All
            <FiArrowRight />
          </Link>
        </aside>

        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max gap-4">
            {items.map((item) => (
              <div key={item.fakeProductId} className="w-[230px] shrink-0">
                <ProductCard
                  id={item.fakeProductId}
                  title={item.title}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  salePercent={item.salePercent}
                  image={item.image}
                  category={item.filterGroup}
                  rating={{ rate: item.rating, count: item.reviews }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
