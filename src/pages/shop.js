import {useEffect, useMemo, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import Heading from '@theme/Heading';
import StoreLayout from '@site/src/components/StoreLayout';
import ProductCard from '@site/src/components/ProductCard';
import {useStoreData} from '@site/src/components/StoreDataProvider';
import {selectProducts} from '@site/src/lib/storeData';
import styles from './shop.module.css';

export default function Shop() {
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [category, setCategory] = useState(params.get('category') ?? '');
  const [sort, setSort] = useState(params.get('sort') ?? 'featured');
  const {products: allProducts, categories} = useStoreData();

  useEffect(() => {
    setCategory(params.get('category') ?? '');
    setSort(params.get('sort') ?? 'featured');
  }, [params]);

  const products = selectProducts(allProducts, {category, sort});

  return (
    <StoreLayout
      title="Shop"
      description="Shop the curated ready-to-wear, footwear, and accessories collection at Jyotsna Designs.">
      <section className={styles.page}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>The Jyotsna edit</p>
          <Heading as="h1">Shop the collection</Heading>
          <p>Considered pieces and modern essentials, selected for you.</p>
        </div>

        <div className={styles.toolbar}>
          {/* Search is temporarily disabled; keep the UI out until search is re-enabled.
          <label className={styles.searchLabel}>
            <span className="srOnly">Search products</span>
            <input
              type="search"
              placeholder="Search products, brands..."
            />
          </label>
          */}
          <label className={styles.selectLabel}>
            <span className="srOnly">Filter by category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}>
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.selectLabel}>
            <span className="srOnly">Sort products</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="popular">Most popular</option>
              <option value="rating">Top rated</option>
              <option value="price-ascending">Price: low to high</option>
              <option value="price-descending">Price: high to low</option>
            </select>
          </label>
        </div>

        <p className={styles.resultCount}>
          {products.length} {products.length === 1 ? 'piece' : 'pieces'}
        </p>
        {products.length > 0 ? (
          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Heading as="h2">No pieces found</Heading>
            <p>Try another category or clear your filters.</p>
            <button
              type="button"
              onClick={() => {
                setCategory('');
              }}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </StoreLayout>
  );
}
