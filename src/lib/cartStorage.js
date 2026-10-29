const CART_STORAGE_KEY = 'jyotsna-cart-v1';
const CART_EVENT = 'jyotsna-cart-change';

function normalizeCartItems(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item) =>
        item &&
        typeof item.productId === 'string' &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    )
    .map(({productId, quantity}) => ({
      productId,
      quantity: Math.min(quantity, 99),
    }));
}

export function readCart() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
    return storedValue ? normalizeCartItems(JSON.parse(storedValue)) : [];
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Cart data in local storage is invalid.', error);
      return [];
    }
    throw error;
  }
}

export function saveCart(items) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(normalizeCartItems(items)),
  );
  window.dispatchEvent(new Event(CART_EVENT));
}

export function subscribeToCart(callback) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener(CART_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CART_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}
