export type CartItem = {
  variantId: string;
  productId?: string;
  productTitle?: string;
  name?: string;
  imageUrl?: string;
  image?: string;
  color?: string;
  size?: string;
  unitPrice: number;
  finalLineTotal?: number;
  quantity: number;
};

export type CartPricing = {
  baseSubtotal: number;
  effectiveSubtotal: number;
  totalLineDiscounts: number;
  shippingFee: number;
  totalDiscount: number;
  finalTotal: number;
};

export type Cart = {
  id: string;
  countryId: string;
  currency: string;
  items: CartItem[];
  appliedDiscount: unknown;
  pricing: CartPricing;
  updatedAt: string;
};
