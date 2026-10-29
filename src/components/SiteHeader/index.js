import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {Heart, Menu, Moon, Search, ShoppingBag, Sun, X} from 'lucide-react';
import {useColorMode} from '@docusaurus/theme-common';
import {useState} from 'react';
import {useWishlist} from '@site/src/components/WishlistProvider';
import {useCart} from '@site/src/components/CartProvider';
import styles from './styles.module.css';

export default function SiteHeader() {
  const logoUrl = useBaseUrl('/img/jyotsna-designs-logo.jpg');
  const {colorMode, setColorMode} = useColorMode();
  const {productIds} = useWishlist();
  const {itemCount} = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleColorMode() {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  }

  return (
    <header className={styles.header}>
      <div className={styles.utilityBar}>
        Complimentary shipping on orders over ₹5,000
      </div>
      <div className={styles.mainRow}>
        <Link className={styles.brand} to="/" aria-label="Jyotsna Designs home">
          <img
            className={styles.brandLogo}
            src={logoUrl}
            alt=""
          />
          <span className={styles.brandText}>
            <span>JYOTSNA DESIGNS</span>
            <small>Luxury Fashion House</small>
          </span>
        </Link>

        <nav
          className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ''}`}
          aria-label="Main navigation">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/collections" onClick={() => setMenuOpen(false)}>
            Collections
          </Link>
        </nav>

        {/* Search is intentionally disabled while the storefront is in static mock-data mode.
        <form className={styles.search} action="/shop" method="get">
          <Search size={17} aria-hidden="true" />
          <label className="srOnly" htmlFor="site-search">
            Search products
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Search looks, brands, colors..."
          />
        </form>
        */}

        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            type="button"
            onClick={toggleColorMode}
            aria-label={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}>
            {colorMode === 'dark' ? (
              <Sun size={19} aria-hidden="true" />
            ) : (
              <Moon size={19} aria-hidden="true" />
            )}
          </button>
          <Link
            className={styles.iconButton}
            to="/wishlist"
            aria-label={`Wishlist, ${productIds.length} saved ${productIds.length === 1 ? 'item' : 'items'}`}>
            <Heart size={19} aria-hidden="true" />
            {productIds.length > 0 && (
              <span className={styles.count}>{productIds.length}</span>
            )}
          </Link>
          <Link
            className={styles.iconButton}
            to="/cart"
            aria-label={`Cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}>
            <ShoppingBag size={19} aria-hidden="true" />
            {itemCount > 0 && (
              <span className={styles.count}>{itemCount}</span>
            )}
          </Link>
          <button
            className={`${styles.iconButton} ${styles.menuButton}`}
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
