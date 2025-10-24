// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router"
import Landing from "../pages/Landing.vue"
import Login from "../pages/Auth/Login.vue"
import Signup from "../pages/Auth/Signup.vue"
import Dashboard from "../pages/Dashboard.vue"
import Tickets from "../pages/Tickets.vue"
import { useAuth } from "../stores/useAuth"

const routes = [
  { path: "/", component: Landing },
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },
  { 
    path: "/dashboard", 
    component: Dashboard, 
    meta: { requiresAuth: true } 
  },
  { 
    path: "/tickets", 
    component: Tickets, 
    meta: { requiresAuth: true } 
  },
  { path: "/:catchAll(.*)", redirect: "/" }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const auth = useAuth()
  
  // Redirect authenticated users away from login/signup pages
  if ((to.path === '/auth/login' || to.path === '/auth/signup') && auth.isAuthenticated) {
    return next('/dashboard')
  }
  
  // Protect routes that require authentication
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/auth/login')
  }
  
  next()
})

export default router