import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Seo from '../components/Seo';
import { getCatalog, getCategories } from '../api';
import HeroSection from '../features/home/components/HeroSection';
import CategorySection from '../features/home/components/CategorySection';
import ProductSection from '../features/home/components/ProductSection';
import NewsletterSection from '../features/home/components/NewsletterSection';

export default function Home() {
  const { t } = useTranslation();
  const products = useQuery({ queryKey: ['catalog', { page: 1 }], queryFn: () => getCatalog({ page: 1 }), retry: false });
  const categories = useQuery({ queryKey: ['categories'], queryFn: getCategories, retry: false });

  return <>
    <Seo title={t('home.seo')} />
    <HeroSection />
    <CategorySection categories={categories.data || []} />
    <ProductSection items={(products.data?.data || []).slice(0, 8)} />
    <NewsletterSection />
  </>;
}
