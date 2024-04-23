export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/admin/pages/ProductsTable.vue'),
    meta: {
      guard: 'auth'
    },
    children: [
      {
        path: '',
        name: 'admin-main',
        component: () => import('@/views/admin/IndexAdmin.vue')
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/auth/IndexAuth.vue')
  }
]
