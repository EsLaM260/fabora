import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Globe, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { STORE_CATEGORIES } from '../../utils/categories';
import { getCart, removeCartItem, updateCartItem } from '../../api/contracts';
import { useApp } from '../../context/AppContext';
import MobileMenu from './MobileMenu';
import MiniCart from './MiniCart';

import logoDark from '/asset/images/fabora-logo-dark.svg';
import logoLight from '/asset/images/fabora-logo-light.svg';

const HEADER_IMAGE_TRANSPARENT = logoDark;
const HEADER_IMAGE_SOLID = logoLight;


export default function Header() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const location = useLocation();
  const { language, setLanguage, country, setCountry, cartCount, setCartCount } = useApp();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartQuery = useQuery({ queryKey: ['cart'], queryFn: getCart, retry: false });
  const cartItems = cartQuery.data?.items ?? [];
  const cartTotal = cartQuery.data?.pricing?.finalTotal ?? 0;
  const cartItemCount = cartItems.reduce((sum: number, item: any) => sum + (Number(item.quantity) || 0), 0);
  const displayCartCount = cartItemCount || cartCount;

  useEffect(() => {
    if (cartItems.length) setCartCount(cartItemCount);
  }, [cartItemCount, cartItems.length, setCartCount]);

  useEffect(() => {
    setCartOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setCartOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const cartUpdate = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) => updateCartItem(id, quantity),
    onSuccess: (cart) => {
      queryClient.setQueryData(['cart'], cart);
      setCartCount(cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0));
    },
  });

  const cartRemove = useMutation({
    mutationFn: (id: string) => removeCartItem(id),
    onSuccess: (cart) => {
      queryClient.setQueryData(['cart'], cart);
      setCartCount(cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0));
    },
  });

  const isHome = location.pathname === '/';
  const useLightHeader = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) nav(`/shop?search=${encodeURIComponent(search.trim())}`);
  };

  const categoryIsActive = (slug: string) =>
    location.search.includes(`categorySlug=${slug}`) || location.pathname === `/category/${slug}`;

  const textClass = useLightHeader ? 'text-ink md:text-white' : 'text-ink';
  const mutedTextClass = useLightHeader ? 'text-ink/75 md:text-white/75' : 'text-ink/75';

  const headerSurface = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-white border-b thin-border shadow-[0_8px_30px_rgba(0,0,0,.05)]';

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-out ${isHome ? '-mb-20' : ''} ${headerSurface} ${textClass}`}
    >
      <div className="w-full h-20 grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:px-8 animate-header-drop">
        <div className="min-w-0">
          <button className={`lg:hidden transition-transform duration-300 ${open ? 'rotate-90' : ''}`} onClick={() => setOpen(!open)} aria-label={t('common.filter')}>
            {open ? <X /> : <Menu />}
          </button>

          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-[.16em] uppercase">
            <Link
              className={`${location.pathname === '/shop' && !location.search ? 'font-semibold' : `${mutedTextClass} hover:opacity-100`} transition-opacity`}
              to="/shop"
            >
              {t('nav.shop')}
            </Link>

            {STORE_CATEGORIES.map((category) => (
              <div
                key={category.slug}
                className="relative"
                onMouseEnter={() => setOpenCategory(category.slug)}
                onMouseLeave={() => setOpenCategory(null)}
              >
                <div className="flex items-center gap-1">
                  <Link
                    className={`${categoryIsActive(category.slug) ? 'font-semibold' : `${mutedTextClass} hover:opacity-100`} transition-opacity`}
                    to={`/category/${category.slug}`}
                  >
                    {category.name[language] || category.name.en}
                  </Link>
                  <ChevronDown size={13} className={useLightHeader ? 'text-white/60' : 'text-ink/60'} />
                </div>

                <div
                  className={`${
                    openCategory === category.slug
                      ? 'visible opacity-100 translate-y-0'
                      : 'invisible opacity-0 -translate-y-1'
                  } absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-200`}
                >
                  <div className="w-44 border thin-border bg-white text-ink shadow-xl p-2 normal-case tracking-normal">
                    <Link
                      to={`/category/${category.slug}`}
                      className="block px-3 py-2 text-[10px] uppercase tracking-[.16em] font-semibold hover:bg-ink hover:text-white"
                    >
                      View {category.name.en}
                    </Link>
                    {category.children.map((child) => (
                      <Link
                        key={child.slug}
                        to={`/shop?categorySlug=${category.slug}&subcategorySlug=${child.slug}`}
                        className="block px-3 py-2 text-xs hover:bg-black/5"
                      >
                        {child.name[language] || child.name.en}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* <Link className={`${mutedTextClass} hover:opacity-100 transition-opacity`} to="/shop?sortBy=sale">
              {t('nav.sale')}
            </Link> */}
            {/* <Link
              className={`${location.pathname === '/about' ? 'font-semibold' : `${mutedTextClass} hover:opacity-100`} transition-opacity`}
              to="/about"
            >
              {t('nav.about')}
            </Link> */}
          </nav>
        </div>

        <Link to="/" className="w-[240px] relative flex items-center justify-center min-w-[112px] h-12 group" aria-label="fabora home">
          <img
            src={HEADER_IMAGE_SOLID}
            alt="fabora"
            className={`md:hidden max-w-[140px] w-auto object-contain transition-all duration-500 group-hover:scale-[1.04] ${useLightHeader ? 'block' : 'block'}`}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <img
            src={useLightHeader ? HEADER_IMAGE_TRANSPARENT : HEADER_IMAGE_SOLID}
            alt="fabora"
            className="hidden md:block max-w-[140px] w-auto object-contain transition-all duration-500 group-hover:scale-[1.04]"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('serif', 'text-3xl', 'tracking-tight');
              if (e.currentTarget.parentElement && !e.currentTarget.parentElement.dataset.fallback) {
                e.currentTarget.parentElement.dataset.fallback = 'true';
                e.currentTarget.parentElement.appendChild(document.createTextNode('fabora'));
              }
            }}
          />
        </Link>

        <div className="flex items-center justify-end gap-2 min-w-0">
          <form onSubmit={submit} className={`hidden md:flex items-center border px-3 py-2 transition-colors ${useLightHeader ? 'border-white/35 bg-white/10' : 'thin-border bg-white'}`}>
            <Search size={15} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('shop.search')}
              className="bg-transparent outline-none w-24 text-xs ml-2 placeholder:opacity-60"
            />
          </form>
          {/* <button className="p-2 transition-transform duration-200 hover:scale-110" onClick={() => nav('/login')} aria-label="Account">
            <UserRound size={18} />
          </button> */}
          <button className="p-2 relative transition-transform duration-200 hover:scale-110" onClick={() => setCartOpen((value) => !value)} aria-label={t('cart.bag')} aria-expanded={cartOpen}>
            <ShoppingBag size={19} />
            {displayCartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-ink text-white text-[9px] grid place-items-center">
                {displayCartCount}
              </span>
            )}
          </button>
          {/* <button
            className="hidden sm:flex items-center gap-1 text-[10px] uppercase tracking-wider transition-opacity hover:opacity-70"
            onClick={() => setCountry(country === 'EG' ? 'AE' : 'EG')}
          >
            <Globe size={13} />
            {country}
          </button> */}
          <button
            className="hidden sm:block text-[10px] uppercase tracking-wider transition-opacity hover:opacity-70"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} language={language} />
      <MiniCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        onChange={(id, quantity) => cartUpdate.mutate({ id, quantity })}
        onRemove={(id) => cartRemove.mutate(id)}
      />
    </header>
  );
}
