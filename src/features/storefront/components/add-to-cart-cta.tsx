'use client';

import { useCart } from '../../../../context/CartContext';

type AddToCartCtaProps = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    rating: {
      rate: number;
      count: number;
    };
  };
};

export function AddToCartCta({ product }: AddToCartCtaProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(product);
      }}
      className="rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
    >
      Add to Cart
    </button>
  );
}
