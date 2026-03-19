'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/ui/components/dropdown-menu';
import { toCategoryLabel } from '../normalizers';
import { useMemo, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

type HeaderSearchCategorySelectProps = {
  categories: string[];
};

export function HeaderSearchCategorySelect({
  categories,
}: HeaderSearchCategorySelectProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const selectedLabel = useMemo(
    () =>
      selectedCategory
        ? toCategoryLabel(selectedCategory)
        : 'All Categories',
    [selectedCategory],
  );

  return (
    <div className="relative">
      <input type="hidden" name="category" value={selectedCategory} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex h-full w-full items-center justify-between gap-2 rounded-full border border-zinc-200 bg-[var(--secondary-bg)] px-4 py-2 text-sm text-zinc-700"
            aria-label="Choose category"
          >
            <span className="truncate">{selectedLabel}</span>
            <FiChevronDown className="shrink-0 text-zinc-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className="w-56 rounded-2xl border border-zinc-200 bg-[var(--surface)] p-1.5 shadow-[0_14px_34px_rgba(0,0,0,0.1)]"
        >
          <DropdownMenuItem
            onSelect={() => {
              setSelectedCategory('');
            }}
            className={
              selectedCategory === ''
                ? 'bg-[var(--secondary-bg)] font-semibold text-[var(--text)]'
                : 'text-zinc-700'
            }
          >
            All Categories
          </DropdownMenuItem>

          {categories.map((categoryName) => {
            const selected = selectedCategory === categoryName;

            return (
              <DropdownMenuItem
                key={categoryName}
                onSelect={() => {
                  setSelectedCategory(categoryName);
                }}
                className={
                  selected
                    ? 'bg-[var(--secondary-bg)] font-semibold text-[var(--text)]'
                    : 'text-zinc-700'
                }
              >
                {toCategoryLabel(categoryName)}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
