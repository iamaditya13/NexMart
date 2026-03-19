import { getMetadata } from '@/core/seo/utils';
import { ContactPanel } from '@/features/storefront/components/contact-panel';
import type { Metadata } from 'next';

export const metadata: Metadata = getMetadata({
  title: 'Contact',
  description: 'Reach out to NexMart support and sales.',
  pathname: '/contact',
});

export default function ContactPage() {
  return <ContactPanel />;
}
