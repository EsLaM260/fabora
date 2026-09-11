
import {
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  Minus,
  Plus,
  ChevronDown,
  Truck,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

import SizeSelector from '../size-selector';
import ColorPalette from '../color-palette';

import {
  localized,
  money,
} from '../../../../utils/format';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { addToCart } from '../../../../api';
import { toast } from '../../../../components/toast';
import { useApp } from '../../../../providers/app-provider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Accordion({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b thin-border">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-full flex items-center justify-between py-5 text-xs uppercase tracking-[.14em]"
      >
        <span>{title}</span>

        <ChevronDown
          size={15}
          className={`transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="pb-5 text-sm text-muted leading-7">
          {children}
        </div>
      )}
    </div>
  );
}

function getAttr(
  variant: any,
  name: string
): unknown {
  if (!variant?.attributes) {
    return undefined;
  }

  const attribute = variant.attributes.find(
    (a: any) =>
      String(a?.name ?? '').toLowerCase() ===
      name.toLowerCase()
  );

  return attribute?.value;
}

function getAttrString(
  variant: any,
  name: string
): string | undefined {
  const value = getAttr(variant, name);

  if (value === null || value === undefined) {
    return undefined;
  }

  return String(value);
}

function translateKnownProductText(
  value: any,
  language: 'en' | 'ar',
  t: (key: string) => string
): string {
  if (typeof value !== 'string') {
    const localizedValue = localized(
      value,
      language
    );

    return localizedValue == null
      ? ''
      : String(localizedValue);
  }

  const trimmedValue = value.trim();

  if (
    trimmedValue ===
    'A refined essential with a considered fit and effortless finish.'
  ) {
    return t('product.descriptionFallback');
  }

  if (
    trimmedValue ===
    'A refined essential with a considered fit and effortless finish'
  ) {
    return t('product.descriptionFallback');
  }

  return value;
}

function uniqueStrings(values: unknown[]): string[] {
  const strings = values
    .filter(
      (value): value is string =>
        value !== null &&
        value !== undefined &&
        String(value).trim().length > 0
    )
    .map((value) => String(value));

  return Array.from(new Set<string>(strings));
}

function getVariantStock(variant: any): number | null {
  const candidates = [
    variant?.stock,
    variant?.stockQuantity,
    variant?.inventory,
    variant?.inventoryQuantity,
    variant?.availableQuantity,
    variant?.quantityAvailable,
  ];
  const numeric = candidates.find((value) => typeof value === 'number' && Number.isFinite(value));
  if (typeof numeric === 'number') return Math.max(0, numeric);
  if (variant?.isAvailable === false) return 0;
  if (variant?.isAvailable === true) return 1;
  return null;
}

export default function ProductDetailsSection({
  product,
  variant,
}: {
  product: any;
  variant: any;
}) {
  const { t, i18n } = useTranslation();

  const language: 'en' | 'ar' =
    i18n.language === 'ar' ? 'ar' : 'en';

  const { setCartCount } = useApp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const variants: any[] = Array.isArray(product?.variants)
    ? product.variants
    : [];

  const colors: string[] = uniqueStrings(
    variants.map((v: any) =>
      getAttr(v, 'color')
    )
  );

  const sizes: string[] = uniqueStrings(
    variants.map((v: any) =>
      getAttr(v, 'size')
    )
  );

  const initialColor =
    getAttrString(variant, 'color') ??
    colors[0];

  const initialSize = '';

  const [selectedColor, setSelectedColor] =
    useState<string | undefined>(initialColor);

  const [size, setSize] =
    useState<string>(initialSize);

  const [qty, setQty] = useState<number>(1);

  const selectedColorVariants: any[] =
    useMemo(() => {
      if (!selectedColor) {
        return [];
      }

      const normalizedColor =
        selectedColor.toLowerCase();

      return variants.filter(
        (v: any) =>
          (
            getAttrString(v, 'color') ?? ''
          ).toLowerCase() === normalizedColor
      );
    }, [selectedColor, variants]);

  const availableSizesForColor: string[] =
    useMemo(() => {
      return uniqueStrings(
        selectedColorVariants.map((v: any) =>
          getAttr(v, 'size')
        )
      );
    }, [selectedColorVariants]);

  const selectedVariant = useMemo(() => {
    if (!selectedColor || !size) return undefined;
    const normalizedSize = size.toLowerCase();
    return selectedColorVariants.find(
      (v: any) => (getAttrString(v, 'size') ?? '').toLowerCase() === normalizedSize
    );
  }, [
    selectedColor,
    size,
    selectedColorVariants,
  ]);

  const handleColorChange = (
    color: string
  ) => {
    setSelectedColor(color);

    const normalizedColor =
      color.toLowerCase();

    const colorSizes: string[] =
      uniqueStrings(
        variants
          .filter(
            (v: any) =>
              (
                getAttrString(v, 'color') ??
                ''
              ).toLowerCase() ===
              normalizedColor
          )
          .map((v: any) =>
            getAttr(v, 'size')
          )
      );

    const currentSizeIsValid =
      !!size &&
      colorSizes.some(
        (value: string) =>
          value.toLowerCase() ===
          size.toLowerCase()
      );

    if (!currentSizeIsValid) {
      setSize('');
    }
  };

  const mutation = useMutation({
    mutationFn: () =>
      addToCart({
        variantId: selectedVariant?.id,
        quantity: qty,
      }),

    onSuccess: (cart) => {
      queryClient.setQueryData(
        ['cart'],
        cart
      );

      const totalQuantity =
        cart.items?.reduce(
          (total: number, item: any) =>
            total + Number(item?.quantity ?? 0),
          0
        ) ?? 0;

      setCartCount(
        totalQuantity || qty
      );

      toast(t('product.added'));
      window.dispatchEvent(new CustomEvent('fabora:open-cart'));
    },

    onError: () => {
      toast(t('product.addError'));
    },
  });

  const displayedSizes = sizes.length > 0 ? sizes : ['XS','S','M','L','XL'];

  const sizeIsAvailable = (candidateSize: string) => {
    const matching = selectedColorVariants.filter(
      (v: any) => (getAttrString(v, 'size') ?? '').toLowerCase() === candidateSize.toLowerCase()
    );
    return matching.some((v: any) => {
      const stock = getVariantStock(v);
      return stock === null ? v?.isAvailable !== false : stock > 0;
    });
  };

  const selectedStock = getVariantStock(selectedVariant);
  const hasSelectedVariant = Boolean(selectedVariant?.id);
  const colorIsAvailable = (color: string) =>
    variants.some((v: any) => (getAttrString(v, 'color') ?? '').toLowerCase() === color.toLowerCase() && (() => {
      const stock = getVariantStock(v);
      return stock === null ? v?.isAvailable !== false : stock > 0;
    })());
  const outOfStock = hasSelectedVariant && selectedStock !== null && selectedStock <= 0;

  return (
    <section className="lg:sticky lg:top-28 self-start">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] uppercase tracking-[.2em] text-muted">
          fabora /{' '}
          {product?.status
            ? t(
                `product.status.${String(
                  product.status
                ).toLowerCase()}`,
                {
                  defaultValue:
                    String(product.status),
                }
              )
            : ''}
        </p>

        <span className="text-[10px] uppercase tracking-[.16em] text-muted">
          {product?.categoryHierarchy?.[0]
            ? t(
                `nav.${String(
                  product.categoryHierarchy[0]
                ).toLowerCase()}`,
                {
                  defaultValue:
                    String(
                      product.categoryHierarchy[0]
                    ),
                }
              )
            : t('product.collection')}
        </span>
      </div>

      <div className="mt-4 pb-6 border-b thin-border">
        <h1 className="serif text-4xl md:text-5xl leading-[1.05] max-w-2xl">
          {localized(
            product?.name,
            language
          )}
        </h1>

        <div className="flex items-center gap-4 mt-5">
          <p className="text-lg">
            {money(
              selectedVariant?.price ?? 99,
              'EGP'
            )}
          </p>

          <span className="h-1 w-1 rounded-full bg-ink/30" />

          <p className="text-xs uppercase tracking-[.14em] text-muted">
            {t('product.everyday')}
          </p>
        </div>

        <p className="text-sm leading-7 text-muted mt-5 max-w-xl">
          {translateKnownProductText(
            product?.description,
            language,
            t
          ) ||
            t(
              'product.descriptionFallback'
            )}
        </p>
      </div>

      {colors.length > 0 && (
        <div className="py-7 border-b thin-border">
          <ColorPalette
            colors={colors}
            selected={selectedColor}
            onChange={handleColorChange}
            isAvailable={colorIsAvailable}
          />
        </div>
      )}

      <div className="py-7 border-b thin-border">
        <div className="flex justify-between items-center mb-3 text-xs uppercase tracking-[.14em]">
          <span>
            {t('product.select')}
          </span>

          <button
            type="button"
            className="underline underline-offset-4"
          >
            {t('product.sizeGuide')}
          </button>
        </div>

        <SizeSelector
          sizes={displayedSizes}
          value={size}
          onChange={setSize}
          isAvailable={sizeIsAvailable}
        />

        <div className="mt-5 flex items-center justify-between gap-4 text-xs">
          <span className={outOfStock ? 'text-red-700' : 'text-muted'}>
            {outOfStock
              ? t('product.outOfStock')
              : selectedStock !== null
                ? selectedStock <= 5
                  ? t('product.lowStock', { count: selectedStock })
                  : t('product.inStock')
                : hasSelectedVariant
                  ? t('product.inStock')
                  : t('product.chooseVariant')}
          </span>

          {outOfStock && (
            <label className="flex items-center gap-2 cursor-pointer text-[11px]">
              <input
                type="checkbox"
                className="h-4 w-4 accent-black"
                onChange={() => toast(t('product.notifySaved'))}
              />
              <span>{t('product.notifyMe')}</span>
            </label>
          )}
        </div>
      </div>

      <div className="py-7">
        <div className="flex gap-3">
          <div className="flex border thin-border h-14 items-center bg-white">
            <button
              type="button"
              className="px-4 h-full hover:bg-black/5"
              onClick={() =>
                setQty((current) =>
                  Math.max(1, current - 1)
                )
              }
            >
              <Minus size={14} />
            </button>

            <span className="w-10 text-center text-xs">
              {qty}
            </span>

            <button
              type="button"
              className="px-4 h-full hover:bg-black/5"
              onClick={() =>
                setQty(
                  (current) => current + 1
                )
              }
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              mutation.mutate()
            }
            disabled={
              mutation.isPending ||
              !selectedVariant?.id ||
              outOfStock
            }
            className="h-14 bg-ink text-white flex-1 text-xs uppercase tracking-[.18em] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {mutation.isPending
              ? t('product.adding')
              : t('product.add')}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-6">
          <ServiceNote
            icon={<Truck size={15} />}
            text={t(
              'product.delivery'
            )}
          />

          <ServiceNote
            icon={<RotateCcw size={15} />}
            text={t(
              'product.returns'
            )}
          />

          <ServiceNote
            icon={
              <ShieldCheck size={15} />
            }
            text={t(
              'product.secure'
            )}
          />
        </div>
      </div>

      <div className="border-t thin-border">
        <Accordion
          title={t('product.details')}
        >
          <p>
            {translateKnownProductText(
              product?.description,
              language,
              t
            ) ||
              t(
                'product.descriptionFallback'
              )}
          </p>
        </Accordion>

        <Accordion
          title={t('product.shipping')}
        >
          <p>
            {t(
              'product.shippingText'
            )}
          </p>
        </Accordion>

        <Accordion title={t('product.care')}>
          <p>
            {t(
              'product.careText'
            )}
          </p>
        </Accordion>
      </div>
    </section>
  );
}

function ServiceNote({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="border thin-border px-3 py-4 text-center">
      <div className="mx-auto w-7 h-7 rounded-full bg-[#f4efe8] grid place-items-center">
        {icon}
      </div>

      <p className="text-[9px] uppercase tracking-[.12em] text-muted mt-2 leading-4">
        {text}
      </p>
    </div>
  );
}
