import { routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { NexmartHomeRuntime } from '@/features/storefront/components/nexmart-home-runtime';
import { NexmartHomeSkeleton } from '@/features/storefront/components/nexmart-home-skeleton';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = getMetadata({
  title: 'NexMart Home',
  pathname: routes.home(),
});

export const dynamic = 'force-dynamic';

function normalizePage(value: string | string[] | undefined) {
  if (Array.isArray(value)) return 1;
  if (!value) return 1;

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) return 1;
  return Math.max(1, parsed);
}

function normalizeCategory(value: string | string[] | undefined) {
  if (Array.isArray(value)) return 'all';

  if (!value) return 'all';

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default async function LandingPage(props: PageProps<'/'>) {
  const searchParams = await props.searchParams;

  const selectedPage = normalizePage(searchParams.page);
  const selectedCategory = normalizeCategory(searchParams.category);

  return (
    <Suspense fallback={<NexmartHomeSkeleton />}>
      <NexmartHomeRuntime
        selectedCategory={selectedCategory}
        selectedPage={selectedPage}
      />
    </Suspense>
  );
}
