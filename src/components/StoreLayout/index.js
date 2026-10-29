import Layout from '@theme/Layout';
import SiteFooter from '@site/src/components/SiteFooter';
import SiteHeader from '@site/src/components/SiteHeader';

export default function StoreLayout({children, title, description}) {
  return (
    <Layout noNavbar noFooter title={title} description={description}>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </Layout>
  );
}
