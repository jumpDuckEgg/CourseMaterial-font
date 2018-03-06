import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

Vue.use(Router)

//路由懒加载，如果是import方式进行导入，webpack将会把所有东西打包成一个文件，打包出来的文件将会很大，而懒加载将会打包成多个文件，当路由跳转时再加载相对应的文件
const Login = resolve => {
  require.ensure(['@/page/login.vue'], () => {
    resolve(require('@/page/login.vue'));
  });
};

const Register = resolve => {
  require.ensure(['@/page/register.vue'], () => {
    resolve(require('@/page/register.vue'));
  });
};

const MainPage = resolve => {
  require.ensure(['@/page/mainPage.vue'], () => {
    resolve(require('@/page/mainPage.vue'));
  });
};

const mainCotent = resolve => {
  require.ensure(['@/page/main/index.vue'], () => {
    resolve(require('@/page/main/index.vue'));
  });
};

const CourseInformation = resolve => {
  require.ensure(['@/page/main/courseInformation.vue'], () => {
    resolve(require('@/page/main/courseInformation.vue'));
  })
}

const OnlineTest = resolve => {
  require.ensure(['@/page/main/onlineTest.vue'], () => {
    resolve(require('@/page/main/onlineTest.vue'));
  })
}

const VideoPlay = resolve => {
  require.ensure(['@/page/main/videoPlay.vue'], () => {
    resolve(require('@/page/main/videoPlay.vue'))
  })
}

const PersonCenter = resolve => {
  require.ensure(['@/page/main/personCenter.vue'], () => {
    resolve(require('@/page/main/personCenter.vue'))
  })
}

const PdfView = resolve => {
  require.ensure(['@/page/main/pdfView.vue'], () => {
    resolve(require('@/page/main/pdfView.vue'));
  })
}

const MoniExam = resolve =>{
  require.ensure(['@/page/main/moniExam.vue'],()=>{
    resolve(require('@/page/main/moniExam.vue'));
  })
}

//单独变量router是为了对路由进行拦截
const router = new Router({
  mode: 'history',//更改路由的url显示方式，即少了'/#/'
  routes: [
    {
      path: '/',
      component: MainPage,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'mainCotent',
          component: mainCotent,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'course/:id',
          name: 'courseInformation',
          component: CourseInformation,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'onlineTest/:id',
          name: 'onlineTest',
          component: OnlineTest,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'videos/:id',
          name: 'videos',
          component: VideoPlay,
          meta: {
            requiresAuth: true
          }
        }, {
          path: 'personCenter',
          name: 'personCenter',
          component: PersonCenter,
          meta: {
            requiresAuth: true
          }
        },{
          path:'pdfView/:type/:id',
          name:'pdfView',
          component: PdfView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path:'moniExam/:id',
          name:"moniExam",
          component:MoniExam,
          meta:{
            requiresAuth:true
          }
        }

      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

//注册全局钩子来进行拦截
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth（此功能时验证首页）
  if (to.meta.requiresAuth) {
    // 是否有token，有即代表有登陆过，没有反之
    console.log(to.meta.requiresAuth)
    if (token) {
      //通过
      next();
    } else {
      //没有登陆，转跳登陆界面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    // 不需要用验证，即该路由不需要用到token的验证，给与通过
    next();
  }
})

export default router;