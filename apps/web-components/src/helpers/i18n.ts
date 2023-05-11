import { Quasar } from 'quasar';
import { MessageLanguages, i18n } from 'src/boot/i18n';
import { nextTick } from 'vue';

export const SUPPORTED_LOCALES = ['en-GB', 'en-US', 'fr', 'ru', 'uk'];

export async function loadAndSetLocale(locale: string) {
  // load locale messages with dynamic import
  const localization = await import(`../../src/i18n/${locale}/index.ts`);

  // set locale
  const { quasar, ...messages } = localization.default;

  i18n.global.setLocaleMessage(locale, messages);
  i18n.global.locale.value = locale as MessageLanguages;
  Quasar.lang.set(quasar);
  document.querySelector('html')?.setAttribute('lang', locale);

  return nextTick();
}
