const API_BASE_URL = 'https://fakestoreapi.com';

export const categoryDisplayName = {
  electronics: 'Electronics',
  jewelery: 'Jewelry',
  "men's clothing": "Men's Fashion",
  "women's clothing": "Women's Fashion",
};

async function parseJsonResponse(response, fallbackMessage) {
  if (!response.ok) {
    throw new Error(fallbackMessage);
  }

  return response.json();
}

async function performRequest(pathname, fallbackMessage, options = {}) {
  try {
    const nextOptions = options.next
      ? { revalidate: 60, ...options.next }
      : { revalidate: 60 };

    const response = await fetch(`${API_BASE_URL}${pathname}`, {
      ...options,
      next: nextOptions,
    });

    return await parseJsonResponse(response, fallbackMessage);
  } catch {
    throw new Error(fallbackMessage);
  }
}

export async function fetchAllProducts() {
  return performRequest('/products', 'Failed to fetch products');
}

export async function fetchProductById(id) {
  return performRequest(`/products/${id}`, 'Failed to fetch product');
}

export async function fetchCategories() {
  return performRequest('/products/categories', 'Failed to fetch categories');
}

export async function fetchProductsByCategory(category) {
  const encodedCategory = encodeURIComponent(category);
  return performRequest(
    `/products/category/${encodedCategory}`,
    'Failed to fetch category products',
  );
}

export async function fetchLimitedProducts(limit = 10) {
  return performRequest(`/products?limit=${limit}`, 'Failed to fetch products');
}
