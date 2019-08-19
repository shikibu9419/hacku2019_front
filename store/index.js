export const state = () => ({
    plotting: false,
    grabbing: false,
    mousePosition: {x: 1000, y: 1000},
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
    },
    setMousePosition(state, prop) {
        state.mousePosition = {...state.mousePosition, x: prop.x, y: prop.y}
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
    },
    setMousePosition(context, prop) {
        context.commit('setMousePosition', prop)
    }
}
