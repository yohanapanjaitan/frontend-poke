import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// this is the backend URL
axios.defaults.baseURL = 'http://localhost:8000/v1'

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false
  },

  mutations: {
    setUserData (state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common.Authorization = `Bearer ${userData.authorization}`
    },

    setValue (state, {name, value}) {
      state[name] = value
    },

    clearUserData () {
      localStorage.removeItem('user')
      location.reload()
    },

    setAlert (state, alert) {
      state.alert = alert
      localStorage.setItem('alert', JSON.stringify(alert))
    },

    setStatus (state, status) {
      state.status = status
      localStorage.setItem('status', JSON.stringify(status))
    }
  },

  actions: {
    login ({ commit }, credentials) {
      return axios
        .post('/user/auth', credentials)
        .then(({ data }) => {
          commit('setUserData', data.data)
          commit('setValue', {name: 'isLoggedIn', value: true})
          commit('setAlert', 'success')
          commit('setStatus', 'success')
        })
        .catch(err => {
          commit('setAlert', err.response.data.message)
          commit('setStatus', 'error')
        })
    },

    register ({ commit }, credentials) {
      return axios
        .post('/user/register', credentials)
        .then(({ data }) => {
          commit('setUserData', data.data)
          commit('setValue', {name: 'isLoggedIn', value: true})
          commit('setAlert', 'success')
          commit('setStatus', 'success')
        })
        .catch(err => {
          commit('setAlert', err.response.data.message)
          commit('setStatus', 'error')
        })
    },

    logout ({ commit }) {
      commit('clearUserData')
      commit('setValue', {name: 'isLoggedIn', value: false})
    }
  },

  getters: {
    isLogged: state => !!state.user
  }
})
