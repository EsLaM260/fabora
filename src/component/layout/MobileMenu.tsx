import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { STORE_CATEGORIES } from '../../utils/categories';
type Language = 'en' | 'ar';

type Props = {
  open: boolean;
  onClose: () => void;
  language: Language;
};

export default function MobileMenu({ open, onClose, language }: Props) {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className="lg:hidden border-t thin-border bg-white">
      <div className="w-full px-5 py-5 grid gap-1 text-sm uppercase tracking-[.16em]">
        <Link onClick={onClose} className="py-3" to="/shop">
          {t('nav.shop')}
        </Link>

        {STORE_CATEGORIES.map((category) => (
          <div key={category.slug} className="border-t thin-border pt-3 mt-1">
            <Link
              onClick={onClose}
              to={`/category/${category.slug}`}
              className="flex items-center justify-between py-2 font-medium"
            >
              <span>{category.name[language] || category.name.en}</span>
              <ChevronDown size={15} />
            </Link>

            <div className="grid pl-4 pb-3">
              {category.children.map((child) => (
                <Link
                  key={child.slug}
                  onClick={onClose}
                  to={`/shop?categorySlug=${category.slug}&subcategorySlug=${child.slug}`}
                  className="py-2 text-xs normal-case tracking-normal opacity-70"
                >
                  {child.name[language] || child.name.en}
                </Link>
              ))}
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}
