export type StoreSubCategory = {
  slug: 'top' | 'bottom';
  name: { en: string; ar: string };
};

export type StoreCategory = {
  id: string;
  slug: 'women' | 'men' | 'kids';
  name: { en: string; ar: string };
  imageUrl: string;
  children: StoreSubCategory[];
};

export const STORE_SUBCATEGORIES: StoreSubCategory[] = [
  { slug: 'top', name: { en: 'Top', ar: 'علوي' } },
  { slug: 'bottom', name: { en: 'Bottom', ar: 'سفلي' } },
];

export const STORE_CATEGORIES: StoreCategory[] = [
  {
    id: 'c1',
    slug: 'women',
    name: { en: 'Women', ar: 'نساء' },
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    children: STORE_SUBCATEGORIES,
  },
  {
    id: 'c2',
    slug: 'men',
    name: { en: 'Men', ar: 'رجال' },
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
    children: STORE_SUBCATEGORIES,
  },
  {
    id: 'c3',
    slug: 'kids',
    name: { en: 'Kids', ar: 'أطفال' },
    imageUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=85',
    children: STORE_SUBCATEGORIES,
  },
];

export const STORE_CATEGORY_SLUGS = STORE_CATEGORIES.map((category) => category.slug);

export function getStoreCategory(slug: string) {
  return STORE_CATEGORIES.find((category) => category.slug === slug) ?? STORE_CATEGORIES[0];
}
