import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { STORE_CATEGORIES } from '../../utils/categories';
export default function CategoryControlsSection({ name, activeCategory, activeSubcategory, language }: { name: string; activeCategory: any; activeSubcategory: string | null; language: string }) {
     const { t } = useTranslation();
     return <section className="w-full px-5 md:px-8 pt-10 pb-12">
          {/* <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
               <p className="text-sm text-muted max-w-xl">{t('category.editedSelection', { name })}</p>
               <Link to="/shop" className="text-xs uppercase tracking-[.14em]">{t('common.allProducts')} →</Link>
          </div> */}
     </section>
}
