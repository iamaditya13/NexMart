import { routes } from '@/core/routing/utils';
import ProductCard from '../../../../components/ProductCard';
import type { LiveCatalogCard } from '../normalizers';
import { toCategoryLabel } from '../normalizers';
import Form from 'next/form';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const itemsPerPage = 10;

type FreshDropGridProps = {
  items: LiveCatalogCard[];
  categoryOptions: string[];
  selectedCategory: string;
  currentPage: number;
};

export function FreshDropGrid({
  items,
  categoryOptions,
  selectedCategory,
  currentPage,
}: FreshDropGridProps) {
  const activeCategory =
    selectedCategory === 'all' || categoryOptions.includes(selectedCategory)
      ? selectedCategory
      : 'all';

  // Pagination is query-param driven so users can share the same filtered view.
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const pageItems = items.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  return (
    <section id="new-products" className="mx-auto mt-10 w-full max-w-7xl px-4">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-black text-[var(--text)]">New Products</h2>

        <Form action={routes.home()} className="flex items-center gap-2">
          <label className="inline-flex items-center gap-2 text-sm text-zinc-600">
            <span>Sort by</span>
            <select
              name="category"
              defaultValue={activeCategory}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
              aria-label="Filter new products by category"
            >
              <option value="all">All Categories</option>
              {categoryOptions.map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {toCategoryLabel(categoryName)}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
          >
            Apply
          </button>
        </Form>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {pageItems.map((item) => (
          <ProductCard
            key={item.fakeProductId}
            id={item.fakeProductId}
            title={item.title}
            price={item.price}
            originalPrice={item.originalPrice}
            salePercent={item.salePercent}
            image={item.image}
            category={item.filterGroup}
            rating={{ rate: item.rating, count: item.reviews }}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Link
            key={page}
            href={
              activeCategory === 'all'
                ? `${routes.home()}?page=${page}`
                : `${routes.home()}?category=${encodeURIComponent(activeCategory)}&page=${page}`
            }
            className={
              page === safeCurrentPage
                ? 'inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--primary)] text-sm font-semibold text-white'
                : 'inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }
          >
            {page}
          </Link>
        ))}
        <Link
          href="/products"
          className="ml-2 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]"
        >
          Browse all
          <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}
