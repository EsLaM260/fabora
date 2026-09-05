import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'TikTok', href: 'https://www.tiktok.com', icon: 'tiktok' as const },
  { label: 'Linkendin', href: 'https://www.linkedin.com/', icon: Linkedin },
];

export default function Footer() {
  const { auth } = useApp();
  const { t } = useTranslation();

  return (
    <footer className="bg-ink text-white mt-16">
      <div className="w-full px-5 md:px-8 py-12 grid md:grid-cols-4 gap-10">
        <div>
<img
  src="/asset/images/fabora-logo-dark.svg"
  alt="fabora"
  className="h-8 w-auto mb-8"
/>
          <p className="text-white/60 text-sm leading-7 max-w-xs">
            {t('footer.description')}
          </p>
          <div className="flex items-center gap-3 mt-7">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-white/15 grid place-items-center text-white/70 hover:text-white hover:border-white/50 transition-all duration-300 hover:-translate-y-1"
              >
                {Icon === 'tiktok' ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                    <path d="M14.4 3c.25 1.72 1.17 3.12 2.76 4.18a7.1 7.1 0 0 0 3.34.94v2.5a9.5 9.5 0 0 1-3.37-.68v5.48a6.3 6.3 0 1 1-5.45-6.24v2.6a3.7 3.7 0 1 0 2.86 3.58V3h2.86Z"/>
                  </svg>
                ) : (
                  <Icon size={16} />
                )}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs tracking-[.18em] uppercase mb-5">{t('common.shop')}</div>
          <div className="grid gap-3 text-sm text-white/60">
            <Link to="/shop">{t('common.allProducts')}</Link>
            <Link to="/shop?categorySlug=kids">{t('nav.kids')}</Link>
            <Link to="/shop?categorySlug=women">{t('nav.women')}</Link>
            <Link to="/shop?categorySlug=men">{t('nav.men')}</Link>
          </div>
        </div>

        <div>
          <div className="text-xs tracking-[.18em] uppercase mb-5">{t('footer.clientCare')}</div>
          <div className="grid gap-3 text-sm text-white/60">
            <Link to="/cart">{t('cart.bag')}</Link>
            <span>{t('footer.shipping')}</span>
            <span>{t('footer.returns')}</span>
            <span>{t('product.sizeGuide')}</span>
          </div>
        </div>

        <div>
          <div className="text-xs tracking-[.18em] uppercase mb-5">{t('footer.stayConnected')}</div>
          <p className="text-white/60 text-sm mb-4">{t('footer.connectedText')}</p>
          <div className="border border-white/20 flex">
            <input placeholder={t('common.email')} className="bg-transparent px-3 py-3 outline-none flex-1 text-sm" />
            <button className="px-4" aria-label={t('footer.subscribe')}>→</button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-[10px] uppercase tracking-[.14em] text-white/40">
        <div className="w-full px-5 md:px-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span>© 2026 fabora</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/55">
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link to="/about" className="hover:text-white transition-colors">{t('footer.about')}</Link>
          </div>
          <span>{auth.accessToken ? t('footer.signedIn') : ''}</span>
        </div>
      </div>
    </footer>
  );
}
