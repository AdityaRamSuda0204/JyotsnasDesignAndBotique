import Link from '@docusaurus/Link';
import {ArrowUpRight, Heart, ShoppingBag, Star} from 'lucide-react';
import {useWishlist} from '@site/src/components/WishlistProvider';
import {useCart} from '@site/src/components/CartProvider';
import {
  formatPriceAmount,
  formatProductPrice,
} from '@site/src/lib/pricing';
import styles from './styles.module.css';

export default function ProductCard({product}) {
  const {productIds, toggleProduct} = useWishlist();
  const {addToCart, items: cartItems} = useCart();
  const isFavorite = productIds.includes(product.id);
  const cartQuantity =
    cartItems.find((item) => item.productId === product.id)?.quantity ?? 0;
  const discount =
    product.priceType !== 'range' &&
    product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : 0;
  const productUrl = `/product?slug=${encodeURIComponent(product.slug)}`;

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Link
          className={styles.imageLink}
          to={productUrl}
          aria-label={`View ${product.name}`}>
          <img
            className={styles.image}
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
          />
        </Link>
        {(product.badge || discount > 0) && (
          <span className={styles.badge}>
            {product.badge || `${discount}% off`}
          </span>
        )}
        <button
          className={styles.favoriteButton}
          type="button"
          aria-label={
            isFavorite
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isFavorite}
          onClick={() => toggleProduct(product.id)}>
          <Heart
            size={19}
            fill={isFavorite ? 'currentColor' : 'none'}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className={styles.details}>
        <p className={styles.brand}>{product.brand}</p>
        <Link className={styles.titleLink} to={productUrl}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>
        {product.reviewCount > 0 && (
          <div
            className={styles.rating}
            aria-label={`${product.rating.toFixed(1)} out of 5 stars, ${product.reviewCount} reviews`}>
            <Star size={15} fill="currentColor" aria-hidden="true" />
            <span>{product.rating.toFixed(1)}</span>
            <span className={styles.reviewCount}>({product.reviewCount})</span>
          </div>
        )}
        <div className={styles.purchaseRow}>
          <div className={styles.prices}>
            <span className={styles.price}>{formatProductPrice(product)}</span>
            {discount > 0 && (
              <span className={styles.originalPrice}>
                {formatPriceAmount(product.compareAtPrice)}
              </span>
            )}
          </div>
          <Link
            className={styles.detailsLink}
            to={productUrl}
            aria-label={`View ${product.name}`}>
            Details <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <button
          className={styles.addButton}
          type="button"
          onClick={() => addToCart(product.id)}
          aria-label={`Add ${product.name} to cart`}>
          <ShoppingBag size={16} aria-hidden="true" />
          {cartQuantity ? `Add another (${cartQuantity})` : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}
