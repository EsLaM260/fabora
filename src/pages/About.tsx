import {useTranslation} from 'react-i18next';
import Seo from '../components/Seo';
import AboutIntroSection from '../features/about/components/AboutIntroSection';
import AboutValuesSection from '../features/about/components/AboutValuesSection';
export default function About(){const {t}=useTranslation();return <><Seo title={t('about.seo')}/><AboutIntroSection/><AboutValuesSection/></>}
