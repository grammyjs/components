import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";

import vuetify from "./plugins/vuetify";
import router from "./plugins/router";

import App from "@/App.vue";

Vue.use(VueCompositionAPI);

const app = new Vue({
  render: (h) => h(App),
  router,
  vuetify,
}).$mount("#app");
