export type LocalizedText = { en: string; ar?: string };
export type CategoryChild = { slug: string; name: LocalizedText };
export type Category = { id: string; slug: string; name: LocalizedText; imageUrl?: string; readonly children: readonly CategoryChild[] };

/**
 * Integration fixtures mirror the payload shape expected from the storefront API.
 * They are intentionally isolated inside the API layer and are never imported by UI code.
 * Once the real API is connected, these fixtures are no longer used.
 */


export type AddToCartRequest = { variantId: string; quantity: number };
export type UpdateCartRequest = { quantity: number };
export type ApplyDiscountRequest = { code: string };
export type RestockSubscribeRequest = { variantId: string; email: string };
export type LoginRequest = Record<string, unknown>;
export type RegisterRequest = Record<string, unknown>;
export type ForgotPasswordRequest = { email: string };
export type ResetPasswordRequest = Record<string, unknown>;

export type PaginationMeta = {
  page?: number;
  limit?: number;
  totalItems?: number;
  totalPages?: number;
};

export type CatalogIncomingData = {
  meta: PaginationMeta;
  data: Array<Record<string, unknown>>;
};

export type VariantFixture = {
  id: string;
  stock: number;
  price: number;
  isAvailable: boolean;
  attributes: { name: string; value: string }[];
};

const imagePool = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85',
] as const;

const productNames = [
  'Linen Tailored Blazer',
  'Soft Rib Knit Top',
  'Wide Leg Trousers',
  'Leather Shoulder Bag',
  'Minimal Strappy Heel',
  'Oversized Sunglasses',
  'Silk Wrap Dress',
  'Structured Cotton Shirt',
  'Relaxed Wool Jacket',
  'Sculpted Tank',
  'Everyday Tote',
  'Fluid Maxi Dress',
];

const productSlugs = [
  'linen-tailored-blazer',
  'soft-rib-knit-top',
  'wide-leg-trousers',
  'leather-shoulder-bag',
  'minimal-strappy-heel',
  'oversized-sunglasses',
  'silk-wrap-dress',
  'structured-cotton-shirt',
  'relaxed-wool-jacket',
  'sculpted-tank',
  'everyday-tote',
  'fluid-maxi-dress',
];

export const integrationCategories = [
  {
    id: 'c1', slug: 'women', name: { en: 'Women', ar: 'نساء' },
    imageUrl: '/asset/images/categories/women.webp',
    children: [
      { slug: 'top', name: { en: 'Top', ar: 'علوي' } },
      { slug: 'bottom', name: { en: 'Bottom', ar: 'سفلي' } },
    ],
  },
  {
    id: 'c2', slug: 'men', name: { en: 'Men', ar: 'رجال' },
    imageUrl: '/asset/images/categories/men.webp',
    children: [
      { slug: 'top', name: { en: 'Top', ar: 'علوي' } },
      { slug: 'bottom', name: { en: 'Bottom', ar: 'سفلي' } },
    ],
  },
  {
    id: 'c3', slug: 'kids', name: { en: 'Kids', ar: 'أطفال' },
    imageUrl: '/asset/images/categories/kids.webp',
    children: [
      { slug: 'top', name: { en: 'Top', ar: 'علوي' } },
      { slug: 'bottom', name: { en: 'Bottom', ar: 'سفلي' } },
    ],
  },
] as const;

function fixtureVariants(index: number): VariantFixture[] {
  const price = 79 + (index * 17) % 180;
  return [
    { id: `fixture-${index + 1}-black-xs`, stock: 4, price, isAvailable: true, attributes: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'XS' }] },
    { id: `fixture-${index + 1}-black-m`, stock: 0, price, isAvailable: true, attributes: [{ name: 'Color', value: 'Black' }, { name: 'Size', value: 'M' }] },
    { id: `fixture-${index + 1}-sand-s`, stock: 7, price, isAvailable: true, attributes: [{ name: 'Color', value: 'Sand' }, { name: 'Size', value: 'S' }] },
    { id: `fixture-${index + 1}-sand-l`, stock: 0, price, isAvailable: true, attributes: [{ name: 'Color', value: 'Sand' }, { name: 'Size', value: 'L' }] },
    { id: `fixture-${index + 1}-ivory-m`, stock: 2, price, isAvailable: true, attributes: [{ name: 'Color', value: 'Ivory' }, { name: 'Size', value: 'M' }] },
    { id: `fixture-${index + 1}-chocolate-xl`, stock: 0, price, isAvailable: true, attributes: [{ name: 'Color', value: 'Chocolate' }, { name: 'Size', value: 'XL' }] },
  ];
}

export const integrationProducts = Array.from({ length: 12 }, (_, index) => ({
  id: `fixture-${index + 1}`,
  name: { en: productNames[index], ar: productNames[index] },
  slug: productSlugs[index],
  description: { en: 'A refined essential with a considered fit and effortless finish.', ar: 'قطعة أساسية راقية بقصة مدروسة ولمسة نهائية انسيابية.' },
  status: 'ACTIVE',
  categoryHierarchy: [index % 3 === 0 ? 'kids' : index % 3 === 1 ? 'women' : 'men', index % 2 === 0 ? 'top' : 'bottom'],
  availableCountryIds: [],
  sizeGuide: [],
  media: [{ url: imagePool[index % imagePool.length] }],
  variants: fixtureVariants(index),
}));

export const integrationImages = imagePool;

export function findIntegrationProduct(slug: string) {
  return integrationProducts.find((product) => product.slug === slug);
}

export function findIntegrationVariant(variantId: string) {
  for (const product of integrationProducts) {
    const variant = product.variants.find((item) => item.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}
