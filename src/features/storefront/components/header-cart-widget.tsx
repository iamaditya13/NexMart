'use client';

import { useCart } from '../../../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FiMinus, FiPlus, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

const usdFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

export function HeaderCartWidget() {
  const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const cartRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!cartRootRef.current) return;

      if (!cartRootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={cartRootRef} className="relative">
      <button
        type="button"
        className="relative inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-zinc-700 transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
        aria-label="Open cart drawer"
        onClick={() => {
          setIsOpen((previousValue) => !previousValue);
        }}
      >
        <FiShoppingCart className="text-lg" />
        <span className="hidden lg:inline">Cart</span>
        <span>{usdFormatter.format(cartTotal)}</span>
        {cartCount > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[0.65rem] font-bold text-white">
            {cartCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-3 w-[340px] rounded-2xl border border-zinc-200 bg-[var(--surface)] p-3 shadow-[0_24px_48px_rgba(0,0,0,0.18)]">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--text)]">Shopping Cart</h3>
            <span className="text-xs text-zinc-500">{cartCount} items</span>
          </div>

          {cartItems.length === 0 ? (
            <p className="rounded-xl bg-[var(--secondary-bg)] px-3 py-8 text-center text-sm text-zinc-600">
              Your cart is empty
            </p>
          ) : (
            <>
              <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-zinc-100 bg-[var(--surface-2)] p-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[var(--secondary-bg)]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-xs font-semibold text-[var(--text)]">
                          {item.title}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {usdFormatter.format(item.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          removeFromCart(item.id);
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white hover:text-[var(--primary)]"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border border-zinc-200 bg-white">
                        <button
                          type="button"
                          onClick={() => {
                            if (item.quantity <= 1) {
                              removeFromCart(item.id);
                              return;
                            }

                            updateQuantity(item.id, item.quantity - 1);
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center text-zinc-600 transition-colors hover:text-[var(--primary)]"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>
                        <span className="inline-flex min-w-8 items-center justify-center text-xs font-semibold text-zinc-700">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center text-zinc-600 transition-colors hover:text-[var(--primary)]"
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>

                      <p className="text-xs font-semibold text-[var(--text)]">
                        {usdFormatter.format(item.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-3 rounded-xl bg-[var(--secondary-bg)] px-3 py-2">
                <p className="text-xs text-zinc-600">Total</p>
                <p className="text-base font-bold text-[var(--text)]">
                  {usdFormatter.format(cartTotal)}
                </p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/cart"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  View Cart
                </Link>
                <Link
                  href="/products"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
                >
                  Shop More
                </Link>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
