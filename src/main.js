// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
// plugin
import './plugins/flexible'
import FastClick from 'fastclick'
import BaiduMap from 'vue-baidu-map'
// import vueAxios from './plugins/vue-axios'

// Vue.use(vueAxios, axios)
Vue.use(BaiduMap, {
	ak: 'x7weekL5BrZISrSgMl0swHR2jDxUiZYO'
})
Vue.prototype.$http = axios;




Vue.config.productionTip = false

/*if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
