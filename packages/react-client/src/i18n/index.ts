import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales';

const languages = ['en', 'de'];

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    fallbackLng: 'en',
    supportedLngs: languages,
    preload: languages,
    keySeparator: false,
    debug: process.env.NODE_ENV === 'development',
    returnNull: false,
  });

export default i18n;
