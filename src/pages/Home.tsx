import {useTranslation} from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Seo from '../component/common/Seo';
import { getCatalog, getCategories } from '../api/contracts';
import { mockProducts } from '../utils/mockData';
import { STORE_CATEGORIES } from '../utils/categories';
import HeroSection from '../component/home/HeroSection';
import CategorySection from '../component/home/CategorySection';
import PromoSection from '../component/home/PromoSection';
import { HOME_DUMMY_IMAGES, USE_HOME_DUMMY_IMAGES } from '../utils/homeProductImages';
import ProductSection from '../component/home/ProductSection';
import NewsletterSection from '../component/home/NewsletterSection';

export default function Home() {
  const {t}=useTranslation();
  const products = useQuery({ queryKey: ['catalog', { page: 1 }], queryFn: () => getCatalog({ page: 1 }), retry: false });
  const cats = useQuery({ queryKey: ['categories'], queryFn: getCategories, retry: false });
  const rawItems = products.data?.data?.length ? products.data.data : mockProducts;
  const items = rawItems.map((product: any, index: number) => ({
    ...product,
    media: USE_HOME_DUMMY_IMAGES
      ? [{ url: HOME_DUMMY_IMAGES[index % HOME_DUMMY_IMAGES.length] }]
      : product.media,
  }));
  const apiCategories = Array.isArray(cats.data) ? cats.data : [];
  const categories = STORE_CATEGORIES.map((fallback) => apiCategories.find((item: any) => item.slug === fallback.slug) || fallback);
  return <>
    <Seo title={t('home.seo')} />
    <HeroSection />
    <CategorySection categories={categories} />
    {/* <PromoSection /> */}
    <ProductSection items={items} />
    <NewsletterSection />
  </>;
}
