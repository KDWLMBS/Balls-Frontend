import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import pattern from './modules/pattern'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    pattern
  }
})
