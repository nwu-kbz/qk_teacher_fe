import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Main from '../pages/Main'
import Register from '../pages/Register'
import UserSettings from '../pages/UserSettings'
import CourseInfo from '../pages/CourseInfo'
import ClassBegin from '../pages/ClassBegin'
import Inform from '../pages/Inform'
import EditorInform from '../components/EditorInform'
import ShowInform from '../components/ShowInform'
import Data from '../pages/Data'
import QBank from '../pages/QBank'
import CourseDetail from '../pages/CourseDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/userSettings',
      name: 'UserSettings',
      component: UserSettings
    },
    {
      path: '/courseInfo',
      name: 'CourseInfo',
      component: CourseInfo
    },
    {
      path: '/classBegin',
      name: 'ClassBegin',
      component: ClassBegin
    },
    {
      path: '/qbank',
      name: 'QBank',
      component: QBank,

    },
    {
      path: '/courseDetail/:id',
      name: 'CourseDetail',
      component: CourseDetail,
    },

    {
      path: '/inform',
      name: 'Inform',
      component: Inform,
      children: [
        {
          path: '/inform/showInform/:id',
          component: ShowInform,
        },
        {
          path: '/inform/editorInform',
          component: EditorInform,
        }
      ]
    },
    {
      path: '/data',
      name: 'Data',
      component: Data
    },

    {  //默认页面
      path: '/',
      redirect: '/login',
    }
  ]
})
