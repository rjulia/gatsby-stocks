/* eslint-disable global-require */
import i18next from 'i18next'
import detector from 'i18next-browser-languagedetector'

i18next
  // .use(detector)
  .init({
    defaultLanguage: 'en',
    fallbackLng: ['en', 'zh-TW'],
    resources: {
      en: {
        translations: require('./locales/en.json'),
      },
      zhTW: {
        translations: require('./locales/zh-TW.json'),
      },
    },
    ns: ['translations'],
    defaultNS: 'translations',
    returnObjects: true,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      useSuspense: false,
    },

  })

i18next.languages = ['en', 'zh-TW']

export default i18next
