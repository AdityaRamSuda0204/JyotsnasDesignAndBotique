import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  readWishlist,
  saveWishlist,
  subscribeToWishlist,
} from '@site/src/lib/wishlist';

const WishlistContext = createContext(null);

export function WishlistProvider({children}) {
  const [productIds, setProductIds] = useState([]);

  useEffect(() => {
    const syncWishlist = () => setProductIds(readWishlist());
    syncWishlist();
    return subscribeToWishlist(syncWishlist);
  }, []);

  const toggleProduct = useCallback((productId) => {
    const currentIds = readWishlist();
    const nextIds = currentIds.includes(productId)
      ? currentIds.filter((id) => id !== productId)
      : [...currentIds, productId];
    saveWishlist(nextIds);
    setProductIds(nextIds);
  }, []);

  const value = useMemo(
    () => ({productIds, toggleProduct}),
    [productIds, toggleProduct],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
