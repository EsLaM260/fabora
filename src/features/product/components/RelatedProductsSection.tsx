import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../../../components/ProductCard';

export default function RelatedProductsSection({ product, products }: { product: any; products: any[] }) {
  const nav = useNavigate();
  const { t } = useTranslation();
  return (
    <section className="w-full px-5 md:px-8 pb-16 min-w-0">
      <div className="flex justify-between items-end mb-7 gap-4">
        <h2 className="serif text-3xl">{t('product.related')}</h2>
        <button onClick={() => nav('/shop')} className="text-xs uppercase tracking-[.14em] shrink-0">{t('home.view')} →</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-w-0">
        {products.filter((p) => p.id !== product.id).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
