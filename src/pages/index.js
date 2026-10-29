import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import StoreLayout from '@site/src/components/StoreLayout';
import ProductCard from '@site/src/components/ProductCard';
import {useStoreData} from '@site/src/components/StoreDataProvider';
import {selectProducts} from '@site/src/lib/storeData';
import styles from './index.module.css';

export default function Home() {
  const editorialImage = useBaseUrl('/img/store/street-style.webp');
  const {home, products: allProducts, categories} = useStoreData();
  const products = selectProducts(allProducts).slice(0, 4);

  return (
    <StoreLayout
      title="Luxury Fashion"
      description="Discover curated fashion, elevated essentials, and statement pieces from Jyotsna Designs.">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{home.eyebrow}</p>
          <Heading as="h1">{home.title}</Heading>
          <p className={styles.heroDescription}>{home.description}</p>
          {/* Search is intentionally disabled while the storefront is in static mock-data mode.
          <form className={styles.heroSearch} action="/shop" method="get">
            <label className="srOnly" htmlFor="home-search">
              Search products
            </label>
            <input
              id="home-search"
              name="q"
              type="search"
              placeholder="Search designer edits, accessories, footwear..."
            />
            <button type="submit" aria-label="Search">
              Search
            </button>
          </form>
          */}
          <div className={styles.heroActions}>
            <Link className={styles.primaryLink} to="/shop">
              Shop all arrivals <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.textLink} to="/shop?sort=popular">
              Trending now
            </Link>
          </div>
          <div className={styles.heroNotes}>
            {home.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </div>
        <div className={styles.heroImageWrap}>
          <img
            className={styles.heroImage}
            src={home.image}
            alt={home.imageAlt}
            loading="eager"
            fetchPriority="high"
          />
          <div className={styles.imageCaption}>
            <span>THE SEASONAL EDIT</span>
            <span>01 / 03</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Trending right now</p>
            <Heading as="h2">Premium fashion with an editorial pulse</Heading>
            <p>
              Minimal silhouettes, tactile fabric stories, and luxe accents
              designed for high-impact everyday dressing.
            </p>
          </div>
          <Link className={styles.textLink} to="/shop">
            View all <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.categorySection}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Shop by category</p>
            <Heading as="h2">Build your wardrobe by mood</Heading>
            <p>
              From occasion wear to travel-ready essentials, find your next
              signature piece.
            </p>
          </div>
          <Link className={styles.textLink} to="/collections">
            All collections <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((category, index) => (
            <Link
              className={styles.categoryCard}
              key={category.id}
              to={`/shop?category=${encodeURIComponent(category.id)}`}>
              <img src={category.image} alt="" loading="lazy" />
              <span className={styles.categoryNumber}>
                0{index + 1} / COLLECTION
              </span>
              <span className={styles.categoryName}>{category.name}</span>
              <span className={styles.categoryArrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.editorial}>
        <div>
          <p className={styles.eyebrow}>A note from the atelier</p>
          <Heading as="h2">Considered pieces. Personal style.</Heading>
          <p>
            Discover a thoughtfully edited wardrobe of modern classics and
            expressive details, selected to be worn and loved beyond a season.
          </p>
          <Link className={styles.primaryLink} to="/collections">
            Explore our edit <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <img
          src={editorialImage}
          alt="Friends enjoying a day out in considered everyday outfits"
          loading="lazy"
        />
      </section>
    </StoreLayout>
  );
}
