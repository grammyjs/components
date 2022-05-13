import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      beforeEnter: () => {
        const url = import.meta.env.VITE_ROOT_REDIRECT_URL;

        if (typeof url !== "undefined") {
          window.location.href = url;
        }
      },
    },
    {
      path: "/qr-scanner",
      component: () => import("@/components/qr-scanner.vue"),
      props: (route) => route.query,
    },
    {
      path: "/color-picker",
      component: () => import("@/components/color-picker.vue"),
      props: (route) => route.query,
    },
  ],
});
