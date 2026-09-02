import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

type FiltersProps = {
  open: boolean;
  onClose: () => void;
  query: Record<string, string>;
  setQuery: (q: Record<string, string>) => void;
};

export default function Filters({ open, onClose, query, setQuery }: FiltersProps) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.resolvedLanguage === 'ar';

  return (
    <div className={`fixed inset-0 z-[60] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      <button
        type="button"
        aria-label={t('common.close')}
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <aside
        dir={isArabic ? 'rtl' : 'ltr'}
        aria-label={t('shop.filter')}
        className={`absolute top-0 h-full w-[min(88vw,390px)] bg-white p-7 shadow-2xl transition-transform duration-300 ease-out ${
          isArabic ? 'right-0' : 'left-0'
        } ${
          open ? 'translate-x-0' : isArabic ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-4 mb-10">
          <h3 className="serif text-2xl">{t('shop.filter')}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="p-2 -mr-2 transition-opacity hover:opacity-60"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-8 text-sm">
          <label className="grid gap-2">
            <span>{t('shop.minPrice')}</span>
            <input
              aria-label={t('shop.minPrice')}
              type="number"
              inputMode="numeric"
              min="0"
              value={query.minPrice || ''}
              onChange={(e) => setQuery({ ...query, minPrice: e.target.value })}
              className="w-full border thin-border bg-white px-3 py-3 outline-none focus:border-ink"
            />
          </label>

          <label className="grid gap-2">
            <span>{t('shop.maxPrice')}</span>
            <input
              aria-label={t('shop.maxPrice')}
              type="number"
              inputMode="numeric"
              min="0"
              value={query.maxPrice || ''}
              onChange={(e) => setQuery({ ...query, maxPrice: e.target.value })}
              className="w-full border thin-border bg-white px-3 py-3 outline-none focus:border-ink"
            />
          </label>
        </div>
      </aside>
    </div>
  );
}
