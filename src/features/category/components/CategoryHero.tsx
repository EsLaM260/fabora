import {useTranslation} from 'react-i18next';
export default function CategoryHero({name,imageUrl}:{name:string;imageUrl:string}){
 const {t}=useTranslation();
 return <section className="w-full pt-10 px-5 md:px-8"><div className="relative aspect-[21/8] min-h-[280px] overflow-hidden bg-[#e9e1d7]"><img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover"/><div className="absolute inset-0 bg-black/20"/><div className="absolute bottom-8 left-8 text-white"><div className="text-[10px] uppercase tracking-[.2em]">{t('common.shop')} / {t('common.collection')}</div><h1 className="serif text-5xl mt-2">{name}</h1></div></div></section>
}
