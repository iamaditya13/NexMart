import { getMetadata } from '@/core/seo/utils';
import { ProfileHub } from '@/features/storefront/components/profile-hub';
import type { Metadata } from 'next';

export const metadata: Metadata = getMetadata({
  title: 'Profile',
  description: 'Manage your NexMart profile details.',
  pathname: '/profile',
});

export default function ProfilePage() {
  return <ProfileHub />;
}
