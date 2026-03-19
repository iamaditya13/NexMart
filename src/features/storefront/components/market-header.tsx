import { routes } from '@/core/routing/utils';
import { fetchCategories } from '@/lib/api.js';
import { HeaderCartWidget } from './header-cart-widget';
import { HeaderSearchCategorySelect } from './header-search-category-select';
import { HeaderUserWidget } from './header-user-widget';
import Form from 'next/form';
import Link from 'next/link';

export async function MarketHeader() {
  const categories = await fetchCategories().catch(() => []);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[var(--surface)]/95 backdrop-blur">
      <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-3 md:grid-cols-[auto_1fr_auto] md:items-center">
        <Link href={routes.home()} className="inline-flex items-center text-3xl font-black tracking-tight text-[var(--text)]">
          NexMart<span className="text-[var(--primary)]">.</span>
        </Link>

        <Form
          action="/search"
          className="grid gap-2 rounded-full border border-zinc-200 bg-[var(--surface)] p-1 md:grid-cols-[190px_1fr_auto]"
        >
          <HeaderSearchCategorySelect categories={categories} />

          <label className="px-3 py-2 text-sm text-zinc-600">
            <input
              type="text"
              name="q"
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none"
              aria-label="Search products"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e13d00]"
          >
            Search
          </button>
        </Form>

        <div className="flex items-center justify-end gap-2">
          <HeaderCartWidget />
          <HeaderUserWidget />
        </div>
      </div>
    </header>
  );
}
