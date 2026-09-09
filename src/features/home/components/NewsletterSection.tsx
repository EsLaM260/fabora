import {useTranslation} from 'react-i18next';
export default function NewsletterSection(){
  const {t}=useTranslation();
  return <section className="w-full px-5 md:px-8 py-10"><div className="bg-[#e8e0d5] text-ink p-10 md:p-16 grid md:grid-cols-[1fr_1fr] gap-8 items-end motion-hover"><div><div className="text-[10px] uppercase tracking-[.2em] text-ink/50">{t('home.newsletterLabel')}</div><h2 className="serif text-4xl mt-4">{t('home.newsletter')}</h2><p className="text-ink/60 text-sm leading-7 mt-3 max-w-md">{t('home.newsletterText')}</p></div><form className="flex border border-ink/15 bg-white/40"><input required type="email" placeholder={t('home.email')} className="bg-transparent outline-none px-4 py-4 flex-1 text-sm"/><button className="bg-ink text-white px-6 text-xs uppercase tracking-[.16em]">{t('home.join')}</button></form></div></section>
}
