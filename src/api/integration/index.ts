import { api } from '../api-client';
import { endpoints } from '../../constants/api-routes';
import {
  integrationCategories,
  integrationProducts,
  findIntegrationProduct,
  findIntegrationVariant,
  type AddToCartRequest,
  type RestockSubscribeRequest,
  type LoginRequest,
  type RegisterRequest,
  type ForgotPasswordRequest,
  type ResetPasswordRequest,
  type Category,
} from './incoming-data';

import type { Product } from '../../types/product';
import type { Cart } from '../../types/cart';

export type CatalogResponse = { meta: any; data: Product[] };

const hasConfiguredApi = Boolean(import.meta.env.VITE_API_BASE_URL);
const LOCAL_CART_KEY = 'fabora-demo-cart';

function readLocalCart(): Cart {
  try {
    const items = JSON.parse(localStorage.getItem(LOCAL_CART_KEY) || '[]');
    return buildLocalCart(Array.isArray(items) ? items : []);
  } catch {
    return buildLocalCart([]);
  }
}

function writeLocalCart(items: any[]) {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
  return buildLocalCart(items);
}

function buildLocalCart(items: any[]): Cart {
  const normalized = items.map((item: any) => ({
    ...item,
    quantity: Math.max(1, Number(item.quantity) || 1),
    unitPrice: Number(item.unitPrice) || 0,
    finalLineTotal: (Number(item.unitPrice) || 0) * (Math.max(1, Number(item.quantity) || 1)),
  }));
  const subtotal = normalized.reduce((sum, item) => sum + item.finalLineTotal, 0);
  return {
    id: 'local-integration-cart',
    countryId: localStorage.getItem('fabora-country') || 'EG',
    currency: 'EGP',
    items: normalized,
    appliedDiscount: null,
    pricing: { baseSubtotal: subtotal, effectiveSubtotal: subtotal, totalLineDiscounts: 0, shippingFee: 0, totalDiscount: 0, finalTotal: subtotal },
    updatedAt: new Date().toISOString(),
  };
}

function toLocalCartItem(variantId: string, quantity: number) {
  const found = findIntegrationVariant(variantId);
  const product = found?.product;
  const variant = found?.variant;
  return {
    variantId: variant?.id || variantId,
    productId: product?.id || '',
    productTitle: product?.name?.en || 'Product',
    name: product?.name?.en || 'Product',
    imageUrl: product?.media?.[0]?.url || '',
    color: variant?.attributes?.find((a: any) => String(a.name).toLowerCase() === 'color')?.value,
    size: variant?.attributes?.find((a: any) => String(a.name).toLowerCase() === 'size')?.value,
    unitPrice: Number(variant?.price) || 0,
    quantity,
  };
}

export async function getCatalog(params: Record<string, unknown> = {}) {
  if (!hasConfiguredApi) return { meta: { source: 'integration-fixture' }, data: integrationProducts as Product[] };
  try {
    const { data } = await api.get<CatalogResponse>(endpoints.catalog, { params });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(slug: string) {
  if (!hasConfiguredApi) return findIntegrationProduct(slug) as Product | undefined;
  try {
    const { data } = await api.get<Product>(endpoints.product(slug));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!hasConfiguredApi) return [...integrationCategories] as Category[];
  try {
    const { data } = await api.get(endpoints.categories);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    throw error;
  }
}

export async function getCart() {
  if (!hasConfiguredApi) return readLocalCart();
  try {
    const { data } = await api.get<Cart>(endpoints.cart);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addToCart(payload: AddToCartRequest) {
  if (!hasConfiguredApi) {
    const items = readLocalCart().items;
    const index = items.findIndex((item: any) => item.variantId === payload.variantId);
    if (index >= 0) items[index].quantity += payload.quantity;
    else items.push(toLocalCartItem(payload.variantId, payload.quantity));
    return writeLocalCart(items);
  }
  const { data } = await api.post<Cart>(endpoints.addCartItem, payload);
  return data;
}

export async function updateCartItem(variantId: string, quantity: number) {
  if (!hasConfiguredApi) {
    return writeLocalCart(readLocalCart().items.map((item: any) => item.variantId === variantId ? { ...item, quantity: Math.max(1, quantity) } : item));
  }
  try {
    const { data } = await api.patch<Cart>(endpoints.updateCartItem(variantId), { quantity });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeCartItem(variantId: string) {
  if (!hasConfiguredApi) return writeLocalCart(readLocalCart().items.filter((item: any) => item.variantId !== variantId));
  try {
    const { data } = await api.delete<Cart>(endpoints.removeCartItem(variantId));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function applyDiscount(code: string) {
  if (!hasConfiguredApi) return readLocalCart();
  const { data } = await api.post<Cart>(endpoints.discount, { code });
  return data;
}

export async function subscribeRestock(payload: RestockSubscribeRequest) {
  const { data } = await api.post(endpoints.restockSubscribe, payload);
  return data;
}

export async function login(payload: LoginRequest) { const { data } = await api.post(endpoints.login, payload); return data; }
export async function register(payload: RegisterRequest) { const { data } = await api.post(endpoints.register, payload); return data; }
export async function forgotPassword(payload: ForgotPasswordRequest) { const { data } = await api.post(endpoints.forgotPassword, payload); return data; }
export async function resetPassword(payload: ResetPasswordRequest) { const { data } = await api.post(endpoints.resetPassword, payload); return data; }

export function getIntegrationCategories(): Category[] { return [...integrationCategories] as Category[]; }
