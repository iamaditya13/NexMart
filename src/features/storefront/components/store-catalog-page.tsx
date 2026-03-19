'use client';

import {
  categoryDisplayName,
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from '@/lib/api.js';
import ProductCard, { ProductCardSkeleton } from '../../../../components/ProductCard';
import type { FakeStoreProduct } from '@/lib/api.js';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

const itemsPerPage = 10;

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top Rated' },
];

type StoreCatalogPageProps = {
  mode?: 'products' | 'search';
};

function getCategoryLabel(category: string) {
  return categoryDisplayName[category] ?? category;
}

function sortCatalog(items: FakeStoreProduct[], sortBy: string) {
  if (sortBy === 'price-asc') {
    return items.toSorted(
      (leftItem, rightItem) => leftItem.price - rightItem.price,
    );
  }

  if (sortBy === 'price-desc') {
    return items.toSorted(
      (leftItem, rightItem) => rightItem.price - leftItem.price,
    );
  }

  if (sortBy === 'rating-desc') {
    return items.toSorted(
      (leftItem, rightItem) =>
        rightItem.rating.rate - leftItem.rating.rate ||
        rightItem.rating.count - leftItem.rating.count,
    );
  }

  return items.toSorted((leftItem, rightItem) => rightItem.id - leftItem.id);
}

function normalizePositiveInt(value: string | null) {
  if (!value) return 1;

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return 1;
  return Math.max(1, parsed);
}

export function StoreCatalogPage({ mode = 'products' }: StoreCatalogPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<FakeStoreProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [retrySeed, setRetrySeed] = useState(0);
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '');

  const selectedCategory = searchParams.get('category') ?? 'all';
  const selectedSort = searchParams.get('sort') ?? 'newest';
  const selectedQuery = searchParams.get('q') ?? '';
  const selectedPage = normalizePositiveInt(searchParams.get('page'));

  useEffect(() => {
    setSearchInput(searchParams.get('q') ?? '');
  }, [searchParams]);

  const applyParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === '') {
          nextParams.delete(key);
        } else {
          nextParams.set(key, String(value));
        }
      }

      const nextQuery = nextParams.toString();
      const nextPath = nextQuery ? `${pathname}?${nextQuery}` : pathname;

      router.replace(nextPath, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (mode !== 'search') return;

    const timeoutId = window.setTimeout(() => {
      applyParams({
        q: searchInput.trim(),
        page: 1,
      });
    }, 280);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [applyParams, mode, searchInput]);

  useEffect(() => {
    async function loadCategories() {
      setIsLoadingCategories(true);

      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch {
        setErrorMessage('Something went wrong. Please try again.');
      } finally {
        setIsLoadingCategories(false);
      }
    }

    void loadCategories();
  }, [retrySeed]);

  useEffect(() => {
    async function loadProducts() {
      setIsLoadingProducts(true);
      setErrorMessage('');

      try {
        const fetchedProducts =
          selectedCategory === 'all'
            ? await fetchAllProducts()
            : await fetchProductsByCategory(selectedCategory);

        setProducts(fetchedProducts);
      } catch {
        setErrorMessage('Something went wrong. Please try again.');
      } finally {
        setIsLoadingProducts(false);
      }
    }

    void loadProducts();
  }, [retrySeed, selectedCategory]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = selectedQuery.trim().toLowerCase();
    if (!normalizedQuery) return products;

    return products.filter((product) =>
      product.title.toLowerCase().includes(normalizedQuery),
    );
  }, [products, selectedQuery]);

  const sortedProducts = useMemo(
    () => sortCatalog(filteredProducts, selectedSort),
    [filteredProducts, selectedSort],
  );

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));
  const safeCurrentPage = Math.min(selectedPage, totalPages);

  const pagedProducts = sortedProducts.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  const categoryOptions = useMemo(
    () => ['all', ...categories],
    [categories],
  );

  const isBusy = isLoadingProducts || isLoadingCategories;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <header className="mb-6 space-y-3">
        <p className="text-xs font-semibold tracking-[0.16em] text-[var(--primary)] uppercase">
          Product Collection
        </p>
        <h1 className="text-3xl font-black text-[var(--text)]">
          {mode === 'search' ? 'Search Results' : 'All Products'}
        </h1>
        <p className="text-sm text-zinc-600">
          Showing {sortedProducts.length} products
        </p>

        {mode === 'search' ? (
          <label className="mt-2 block">
            <input
              type="search"
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
              placeholder="Search products live..."
              className="h-11 w-full max-w-md rounded-xl border border-zinc-200 bg-[var(--surface)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
            />
          </label>
        ) : null}
      </header>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {categoryOptions.map((categoryName) => {
          const selected = selectedCategory === categoryName;

          return (
            <button
              key={categoryName}
              type="button"
              className={
                selected
                  ? 'rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors'
                  : 'rounded-full border border-zinc-200 bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]'
              }
              onClick={() => {
                applyParams({
                  category: categoryName === 'all' ? null : categoryName,
                  page: 1,
                });
              }}
            >
              {categoryName === 'all'
                ? 'All Categories'
                : getCategoryLabel(categoryName)}
            </button>
          );
        })}

        <label className="ml-auto inline-flex items-center gap-2 text-sm text-zinc-600">
          <span>Sort by</span>
          <select
            value={selectedSort}
            onChange={(event) => {
              applyParams({
                sort: event.target.value === 'newest' ? null : event.target.value,
                page: 1,
              });
            }}
            className="h-10 rounded-lg border border-zinc-200 bg-[var(--surface)] px-3 text-sm"
            aria-label="Sort products"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {errorMessage ? (
        <section className="rounded-2xl border border-zinc-200 bg-[var(--surface)] px-4 py-14 text-center">
          <p className="text-base font-semibold text-[var(--text)]">{errorMessage}</p>
          <button
            type="button"
            className="mt-4 rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#de3d00]"
            onClick={() => {
              setRetrySeed((previousSeed) => previousSeed + 1);
            }}
          >
            Retry
          </button>
        </section>
      ) : (
        <>
          <section
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            aria-busy={isBusy}
          >
            {isBusy
              ? Array.from({ length: 8 }, (_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))
              : pagedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    rating={product.rating}
                    description={product.description}
                  />
                ))}
          </section>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => {
                  applyParams({ page: pageNumber });
                }}
                className={
                  pageNumber === safeCurrentPage
                    ? 'inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--primary)] text-sm font-semibold text-white'
                    : 'inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-[var(--surface)] text-sm font-semibold text-zinc-700 transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]'
                }
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
