import Vue from 'vue'
import Vuex from 'vuex'
import mapEdit from '~/store/mapEdit'
import modal from '~/store/modal'
import ymap from '~/store/ymap'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        modules: {
            modal,
            mapEdit,
            ymap,
        }
    })
}

export default store
/*
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
*/