export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/admin/IndexAdmin.vue'),
    meta: {
      guard: 'auth'
    },
    children: [
      {
        path: '',
        name: 'admin-main',
        component: () => import('@/views/admin/pages/ProductsTable.vue')
      }
    ]
  }
]
