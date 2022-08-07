import Vue from "vue";

import vuetify from "@/plugins/vuetify";
import router from "@/plugins/router";

import Layout from "@/layouts/default.vue";

const app = new Vue({
  render: (h) => h(Layout),
  router,
  vuetify,
});

router.onReady(() => {
  app.$mount("#app");
});
