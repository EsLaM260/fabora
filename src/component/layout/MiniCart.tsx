import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { money } from '../../utils/format';

export default function MiniCart({
  open,
  onClose,
  items,
  total,
  onChange,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  items: any[];
  total: number;
  onChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const { t } = useTranslation();
  if (!open) return null;

  return (
    <>
      <button aria-label={t('common.close')} onClick={onClose} className="fixed inset-0 z-[59] bg-black/20 backdrop-blur-[2px]" />
      <aside className="fixed right-3 top-3 z-[60] w-[min(420px,calc(100vw-24px))] max-h-[calc(100vh-24px)] bg-white text-ink shadow-2xl border thin-border flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b thin-border">
          <div>
            <p className="text-[10px] uppercase tracking-[.18em] text-muted">{t('cart.bag')}</p>
            <h2 className="serif text-2xl mt-1">{t('cart.shoppingCart')}</h2>
          </div>
          <button type="button" onClick={onClose} className="p-2 hover:bg-black/5" aria-label={t('common.close')}>
            <X size={17} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5">
          {!items.length ? (
            <div className="py-16 text-center">
              <p className="serif text-2xl">{t('cart.empty')}</p>
              <Link to="/shop" onClick={onClose} className="inline-block mt-5 text-[10px] uppercase tracking-[.18em] underline underline-offset-4">
                Continue shopping
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => {
                const id = item.variantId || item.id;
                const name = item.productTitle || item.name || 'Product';
                const quantity = Number(item.quantity) || 1;
                const lineTotal = item.finalLineTotal ?? ((item.unitPrice ?? item.price ?? 0) * quantity);
                return (
                  <div key={id} className="py-4 border-b thin-border grid grid-cols-[72px_1fr_auto] gap-4">
                    <img src={item.imageUrl || item.image || '/asset/images/ui-reference.png'} alt={name} className="w-[72px] aspect-[3/4] object-cover bg-[#ece8e2]" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{name}</p>
                      <p className="text-xs text-muted mt-1">{item.color || 'Color selected'}{item.size ? ` · ${item.size}` : ''}</p>
                      <div className="flex items-center border thin-border w-fit mt-3 h-8">
                        <button type="button" onClick={() => onChange(id, Math.max(1, quantity - 1))} className="px-2.5" aria-label={t('common.decrease')}><Minus size={11} /></button>
                        <span className="w-7 text-center text-[11px]">{quantity}</span>
                        <button type="button" onClick={() => onChange(id, quantity + 1)} className="px-2.5" aria-label={t('common.increase')}><Plus size={11} /></button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-between">
                      <p className="text-xs">{money(lineTotal, 'EGP')}</p>
                      <button type="button" onClick={() => onRemove(id)} className="text-muted hover:text-ink" aria-label={`${t('common.remove')} ${name}`}><Trash2 size={14} /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!!items.length && (
          <div className="border-t thin-border p-5 bg-white">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-muted">{t('common.subtotal')}</span>
              <strong>{money(total, 'EGP')}</strong>
            </div>
            <Link to="/cart" onClick={onClose} className="h-12 bg-ink text-white flex items-center justify-center text-[10px] uppercase tracking-[.18em]">
              View full cart
            </Link>
            <Link to="/shop" onClick={onClose} className="mt-3 h-11 border thin-border flex items-center justify-center text-[10px] uppercase tracking-[.18em]">
              Continue shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
