import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Seo from '../component/common/Seo';
import { getCatalog, getCategories } from '../api/contracts';
import HeroSection from '../component/home/HeroSection';
import CategorySection from '../component/home/CategorySection';
import ProductSection from '../component/home/ProductSection';
import NewsletterSection from '../component/home/NewsletterSection';

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
