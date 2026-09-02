import {useParams,useSearchParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import Seo from '../component/common/Seo';
import {getCatalog,getCategories} from '../api/contracts';
import {mockCategories,mockProducts} from '../utils/mockData';
import {getStoreCategory} from '../utils/categories';
import {useApp} from '../context/AppContext';
import CategoryHero from '../component/category/CategoryHero';
import CategoryControlsSection from '../component/category/CategoryControlsSection';
import CategoryProductSection from '../component/category/CategoryProductSection';

export default function Category(){
 const {slug='women'}=useParams(); const [params]=useSearchParams(); const {language}=useApp(); const activeCategory=getStoreCategory(slug); const activeSubcategory=params.get('subcategorySlug');
 const cats=useQuery({queryKey:['categories'],queryFn:getCategories,retry:false}); const apiCategories=Array.isArray(cats.data)?cats.data:[]; const catFromApi=apiCategories.find((c:any)=>c.slug===activeCategory.slug); const cat=catFromApi||activeCategory||(cats.data||mockCategories)[0];
 const q=useQuery({queryKey:['category',activeCategory.slug,activeSubcategory],queryFn:()=>getCatalog({categorySlug:activeCategory.slug,...(activeSubcategory?{subcategorySlug:activeSubcategory}:{})}),retry:false});
 const apiProducts=q.data?.data?.length?q.data.data:[]; const products=(apiProducts.length?apiProducts:mockProducts).filter((p:any)=>{const hierarchy=Array.isArray(p.categoryHierarchy)?p.categoryHierarchy.map((v:any)=>String(v).toLowerCase()):[];return apiProducts.length|| (hierarchy.includes(activeCategory.slug)&&(!activeSubcategory||hierarchy.includes(activeSubcategory)));});
 const name=cat?.name?.[language]||cat?.name?.en||activeCategory.name.en; const imageUrl=cat?.imageUrl||activeCategory.imageUrl;
 return <><Seo title={`${name} collection`}/><CategoryHero name={name} imageUrl={imageUrl}/><CategoryControlsSection name={name} activeCategory={activeCategory} activeSubcategory={activeSubcategory} language={language}/><CategoryProductSection products={products} loading={q.isLoading} name={name}/></>;
}
