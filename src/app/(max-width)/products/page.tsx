import { getMetadata } from '@/core/seo/utils';
import { StoreCatalogPage } from '@/features/storefront/components/store-catalog-page';
import type { Metadata } from 'next';

export const metadata: Metadata = getMetadata({
  title: 'Products',
  pathname: '/products',
});

export default function ProductsPage() {
  return <StoreCatalogPage mode="products" />;
}
