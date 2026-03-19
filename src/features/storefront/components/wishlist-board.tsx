'use client';

import { useCart } from '../../../../context/CartContext';
import { useWishlist } from '../../../../context/WishlistContext';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa6';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

const usdFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

function createStarState(rate: number) {
  const safeRating = Math.max(0, Math.min(5, rate || 0));
  const filledCount = Math.round(safeRating);
  return Array.from({ length: 5 }, (_, index) => index < filledCount);
}

export function WishlistBoard() {
  const { wishlistItems, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-14 text-center">
        <h1 className="text-3xl font-black text-[var(--text)]">Your wishlist is empty</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Save products you love and review them later.
        </p>
        <Link
          href="/products"
          className="mt-5 inline-flex rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
        >
          Explore Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[var(--primary)] uppercase">
            Saved Collection
          </p>
          <h1 className="text-3xl font-black text-[var(--text)]">Wishlist</h1>
          <p className="mt-1 text-sm text-zinc-600">
            {wishlistItems.length} saved {wishlistItems.length > 1 ? 'products' : 'product'}
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <FiTrash2 />
          Clear Wishlist
        </button>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {wishlistItems.map((item) => {
          const stars = createStarState(item.rating.rate);

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-[var(--surface)] shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(0,0,0,0.12)]"
            >
              <Link href={`/products/${item.id}`} className="block">
                <div className="relative h-52 bg-[var(--secondary-bg)] p-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={220}
                    height={220}
                    className="h-full w-full object-contain"
                  />
                </div>
              </Link>

              <div className="space-y-3 p-4">
                <h3 className="line-clamp-2 text-base font-semibold text-[var(--text)]">
                  <Link href={`/products/${item.id}`}>{item.title}</Link>
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <div className="flex items-center gap-0.5">
                    {stars.map((isFilled, index) => (
                      <FaStar
                        key={`${item.id}-wishlist-star-${index}`}
                        className={isFilled ? 'text-[var(--primary)]' : 'text-zinc-300'}
                      />
                    ))}
                  </div>
                  <span>({item.rating.count})</span>
                </div>

                <p className="text-lg font-black text-[var(--text)]">
                  {usdFormatter.format(item.price)}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(item);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toggleWishlist(item);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    <FiHeart className="text-[var(--primary)]" />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
