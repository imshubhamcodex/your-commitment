import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openTab: 'DASHBOARD',
  },
  getters: {
  },
  mutations: {
    setOpenTab(state, payload) {
      state.openTab = payload
    }
  },
})
