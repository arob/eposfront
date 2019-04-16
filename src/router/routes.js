
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/sales', component: () => import('pages/Sales.vue') },
      { path: '/customers', component: () => import('pages/Customer.vue') },
      { path: '/places', component: () => import('pages/Places.vue') },
      { path: '/tags-and-uoms', component: () => import('pages/TagsUom.vue') },
      { path: '/suppliers', component: () => import('pages/Supplier.vue') },
      { path: '/manufacturers', component: () => import('pages/Manufacturer.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/products', component: () => import('pages/Product.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
