import { useTranslation } from 'react-i18next';

export default function SizeSelector({
  sizes,
  value,
  onChange,
  isAvailable,
}: {
  sizes: string[];
  value: string;
  onChange: (v: string) => void;
  isAvailable?: (size: string) => boolean;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2" aria-label={t('common.size', { defaultValue: 'Size' })}>
      {sizes.map((size) => {
        const available = isAvailable ? isAvailable(size) : true;
        const selected = value.toLowerCase() === size.toLowerCase();

        return (
          <button
            key={size}
            type="button"
            onClick={() => available && onChange(size)}
            disabled={!available}
            aria-pressed={selected}
            aria-disabled={!available}
            className={`relative min-w-12 h-11 px-3 text-xs border transition-all duration-200 overflow-hidden ${
              selected
                ? 'bg-ink text-white border-ink'
                : available
                  ? 'border-ink/15 bg-white hover:border-ink/50'
                  : 'border-ink/10 bg-black/[0.025] text-muted/55 cursor-not-allowed line-through'
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
