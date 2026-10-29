import store from '@site/src/data/store.json';

function normalizeProduct(record) {
  const isRangePrice = record.priceType === 'range';
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    brand: record.brand,
    description: record.description,
    image: record.image,
    imageAlt: record.imageAlt,
    priceType: isRangePrice ? 'range' : 'fixed',
    price: isRangePrice ? undefined : record.price,
    minPrice: isRangePrice ? record.minPrice : undefined,
    maxPrice: isRangePrice ? record.maxPrice : undefined,
    compareAtPrice: record.compareAtPrice,
    rating: record.rating,
    reviewCount: record.reviewCount,
    categoryId: record.categoryId,
    badge: record.badge,
    sortOrder: record.sortOrder,
  };
}

export function getHomeContent() {
  return {...store.home};
}

export function getCategories() {
  return store.categories.map((category) => ({...category}));
}

export function selectProducts(
  products,
  {query = '', category = '', sort = 'featured'} = {},
) {
  const normalizedQuery = query.trim().toLowerCase();
  const categories = new Map(
    store.categories.map((item) => [item.id, item.name]),
  );
  const filteredProducts = products
    .filter((product) => !category || product.categoryId === category)
    .filter(
      (product) =>
        !normalizedQuery ||
        [
          product.name,
          product.brand,
          product.description,
          categories.get(product.categoryId) ?? product.categoryId,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery),
    );

  if (sort === 'price-ascending') {
    filteredProducts.sort(
      (a, b) =>
        (a.priceType === 'range' ? a.minPrice : a.price) -
        (b.priceType === 'range' ? b.minPrice : b.price),
    );
  } else if (sort === 'price-descending') {
    filteredProducts.sort(
      (a, b) =>
        (b.priceType === 'range' ? b.maxPrice : b.price) -
        (a.priceType === 'range' ? a.maxPrice : a.price),
    );
  } else if (sort === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'popular') {
    filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
  } else {
    filteredProducts.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  return filteredProducts;
}

export function getProducts(options) {
  return selectProducts(store.products.map(normalizeProduct), options);
}

export function getStorefrontData() {
  return {
    config: {...store.config},
    home: getHomeContent(),
    categories: getCategories(),
    products: getProducts(),
  };
}
