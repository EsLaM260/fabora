import { useTranslation } from 'react-i18next';

export default function SizeSelector({sizes,value,onChange}:{sizes:string[];value:string;onChange:(v:string)=>void}){
  const {t}=useTranslation();
  return (
    <div className="flex flex-wrap gap-2" aria-label={t('common.size', { defaultValue: 'Size' })}>
      {sizes.map(s=>(
        <button
          key={s}
          type="button"
          onClick={()=>onChange(s)}
          className={`min-w-12 h-11 px-3 text-xs border transition ${value===s?'bg-ink text-white border-ink':'border-ink/15 bg-white hover:border-ink/40'}`}
          aria-pressed={value===s}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
