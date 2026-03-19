import ProductCard from '../../../../components/ProductCard';
import type { LiveCatalogCard } from '../normalizers';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

type FlagshipCarouselProps = {
  items: LiveCatalogCard[];
};

export function FlagshipCarousel({ items }: FlagshipCarouselProps) {
  return (
    <section id="featured-products" className="mx-auto mt-10 w-full max-w-7xl px-4">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black text-[var(--text)]">Featured Products</h2>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[#d93b00]"
        >
          View All
          <FiArrowRight />
        </Link>
      </header>

      <div className="overflow-x-auto pb-3">
        <div className="flex min-w-max gap-4">
          {items.map((item) => (
            <div key={item.fakeProductId} className="w-[250px] shrink-0">
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
    </section>
  );
}
