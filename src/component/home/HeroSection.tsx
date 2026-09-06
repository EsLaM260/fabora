import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="w-full min-w-0">
      <div className="relative min-h-[88vh] md:min-h-[94vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2400&q=90" alt="fabora new season" className="absolute inset-0 w-full h-full object-cover object-center motion-image"/>
        <div className="absolute inset-0 bg-black/30"/>
        <div className="relative z-10 min-h-[88vh] md:min-h-[94vh] flex items-end justify-center px-6 md:px-10 pb-16 md:pb-24 text-center text-white motion-soft">
          <p className="serif text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-[-.03em]">{t('hero.title')}</p>
        </div>
      </div>
    </section>
  );
}
