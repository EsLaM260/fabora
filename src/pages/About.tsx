import {useTranslation} from 'react-i18next';
import Seo from '../components/seo';
import AboutIntroSection from '../features/about/components/about-intro-section';
import AboutValuesSection from '../features/about/components/about-values-section';
export default function About(){const {t}=useTranslation();return <><Seo title={t('about.seo')}/><AboutIntroSection/><AboutValuesSection/></>}
