import {WishlistProvider} from '@site/src/components/WishlistProvider';
import {StoreDataProvider} from '@site/src/components/StoreDataProvider';
import {CartProvider} from '@site/src/components/CartProvider';

export default function Root({children}) {
  return (
    <StoreDataProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </StoreDataProvider>
  );
}
