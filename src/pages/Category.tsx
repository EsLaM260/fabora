import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Seo from '../component/common/Seo';
import { getCatalog, getCategories } from '../api/contracts';
import { useApp } from '../context/AppContext';
import CategoryHero from '../component/category/CategoryHero';
import CategoryControlsSection from '../component/category/CategoryControlsSection';
import CategoryProductSection from '../component/category/CategoryProductSection';

export default function Category() {
  const { slug = 'women' } = useParams();
  const [params] = useSearchParams();
  const { language } = useApp();
  const activeSubcategory = params.get('subcategorySlug');
  const categories = useQuery({ queryKey: ['categories'], queryFn: getCategories, retry: false });
  const activeCategory = (categories.data || []).find((item: any) => item.slug === slug);
  const q = useQuery({
    queryKey: ['category', slug, activeSubcategory],
    queryFn: () => getCatalog({ categorySlug: slug, ...(activeSubcategory ? { subcategorySlug: activeSubcategory } : {}) }),
    retry: false,
    enabled: Boolean(slug),
  });
  const products = q.data?.data || [];
  const name = activeCategory?.name?.[language] || activeCategory?.name?.en || slug;
  const imageUrl = activeCategory?.imageUrl || '/asset/images/ui-reference.png';

  return <>
    <Seo title={`${name} collection`} />
    <CategoryHero name={name} imageUrl={imageUrl} />
    <CategoryControlsSection name={name} activeCategory={activeCategory || { slug, children: [] }} activeSubcategory={activeSubcategory} language={language} />
    <CategoryProductSection products={products} loading={q.isLoading} name={name} />
  </>;
}
