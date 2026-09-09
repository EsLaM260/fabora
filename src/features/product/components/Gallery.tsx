import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Gallery({ images }: { images: string[] }) {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const safeImages = images.filter(Boolean);

  const activeIndex = safeImages.length ? Math.min(active, safeImages.length - 1) : 0;

  return (
    <div className="w-full min-w-0 lg:pr-2">
      <div className="flex min-w-0 flex-col gap-3 lg:grid lg:grid-cols-[92px_minmax(0,1fr)] lg:gap-4 lg:min-h-[680px]">

        {/* Mobile thumbnails */}
        <div
          className="
            order-2
            flex
            w-full
            min-w-0
            gap-3
            overflow-x-auto
            overscroll-x-contain
            pb-1
            no-scrollbar
            snap-x
            snap-mandatory

            lg:order-1
            lg:flex
            lg:flex-col
            lg:gap-6
            lg:overflow-y-auto
            lg:overflow-x-hidden
            lg:max-h-[680px]
          "
        >
          {safeImages.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${t('common.view')} ${t('common.product')} ${i + 1}`}
              aria-pressed={i === activeIndex}
              className={`
                relative
                flex-none
                snap-start
                overflow-hidden
                rounded-sm
                bg-[#eeebe6]

                w-[88px]
                h-[112px]

                sm:w-[96px]
                sm:h-[122px]

                transition-all
                duration-300

                lg:aspect-[3/4]
                lg:w-full
                lg:h-auto

                ${
                  i === activeIndex
                    ? 'ring-1 ring-inset ring-ink'
                    : 'opacity-70 hover:opacity-100'
                }
              `}
            >
              <img
                src={src}
                alt={`${t('common.product')} ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />

              {/* Subtle active indicator on mobile */}
              {i === activeIndex && (
                <span
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-[2px]
                    bg-ink
                    lg:hidden
                  "
                />
              )}
            </button>
          ))}
        </div>

        {/* Main image */}
        <div
          className="
            order-1
            col-span-2
            relative
            aspect-[4/5]
            overflow-hidden
            bg-[#eeebe6]

            lg:order-2
            lg:col-span-1
            lg:aspect-auto
            lg:min-h-[680px]
          "
        >
          {safeImages.length ? (
            <img
              src={safeImages[activeIndex]}
              alt={t('common.product')}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-[10px] uppercase tracking-[.16em] text-muted bg-[#eeebe6]">
              {t('common.noImage')}
            </div>
          )}

          <span
            className="
              absolute
              left-4
              top-4
              bg-white/90
              backdrop-blur
              px-3
              py-2
              text-[9px]
              uppercase
              tracking-[.16em]
            "
          >
            {t('home.newSeason')}
          </span>
        </div>
      </div>
    </div>
  );
}