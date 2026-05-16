import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations } from '../data/translations';

export type Lang = 'ar' | 'en';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LangContext = createContext<LangContextValue>({
  lang: 'ar',
  setLang: () => {},
  t: (k) => k,
  dir: 'rtl',
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar');
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const t = (key: string): string =>
    translations[lang]?.[key] ?? translations['ar']?.[key] ?? key;
  return (
    <LangContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
