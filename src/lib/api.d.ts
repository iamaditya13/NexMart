export type FakeStoreRating = {
  rate: number;
  count: number;
};

export type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: FakeStoreRating;
};

export function fetchAllProducts(): Promise<FakeStoreProduct[]>;
export function fetchProductById(id: number | string): Promise<FakeStoreProduct>;
export function fetchCategories(): Promise<string[]>;
export function fetchProductsByCategory(
  category: string,
): Promise<FakeStoreProduct[]>;
export function fetchLimitedProducts(limit?: number): Promise<FakeStoreProduct[]>;
export const categoryDisplayName: Record<string, string>;
