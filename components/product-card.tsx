'use client';

import { categoryDisplayName } from '../src/lib/api.js';
import { useCart } from '../context/cart-context';
import { useWishlist } from '../context/wishlist-context';
import { ProductQuickView } from './ProductQuickView';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { FiEye, FiHeart } from 'react-icons/fi';

type ProductRating = {
  rate: number;
  count: number;
};

type ProductCardProps = {
  id: number | string;
  title: string;
  price: number;
  originalPrice?: number;
  salePercent?: number;
  image: string;
  category: string;
  rating: ProductRating;
  description?: string;
  enableQuickView?: boolean;
};

const usdFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

function truncateTitle(title: string) {
  return title.length <= 40 ? title : `${title.slice(0, 40)}...`;
}

function getDisplayCategory(category: string) {
  const displayName = categoryDisplayName[category] ?? category;
  return displayName.toUpperCase();
}

function createStarState(rate: number) {
  const safeRating = Math.max(0, Math.min(5, rate || 0));
  const filledCount = Math.round(safeRating);

  return Array.from({ length: 5 }, (_, index) => index < filledCount);
}

export default function ProductCard({
  id,
  title,
  price,
  originalPrice,
  salePercent,
  image,
  category,
  rating,
  description,
  enableQuickView = true,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const starState = createStarState(rating.rate);
  const productHref = `/products/${id}`;
  const wishlistSaved = isInWishlist(id);

  const quickViewPayload = {
    id,
    title,
    price,
    image,
    category: getDisplayCategory(category),
    description,
    rating,
  };

  return (
    <>
      <article className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-[var(--surface)] shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(0,0,0,0.12)]">
        <Link href={productHref} className="block">
          <div className="relative h-48 w-full overflow-hidden border-b border-zinc-100 bg-[var(--secondary-bg)] p-4">
            <span className="absolute left-3 top-3 z-10 inline-flex rounded-full bg-[var(--primary)] px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.12em] text-white uppercase">
              {getDisplayCategory(category)}
            </span>

            {salePercent && salePercent > 0 ? (
              <span className="absolute left-3 top-11 z-10 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[var(--primary)] px-2 text-[0.6rem] font-bold tracking-[0.08em] text-white">
                -{salePercent}%
              </span>
            ) : null}

            <button
              type="button"
              aria-label={`Toggle ${title} wishlist`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleWishlist({
                  id,
                  title,
                  price,
                  image,
                  category,
                  rating,
                });
              }}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              <FiHeart className={wishlistSaved ? 'text-[var(--primary)]' : ''} />
            </button>

            <div className="grid h-full place-items-center">
              <Image
                src={image}
                alt={title}
                width={200}
                height={200}
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-8 space-y-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  addToCart({
                    id,
                    title,
                    price,
                    image,
                    category,
                    rating,
                  });
                }}
                className="w-full rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
              >
                Add to Cart
              </button>
              {enableQuickView ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setQuickViewOpen(true);
                  }}
                  className="hidden w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] md:inline-flex"
                >
                  <FiEye />
                  Quick View
                </button>
              ) : null}
            </div>
          </div>

          <div className="space-y-2 p-4">
            <h3 className="line-clamp-2 min-h-11 text-sm font-semibold text-[var(--text)]">
              {truncateTitle(title)}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <div className="flex items-center gap-0.5">
                {starState.map((isFilled, index) => (
                  <FaStar
                    key={`${id}-star-${index}`}
                    className={isFilled ? 'text-[var(--primary)]' : 'text-zinc-300'}
                  />
                ))}
              </div>
              <span>({rating.count})</span>
            </div>

            <p className="text-base font-bold text-[var(--text)]">
              {usdFormatter.format(price)}
            </p>

            {originalPrice && originalPrice > price ? (
              <p className="text-xs text-zinc-500 line-through">
                {usdFormatter.format(originalPrice)}
              </p>
            ) : null}
          </div>
        </Link>
      </article>

      <ProductQuickView
        isOpen={quickViewOpen}
        onClose={() => {
          setQuickViewOpen(false);
        }}
        product={quickViewPayload}
      />
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-[var(--surface)] p-4">
      <div className="h-48 w-full animate-pulse rounded-xl bg-zinc-200/80 dark:bg-zinc-700/60" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-700/60" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-zinc-200/80 dark:bg-zinc-700/60" />
      </div>
    </article>
  );
}
