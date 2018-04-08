// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// font awesome
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'

Vue.config.productionTip = false

fontawesome.library.add(solid)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
