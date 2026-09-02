import {useTranslation} from 'react-i18next';
import Seo from '../component/common/Seo';
import AboutIntroSection from '../component/about/AboutIntroSection';
import AboutValuesSection from '../component/about/AboutValuesSection';
export default function About(){const {t}=useTranslation();return <><Seo title={t('about.seo')}/><AboutIntroSection/><AboutValuesSection/></>}
