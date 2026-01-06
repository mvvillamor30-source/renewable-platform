import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {path: '/',
      component: () => import('@/views/components/layouts/PublicLayout.vue'),
  children: [
    { path: '', component: () => import('@/views/guest/Landing.vue') },
    { path: '/login', component: () => import('@/views/guest/Login.vue') },
    { path: '/register', component: () => import('@/views/guest/Register.vue') },
    { path: '/customer-register', component: () => import('@/views/guest/CustomerSignUp.vue') },
    { path: '/staff-register', component: () => import('@/views/guest/StaffRegister.vue') },
  ]},
    
    { path: '/admin', component: () => import('@/views/components/layouts/AdminLayout.vue'),
        meta: { requiresAuth: true, role: 'Admin' }, 
      children: [
          { path: '', component: () => import('@/views/authenticated/admin/AdminDashboard.vue') },
        { path: 'provider-management', component: () => import('@/views/authenticated/admin/ProviderManagement.vue') },
        { path: 'user-management', component: () => import('@/views/authenticated/admin/UserManagement.vue') },
        { path: 'profile', component: () => import('@/views/authenticated/admin/Profile.vue') },
      ]},

    {path: '/provider',
      component: () => import('@/views/components/layouts/ProviderLayout.vue'),
      children: [
        { path: '', component: () => import('@/views/authenticated/provider/ProviderDashboard.vue') },
  ]},

    { path: '/marketing', component: () => import('@/views/components/layouts/SalesLayout.vue'), 
      children: [
        { path: '', component: () => import('@/views/authenticated/provider/marketplace/SalesDashboard.vue') },
        { path: '/products', component: () => import('@/views/authenticated/provider/marketplace/Products.vue') },
        { path: '/services', component: () => import('@/views/authenticated/provider/marketplace/Services.vue') },
        { path: '/packages', component: () => import('@/views/authenticated/provider/marketplace/Packages.vue') },
        { path: '/orders', component: () => import('@/views/authenticated/provider/marketplace/Orders.vue') },
        { path: '/payments', component: () => import('@/views/authenticated/provider/marketplace/Payments.vue') },
        { path: '/reports', component: () => import('@/views/authenticated/provider/marketplace/Reports.vue') },
      ]
    },

      { path: '/operation', component: () => import('@/views/components/layouts/OperationLayout.vue'), 
      children: [
          { path: '', component: () => import('@/views/authenticated/provider/operation/OperationDashboard.vue') },
      ]},

      { path: '/human-resource', component: () => import('@/views/components/layouts/HRLayout.vue'), 
      children: [
          { path: '', component: () => import('@/views/authenticated/provider/human-resource/HRDashboard.vue') },
      ]},

      { path: '/inventory', component: () => import('@/views/components/layouts/InventoryLayout.vue'), 
      children: [
          { path: '', component: () => import('@/views/authenticated/provider/inventory/InventoryDashboard.vue') },
      ]},

      { path: '/procurement', component: () => import('@/views/components/layouts/ProcurementLayout.vue'), 
      children: [
          { path: '', component: () => import('@/views/authenticated/provider/procurement/ProcurementDashboard.vue') },
      ]},

      { path: '/e-commerce', component: () => import('@/views/components/layouts/ECommerceLayout.vue'), 
      children: [
          { path: '', component: () => import('@/views/guest/MarketPlace.vue') },
          { path: '/customer-dashboard', component: () => import('@/views/authenticated/customer/ECommerceDashboard.vue') },
          { path: '/customer-profile', component: () => import('@/views/authenticated/customer/CustomerProfile.vue') }
      ]},

      { path: '/installer', component: () => import('@/views/authenticated/provider/technician/InstallerDashboard.vue') },
    ],
})

// GLOBAL ROUTE GUARD
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  // 🔒 Require authentication
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  // 🔐 Require specific role
  if (to.meta.role && user?.role !== to.meta.role) {
    return next('/login')
  }

  next()
})

export default router
