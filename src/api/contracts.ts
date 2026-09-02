import {api} from './client';
import { mockProducts } from '../utils/mockData';

export type Product={id:string;name:any;slug:string;description:any;status:string;categoryId?:string|null;categoryHierarchy:string[];availableCountryIds:string[];sizeGuide:any[];media:any[];variants:any[]};
export type CatalogResponse={meta:any;data:Product[]};
export type Cart={id:string;countryId:string;currency:string;items:any[];appliedDiscount:any;pricing:{baseSubtotal:number;effectiveSubtotal:number;totalLineDiscounts:number;shippingFee:number;totalDiscount:number;finalTotal:number};updatedAt:string};
export const endpoints={catalog:'/v1/products/catalog',product:(slug:string)=>`/v1/products/slug/${encodeURIComponent(slug)}`,categories:'/v1/categories',cart:'/v1/cart',addItem:'/v1/cart/items',updateItem:(id:string)=>`/v1/cart/items/${id}`,removeItem:(id:string)=>`/v1/cart/items/${id}`,discount:'/v1/cart/discount',register:'/v1/auth/register',login:'/v1/auth/login',forgot:'/v1/auth/forgot-password',reset:'/v1/auth/reset-password'} as const;

const LOCAL_CART_KEY='fabora-demo-cart';
const USE_LOCAL_CART=!import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL.includes('your-api-host.example.com');

function readLocalCart(): Cart {
  try {
    const items=JSON.parse(localStorage.getItem(LOCAL_CART_KEY)||'[]');
    return buildLocalCart(items);
  } catch {
    return buildLocalCart([]);
  }
}

function writeLocalCart(items:any[]) {
  localStorage.setItem(LOCAL_CART_KEY,JSON.stringify(items));
  return buildLocalCart(items);
}

function buildLocalCart(items:any[]): Cart {
  const normalized=items.map((item:any)=>({
    ...item,
    quantity:Number(item.quantity)||1,
    unitPrice:Number(item.unitPrice)||0,
    finalLineTotal:(Number(item.unitPrice)||0)*(Number(item.quantity)||1),
  }));
  const subtotal=normalized.reduce((sum:number,item:any)=>sum+item.finalLineTotal,0);
  return {
    id:'local-demo-cart',
    countryId:localStorage.getItem('fabora-country')||'EG',
    currency:'EGP',
    items:normalized,
    appliedDiscount:null,
    pricing:{baseSubtotal:subtotal,effectiveSubtotal:subtotal,totalLineDiscounts:0,shippingFee:0,totalDiscount:0,finalTotal:subtotal},
    updatedAt:new Date().toISOString(),
  };
}

function mockCartItem(variantId:string,quantity:number) {
  const found=mockProducts.find((product:any)=>product.variants?.some((v:any)=>v.id===variantId));
  const variant=found?.variants?.find((v:any)=>v.id===variantId) || found?.variants?.[0];
  const color=variant?.attributes?.find((a:any)=>String(a.name).toLowerCase()==='color')?.value;
  const size=variant?.attributes?.find((a:any)=>String(a.name).toLowerCase()==='size')?.value;
  return {
    variantId:variant?.id||variantId,
    productId:found?.id||'',
    productTitle:found?.name?.en||'Demo Product',
    name:found?.name?.en||'Demo Product',
    imageUrl:found?.media?.[0]?.url||'',
    color,
    size,
    unitPrice:Number(variant?.price)||0,
    quantity,
  };
}

export async function getCatalog(params:Record<string,unknown>={}){if(USE_LOCAL_CART) return {meta:{source:'local-demo'},data:mockProducts as Product[]};const {data}=await api.get<CatalogResponse>(endpoints.catalog,{params});return data}
export async function getProduct(slug:string){if(USE_LOCAL_CART){const product=mockProducts.find((item:any)=>item.slug===slug)||mockProducts[0];return product as Product;}const {data}=await api.get<Product>(endpoints.product(slug));return data}
export async function getCategories(){if(USE_LOCAL_CART)return [];const {data}=await api.get(endpoints.categories);return data}
export async function getCart(){if(USE_LOCAL_CART)return readLocalCart();const {data}=await api.get<Cart>(endpoints.cart);return data}
export async function addToCart(payload:{variantId:string;quantity:number}){
  if(USE_LOCAL_CART){
    const current=readLocalCart().items;
    const index=current.findIndex((item:any)=>item.variantId===payload.variantId);
    if(index>=0) current[index].quantity+=payload.quantity;
    else current.push(mockCartItem(payload.variantId,payload.quantity));
    return writeLocalCart(current);
  }
  const {data}=await api.post<Cart>(endpoints.addItem,payload);return data;
}
export async function updateCartItem(variantId:string,quantity:number){
  if(USE_LOCAL_CART){
    const items=readLocalCart().items.map((item:any)=>item.variantId===variantId?{...item,quantity:Math.max(1,quantity)}:item);
    return writeLocalCart(items);
  }
  const {data}=await api.patch<Cart>(endpoints.updateItem(variantId),{quantity});return data;
}
export async function removeCartItem(variantId:string){
  if(USE_LOCAL_CART){
    return writeLocalCart(readLocalCart().items.filter((item:any)=>item.variantId!==variantId));
  }
  const {data}=await api.delete<Cart>(endpoints.removeItem(variantId));return data;
}
export async function applyDiscount(code:string){if(USE_LOCAL_CART)return readLocalCart();const {data}=await api.post<Cart>(endpoints.discount,{code});return data}
export async function login(payload:any){const {data}=await api.post(endpoints.login,payload);return data}
export async function register(payload:any){const {data}=await api.post(endpoints.register,payload);return data}
export async function forgotPassword(email:string){const {data}=await api.post(endpoints.forgot,{email});return data}
export async function resetPassword(payload:any){const {data}=await api.post(endpoints.reset,payload);return data}
