'use client';

import { useCart } from '../../../../context/CartContext';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'sonner';

type RazorpayOrderResponse = {
  id: string;
  amount: number;
  currency: string;
  keyId: string;
};

type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
};

type RazorpayCheckoutInstance = {
  open: () => void;
  on: (event: 'payment.failed', handler: (error: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (
      options: RazorpayCheckoutOptions,
    ) => RazorpayCheckoutInstance;
  }
}

const usdFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

async function loadRazorpayScript() {
  if (typeof window === 'undefined') return false;
  if (window.Razorpay) return true;

  return await new Promise<boolean>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.addEventListener(
      'load',
      () => {
        resolve(true);
      },
      { once: true },
    );
    script.addEventListener(
      'error',
      () => {
        resolve(false);
      },
      { once: true },
    );
    document.body.append(script);
  });
}

export default function CartPage() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const subtotal = cartTotal;
  const discount = subtotal * discountRate;
  const finalTotal = subtotal - discount;

  const promoMessage = useMemo(() => {
    if (discountRate > 0) return 'Promo code applied: 10% discount';
    return '';
  }, [discountRate]);

  async function handleProceedToCheckout() {
    if (!cartItems.length) {
      toast.error('Your cart is empty.');
      return;
    }

    setIsProcessingPayment(true);

    try {
      const isScriptLoaded = await loadRazorpayScript();

      if (!isScriptLoaded || !window.Razorpay) {
        toast.error('Unable to load Razorpay checkout.');
        setIsProcessingPayment(false);
        return;
      }

      const orderResponse = await fetch('/api/payments/razorpay/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(finalTotal.toFixed(2)),
          currency: 'INR',
        }),
      });

      const orderPayload = (await orderResponse.json()) as
        | RazorpayOrderResponse
        | { error: string };

      if (!orderResponse.ok || !('id' in orderPayload)) {
        const errorMessage =
          'error' in orderPayload
            ? orderPayload.error
            : 'Unable to initialize payment.';
        toast.error(errorMessage);
        setIsProcessingPayment(false);
        return;
      }

      const razorpay = new window.Razorpay({
        key: orderPayload.keyId,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        name: 'NexMart',
        description: `Cart checkout (${cartItems.length} items)`,
        order_id: orderPayload.id,
        theme: {
          color: '#ff4500',
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
        handler: async (paymentResponse: RazorpaySuccessResponse) => {
          try {
            const verifyResponse = await fetch('/api/payments/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpayOrderId: paymentResponse.razorpay_order_id,
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
                razorpaySignature: paymentResponse.razorpay_signature,
              }),
            });

            const verifyPayload = (await verifyResponse.json()) as
              | { verified: true }
              | { error: string };

            if (!verifyResponse.ok || !('verified' in verifyPayload)) {
              const errorMessage =
                'error' in verifyPayload
                  ? verifyPayload.error
                  : 'Payment verification failed.';
              toast.error(errorMessage);
              setIsProcessingPayment(false);
              return;
            }

            clearCart();
            setPromoCode('');
            setDiscountRate(0);
            setIsProcessingPayment(false);
            toast.success('Payment successful. Your order is confirmed.');
          } catch {
            toast.error('Payment verification failed. Please contact support.');
            setIsProcessingPayment(false);
          }
        },
      });

      razorpay.on('payment.failed', () => {
        toast.error('Payment failed. Please try again.');
        setIsProcessingPayment(false);
      });

      razorpay.open();
    } catch {
      toast.error('Something went wrong during payment. Please try again.');
      setIsProcessingPayment(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-14 text-center">
        <h1 className="text-3xl font-black text-[var(--text)]">Your cart is empty</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Add products to your cart and continue shopping.
        </p>
        <Link
          href="/products"
          className="mt-5 inline-flex rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black text-[var(--text)]">Shopping Cart</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-3">
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-zinc-200 bg-[var(--surface)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.category}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    removeFromCart(item.id);
                  }}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  aria-label={`Remove ${item.title}`}
                >
                  <FiTrash2 />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center rounded-lg border border-zinc-200 bg-[var(--surface)]">
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
                  >
                    <FiPlus />
                  </button>
                </div>

                <p className="text-sm font-bold text-[var(--text)]">
                  {usdFormatter.format(item.price * item.quantity)}
                </p>
              </div>
            </article>
          ))}

          <button
            type="button"
            onClick={() => {
              clearCart();
            }}
            className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            Clear Cart
          </button>
        </section>

        <aside className="h-fit rounded-2xl border border-zinc-200 bg-[var(--surface)] p-4">
          <h2 className="text-lg font-black text-[var(--text)]">Order Summary</h2>

          <label className="mt-3 block text-sm text-zinc-600">
            Promo code
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(event) => {
                  setPromoCode(event.target.value);
                }}
                placeholder="Enter code"
                className="h-10 w-full rounded-lg border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none focus:border-[var(--primary)]"
              />
              <button
                type="button"
                onClick={() => {
                  if (promoCode.trim().toLowerCase() === 'nexsave10') {
                    setDiscountRate(0.1);
                  } else {
                    setDiscountRate(0);
                  }
                }}
                className="rounded-lg bg-[var(--primary)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
              >
                Apply
              </button>
            </div>
          </label>

          {promoMessage ? (
            <p className="mt-2 text-xs font-semibold text-[var(--primary)]">{promoMessage}</p>
          ) : null}

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between text-zinc-600">
              <dt>Subtotal</dt>
              <dd>{usdFormatter.format(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between text-zinc-600">
              <dt>Discount</dt>
              <dd>-{usdFormatter.format(discount)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-200 pt-2 text-base font-black text-[var(--text)]">
              <dt>Total</dt>
              <dd>{usdFormatter.format(finalTotal)}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => {
              void handleProceedToCheckout();
            }}
            disabled={isProcessingPayment}
            className="mt-4 w-full rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
          >
            {isProcessingPayment ? 'Opening Razorpay...' : 'Proceed to Checkout'}
          </button>
        </aside>
      </div>
    </main>
  );
}
