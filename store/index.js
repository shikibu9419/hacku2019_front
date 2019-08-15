export const state = () => ({
    plotting: false,
    grabbing: false,
    prevMousePosition: {x: 0, y: 0},
    offset: {x: 0, y: 0}
})

export const mutations = {
    togglePlotting(state) {
        state.plotting = !state.plotting
    },
    toggleGrabbing(state) {
        state.grabbing = !state.grabbing
    },
    setOffset(state, prop) {
        state.offset = {...state.offset, x: prop.x, y: prop.y}
    }
}

export const actions = {
    togglePlotting(context) {
        context.commit('togglePlotting')
    },
    toggleGrabbing(context) {
        context.commit('toggleGrabbing')
    },
    setOffset(context, prop) {
        context.commit('setOffset', prop)
    }
}
