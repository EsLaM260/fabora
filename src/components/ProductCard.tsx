import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { localized, money, imageOf } from '../utils/format';

const FALLBACK_COLORS: Record<string, string> = {
  black: '#111111',
  white: '#ffffff',
  ivory: '#f4efe5',
  cream: '#f2e8d8',
  sand: '#d7c3a5',
  beige: '#d8c7b4',
  brown: '#6f4a35',
  chocolate: '#4b2f24',
  camel: '#b18b63',
  gray: '#8b8b8b',
  grey: '#8b8b8b',
  navy: '#202b45',
  blue: '#4d6f9f',
  green: '#5d705c',
  red: '#9d4b48',
  pink: '#d89aa5',
  yellow: '#d7b85a',
  orange: '#c87845',
};

function colorToCss(value: unknown) {
  const raw = String(value ?? '').trim();
  if (!raw) return '#d7d2ca';
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(raw) || /^rgb(a)?\(/i.test(raw)) return raw;
  return FALLBACK_COLORS[raw.toLowerCase()] ?? '#d7d2ca';
}

export default function ProductCard({ product }: { product: any }) {
  const [loaded, setLoaded] = useState(false);
  const imageSrc = imageOf(product.media, '');
  const { t, i18n } = useTranslation();
  const language = i18n.language === 'ar' ? 'ar' : 'en';
  const variants = Array.isArray(product.variants) ? product.variants.filter((v: any) => v?.isAvailable !== false) : [];
  const firstVariant = variants[0] || product.variants?.[0] || {};
  const price = firstVariant.price ?? firstVariant.unitPrice ?? 99;
  const sizes = Array.from(new Set(variants.map((variant: any) => variant.attributes?.find((a: any) => String(a.name).toLowerCase() === 'size')?.value).filter(Boolean).map(String)));
  const colors = Array.from(
    new Map(
      variants
        .map((variant: any) => variant.attributes?.find((a: any) => String(a.name).toLowerCase() === 'color')?.value)
        .filter(Boolean)
        .map((value: string) => [String(value).toLowerCase(), value]),
    ).values(),
  );

  return (
    <Link to={`/product/${product.slug}`} className="group block motion-card">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#ebe9e5]">
        {imageSrc ? (
          <img
            src={imageSrc}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(false)}
            alt={localized(product.name, language)}
            className={`w-full h-full object-cover transition duration-700 group-hover:scale-[1.03] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : null}
        {!loaded && <div className="absolute inset-0 image-placeholder z-0" />}
        {/* <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur transition-transform hover:scale-105" aria-label={t('common.wishlist')}>
          <Heart size={15} />
        </button> */}
        <span className="absolute left-3 top-3 bg-ink text-white text-[9px] uppercase tracking-wider px-2 py-1">{t('common.new')}</span>
      </div>

      <div className="pt-3 sm:pt-4 flex justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h3 className="text-[12px] sm:text-sm font-medium truncate">{localized(product.name, language)}</h3>
          <p className="text-[12px] sm:text-sm mt-1.5 sm:mt-2">{money(price, 'EGP')}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            {!!colors.length && (
              <div className="flex items-center gap-1.5" aria-label={t('common.chooseColor')}>
                {colors.slice(0, 6).map((color: any) => (
                  <span
                    key={String(color)}
                    title={String(color)}
                    aria-label={String(color)}
                    className="w-3.5 h-3.5 rounded-full border border-black/15 ring-1 ring-white"
                    style={{ backgroundColor: colorToCss(color) }}
                  />
                ))}
                {colors.length > 6 && <span className="text-[9px] text-muted">+{colors.length - 6}</span>}
              </div>
            )}
          </div>
        </div>
        <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition shrink-0" size={18} />
      </div>
    </Link>
  );
}
