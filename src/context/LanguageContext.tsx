import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Lang, type Translations } from '../i18n/translations';

interface LanguageContextValue {
  lang:       Lang;
  t:          Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('el');

  const toggleLang = () => setLang(prev => prev === 'el' ? 'en' : 'el');

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
