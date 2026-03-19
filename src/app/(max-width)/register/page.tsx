import { getMetadata } from '@/core/seo/utils';
import { RegisterPanel } from '@/features/storefront/components/register-panel';
import type { Metadata } from 'next';

export const metadata: Metadata = getMetadata({
  title: 'Register',
  description: 'Create your NexMart account.',
  pathname: '/register',
});

export default function RegisterPage() {
  return <RegisterPanel />;
}
