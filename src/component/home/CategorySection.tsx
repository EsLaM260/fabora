import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LOCAL_CATEGORY_IMAGES: Record<string, string> = {
  women: '/asset/images/categories/women.webp',
  men: '/asset/images/categories/men.webp',
  kids: '/asset/images/categories/kids.webp',
};

const FALLBACK_IMAGE = '/asset/images/ui-reference.png';

export default function CategorySection({ categories }: { categories: any[] }) {
  const { t, i18n } = useTranslation();

  return (
    <section className="w-full px-5 md:px-8 py-16 md:py-20 flex justify-center bg-white">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <div className="text-[10px] tracking-[.2em] uppercase text-muted">{t('home.categories')}</div>
          <h2 className="serif text-4xl mt-2">{t('home.edit')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.slice(0, 3).map((c: any) => {
            const localImage = LOCAL_CATEGORY_IMAGES[c.slug];
            return (
              <Link to={`/shop?categorySlug=${c.slug}`} key={c.id} className="group relative aspect-[4/5] overflow-hidden motion-hover">
                <img
                  src={localImage || FALLBACK_IMAGE}
                  loading="lazy"
                  alt={c.name?.[i18n.language === 'ar' ? 'ar' : 'en'] || c.name?.en || c.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                  onError={(e) => {
                    if (e.currentTarget.src.endsWith(FALLBACK_IMAGE)) return;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white bg-gradient-to-t from-black/60 to-transparent">
                  <div className="text-lg serif">{c.name?.[i18n.language === 'ar' ? 'ar' : 'en'] || c.name?.en || c.name}</div>
                  <div className="text-[10px] tracking-[.16em] uppercase mt-1">{t('home.explore')} →</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
