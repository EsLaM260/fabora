export type LocalizedText = { en: string; ar?: string };
export type Product = {
  id: string;
  name: LocalizedText | string;
  slug: string;
  description: LocalizedText | string;
  status: string;
  categoryId?: string | null;
  categoryHierarchy: string[];
  availableCountryIds: string[];
  sizeGuide: unknown[];
  media: unknown[];
  variants: unknown[];
};
