import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// import './plugins/vant.js'
// import  './plugins/rem.js';
// 控制台按钮
if (process.env.VUE_APP_CONFIG != 'prod') {
  const Vconsole = require('vconsole');
  new Vconsole();
}
// mock请求
if (process.env.NODE_ENV === "development") {
  require("@/mock");
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
