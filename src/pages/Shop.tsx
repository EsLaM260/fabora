import {useTranslation} from 'react-i18next';
import {useSearchParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {useMemo,useState} from 'react';
import Seo from '../component/common/Seo';
import Filters from '../component/shop/Filters';
import ShopHeader from '../component/shop/ShopHeader';
import ProductGridSection from '../component/shop/ProductGridSection';
import {getCatalog} from '../api/contracts';
import {mockProducts} from '../utils/mockData';

export default function Shop(){
 const {t}=useTranslation();
 const [params,setParams]=useSearchParams(); const [filterOpen,setFilterOpen]=useState(false); const [search,setSearch]=useState(params.get('search')||'');
 const query=Object.fromEntries(params.entries()); const result=useQuery({queryKey:['catalog',query],queryFn:()=>getCatalog(query),retry:false}); const products=result.data?.data?.length?result.data.data:mockProducts;
 const filtered=useMemo(()=>{const q=search.toLowerCase();const category=query.categorySlug;const subcategory=query.subcategorySlug;return products.filter((p:any)=>{const matchesSearch=!q||p.name?.en?.toLowerCase().includes(q);const hierarchy=Array.isArray(p.categoryHierarchy)?p.categoryHierarchy.map((v:any)=>String(v).toLowerCase()):[];return matchesSearch&&(!category||hierarchy.includes(String(category).toLowerCase()))&&(!subcategory||hierarchy.includes(String(subcategory).toLowerCase()))})},[products,search,query.categorySlug,query.subcategorySlug]);
 return <><Seo title={t('shop.seo')}/><ShopHeader search={search} setSearch={setSearch} onFilter={()=>setFilterOpen(true)} sortOrder={params.get('sortOrder')||'desc'} onSort={value=>{const p=new URLSearchParams(params);p.set('sortOrder',value);setParams(p)}}/><ProductGridSection products={filtered} loading={result.isLoading}/><Filters open={filterOpen} onClose={()=>setFilterOpen(false)} query={query} setQuery={q=>{const p=new URLSearchParams();Object.entries(q).forEach(([k,v])=>v&&p.set(k,v));setParams(p);setFilterOpen(false)}}/></>;
}
