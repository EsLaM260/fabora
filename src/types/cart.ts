export type Cart = {
  id: string;
  countryId: string;
  currency: string;
  items: unknown[];
  appliedDiscount: unknown;
  pricing: { baseSubtotal: number; effectiveSubtotal: number; totalLineDiscounts: number; shippingFee: number; totalDiscount: number; finalTotal: number };
  updatedAt: string;
};
