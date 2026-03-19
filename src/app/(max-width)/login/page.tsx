import { getMetadata } from '@/core/seo/utils';
import { LoginPanel } from '@/features/storefront/components/login-panel';
import type { Metadata } from 'next';

export const metadata: Metadata = getMetadata({
  title: 'Login',
  description: 'Sign in to your NexMart account.',
  pathname: '/login',
});

export default function LoginPage() {
  return <LoginPanel />;
}
