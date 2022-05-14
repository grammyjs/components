import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import type VuetifyFramework from "vuetify";

import en from "@/locales/en";
import uk from "@/locales/uk";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },
  lang: {
    locales: {
      en,
      uk,
    },
  },
}) as VuetifyFramework;
