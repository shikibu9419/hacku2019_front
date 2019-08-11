export const state = () => ({
    isGrabbing: false
})

export const mutations = {
    toggleGrabbing(state) {
        state.isGrabbing = !state.isGrabbing
    }
}

export const actions = {
    toggleGrabbing(context) {
        context.commit('toggleGrabbing')
    }
}