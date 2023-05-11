import { route } from 'quasar/wrappers';
import {
  type LocationQuery,
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import qs from 'qs';
import { SUPPORTED_LOCALES, loadAndSetLocale } from 'helpers/i18n';
import { MessageLanguages, i18n } from 'src/boot/i18n';
import { Quasar } from 'quasar';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    parseQuery(query) {
      return qs.parse(query) as LocationQuery;
    },

    stringifyQuery(query) {
      const result = qs.stringify(query);

      return result ? '?' + result : '';
    },

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach(async (to, from, next) => {
    let { language: languagefromQuery } = to.query;
    languagefromQuery = Array.isArray(languagefromQuery)
      ? languagefromQuery[0]
      : languagefromQuery;

    let language = languagefromQuery || Quasar.lang.getLocale() || 'en-GB';

    if (
      !SUPPORTED_LOCALES.includes(language) &&
      SUPPORTED_LOCALES.includes(language.substring(0, 2))
    ) {
      language = language.substring(0, 2);
    }

    if (language === 'en') {
      language = 'en-GB'
    }

    if (!SUPPORTED_LOCALES.includes(language)) {
      return next();
    }

    if (!i18n.global.availableLocales.includes(language as MessageLanguages)) {
      await loadAndSetLocale(language);
    }

    return next();
  });

  return router;
});
