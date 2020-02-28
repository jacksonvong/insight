// import Vue from 'vue'
const Vue = require('vue')
import Router from 'vue-router'

// const Popover = () => import('@/examples/popover.vue')
// const Select = () => import('@/examples/select.vue')
// const Datepicker = () => import('@/examples/datepicker.vue')
// const Submodel = () => import('@/examples/submodel.vue')
// const Manfbrand = () => import('@/examples/manfbrand.vue')
// const Region = () => import('@/examples/region.vue')
// const Segment = () => import('@/examples/segment.vue')
// const Favorite = () => import('@/examples/favorite.vue')

const Layout = () => import('@/components/layout/index.vue')
const Login = () => import('@/page/login/login.vue')
const Error404 = () => import('@/page/404.vue')
const Overview = () => import('@/page/overview/index.vue')
const Index = () => import('@/page/index.vue')
const Board = () => import('@/page/board/index.vue')
// const Board2 = () => import('@/page/board/index2.vue')
const UserBackground = () => import('@/page/user-character/user-background.vue')
const UserPreference = () => import('@/page/user-character/user-preference.vue')
const BuyBehavior = () => import('@/page/user-character/buy-behavior.vue')
const OldCar = () => import('@/page/user-character/old-car/index.vue')

const Info = () => import('@/page/compete/info.vue')
const Competitor = () => import('@/page/compete/competitor.vue')
const GoodAndBad = () => import('@/page/compete/goodandbad.vue')

const Summary = () => import('@/page/comment/summary.vue')
const Personal = () => import('@/page/comment/personal.vue')
const Facility = () => import('@/page/comment/facility.vue')
const Trial = () => import('@/page/comment/trial.vue')
const Deal = () => import('@/page/comment/deal.vue')
const Pickup = () => import('@/page/comment/pickup.vue')

const Finance = () => import('@/page/surround/finance.vue')
const Accessory = () => import('@/page/surround/accessory.vue')

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
        { path: '/index', name: 'Index', component: Index },
        { path: '/insight/overview', name: 'Overview', component: Overview },
        { path: '/insight/board', name: 'Board', component: Board },
        // { path: '/insight/board2', name: 'Board', component: Board2 },
        { path: '/insight/user-background', name: 'UserBackground', component: UserBackground },
        { path: '/insight/old-car', name: 'OldCar', component: OldCar },
        { path: '/insight/user-preference', name: 'UserPreference', component: UserPreference },
        { path: '/insight/buy-behavior', name: 'BuyBehavior', component: BuyBehavior },

        { path: '/insight/compete/info', name: 'Information', component: Info },
        { path: '/insight/compete/competitor', name: 'Competitor', component: Competitor },
        { path: '/insight/compete/good-and-bad', name: 'Competition', component: GoodAndBad },

        { path: '/insight/comment/summary', name: 'Summary', component: Summary },
        { path: '/insight/comment/personal', name: 'Personal', component: Personal },
        { path: '/insight/comment/facility', name: 'Facility', component: Facility },
        { path: '/insight/comment/trial', name: 'Trial', component: Trial },
        { path: '/insight/comment/deal', name: 'Deal', component: Deal },
        { path: '/insight/comment/pickup', name: 'Pickup', component: Pickup },

        { path: '/insight/surround/finance', name: 'Finance', component: Finance },
        { path: '/insight/surround/accessory', name: 'Accessory', component: Accessory },

        { path: '*', redirect: '/insight/overview' }
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
