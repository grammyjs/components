import Vue from "vue";
import VueRouter from "vue-router";

import App from "@/App.vue";
import { setLanguage } from "@/helpers/set-language";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "",
      component: App,
      children: [
        {
          path: "qr-scanner",
          component: () => import("@/components/qr-scanner.vue"),
          props: (route) => route.query,
        },
        {
          path: "color-picker",
          component: () => import("@/components/color-picker.vue"),
          props: (route) => route.query,
        },
        {
          path: "date-picker",
          component: () => import("@/components/date-picker.vue"),
          props: (route) => route.query,
        },
        {
          path: "time-picker",
          component: () => import("@/components/time-picker.vue"),
          props: (route) => route.query,
        },
      ],
    },
    {
      path: "*",
      beforeEnter: () => {
        const url = import.meta.env.VITE_ROOT_REDIRECT_URL;

        if (typeof url !== "undefined") {
          window.location.href = url;
        }
      },
    },
  ],
});

router.beforeEach(setLanguage);

export default router;
