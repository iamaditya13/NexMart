'use client';

import { ThemeToggle } from '@/core/styles/components/theme-toggle';
import {
  AUTH_EVENT_KEY,
  getDemoAuthState,
  type DemoAuthState,
} from '@/features/storefront/utils/demo-auth';
import { useWishlist } from '../../../../context/WishlistContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiHeart, FiUser } from 'react-icons/fi';

export function HeaderUserWidget() {
  const [authState, setAuthState] = useState<DemoAuthState | null>(() =>
    getDemoAuthState(),
  );
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    function handleStorageUpdate() {
      setAuthState(getDemoAuthState());
    }

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener(AUTH_EVENT_KEY, handleStorageUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener(AUTH_EVENT_KEY, handleStorageUpdate as EventListener);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />

      <Link
        href="/wishlist"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-[var(--surface)] text-zinc-700 transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
        aria-label="Wishlist"
      >
        <FiHeart />
        {wishlistItems.length > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[0.65rem] font-bold text-white">
            {wishlistItems.length}
          </span>
        ) : null}
      </Link>

      <Link
        href={authState ? '/profile' : '/login'}
        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-zinc-700 transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        <FiUser />
        <span className="hidden lg:inline">
          {authState ? 'My Profile' : 'Sign In'}
        </span>
      </Link>
    </div>
  );
}
