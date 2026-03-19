/* eslint-disable unicorn/filename-case */

'use client';

import { useCart } from '../context/cart-context';
import { useWishlist } from '../context/wishlist-context';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';

type ProductQuickViewProps = {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number | string;
    title: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    rating: {
      rate: number;
      count: number;
    };
  };
};

const usdFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

export function ProductQuickView({ isOpen, onClose, product }: ProductQuickViewProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm">
      <div className="mx-auto grid h-full w-full max-w-5xl place-items-center p-4">
        <article className="relative w-full max-w-3xl rounded-3xl border border-zinc-200 bg-[var(--surface)] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.25)] md:p-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
            aria-label="Close quick view"
          >
            <FiX />
          </button>

          <div className="grid gap-5 md:grid-cols-[260px_1fr]">
            <div className="rounded-2xl bg-[var(--secondary-bg)] p-4">
              <Image
                src={product.image}
                alt={product.title}
                width={280}
                height={280}
                className="h-56 w-full object-contain"
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.14em] text-[var(--primary)] uppercase">
                {product.category}
              </p>
              <h3 className="text-2xl font-black text-[var(--text)]">{product.title}</h3>
              <p className="text-sm text-zinc-500">
                Rating {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
              </p>
              <p className="text-2xl font-black text-[var(--text)]">
                {usdFormatter.format(product.price)}
              </p>
              <p className="line-clamp-4 text-sm leading-7 text-zinc-600">
                {product.description ??
                  'Explore this product in detail and compare specs before checkout.'}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
                >
                  <FiShoppingCart />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toggleWishlist(product);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  <FiHeart className={isInWishlist(product.id) ? 'text-[var(--primary)]' : ''} />
                  {isInWishlist(product.id) ? 'Saved' : 'Save'}
                </button>
                <Link
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="inline-flex items-center rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
