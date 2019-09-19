import user from '~/models/user';

const state = () => ({
  user: user,
  apiToken: null,
});

const mutations = {
  setUser(state, user) {
    state.user.id = user.id;
    state.user.name = user.name;
  },
  setToken(state, key) {
    state.apiToken = key;
  },
  removeToken(state) {
    state.apiToken = null;
  },
};

const actions = {
  async setUserInfo(context, user) {
    context.commit('setUser', user);
  },
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getUserId(state) {
    return state.user.id;
  },
  getToken(state) {
    return state.apiToken;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
