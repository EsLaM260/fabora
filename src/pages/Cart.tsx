import { useTranslation } from 'react-i18next';
import {useMutation,useQuery,useQueryClient} from '@tanstack/react-query';
import Seo from '../components/Seo';
import {getCart,updateCartItem,removeCartItem} from '../api';
import {useApp} from '../providers/app-provider';
import CartHeaderSection from '../features/cart/components/CartHeaderSection';
import CartContentSection from '../features/cart/components/CartContentSection';
export default function Cart(){const {t}=useTranslation();const qc=useQueryClient();const {setCartCount}=useApp();const q=useQuery({queryKey:['cart'],queryFn:getCart,retry:false});const items=q.data?.items||[];const update=useMutation({mutationFn:({id,q}:{id:string;q:number})=>updateCartItem(id,q),onSuccess:cart=>{qc.setQueryData(['cart'],cart);setCartCount(cart.items.reduce((n:any,i:any)=>n+i.quantity,0))}});const remove=useMutation({mutationFn:(id:string)=>removeCartItem(id),onSuccess:cart=>{qc.setQueryData(['cart'],cart);setCartCount(cart.items.reduce((n:any,i:any)=>n+i.quantity,0))}});const pricing=q.data?.pricing||{baseSubtotal:0,effectiveSubtotal:0,totalLineDiscounts:0,shippingFee:0,totalDiscount:0,finalTotal:0};return <><Seo title={t('cart.bag')}/><CartHeaderSection count={items.length}/><CartContentSection loading={q.isLoading} items={items} pricing={pricing} onChange={(id,q)=>update.mutate({id,q})} onRemove={id=>remove.mutate(id)}/></>}
