import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import i18n from '../utils/i18n';

type Auth = { accessToken: string | null; userEmail: string | null };
type AppContextValue = { country: 'EG' | 'AE'; setCountry: (c: 'EG' | 'AE') => void; language: 'en' | 'ar'; setLanguage: (l: 'en' | 'ar') => void; auth: Auth; setAuth: (a: Auth) => void; cartCount: number; setCartCount: (n: number) => void };
const Ctx = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountry] = useState<'EG' | 'AE'>((localStorage.getItem('fabora-country') as 'EG' | 'AE') || 'EG');
  const [language, setLanguage] = useState<'en' | 'ar'>((localStorage.getItem('fabora-lang') as 'en' | 'ar') || 'en');
  const [auth, setAuth] = useState<Auth>({ accessToken: localStorage.getItem('fabora-access'), userEmail: localStorage.getItem('fabora-email') });
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => { localStorage.setItem('fabora-country', country); }, [country]);
  useEffect(() => {
    localStorage.setItem('fabora-lang', language);
    void i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  useEffect(() => {
    void i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, []);
  useEffect(() => { auth.accessToken ? localStorage.setItem('fabora-access', auth.accessToken) : localStorage.removeItem('fabora-access'); auth.userEmail ? localStorage.setItem('fabora-email', auth.userEmail) : localStorage.removeItem('fabora-email'); }, [auth]);

  return <Ctx.Provider value={useMemo(() => ({ country, setCountry, language, setLanguage, auth, setAuth, cartCount, setCartCount }), [country, language, auth, cartCount])}>{children}</Ctx.Provider>;
}
export const useApp = () => { const v = useContext(Ctx); if (!v) throw new Error('useApp must be used inside AppProvider'); return v; };
