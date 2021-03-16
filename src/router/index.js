import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    },
    {
      path: '/home/singleDevice',
      component: () => import('@/views/home/singleDevice'),
      hidden: true
    },
    {
      path: 'userdata',
      component: () => import('@/views/userdata/index'),
      hidden: true
    }]
  },

  {
    path: '/device',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Device',
        component: () => import('@/views/device/index'),
        meta: { title: '设备管理', icon: 'device' }
      }
    ]
  },

  {
    path: '/historydata',
    component: Layout,
    redirect: 'historydata/car',
    name: 'historydata',
    meta: { title: '历史数据', icon: 'data' },
    children: [
      {
        path: 'car/index',
        name: 'car',
        component: () => import('@/views/historydata/car/index'),
        meta: { title: '无人车'}
      },
      {
        path: 'UAV/index',
        name: 'UAV',
        component: () => import('@/views/historydata/UAV/index'),
        meta: { title: '无人机'}
      },
    ]
  },

  {
    path: '/warn',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Warn',
        component: () => import('@/views/form/index'),
        meta: { title: '报警管理', icon: 'warn' }
      }
    ]
  },

  {
    path: '/track',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Track',
        component: () => import('@/views/track/index'),
        meta: { title: '协同追踪', icon: 'eye-open' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
