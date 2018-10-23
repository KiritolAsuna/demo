// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'

import App from './App'

import router from './router'

import Mint from 'mint-ui'

import 'mint-ui/lib/style.css'
import 'mui/dist/css/mui.css'

import Axios from 'axios'



import headvue from "@/components/header"
import pl from '@/components/pl'

import vuepreview from 'vue-preview'


// import Vux from 'vux'

// Vue.use(Vux)

Vue.use(Mint)

Vue.use(vuepreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: { top: 0, bottom: 0 },
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
}
)

Vue.component('headVue', headvue)
Vue.component('plVue', pl)

Vue.prototype.$ajax = Axios

Axios.interceptors.request.use(function (a) {
  Mint.Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return a;
})
Axios.interceptors.response.use(function (a) {
  Mint.Indicator.close();
  return a;
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
