import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'
import Article from '@/views/article/index.vue'
import Publish from '@/views/publish/index.vue'
import Images from '@/views/images/index.vue'
import Comment from '@/views/comment/index.vue'
import Setting from '@/views/setting/index.vue'
import Fans from '@/views/fans/index.vue'
import NProgress from 'nprogress'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 命名路路由有一个默认子路由,这个名字没有意义了(如果取了控制台会有黄色警告)
    // 如果有默认子路由就把不设置name
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // 不写path默认显示这个子路由
        name: 'home',
        component: Home
      },
      {
        path: 'article', // 不写path默认显示这个子路由
        name: 'article',
        component: Article
      },
      {
        path: 'publish', // 不写path默认显示这个子路由
        name: 'publish',
        component: Publish
      },
      {
        path: 'image', // 不写path默认显示这个子路由
        name: 'image',
        component: Images
      },
      {
        path: 'comment', // 不写path默认显示这个子路由
        name: 'comment',
        component: Comment
      },
      {
        path: 'settings', // 不写path默认显示这个子路由
        name: 'settings',
        component: Setting
      },
      {
        path: 'fans', // 不写path默认显示这个子路由
        name: 'fans',
        component: Fans
      }

    ]
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条特效
  NProgress.start()
  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      console.log(11)
      // 没有登录，跳转到登录页面
      next('/login')
      NProgress.done()
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})
router.afterEach((to, from) => {
  // 结束顶部的导航进度条

  NProgress.done()
})
export default router
