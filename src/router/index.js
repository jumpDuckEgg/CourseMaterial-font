import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/page/mainPage.vue'
import login from '@/page/login.vue'
import register from '@/page/register.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: mainPage
    },{
      path:'/login',
      name:'login',
      component:login
    },{
      path:'/register',
      name:'register',
      component:register
    }
  ]
})
