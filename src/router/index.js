import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../pages/Login'
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
import Login from '../pages/Loginin'
import About from '../pages/About'
import store from '../store';
import VideoShare from '../pages/VideoShare';
import DocPreview from "../pages/DocPreview";
import Signin from "../pages/Signin";
import Group from "../pages/Group";

Vue.use(Router)

let router = new Router({
  routes: [
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/login',
      name: 'login',
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
      component: Main,
      meta:{needLogin: true}
    },
    {
      path: '/video',
      name: 'video',
      component: VideoShare,
      meta:{needLogin: false}
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta:{needLogin: false}
    },
    {
      path: '/group',
      name: 'group',
      component: Group,
      meta:{needLogin: false}
    },
    {
      path: '/docPreview',
      name: 'docPreview',
      component: DocPreview,
      meta:{needLogin: true}
    },
    {
      path: '/userSettings',
      name: 'UserSettings',
      component: UserSettings,
      meta:{needLogin: true}
    },
    {
      path: '/courseInfo/:id',
      name: 'CourseInfo',
      component: CourseInfo,
      meta:{needLogin: true}
    },
    {
      path: '/classBegin',
      name: 'ClassBegin',
      component: ClassBegin,
      meta:{needLogin: true}
    },
    {
      path: '/qbank',
      name: 'QBank',
      component: QBank,
      meta:{needLogin: true}
    },
    {
      path: '/courseDetail/:id/:name',
      name: 'CourseDetail',
      component: CourseDetail,
      meta:{needLogin: true}
    },

    {
      path: '/inform',
      name: 'Inform',
      component: Inform,
      meta:{needLogin: true},
      children: [
        {
          path: '/inform/showInform/:id',
          component: ShowInform,
          meta:{needLogin: true}
        },
        {
          path: '/inform/editorInform',
          component: EditorInform,
          meta:{needLogin: true}
        }
      ]
    },
    {
      path: '/data',
      name: 'Data',
      component: Data,
      meta:{needLogin: true}
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta:{needLogin: true}
    },

    {  //默认页面
      path: '/',
      redirect: '/main',
    }
  ]
});

router.beforeEach((to, from, next) => { //全局钩子函数
  let isLogin = localStorage.getItem('userInfo')||(store.state.teacherInfo&&Object.keys(store.state.teacherInfo).length);
  to.matched.some((route) => {
    if (route.meta.needLogin) { //通过此操作可以判断哪些页面需要登录
      if (isLogin) {
        next();
      } else {
        next({name: 'login', params: {path: route.path}})
      }
    } else {
      next();
    }
  });

});
export default router;
