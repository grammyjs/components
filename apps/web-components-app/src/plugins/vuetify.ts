import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import en from "@/locales/en";
import uk from "@/locales/uk";

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: {
            en,
            uk,
        }
    },
});
