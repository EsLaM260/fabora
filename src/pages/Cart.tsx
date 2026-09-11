import { useTranslation } from 'react-i18next';
import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import Seo from '../components/seo';
import {getCart,updateCartItem,removeCartItem} from '../api';
import {useApp} from '../providers/app-provider';
import type { Cart } from '../types/cart';
import CartHeaderSection from '../features/cart/components/cart-header-section';
import CartContentSection from '../features/cart/components/cart-content-section';
export default function Cart(){const {t}=useTranslation();const qc=useQueryClient();const {setCartCount}=useApp();const q=useQuery({queryKey:['cart'],queryFn:getCart,retry:false});const items=q.data?.items||[];const update=useMutation<Cart, Error, {id:string;q:number}>({mutationFn:({id,q}:{id:string;q:number})=>updateCartItem(id,q),onSuccess:cart=>{qc.setQueryData(['cart'],cart);setCartCount(cart.items.reduce((n, i) => n + i.quantity, 0))}});const remove=useMutation<Cart, Error, string>({mutationFn:(id:string)=>removeCartItem(id),onSuccess:cart=>{qc.setQueryData(['cart'],cart);setCartCount(cart.items.reduce((n, i) => n + i.quantity, 0))}});const pricing=q.data?.pricing||{baseSubtotal:0,effectiveSubtotal:0,totalLineDiscounts:0,shippingFee:0,totalDiscount:0,finalTotal:0};return <><Seo title={t('cart.bag')}/><CartHeaderSection count={items.length}/><CartContentSection loading={q.isLoading} items={items} pricing={pricing} onChange={(id,q)=>update.mutate({id,q})} onRemove={id=>remove.mutate(id)}/></>}
