'use client';

import { useCart } from '../../../../context/CartContext';
import { useWishlist } from '../../../../context/WishlistContext';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

type ProductDetailActionsProps = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating: {
      rate: number;
      count: number;
    };
  };
};

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  return (
    <div className="flex flex-wrap gap-2 pt-1">
      <button
        type="button"
        onClick={() => {
          addToCart(product);
        }}
        className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
      >
        <FiShoppingCart />
        Add to Cart
      </button>

      <button
        type="button"
        onClick={() => {
          toggleWishlist(product);
        }}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        <FiHeart className={isInWishlist(product.id) ? 'text-[var(--primary)]' : ''} />
        {isInWishlist(product.id) ? 'Saved' : 'Save to Wishlist'}
      </button>
    </div>
  );
}
