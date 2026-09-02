import {useTranslation} from 'react-i18next';
export default function AboutValuesSection(){
 const {t}=useTranslation();
 const values=[['01',t('about.considered'),t('about.consideredText')],['02',t('about.regional'),t('about.regionalText')],['03',t('about.everyday'),t('about.everydayText')]];
 return <section className="w-full px-5 md:px-8 py-24 grid md:grid-cols-3 gap-12 border-b thin-border">{values.map(([n,title,text])=><div key={n}><div className="text-[10px] uppercase tracking-[.2em] text-muted">{n}</div><h3 className="serif text-2xl mt-3">{title}</h3><p className="text-sm text-muted leading-7 mt-3">{text}</p></div>)}</section>
}
