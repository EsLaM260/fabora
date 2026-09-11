import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import Seo from '../components/seo';
import Filters from '../features/shop/components/filters';
import ShopHeader from '../features/shop/components/shop-header';
import ProductGridSection from '../features/shop/components/product-grid-section';
import { getCatalog } from '../api';

export default function Shop() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState(params.get('search') || '');
  const query = Object.fromEntries(params.entries());
  const result = useQuery({ queryKey: ['catalog', query], queryFn: () => getCatalog(query), retry: false });
  const products = result.data?.data || [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const category = query.categorySlug;
    const subcategory = query.subcategorySlug;
    return products.filter((product: any) => {
      const englishName = typeof product.name === 'string' ? product.name : product.name?.en || '';
      const matchesSearch = !q || englishName.toLowerCase().includes(q);
      const hierarchy = Array.isArray(product.categoryHierarchy) ? product.categoryHierarchy.map((v: any) => String(v).toLowerCase()) : [];
      return matchesSearch && (!category || hierarchy.includes(String(category).toLowerCase())) && (!subcategory || hierarchy.includes(String(subcategory).toLowerCase()));
    });
  }, [products, search, query.categorySlug, query.subcategorySlug]);

  return <>
    <Seo title={t('shop.seo')} />
    <ShopHeader search={search} setSearch={setSearch} onFilter={() => setFilterOpen(true)} sortOrder={params.get('sortOrder') || 'desc'} onSort={value => { const p = new URLSearchParams(params); p.set('sortOrder', value); setParams(p); }} />
    <ProductGridSection products={filtered} loading={result.isLoading} />
    <Filters open={filterOpen} onClose={() => setFilterOpen(false)} query={query} setQuery={next => { const p = new URLSearchParams(); Object.entries(next).forEach(([k, v]) => v && p.set(k, v)); setParams(p); setFilterOpen(false); }} />
  </>;
}
