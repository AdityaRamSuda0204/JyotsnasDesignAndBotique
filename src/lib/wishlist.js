const WISHLIST_STORAGE_KEY = 'jyotsna-wishlist';
const WISHLIST_EVENT = 'jyotsna-wishlist-change';

export function readWishlist() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue)
      ? parsedValue.filter((id) => typeof id === 'string')
      : [];
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Wishlist data in local storage is invalid.', error);
      return [];
    }
    throw error;
  }
}

export function saveWishlist(ids) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(WISHLIST_EVENT));
}

export function subscribeToWishlist(callback) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener(WISHLIST_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(WISHLIST_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}
