import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../component/common/Seo';
import { getCart } from '../api/contracts';
import CheckoutHeaderSection from '../component/checkout/CheckoutHeaderSection';
import CheckoutFormSection from '../component/checkout/CheckoutFormSection';
import CheckoutSummarySection from '../component/checkout/CheckoutSummarySection';

export default function Checkout() {
  const query = useQuery({ queryKey: ['cart'], queryFn: getCart, retry: false });
  const items = query.data?.items ?? [];
  const pricing = query.data?.pricing ?? { baseSubtotal: 0, effectiveSubtotal: 0, totalLineDiscounts: 0, shippingFee: 0, totalDiscount: 0, finalTotal: 0 };
  return <><Seo title="Checkout" /><CheckoutHeaderSection />{query.isLoading ? <div className="min-h-[50vh] grid place-items-center text-xs uppercase tracking-[.18em] text-muted">{t('common.loading')}</div> : !items.length ? <section className="w-full px-5 md:px-8 py-28 text-center"><p className="text-[10px] uppercase tracking-[.2em] text-muted">{t('checkout.nothing')}</p><h2 className="serif text-4xl mt-3">{t('checkout.empty')}</h2><p className="text-sm text-muted mt-3">{t('checkout.emptyText')}</p><Link to="/shop" className="inline-flex items-center justify-center h-12 px-7 bg-ink text-white mt-8 text-xs uppercase tracking-[.16em]">{t('common.continueShopping')}</Link></section> : <section className="w-full px-5 md:px-8 py-8 md:py-12"><div className="grid lg:grid-cols-[minmax(0,1fr)_420px] gap-10 xl:gap-16 max-w-[1580px] mx-auto"><div className="min-w-0"><CheckoutFormSection /></div><CheckoutSummarySection items={items} pricing={pricing} /></div></section>}</>;
}
