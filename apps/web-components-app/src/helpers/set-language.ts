import rtlDetect from "rtl-detect";
import { NavigationGuard } from "vue-router";
import { i18n } from "@/plugins/i18n";
import router from "@/plugins/router";

const languageLoaders = {
  ar: () => import("@/locales/ar"),
  ca: () => import("@/locales/ca"),
  de: () => import("@/locales/de"),
  en: () => import("@/locales/en"),
  es: () => import("@/locales/es"),
  fa: () => import("@/locales/fa"),
  fr: () => import("@/locales/fr"),
  hu: () => import("@/locales/hu"),
  id: () => import("@/locales/id"),
  it: () => import("@/locales/it"),
  ko: () => import("@/locales/ko"),
  nl: () => import("@/locales/nl"),
  pl: () => import("@/locales/pl"),
  ru: () => import("@/locales/ru"),
  tr: () => import("@/locales/tr"),
  uk: () => import("@/locales/uk"),
};

export const availableLanguages = Object.keys(
  languageLoaders
) as unknown as keyof typeof languageLoaders;

export type AvailableLanguage = typeof availableLanguages;

const loadedLanguages = new Set<AvailableLanguage>();

const loadLocale = (language: AvailableLanguage) =>
  languageLoaders[language]().then((locale) => locale.default);

export const setLanguage: NavigationGuard = async (to, from, next) => {
  let { language: languageFromQuery } = to.query;

  const $vuetify = router.app.$vuetify;

  let language = (
    (Array.isArray(languageFromQuery)
      ? languageFromQuery[0]
      : languageFromQuery) ||
    navigator.language ||
    "en"
  )
    .substring(0, 2)
    .toLowerCase() as AvailableLanguage;

  if (!availableLanguages.includes(language)) {
    language = "en";
  }

  if (!loadedLanguages.has(language)) {
    const locale = await loadLocale(language);

    i18n.mergeLocaleMessage(language, locale);

    loadedLanguages.add(language);
  }

  // set language
  i18n.locale = language;
  $vuetify.lang.current = language;
  $vuetify.rtl = rtlDetect.isRtlLang(language) ?? false;

  next();
};
