import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {  //默认页面
      path:'/',
      redirect:'/login',


    }
  ]
})
