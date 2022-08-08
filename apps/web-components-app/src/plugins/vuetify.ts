import Vue from "vue";
import Vuetify from "vuetify/lib";
import type VuetifyFramework from "vuetify";

import * as locales from "@/locales";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },
  lang: {
    locales,
  },
}) as VuetifyFramework;
