import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CheckoutHeaderSection() {
  const {t}=useTranslation();
  return <section className="border-b thin-border bg-[#fbfaf8]">
    <div className="w-full px-5 md:px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-[1580px] mx-auto">
      <div><Link to="/cart" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.16em] text-muted hover:text-ink transition-colors"><ArrowLeft size={13}/> {t('common.backToBag')}</Link><p className="text-[10px] uppercase tracking-[.2em] text-muted mt-7">fabora / {t('checkout.secureCheckout')}</p><h1 className="serif text-4xl md:text-5xl mt-2">{t('checkout.title')}</h1></div>
      <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.15em] text-muted"><ShieldCheck size={15}/> {t('checkout.secure')}</div>
    </div>
    <div className="border-t thin-border"><div className="w-full px-5 md:px-8 max-w-[1580px] mx-auto py-4 flex items-center gap-6 text-[9px] uppercase tracking-[.15em]"><span className="text-ink font-semibold">01 {t('checkout.details')}</span><span className="text-muted">—</span><span className="text-muted">02 {t('checkout.shipping')}</span><span className="text-muted">—</span><span className="text-muted">03 {t('checkout.payment')}</span></div></div>
  </section>;
}
