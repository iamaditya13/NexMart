import { routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { StoreCatalogPage } from '@/features/storefront/components/store-catalog-page';
import type { Metadata } from 'next';

export const metadata: Metadata = getMetadata({
  title: 'Search Products',
  pathname: routes.search(),
});

export default function SearchPage() {
  return <StoreCatalogPage mode="search" />;
}
