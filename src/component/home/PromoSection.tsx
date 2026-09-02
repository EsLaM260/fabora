import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
export default function PromoSection(){
  const {t}=useTranslation();
  return <section className="w-full px-5 md:px-8 py-10"><div className="grid md:grid-cols-2 gap-3"><Link to="/shop?sortBy=sale" className="min-h-[260px] bg-[#eee6dd] relative overflow-hidden p-8 motion-hover"><div className="text-[10px] tracking-[.2em] uppercase">{t('home.limitedTime')}</div><div className="serif text-4xl max-w-sm mt-5">{t('home.saleTitle')}</div><span className="absolute bottom-8 left-8 bg-ink text-white px-5 py-3 text-[10px] uppercase tracking-[.16em]">{t('home.shopSale')}</span></Link><Link to="/shop?sortBy=createdAt" className="min-h-[260px] bg-[#e3ded6] relative overflow-hidden p-8 motion-hover"><div className="text-[10px] tracking-[.2em] uppercase">{t('home.newArrivals')}</div><div className="serif text-4xl max-w-sm mt-5">{t('home.arrivalsTitle')}</div><div className="absolute right-0 bottom-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85')] bg-cover bg-center mix-blend-multiply"/></Link></div></section>
}
