const state = () => ({
    userId: 'user_id',
    name: 'username',
    email: 'hoge@fuga.com',
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

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
