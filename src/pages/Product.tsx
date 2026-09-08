import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Seo from '../component/common/Seo';
import Gallery from '../component/product/Gallery';
import { getCatalog, getProduct } from '../api/contracts';
import { imageOf, localized } from '../utils/format';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import ProductDetailsSection from '../component/product/ProductDetailsSection';
import RelatedProductsSection from '../component/product/RelatedProductsSection';

export default function Product() {
  const { slug = '' } = useParams();
  const { language } = useApp();
  const { t } = useTranslation();
  const q = useQuery({ queryKey: ['product', slug], queryFn: () => getProduct(slug), retry: false, enabled: Boolean(slug) });
  const relatedQuery = useQuery({ queryKey: ['related-products', slug], queryFn: () => getCatalog({ page: 1, limit: 8 }), retry: false, enabled: Boolean(slug) });
  const product = q.data;

  if (q.isLoading) {
    return <>
      <Seo title={t('common.product')} />
      <main className="min-h-[60vh] grid place-items-center px-6"><p className="text-[10px] uppercase tracking-[.18em] text-muted">{t('common.loading')}</p></main>
    </>;
  }

  if (!product) {
    return <>
      <Seo title={t('product.notFound')} />
      <main className="min-h-[60vh] grid place-items-center px-6 text-center"><div>
        <p className="text-[10px] uppercase tracking-[.18em] text-muted mb-3">fabora</p>
        <h1 className="serif text-4xl">{t('product.notFound')}</h1>
        <p className="text-sm text-muted mt-3">{t('product.notFoundText')}</p>
        <Link to="/shop" className="inline-flex mt-7 bg-ink text-white px-6 py-3 text-[10px] uppercase tracking-[.16em]">{t('common.backToShop')}</Link>
      </div></main>
    </>;
  }

  const galleryImages = Array.isArray(product.media) ? product.media.map((media: any) => imageOf([media], '')).filter(Boolean) : [];
  const variant = product.variants?.find((item: any) => item?.isAvailable !== false) || product.variants?.[0];
  const related = (relatedQuery.data?.data || []).filter((item: any) => item.id !== product.id).slice(0, 4);

  return <>
    <Seo title={localized(product.name, language)} />
    <main key={`${slug}-${language}`}>
      <section className="w-full border-b thin-border"><div className="px-5 md:px-8 py-4 text-[10px] uppercase tracking-[.15em] text-muted">{t('common.home')} / {t('common.shop')} / {localized(product.name, language)}</div></section>
      <section className="w-full px-5 md:px-8 py-6 md:py-8 lg:py-10"><div className="grid lg:grid-cols-[minmax(0,1.06fr)_minmax(420px,.94fr)] gap-8 xl:gap-16 max-w-[1580px] mx-auto">
        <Gallery images={galleryImages} />
        <ProductDetailsSection product={product} variant={variant} />
      </div></section>
      <RelatedProductsSection product={product} products={related} />
    </main>
  </>;
}
