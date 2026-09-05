import { useEffect, useMemo, useState } from 'react';
import { Minus, Plus, ChevronDown, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import SizeSelector from './SizeSelector';
import ColorPalette from './ColorPalette';
import { localized, money } from '../../utils/format';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '../../api/contracts';
import { toast } from '../common/Toast';
import { useApp } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="border-b thin-border"><button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-xs uppercase tracking-[.14em]"><span>{title}</span><ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} /></button>{open && <div className="pb-5 text-sm text-muted leading-7">{children}</div>}</div>;
}
function getAttr(variant: any, name: string) { return variant?.attributes?.find((a: any) => String(a.name).toLowerCase() === name.toLowerCase())?.value; }

export default function ProductDetailsSection({ product, variant }: { product: any; variant: any }) {
  const { t, i18n } = useTranslation();
  const language = i18n.language === 'ar' ? 'ar' : 'en';
  const { setCartCount } = useApp();
  const queryClient = useQueryClient();
  const variants = Array.isArray(product.variants) ? product.variants.filter((v: any) => v?.isAvailable !== false) : [];
  const colors = Array.from(new Set(variants.map((v: any) => getAttr(v, 'color')).filter(Boolean).map(String)));
  const sizes = Array.from(new Set(variants.map((v: any) => getAttr(v, 'size')).filter(Boolean).map(String)));
  const initialColor = getAttr(variant, 'color') || colors[0];
  const [selectedColor, setSelectedColor] = useState<string | undefined>(initialColor);
  const [size, setSize] = useState(getAttr(variant, 'size') || sizes[0] || '');
  const [qty, setQty] = useState(1);

  const selectedColorVariants = useMemo(() =>
    variants.filter((v: any) => String(getAttr(v, 'color')).toLowerCase() === String(selectedColor).toLowerCase()),
    [selectedColor, variants]
  );
  const availableSizesForColor = useMemo(() =>
    Array.from(new Set(selectedColorVariants.map((v: any) => getAttr(v, 'size')).filter(Boolean).map(String))),
    [selectedColorVariants]
  );
  const selectedVariant = useMemo(() => {
    if (!selectedColor || !size) return undefined;
    return selectedColorVariants.find((v: any) => String(getAttr(v, 'size')).toLowerCase() === String(size).toLowerCase());
  }, [selectedColor, size, selectedColorVariants]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    // Do not automatically pick a new size. Preserve it when available; otherwise
    // clear it so the customer explicitly chooses a valid size for the new color.
    const colorSizes = variants
      .filter((v: any) => String(getAttr(v, 'color')).toLowerCase() === color.toLowerCase())
      .map((v: any) => getAttr(v, 'size'))
      .filter(Boolean)
      .map(String);
    if (!size || !colorSizes.some((value) => value.toLowerCase() === String(size).toLowerCase())) {
      setSize('');
    }
  };
  const mutation = useMutation({
    mutationFn: () => addToCart({ variantId: selectedVariant?.id, quantity: qty }),
    onSuccess: (cart) => { queryClient.setQueryData(['cart'], cart); setCartCount(cart.items?.reduce((n: number, i: any) => n + i.quantity, 0) || qty); toast(t('product.added')); },
    onError: () => toast(t('product.addError')),
  });

  return <section className="lg:sticky lg:top-28 self-start">
    <div className="flex items-center justify-between gap-4"><p className="text-[10px] uppercase tracking-[.2em] text-muted">fabora / {product.status || ''}</p><span className="text-[10px] uppercase tracking-[.16em] text-muted">{localized(product.categoryHierarchy?.[0] || t('product.collection'), language)}</span></div>
    <div className="mt-4 pb-6 border-b thin-border">
      <h1 className="serif text-4xl md:text-5xl leading-[1.05] max-w-2xl">{localized(product.name, language)}</h1>
      <div className="flex items-center gap-4 mt-5"><p className="text-lg">{money(selectedVariant?.price ?? 99, 'EGP')}</p><span className="h-1 w-1 rounded-full bg-ink/30" /><p className="text-xs uppercase tracking-[.14em] text-muted">{t('product.everyday')}</p></div>
      <p className="text-sm leading-7 text-muted mt-5 max-w-xl">{localized(product.description, language) || t('product.descriptionFallback')}</p>
    </div>
    {colors.length > 0 && <div className="py-7 border-b thin-border"><ColorPalette colors={colors} selected={selectedColor} onChange={handleColorChange} /></div>}
    <div className="py-7 border-b thin-border"><div className="flex justify-between items-center mb-3 text-xs uppercase tracking-[.14em]"><span>{t('product.select')}</span><button type="button" className="underline underline-offset-4">{t('product.sizeGuide')}</button></div><SizeSelector sizes={availableSizesForColor.length ? availableSizesForColor : (sizes.length ? sizes : ['XS', 'S', 'M', 'L', 'XL'])} value={size} onChange={setSize} /></div>
    <div className="py-7"><div className="flex gap-3"><div className="flex border thin-border h-14 items-center bg-white"><button type="button" className="px-4 h-full hover:bg-black/5" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button><span className="w-10 text-center text-xs">{qty}</span><button type="button" className="px-4 h-full hover:bg-black/5" onClick={() => setQty(qty + 1)}><Plus size={14} /></button></div><button type="button" onClick={() => mutation.mutate()} disabled={mutation.isPending || !selectedVariant?.id} className="h-14 bg-ink text-white flex-1 text-xs uppercase tracking-[.18em] transition-opacity hover:opacity-90 disabled:opacity-50">{mutation.isPending ? t('product.adding') : t('product.add')}</button></div><div className="grid grid-cols-3 gap-2 mt-6"><ServiceNote icon={<Truck size={15} />} text={t('product.delivery')} /><ServiceNote icon={<RotateCcw size={15} />} text={t('product.returns')} /><ServiceNote icon={<ShieldCheck size={15} />} text={t('product.secure')} /></div></div>
    <div className="border-t thin-border"><Accordion title={t('product.details')}><p>{localized(product.description, language) || t('product.descriptionFallback')}</p></Accordion><Accordion title={t('product.shipping')}><p>{t('product.shippingText')}</p></Accordion><Accordion title={t('product.care')}><p>{t('product.careText')}</p></Accordion></div>
  </section>;
}
function ServiceNote({ icon, text }: { icon: React.ReactNode; text: string }) { return <div className="border thin-border px-3 py-4 text-center"><div className="mx-auto w-7 h-7 rounded-full bg-[#f4efe8] grid place-items-center">{icon}</div><p className="text-[9px] uppercase tracking-[.12em] text-muted mt-2 leading-4">{text}</p></div>; }
