'use client';

import { fetchProductById } from '@/lib/api.js';
import ProductCard, { ProductCardSkeleton } from '../../../../components/ProductCard';
import type { FakeStoreProduct } from '@/lib/api.js';
import { useEffect, useState } from 'react';

const RECENTLY_VIEWED_KEY = 'nexmart.recent.products';

function readRecentlyViewedIds() {
  try {
    const rawValue = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!rawValue) return [] as number[];

    const parsed = JSON.parse(rawValue) as unknown;
    if (!Array.isArray(parsed)) return [] as number[];

    return parsed
      .map(Number)
      .filter((value): value is number => Number.isFinite(value));
  } catch {
    return [] as number[];
  }
}

export function RecentlyViewed() {
  const [products, setProducts] = useState<FakeStoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRecentlyViewed() {
      setIsLoading(true);

      const productIds = readRecentlyViewedIds();
      if (productIds.length === 0) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        const fetchedProducts = await Promise.all(
          productIds.slice(0, 6).map((productId) => fetchProductById(productId)),
        );

        setProducts(fetchedProducts);
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    void loadRecentlyViewed();
    window.addEventListener('nexmart-recent-updated', loadRecentlyViewed);

    return () => {
      window.removeEventListener('nexmart-recent-updated', loadRecentlyViewed);
    };
  }, []);

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="mx-auto mt-8 w-full max-w-7xl px-4">
      <h2 className="mb-4 text-2xl font-black text-[var(--text)]">Recently Viewed</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {isLoading
          ? Array.from({ length: 6 }, (_, index) => (
              <ProductCardSkeleton key={`recent-skeleton-${index}`} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
                rating={product.rating}
                description={product.description}
                enableQuickView={false}
              />
            ))}
      </div>
    </section>
  );
}
