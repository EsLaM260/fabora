import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../common/ProductCard';
export default function ProductSection({ items }: { items: any[] }) {
  const { t } = useTranslation();
  return <section className="w-full px-5 md:px-8 py-12">
    <div className="relative mb-8 text-center">
      <div className="text-[10px] tracking-[.2em] uppercase text-muted">{t('home.best')}</div>
      <h2 className="serif text-4xl mt-2">{t('home.essentials')}</h2>
      {/* <Link to="/shop" className="absolute right-0 bottom-0 text-xs uppercase tracking-[.14em]">{t('home.view')} →</Link> */}
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-9">{items.slice(0, 8).map((p: any) => <ProductCard product={p} key={p.id} />)}</div>
  </section>
}
