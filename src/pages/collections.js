import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import StoreLayout from '@site/src/components/StoreLayout';
import {useStoreData} from '@site/src/components/StoreDataProvider';
import {selectProducts} from '@site/src/lib/storeData';
import styles from './collections.module.css';

export default function Collections() {
  const {categories, products} = useStoreData();

  return (
    <StoreLayout
      title="Collections"
      description="Explore the curated fashion collections at Jyotsna Designs.">
      <section className={styles.page}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Curated for your wardrobe</p>
          <Heading as="h1">The collections</Heading>
          <p>Distinct moods, considered details, and pieces made to be worn.</p>
        </div>
        <div className={styles.grid}>
          {categories.map((category, index) => {
            const count = selectProducts(products, {category: category.id}).length;
            return (
              <Link
                className={styles.card}
                key={category.id}
                to={`/shop?category=${encodeURIComponent(category.id)}`}>
                <img src={category.image} alt="" loading="lazy" />
                <span className={styles.number}>0{index + 1} / THE EDIT</span>
                <Heading as="h2">{category.name}</Heading>
                <span className={styles.count}>
                  {count} {count === 1 ? 'piece' : 'pieces'} <span>↗</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </StoreLayout>
  );
}
