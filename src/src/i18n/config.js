import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enTranslations from './locales/en.json'
import nlTranslations from './locales/nl.json'
import deTranslations from './locales/de.json'
import frTranslations from './locales/fr.json'
import esTranslations from './locales/es.json'
import itTranslations from './locales/it.json'
import ptTranslations from './locales/pt.json'
import ruTranslations from './locales/ru.json'
import jaTranslations from './locales/ja.json'
import zhTranslations from './locales/zh.json'

const resources = {
  en: { translation: enTranslations },
  nl: { translation: nlTranslations },
  de: { translation: deTranslations },
  fr: { translation: frTranslations },
  es: { translation: esTranslations },
  it: { translation: itTranslations },
  pt: { translation: ptTranslations },
  ru: { translation: ruTranslations },
  ja: { translation: jaTranslations },
  zh: { translation: zhTranslations },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  })

export default i18n


