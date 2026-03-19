import { getMetadata } from '@/core/seo/utils';
import { WishlistBoard } from '@/features/storefront/components/wishlist-board';
import type { Metadata } from 'next';

export const metadata: Metadata = getMetadata({
  title: 'Wishlist',
  description: 'Saved products you want to buy later.',
  pathname: '/wishlist',
});

export default function WishlistPage() {
  return <WishlistBoard />;
}
