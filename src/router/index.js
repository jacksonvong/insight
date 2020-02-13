// import Vue from 'vue'
const Vue = require('vue')
import Router from 'vue-router'

const Popover = () => import('@/examples/popover.vue')
const Select = () => import('@/examples/select.vue')
const Datepicker = () => import('@/examples/datepicker.vue')
const Submodel = () => import('@/examples/submodel.vue')
const Manfbrand = () => import('@/examples/manfbrand.vue')
const Region = () => import('@/examples/region.vue')
const Segment = () => import('@/examples/segment.vue')
const Favorite = () => import('@/examples/favorite.vue')

const Layout = () => import('@/components/layout/index.vue')
const Login = () => import('@/page/login/login.vue')
const Error404 = () => import('@/page/404.vue')
const Overview = () => import('@/page/index.vue')

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', name: 'login', component: Login },
  {
    path: '',
    component: Layout,
    children: [
      // 404页面
      { path: '/404', name: 'Error', component: Error404 }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...constantRouterMap,
    {
      path: '',
      component: Layout,
      children: [
        { path: '/big-data/overview', name: 'Overview', component: Overview },
        { path: '/popover', name: 'Popover', component: Popover },
        { path: '/select', name: 'Select', component: Select },
        { path: '/datepicker', name: 'Datepicker', component: Datepicker },
        { path: '/submodel', name: 'Submodel', component: Submodel },
        { path: '/manfbrand', name: 'Manfbrand', component: Manfbrand },
        { path: '/region', name: 'Region', component: Region },
        { path: '/segment', name: 'Segment', component: Segment },
        { path: '/favorite', name: 'Favorite', component: Favorite },
        { path: '*', redirect: '/big-data/overview' }
      ]
    }
  ]
})

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: '/sales-analysis/market-overview',
    children: [
      { path: '/sales-analysis', redirect: '/sales-analysis/market-overview' },
      { path: '/sales-analysis/market-overview', name: 'market-overview', component: Overview }
    ]
  }
]
