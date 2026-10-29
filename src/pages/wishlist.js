import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import StoreLayout from '@site/src/components/StoreLayout';
import ProductCard from '@site/src/components/ProductCard';
import {useWishlist} from '@site/src/components/WishlistProvider';
import {useStoreData} from '@site/src/components/StoreDataProvider';
import styles from './wishlist.module.css';

export default function Wishlist() {
  const {productIds} = useWishlist();
  const {products: allProducts} = useStoreData();
  const products = allProducts.filter((product) =>
    productIds.includes(product.id),
  );

  return (
    <StoreLayout
      title="Wishlist"
      description="Your saved pieces from the Jyotsna Designs collection.">
      <section className={styles.page}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Your personal edit</p>
          <Heading as="h1">Wishlist</Heading>
          <p>Keep the pieces you love close at hand.</p>
        </div>
        {products.length ? (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Heading as="h2">Your wishlist is waiting.</Heading>
            <p>Save a piece with the heart icon and it will appear here.</p>
            <Link to="/shop">Explore the collection</Link>
          </div>
        )}
      </section>
    </StoreLayout>
  );
}
