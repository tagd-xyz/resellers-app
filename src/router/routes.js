const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'items',
        path: 'items',
        component: () => import('src/pages/Items/Index.vue'),
      },
      {
        name: 'itemsShow',
        path: 'items/show/:id',
        component: () => import('src/pages/Items/Show.vue'),
      },
      {
        name: 'itemsAdd',
        path: 'items/add',
        component: () => import('src/pages/Items/Add.vue'),
      },
      {
        name: 'profileShow',
        path: 'profile/:id',
        component: () => import('src/pages/Profile/Show.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'signIn',
        path: '',
        component: () => import('pages/SignIn/Index.vue'),
      },
    ],
  },
  {
    path: '/splash',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'splash',
        path: '',
        component: () => import('pages/SignIn/Splash.vue'),
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
