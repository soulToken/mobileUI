import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import vans from '@/components/vans'
import activity from '@/components/activity'
import serviceDetail from '@/components/serviceDetail'
import Package1 from '@/components/Package1'
import Package2 from '@/components/Package2'

Vue.use(Router)


export default new Router({
  routes: [
    {
        name: '404',
        path: '/404',
        component: () => import('@/components/errorPage/noFound.vue')
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
        path: '/login',
        name: 'vans',
        component: vans
      },
      {
        path: '/activity',
        name: 'activity',
        component: activity
      },
      {
        path: '/serviceDetail',
        name: 'serviceDetail',
        component: serviceDetail
      },
      {
        path: '/Package1',
        name: 'Package1',
        component: Package1
      },
      {
        path: '/Package2',
        name: 'Package2',
        component: Package2
      },
      {
        path: '*',    // 此处需特别注意至于最底部
        redirect: '/404'
      },
  ]
})
