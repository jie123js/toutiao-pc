import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载 element 组件库
import ElementUI from 'element-ui'

// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'
// 加载全局样式
import './styles/index.less'
// 加载 nprogress 中的指定的样式文件
// 注意：加载第三方包中的具体文件不需要写具体路径，直接写包名即可
// 总结就是："包名/具体文件路径"
import 'nprogress/nprogress.css'
// 全局注册 element 组件库
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
