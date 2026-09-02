import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Gallery({ images }: { images: string[] }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const safeImages = images.length ? images : ['/asset/images/ui-reference.png'];
  const activeIndex = Math.min(active, safeImages.length - 1);

  return (
    <div className="lg:pr-2">
      <div className="grid grid-cols-2 lg:grid-cols-[92px_1fr] gap-3 lg:gap-4 lg:min-h-[680px]">
        <div className="order-2 lg:order-1 grid grid-cols-4 lg:grid-cols-1 gap-3 content-start lg:max-h-[680px] lg:overflow-auto no-scrollbar">
          {safeImages.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${t('common.view')} ${t('common.product')} ${i + 1}`}
              aria-pressed={i === activeIndex}
              className={`aspect-[3/4] overflow-hidden border transition ${i === activeIndex ? 'border-ink' : 'border-transparent hover:border-black/20'}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
            </button>
          ))}
        </div>

        <div className="order-1 lg:order-2 col-span-2 lg:col-span-1 aspect-[3/4] lg:aspect-auto bg-[#eeebe6] overflow-hidden relative">
          <img src={safeImages[activeIndex]} alt={t('common.product')} className="w-full h-full object-cover" />
          <span className="absolute left-4 top-4 bg-white/90 backdrop-blur px-3 py-2 text-[9px] uppercase tracking-[.16em]">
            {t('home.newSeason')}
          </span>
        </div>
      </div>
    </div>
  );
}
