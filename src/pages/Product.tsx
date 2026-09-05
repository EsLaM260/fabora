import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Seo from '../component/common/Seo';
import Gallery from '../component/product/Gallery';
import { getProduct } from '../api/contracts';
import { mockProducts, images } from '../utils/mockData';
import { imageOf, localized } from '../utils/format';
import { useApp } from '../context/AppContext';
import ProductDetailsSection from '../component/product/ProductDetailsSection';
import RelatedProductsSection from '../component/product/RelatedProductsSection';

export default function Product() {
  const { slug = '' } = useParams();
  const { language } = useApp();
  const q = useQuery({ queryKey: ['product', slug], queryFn: () => getProduct(slug), retry: false });
  const mockProduct = mockProducts.find((item) => item.slug === slug);
  const product = q.data || mockProduct;

  if (q.isLoading && !product) {
    return (
      <>
        <Seo title="fabora" />
        <main className="min-h-[60vh] grid place-items-center px-6">
          <p className="text-[10px] uppercase tracking-[.18em] text-muted">Loading…</p>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Seo title="Product not found" />
        <main className="min-h-[60vh] grid place-items-center px-6 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-[.18em] text-muted mb-3">fabora</p>
            <h1 className="serif text-4xl">Product not found</h1>
            <p className="text-sm text-muted mt-3">This product is unavailable or the link is incorrect.</p>
            <Link to="/shop" className="inline-flex mt-7 bg-ink text-white px-6 py-3 text-[10px] uppercase tracking-[.16em]">Back to shop</Link>
          </div>
        </main>
      </>
    );
  }

  const localDemoGallery = images.slice(0, 6);
  const gallery = Array.isArray(product.media) ? product.media.map((m: any) => imageOf([m], localDemoGallery[0])).filter(Boolean) : [];
  const isMockProduct = String(product?.id || '').startsWith('mock-');
  const galleryImages = gallery.length > 1 ? gallery : (mockProduct || isMockProduct ? localDemoGallery : [images[0]]);
  const variant = product.variants?.find((v: any) => v.isAvailable !== false) || product.variants?.[0];

  return (
    <>
      <Seo title={localized(product.name, language)} />
      <main key={`${slug}-${language}`}>
        <section className="w-full border-b thin-border">
          <div className="px-5 md:px-8 py-4 text-[10px] uppercase tracking-[.15em] text-muted">
            {language === 'ar' ? 'الرئيسية / المتجر' : 'Home / Shop'} / {localized(product.name, language)}
          </div>
        </section>
        <section className="w-full px-5 md:px-8 py-6 md:py-8 lg:py-10">
          <div className="grid lg:grid-cols-[minmax(0,1.06fr)_minmax(420px,.94fr)] gap-8 xl:gap-16 max-w-[1580px] mx-auto">
            <Gallery images={galleryImages} />
            <ProductDetailsSection product={product} variant={variant} />
          </div>
        </section>
        <RelatedProductsSection product={product} products={mockProducts} />
      </main>
    </>
  );
}
