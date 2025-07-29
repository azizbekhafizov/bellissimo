import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationUZ from './translate/uz.json';
import translationRU from './translate/ru.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: translationUZ },
      ru: { translation: translationRU },
    },
    lng: 'uz',
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;