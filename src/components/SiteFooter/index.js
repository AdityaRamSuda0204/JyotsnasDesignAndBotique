import Link from '@docusaurus/Link';
import {Mail, MapPin, MessageCircle} from 'lucide-react';
import {useStoreData} from '@site/src/components/StoreDataProvider';
import styles from './styles.module.css';

export default function SiteFooter() {
  const {config} = useStoreData();
  const whatsappNumber = `${config.whatsappCountryCode}${config.whatsappNumber}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div>
          <Link className={styles.brand} to="/">
            JYOTSNA DESIGNS
          </Link>
          <p>
            Modern fashion, editorial moods, and elevated essentials—thoughtfully
            selected for your wardrobe.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/shop">Shop all</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div>
          <h2>Client services</h2>
          <a href="mailto:care@jyotsnadesigns.com">
            <Mail size={16} aria-hidden="true" /> care@jyotsnadesigns.com
          </a>
          <a href={`https://wa.me/${whatsappNumber}`}>
            <MessageCircle size={16} aria-hidden="true" /> WhatsApp concierge
            (+{config.whatsappCountryCode} {config.whatsappNumber})
          </a>
          <span>
            <MapPin size={16} aria-hidden="true" /> Mumbai studio
          </span>
        </div>
        <div>
          <h2>Follow the house</h2>
          <a href="https://www.instagram.com/jyotsna.designs/">
            <span aria-hidden="true">@</span> jyotsna.designs
          </a>
        </div>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Jyotsna Designs. All rights reserved.
      </div>
    </footer>
  );
}
