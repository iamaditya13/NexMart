import { categoryDisplayName } from '@/lib/api.js';
import type { FakeStoreProduct } from '@/lib/api.js';

export type LiveCatalogCard = {
  fakeProductId: number;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  categoryLabel: string;
  filterGroup: string;
  searchCategory: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  salePercent: number;
};

const searchCategoryByFakeCategory: Record<string, string> = {
  electronics: 'electronics',
  jewelery: 'jewelery',
  "men's clothing": "men's clothing",
  "women's clothing": "women's clothing",
};

export function toSearchCategory(categoryName: string) {
  return searchCategoryByFakeCategory[categoryName] ?? categoryName;
}

export function toCategoryLabel(categoryName: string) {
  return categoryDisplayName[categoryName] ?? categoryName;
}

export function toCatalogCards(products: FakeStoreProduct[]): LiveCatalogCard[] {
  return products.map((product) => {
    const originalPrice = Number(
      (product.price * (1.15 + (product.id % 5) * 0.04)).toFixed(2),
    );

    const salePercent = Math.max(
      5,
      Math.round(((originalPrice - product.price) / originalPrice) * 100),
    );

    return {
      fakeProductId: product.id,
      title: product.title,
      shortTitle: product.title.slice(0, 36),
      description: product.description,
      image: product.image,
      categoryLabel: toCategoryLabel(product.category),
      filterGroup: product.category,
      searchCategory: toSearchCategory(product.category),
      price: product.price,
      originalPrice,
      rating: product.rating.rate,
      reviews: product.rating.count,
      salePercent,
    };
  });
}
