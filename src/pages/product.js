import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import Heading from '@theme/Heading';
import StoreLayout from '@site/src/components/StoreLayout';
import ProductCard from '@site/src/components/ProductCard';
import {useStoreData} from '@site/src/components/StoreDataProvider';
import {useCart} from '@site/src/components/CartProvider';
import {useWishlist} from '@site/src/components/WishlistProvider';
import {selectProducts} from '@site/src/lib/storeData';
import {
  formatPriceAmount,
  formatProductPrice,
} from '@site/src/lib/pricing';
import styles from './product.module.css';

export default function ProductPage() {
  const location = useLocation();
  const slug = new URLSearchParams(location.search).get('slug');
  const {products} = useStoreData();
  const {addToCart, items: cartItems} = useCart();
  const {productIds, toggleProduct} = useWishlist();
  const product = products.find((item) => item.slug === slug) ?? null;

  if (!product) {
    return (
      <StoreLayout
        title="Piece not found"
        description="The requested piece could not be found.">
        <section className={styles.notFound}>
          <p className={styles.eyebrow}>The edit</p>
          <Heading as="h1">This piece is no longer here.</Heading>
          <p>Explore the full collection to find another favourite.</p>
          <Link to="/shop">Back to shop</Link>
        </section>
      </StoreLayout>
    );
  }

  const relatedProducts = selectProducts(products, {category: product.categoryId})
    .filter((item) => item.id !== product.id)
    .slice(0, 3);
  const isFavorite = productIds.includes(product.id);
  const cartQuantity =
    cartItems.find((item) => item.productId === product.id)?.quantity ?? 0;

  return (
    <StoreLayout
      title={product.name}
      description={product.description}>
      <section className={styles.product}>
        <img
          className={styles.image}
          src={product.image}
          alt={product.imageAlt}
          loading="eager"
          fetchPriority="high"
        />
        <div className={styles.details}>
          <Link className={styles.backLink} to="/shop">
            ← Back to the edit
          </Link>
          <p className={styles.eyebrow}>{product.brand}</p>
          <Heading as="h1">{product.name}</Heading>
          <p className={styles.description}>{product.description}</p>
          {product.reviewCount > 0 && (
            <div className={styles.rating}>
              <span aria-hidden="true">★</span> {product.rating.toFixed(1)}{' '}
              <span>({product.reviewCount} reviews)</span>
            </div>
          )}
          <div className={styles.price}>
            {product.priceType === 'range' && (
              <span className={styles.priceLabel}>Estimated custom price</span>
            )}
            {formatProductPrice(product)}
            {product.priceType !== 'range' &&
              product.compareAtPrice > product.price && (
                <del>{formatPriceAmount(product.compareAtPrice)}</del>
              )}
          </div>
          <p className={styles.note}>
            {product.priceType === 'range'
              ? 'The final price depends on your selected fabric, fit, and design details. Add this estimate to your cart and confirm your requirements with us on WhatsApp.'
              : `A considered piece from our ${product.brand} edit. Add it to your cart or save it to your wishlist.`}
          </p>
          <div className={styles.productActions}>
            <button
              className={styles.addToCart}
              type="button"
              onClick={() => addToCart(product.id)}>
              Add to cart{cartQuantity ? ` (${cartQuantity} in cart)` : ''}
            </button>
            <button
              className={styles.addToWishlist}
              type="button"
              aria-pressed={isFavorite}
              onClick={() => toggleProduct(product.id)}>
              {isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
            </button>
          </div>
          <p className={styles.checkoutHint}>
            Checkout from your cart through WhatsApp.
          </p>
          <ul className={styles.detailsList}>
            <li>Carefully selected by Jyotsna Designs</li>
            <li>Complimentary shipping over ₹5,000</li>
            <li>Personal styling assistance available</li>
          </ul>
        </div>
      </section>
      {relatedProducts.length > 0 && (
        <section className={styles.related}>
          <Heading as="h2">More from this edit</Heading>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </StoreLayout>
  );
}
