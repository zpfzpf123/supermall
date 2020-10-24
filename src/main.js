import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//解决手机端点击300ms延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

//使用自己封装的toast
import Toast from "components/common/toast";
Vue.use(Toast)//安装插件


//图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload)

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
