import { getMetadata } from '@/core/seo/utils';
import { ProductDetailActions } from '@/features/storefront/components/product-detail-actions';
import { ProductImageZoom } from '@/features/storefront/components/product-image-zoom';
import { RecentlyViewed } from '@/features/storefront/components/recently-viewed';
import { TrackRecentlyViewed } from '@/features/storefront/components/track-recently-viewed';
import {
  categoryDisplayName,
  fetchLimitedProducts,
  fetchProductById,
} from '@/lib/api.js';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaStar } from 'react-icons/fa6';

function toCategoryBadge(category: string) {
  return categoryDisplayName[category] ?? category;
}

function createStars(rate: number) {
  const filledCount = Math.max(0, Math.min(5, Math.round(rate)));
  return Array.from({ length: 5 }, (_, index) => index < filledCount);
}

export async function generateMetadata(
  props: PageProps<'/products/[productId]'>,
): Promise<Metadata> {
  const { productId } = await props.params;
  const numericId = Number(productId);

  if (!Number.isInteger(numericId)) {
    return getMetadata({
      title: 'Product',
      pathname: `/products/${productId}`,
    });
  }

  try {
    const product = await fetchProductById(numericId);

    return getMetadata({
      title: product.title,
      description: product.description,
      pathname: `/products/${productId}`,
      images: [{ url: product.image, alt: product.title }],
    });
  } catch {
    return getMetadata({
      title: 'Product',
      pathname: `/products/${productId}`,
    });
  }
}

export async function generateStaticParams() {
  try {
    const products = await fetchLimitedProducts(20);

    return products.map((product) => ({
      productId: String(product.id),
    }));
  } catch {
    return [];
  }
}

export default async function ProductPage(
  props: PageProps<'/products/[productId]'>,
) {
  const { productId } = await props.params;
  const numericId = Number(productId);

  if (!Number.isInteger(numericId)) {
    notFound();
  }

  let product;

  try {
    product = await fetchProductById(numericId);
  } catch {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-16">
        <section className="rounded-2xl border border-zinc-200 bg-[var(--surface)] px-6 py-14 text-center">
          <p className="text-lg font-semibold text-[var(--text)]">
            Something went wrong. Please try again.
          </p>
          <Link
            href="/products"
            className="mt-5 inline-flex rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
          >
            Back to Products
          </Link>
        </section>
      </main>
    );
  }

  const stars = createStars(product.rating.rate);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <TrackRecentlyViewed productId={product.id} />
      <Link
        href="/products"
        className="inline-flex text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[#de3d00]"
      >
        ← Back to Products
      </Link>

      <section className="mt-4 grid gap-6 rounded-3xl border border-zinc-200 bg-[var(--surface)] p-5 shadow-[0_10px_22px_rgba(0,0,0,0.06)] md:grid-cols-[minmax(280px,440px)_1fr]">
        <ProductImageZoom src={product.image} alt={product.title} />

        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-bold tracking-[0.08em] text-[var(--primary)] uppercase">
            {toCategoryBadge(product.category)}
          </span>

          <h1 className="text-2xl font-black text-[var(--text)] md:text-3xl">
            {product.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
            <div className="flex items-center gap-1">
              {stars.map((isFilled, index) => (
                <FaStar
                  key={`${product.id}-${index}`}
                  className={isFilled ? 'text-[var(--primary)]' : 'text-zinc-300'}
                />
              ))}
            </div>
            <span>{product.rating.rate.toFixed(1)}</span>
            <span>({product.rating.count})</span>
          </div>

          <p className="text-3xl font-black text-[var(--text)]">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-sm leading-7 text-zinc-600">{product.description}</p>

          <ProductDetailActions product={product} />
        </div>
      </section>

      <RecentlyViewed />
    </main>
  );
}
