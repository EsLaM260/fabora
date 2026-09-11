import {useTranslation} from 'react-i18next';
export default function AnnouncementBar() {
  const { t } = useTranslation();
  return (
    <div className="bg-ink text-white text-[10px] tracking-[.22em] uppercase py-2 text-center">
      {t('footer.deliveryAnnouncement')}
    </div>
  );
}
