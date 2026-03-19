import {
  fetchAllProducts,
  fetchCategories,
  fetchLimitedProducts,
  fetchProductsByCategory,
} from '@/lib/api.js';
import { toCatalogCards } from '../normalizers';
import { NexmartHome } from './nexmart-home';
import { StorefrontFallback } from './storefront-fallback';

type NexmartHomeRuntimeProps = {
  selectedCategory: string;
  selectedPage: number;
};

type CatalogPayload = {
  spotlightItems: ReturnType<typeof toCatalogCards>;
  newArrivalItems: ReturnType<typeof toCatalogCards>;
  trendingItems: ReturnType<typeof toCatalogCards>;
  recommendedItems: ReturnType<typeof toCatalogCards>;
  categoryOptions: string[];
  selectedCategory: string;
};

async function loadCatalogPayload(selectedCategory: string) {
  try {
    const [allProducts, spotlightSource, categoryOptions] = await Promise.all([
      fetchAllProducts(),
      fetchLimitedProducts(8),
      fetchCategories(),
    ]);

    const activeCategory = categoryOptions.includes(selectedCategory)
      ? selectedCategory
      : 'all';

    const selectedProducts =
      activeCategory === 'all'
        ? allProducts
        : await fetchProductsByCategory(activeCategory);

    const allCards = toCatalogCards(allProducts);
    const spotlightItems = toCatalogCards(spotlightSource);
    const newArrivalItems = toCatalogCards(selectedProducts);

    const trendingItems = allCards
      .toSorted((leftItem, rightItem) => rightItem.reviews - leftItem.reviews)
      .slice(0, 6);

    const recommendedItems = allCards
      .toSorted(
        (leftItem, rightItem) =>
          rightItem.rating - leftItem.rating ||
          rightItem.reviews - leftItem.reviews,
      )
      .slice(0, 8);

    const payload: CatalogPayload = {
      spotlightItems,
      newArrivalItems,
      trendingItems,
      recommendedItems,
      categoryOptions,
      selectedCategory: activeCategory,
    };

    return payload;
  } catch {
    return null;
  }
}

export async function NexmartHomeRuntime({
  selectedCategory,
  selectedPage,
}: NexmartHomeRuntimeProps) {
  const payload = await loadCatalogPayload(selectedCategory);

  if (!payload) return <StorefrontFallback />;

  return (
    <NexmartHome
      spotlightItems={payload.spotlightItems}
      newArrivalItems={payload.newArrivalItems}
      trendingItems={payload.trendingItems}
      recommendedItems={payload.recommendedItems}
      categoryOptions={payload.categoryOptions}
      selectedCategory={payload.selectedCategory}
      selectedPage={selectedPage}
    />
  );
}
