import patternService from '../../api/pattern'

export default {
  state: {
    patterns: []
  },
  getters: {
    patterns: state => {
      return state.patterns
    }
  },
  mutations: {
    async loadPatterns (state) {
      console.log(state)
      state.patterns = await patternService.readAll()
    }
  },
  actions: {
    loadPatterns ({commit}) {
      console.log('lalala')
      commit('loadPatterns')
    }
  }
}
