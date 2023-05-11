import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/color-picker',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/ColorPicker.vue'),
        props: (to) => to.query,
      },
    ],
  },

  {
    path: '/date-picker',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/DatePicker.vue'),
        props: (to) => to.query,
      },
    ],
  },

  {
    path: '/qr-scanner',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/QrScanner.vue'),
        props: (to) => to.query,
      },
    ],
  },

  {
    path: '/time-picker',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/TimePicker.vue'),
        props: (to) => to.query,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
