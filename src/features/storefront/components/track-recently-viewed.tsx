'use client';

import { useEffect } from 'react';

const RECENTLY_VIEWED_KEY = 'nexmart.recent.products';

export function TrackRecentlyViewed({ productId }: { productId: number }) {
  useEffect(() => {
    try {
      const rawValue = localStorage.getItem(RECENTLY_VIEWED_KEY);
      const previousIds = rawValue ? (JSON.parse(rawValue) as number[]) : [];

      const nextIds = [productId, ...previousIds.filter((id) => id !== productId)].slice(
        0,
        8,
      );

      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(nextIds));
      window.dispatchEvent(new Event('nexmart-recent-updated'));
    } catch {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify([productId]));
      window.dispatchEvent(new Event('nexmart-recent-updated'));
    }
  }, [productId]);

  return null;
}
