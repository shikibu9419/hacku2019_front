export const state = () => ({
    elements: {circle: []},
    selected: []
})

export const mutations = {
    addElement(state, prop) {
        state.elements[prop.type].push(prop.position)
    },
    selectElement(state, prop) {
        state.selected.push(prop)
    },
    clearSelection(state) {
        state.selected.length = 0
    },
    setPosition(state, pos) {
        for(const prop of state.selected) {
            var elem = state.elements[prop.type][prop.id]
            elem.x = pos.x
            elem.y = pos.y
        }
    },
    getPosition(state, type, id) {
        return state.elements[type][id]
    }
}

export const actions = {
    addElement(context, prop) {
        context.commit('addElement', prop)
    },
    selectElement(context, prop) {
        context.commit('selectElement', prop)
    },
    clearSelection(context) {
        context.commit('clearSelection')
    },
    setPosition(context, pos) {
        context.commit('setPosition', pos)
    },
    getPosition(context, type, id) {
        context.commit('getPosition', type, id)
    }
}

export const getters = {
    elements(state) {
        return state.elements
    }
}