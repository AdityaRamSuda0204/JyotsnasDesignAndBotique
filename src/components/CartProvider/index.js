import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  readCart,
  saveCart,
  subscribeToCart,
} from '@site/src/lib/cartStorage';

const CartContext = createContext(null);

export function CartProvider({children}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const syncCart = () => setItems(readCart());
    syncCart();
    return subscribeToCart(syncCart);
  }, []);

  const updateCart = useCallback((update) => {
    const nextItems = update(readCart());
    saveCart(nextItems);
    setItems(nextItems);
  }, []);

  const addToCart = useCallback(
    (productId, quantity = 1) => {
      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error('Cart quantity must be a positive whole number.');
      }

      updateCart((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.productId === productId,
        );
        if (existingItem) {
          return currentItems.map((item) =>
            item.productId === productId
              ? {...item, quantity: Math.min(item.quantity + quantity, 99)}
              : item,
          );
        }
        return [...currentItems, {productId, quantity: Math.min(quantity, 99)}];
      });
    },
    [updateCart],
  );

  const setQuantity = useCallback(
    (productId, quantity) => {
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        throw new Error('Cart quantity must be between 1 and 99.');
      }
      updateCart((currentItems) =>
        currentItems.map((item) =>
          item.productId === productId ? {...item, quantity} : item,
        ),
      );
    },
    [updateCart],
  );

  const removeFromCart = useCallback(
    (productId) => {
      updateCart((currentItems) =>
        currentItems.filter((item) => item.productId !== productId),
      );
    },
    [updateCart],
  );

  const clearCart = useCallback(() => {
    saveCart([]);
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, addToCart, setQuantity, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
