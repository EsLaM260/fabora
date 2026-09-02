import {useTranslation} from 'react-i18next';
import ProductCard from '../common/ProductCard';
export default function CategoryProductSection({products,loading,name}:{products:any[];loading:boolean;name:string}){
 const {t}=useTranslation();
 return <section className="w-full px-5 md:px-8 pb-20"><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">{loading?Array.from({length:8}).map((_,i)=><div key={i}><div className="aspect-[3/4] image-placeholder"/></div>):products.map((p:any)=><ProductCard key={p.id} product={p}/>)}</div>{!loading&&!products.length&&<div className="py-20 text-center"><div className="serif text-3xl">{t('shop.nothing')}</div><p className="text-muted mt-2">{t('shop.tryDifferent')}</p></div>}</section>
}
