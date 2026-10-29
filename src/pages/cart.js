import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {Minus, Plus, Trash2} from 'lucide-react';
import StoreLayout from '@site/src/components/StoreLayout';
import {useCart} from '@site/src/components/CartProvider';
import {useStoreData} from '@site/src/components/StoreDataProvider';
import {createWhatsAppCheckoutUrl} from '@site/src/lib/whatsappCheckout';
import {
  formatCartLineTotal,
  formatPriceAmount,
  formatProductPrice,
  getCartTotalBounds,
} from '@site/src/lib/pricing';
import styles from './cart.module.css';

export default function Cart() {
  const {items, setQuantity, removeFromCart, itemCount} = useCart();
  const {products, config} = useStoreData();
  const cartLines = items
    .map((item) => ({
      product: products.find((product) => product.id === item.productId),
      quantity: item.quantity,
    }))
    .filter((line) => line.product);
  const total = getCartTotalBounds(cartLines);
  const checkoutUrl = cartLines.length
    ? createWhatsAppCheckoutUrl({items: cartLines, config})
    : null;

  return (
    <StoreLayout
      title="Your Cart"
      description="Review your selected Jyotsna Designs pieces and continue checkout through WhatsApp.">
      <section className={styles.page}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Your selection</p>
          <Heading as="h1">Shopping bag</Heading>
          <p>{itemCount} {itemCount === 1 ? 'piece' : 'pieces'} in your bag</p>
        </div>

        {cartLines.length ? (
          <div className={styles.layout}>
            <div className={styles.lines}>
              {cartLines.map(({product, quantity}) => (
                <article className={styles.line} key={product.id}>
                  <Link
                    className={styles.productLink}
                    to={`/product?slug=${encodeURIComponent(product.slug)}`}>
                    <img src={product.image} alt={product.imageAlt} />
                  </Link>
                  <div className={styles.productInfo}>
                    <span className={styles.brand}>{product.brand}</span>
                    <Link
                      className={styles.productName}
                      to={`/product?slug=${encodeURIComponent(product.slug)}`}>
                      {product.name}
                    </Link>
                    <span className={styles.unitPrice}>
                      {formatProductPrice(product)}
                      {product.priceType === 'range' && (
                        <small>Custom design estimate</small>
                      )}
                    </span>
                    <div className={styles.lineActions}>
                      <div
                        className={styles.quantity}
                        aria-label={`Quantity for ${product.name}`}>
                        <button
                          type="button"
                          aria-label={`Decrease ${product.name} quantity`}
                          disabled={quantity <= 1}
                          onClick={() => setQuantity(product.id, quantity - 1)}>
                          <Minus size={15} aria-hidden="true" />
                        </button>
                        <span aria-live="polite">{quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${product.name} quantity`}
                          disabled={quantity >= 99}
                          onClick={() => setQuantity(product.id, quantity + 1)}>
                          <Plus size={15} aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        className={styles.removeButton}
                        type="button"
                        onClick={() => removeFromCart(product.id)}>
                        <Trash2 size={15} aria-hidden="true" />
                        Remove
                      </button>
                    </div>
                  </div>
                  <strong className={styles.lineTotal}>
                    {formatCartLineTotal(product, quantity)}
                  </strong>
                </article>
              ))}
            </div>

            <aside className={styles.summary}>
              <Heading as="h2">Order summary</Heading>
              <div className={styles.summaryRow}>
                <span>
                  {total.minimum === total.maximum
                    ? 'Subtotal'
                    : 'Estimated total'}
                </span>
                <strong>
                  {total.minimum === total.maximum
                    ? formatPriceAmount(total.minimum)
                    : `${formatPriceAmount(total.minimum)} – ${formatPriceAmount(total.maximum)}`}
                </strong>
              </div>
              <p className={styles.summaryNote}>
                Custom design prices are estimates; final details, price, and
                shipping will be confirmed with you on WhatsApp.
              </p>
              <a
                className={styles.checkoutButton}
                href={checkoutUrl}
                target="_blank"
                rel="noreferrer">
                Continue to WhatsApp
              </a>
              <p className={styles.checkoutNote}>
                WhatsApp opens with your order details ready to send. You can
                review and send the message there.
              </p>
              <Link className={styles.continueLink} to="/shop">
                Continue shopping
              </Link>
            </aside>
          </div>
        ) : (
          <div className={styles.empty}>
            <Heading as="h2">Your bag is currently empty.</Heading>
            <p>Discover a piece for your next edit.</p>
            <Link to="/shop">Explore the collection</Link>
          </div>
        )}
      </section>
    </StoreLayout>
  );
}
