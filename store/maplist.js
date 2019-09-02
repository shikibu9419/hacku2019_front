const state = () => ({
  maps: []
})

const mutations = {
  setMaps(state, maps) {
    state.maps = maps
  }
}

const actions = {
  setMaps(context, maps) {
    context.commit('setMaps', maps)
  }
}

const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}