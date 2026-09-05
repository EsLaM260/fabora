import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FALLBACK_COLORS: Record<string, string> = { black:'#111111', white:'#ffffff', ivory:'#f4efe5', cream:'#f2e8d8', sand:'#d7c3a5', beige:'#d8c7b4', brown:'#6f4a35', chocolate:'#4b2f24', camel:'#b18b63', gray:'#8b8b8b', grey:'#8b8b8b', navy:'#202b45', blue:'#4d6f9f', green:'#5d705c', red:'#9d4b48', pink:'#d89aa5', yellow:'#d7b85a', orange:'#c87845' };
export function colorToCss(value: unknown) { const raw=String(value??'').trim(); if(!raw) return '#d7d2ca'; if(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(raw)||/^rgb(a)?\(/i.test(raw)) return raw; return FALLBACK_COLORS[raw.toLowerCase()]??'#d7d2ca'; }
export default function ColorPalette({colors,selected,onChange}:{colors:string[];selected?:string;onChange:(color:string)=>void}) {
  const { t } = useTranslation();
  if(!colors.length) return null;
  return <div>
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <p className="text-[10px] uppercase tracking-[.18em] text-muted">01 / {t('common.chooseColor')}</p>
        <p className="text-sm mt-1">{selected ? <>{t('common.color')}: <span className="font-medium">{selected}</span></> : t('common.selectColor')}</p>
      </div>
      <span className="text-[10px] uppercase tracking-[.16em] text-muted">{colors.length} {t('common.availableColor', { count: colors.length })}</span>
    </div>
    <div className="flex flex-wrap items-center gap-4">
      {colors.map(color=>{
        const active=color.toLowerCase()===selected?.toLowerCase();
        return <button
          key={color}
          type="button"
          onClick={()=>onChange(color)}
          aria-label={`${t('common.color')}: ${color}`}
          aria-pressed={active}
          title={color}
          className="group relative grid place-items-center w-9 h-9 shrink-0 rounded-full"
        >
          <span
            className={`w-7 h-7 rounded-full border border-black/15 transition-transform ${active?'scale-110 ring-2 ring-ink ring-offset-2':'group-hover:scale-110'}`}
            style={{backgroundColor:colorToCss(color)}}
          />
          {active && (
            <span className="absolute inset-0 grid place-items-center pointer-events-none">
              <Check size={12} className={`drop-shadow-sm ${['white','ivory','cream','sand','beige','yellow','pink'].includes(color.toLowerCase())?'text-ink':'text-white'}`} />
            </span>
          )}
        </button>
      })}
    </div>
  </div>

}
