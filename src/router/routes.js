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
        // children: [
        //   {
        //     name: 'add',
        //     path: 'add',
        //     component: () => import('src/pages/Items/Add.vue'),
        //   },
        // ],
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
