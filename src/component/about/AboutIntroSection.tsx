import {useTranslation} from 'react-i18next';
export default function AboutIntroSection(){
 const {t}=useTranslation();
 return <section className="w-full px-5 md:px-8 pt-14"><div className="max-w-4xl"><div className="text-[10px] uppercase tracking-[.2em] text-muted">{t('about.eyebrow')}</div><h1 className="serif text-6xl md:text-8xl leading-[.9] mt-5">{t('about.title')}</h1></div><div className="grid lg:grid-cols-2 gap-12 mt-16 items-start"><img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85" loading="lazy" alt="fabora fashion" className="w-full aspect-[4/5] object-cover"/><div className="lg:pt-20"><p className="serif text-3xl leading-snug">{t('about.intro')}</p><div className="mt-10 grid gap-7 text-sm text-muted leading-7"><p>{t('about.p1')}</p><p>{t('about.p2')}</p></div></div></div></section>
}
