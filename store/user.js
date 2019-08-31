import user from '~/models/user'

const state = () => ({
  user: user,
  apiToken: null
})

const mutations = {
  setToken(state, key) {
    state.apiToken = key
  },
  removeToken(state) {
    state.apiToken = null
  }
}

const actions = {
}

const getters = {
  getUser(state) {
    return state.user
  },
  getUserId(state) {
    return state.user.id
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
