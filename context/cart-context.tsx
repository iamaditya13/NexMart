'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export type CartRating = {
  rate: number;
  count: number;
};

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: CartRating;
  quantity: number;
};

export type CartProductInput = {
  id: number | string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: Partial<CartRating>;
  quantity?: number;
};

type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (product: CartProductInput) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

const CART_STORAGE_KEY = 'nexmart.cart.items';

const CartContext = createContext<CartContextValue | undefined>(undefined);

function toSafeNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeProduct(input: CartProductInput | CartItem | null | undefined) {
  if (!input || typeof input !== 'object') return null;

  const id = toSafeNumber(input.id, Number.NaN);
  if (!Number.isFinite(id)) return null;

  return {
    id,
    title: input.title,
    price: toSafeNumber(input.price, 0),
    image: input.image,
    category: input.category,
    rating: {
      rate: toSafeNumber(input.rating?.rate, 0),
      count: toSafeNumber(input.rating?.count, 0),
    },
    quantity: Math.max(1, toSafeNumber(input.quantity, 1)),
  } satisfies CartItem;
}

function getInitialCartItems() {
  if (typeof window === 'undefined') return [] as CartItem[];

  try {
    const rawItems = localStorage.getItem(CART_STORAGE_KEY);
    if (!rawItems) return [] as CartItem[];

    const parsedItems = JSON.parse(rawItems) as unknown;
    if (!Array.isArray(parsedItems)) return [] as CartItem[];

    return parsedItems
      .map((item) => normalizeProduct(item as CartProductInput))
      .filter((item): item is CartItem => !!item);
  } catch {
    return [] as CartItem[];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => getInitialCartItems());
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: CartProductInput) => {
    const normalized = normalizeProduct(product);
    if (!normalized) return;

    setCartItems((previousItems) => {
      const existingItem = previousItems.find((item) => item.id === normalized.id);
      if (!existingItem) return [...previousItems, normalized];

      return previousItems.map((item) =>
        item.id === normalized.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }, []);

  const removeFromCart = useCallback((id: number | string) => {
    const normalizedId = toSafeNumber(id, Number.NaN);
    if (!Number.isFinite(normalizedId)) return;

    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== normalizedId),
    );
  }, []);

  const updateQuantity = useCallback((id: number | string, quantity: number) => {
    const normalizedId = toSafeNumber(id, Number.NaN);
    const normalizedQuantity = Math.max(1, Math.floor(quantity));

    if (!Number.isFinite(normalizedId)) return;

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === normalizedId ? { ...item, quantity: normalizedQuantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
    }),
    [
      addToCart,
      cartCount,
      cartItems,
      cartTotal,
      clearCart,
      removeFromCart,
      updateQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
