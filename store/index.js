export const state = () => ({
    userId: 'user_id',
    apiToken: null
})

export const mutations = {
    setToken(state, key) {
      state.apiToken = key
    },
    removeToken(state) {
      state.apiToken = null
    }
}

export const actions = {
}
