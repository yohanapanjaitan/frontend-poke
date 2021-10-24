import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// this is the backend URL
axios.defaults.baseURL = 'http://localhost:8000/v1'

export default new Vuex.Store({
  state: {
    user: null
  },

  mutations: {
    setUserData (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.authorization}`
    },

    clearUserData () {
      localStorage.removeItem('user')
      location.reload()
    }
  },

  actions: {
    login ({ commit }, credentials) {
      return axios
        .post('/user/auth', credentials)
        .then(({ data }) => {
          commit('setUserData', data.data)
        })
    },

    register ({ commit }, credentials) {
      return axios
        .post('/user/register', credentials)
        .then(({ data }) => {
          commit('setUserData', data.data)
        })
    },

    logout ({ commit }) {
      commit('clearUserData')
    }
  },

  getters: {
    isLogged: state => !!state.user
  }
})
