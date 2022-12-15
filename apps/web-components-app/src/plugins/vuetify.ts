import Vue from "vue";
import Vuetify from "vuetify/lib";
import type VuetifyFramework from "vuetify";

import { i18n } from "@/plugins/i18n";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg",
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params) as string,
  },
}) as VuetifyFramework;
