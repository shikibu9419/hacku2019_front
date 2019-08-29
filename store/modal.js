export default {
    namespaced: true,
    state(){
        return {
            modals: []
        }
    },
    mutations: {
        openModal(state, modal) {
            state.modals.push(modal)
        },
        closeModal(state) {
            state.modals.pop()
        }
    },
    getters: {
        modals: (state) => {
            return state.modals
        }
    },
    actions: {
        openModal(context, params) {
            context.commit('openModal', params)
        },
        closeModal(context, params) {
            context.commit('closeModal', params)
        }
    }
}
