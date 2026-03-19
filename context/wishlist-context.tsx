'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type WishlistItem = {
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

type WishlistInput = {
  id: number | string;
  title: string;
  price: number | string;
  image: string;
  category: string;
  rating?: {
    rate?: number;
    count?: number;
  };
};

type WishlistContextValue = {
  wishlistItems: WishlistItem[];
  toggleWishlist: (product: WishlistInput) => void;
  isInWishlist: (id: number | string) => boolean;
  clearWishlist: () => void;
};

const WISHLIST_STORAGE_KEY = 'nexmart.wishlist.items';

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

function toFiniteNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeProduct(input: unknown): WishlistItem | null {
  if (!input || typeof input !== 'object') return null;

  const candidate = input as Partial<WishlistInput & WishlistItem>;
  const id = toFiniteNumber(candidate.id, Number.NaN);
  if (!Number.isFinite(id)) return null;

  return {
    id,
    title: typeof candidate.title === 'string' ? candidate.title : '',
    price: toFiniteNumber(candidate.price, 0),
    image: typeof candidate.image === 'string' ? candidate.image : '',
    category: typeof candidate.category === 'string' ? candidate.category : '',
    rating: {
      rate: toFiniteNumber(candidate.rating?.rate, 0),
      count: toFiniteNumber(candidate.rating?.count, 0),
    },
  };
}

function getInitialWishlist() {
  if (typeof window === 'undefined') return [] as WishlistItem[];

  try {
    const rawValue = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!rawValue) return [] as WishlistItem[];

    const parsed = JSON.parse(rawValue) as unknown;
    if (!Array.isArray(parsed)) return [] as WishlistItem[];

    return parsed
      .map((item) => normalizeProduct(item))
      .filter((item): item is WishlistItem => !!item);
  } catch {
    return [] as WishlistItem[];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() =>
    getInitialWishlist(),
  );

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = useCallback((product: WishlistInput) => {
    const normalized = normalizeProduct(product);
    if (!normalized) return;

    setWishlistItems((previousItems) => {
      const alreadyExists = previousItems.some((item) => item.id === normalized.id);

      if (alreadyExists) {
        return previousItems.filter((item) => item.id !== normalized.id);
      }

      return [...previousItems, normalized];
    });
  }, []);

  const isInWishlist = useCallback(
    (id: number | string) => {
      const normalizedId = Number(id);
      if (!Number.isFinite(normalizedId)) return false;

      return wishlistItems.some((item) => item.id === normalizedId);
    },
    [wishlistItems],
  );

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const value = useMemo(
    () => ({
      wishlistItems,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
    }),
    [clearWishlist, isInWishlist, toggleWishlist, wishlistItems],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  return context;
}
