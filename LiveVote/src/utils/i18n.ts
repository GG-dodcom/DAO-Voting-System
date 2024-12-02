import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import language from '../locales/default.json';

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: language,
        datetimeFormats: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          },
        },
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
      prefix: '{',
      suffix: '}',
    },
  });

export default i18n;
