export const state = () => ({
    elements: {circle: []},
    selected: []
})

export const mutations = {
    addElement(state, prop) {
        state.elements[prop.type].push(prop.attr)
    },
    selectElement(state, prop) {
        state.selected.push(prop)
    },
    clearSelection(state) {
        state.selected = []
    },
    setPosition(state, pos) {
        for(const prop of state.selected) {
            var elem = state.elements[prop.type][prop.id]
            elem.x = pos.x
            elem.y = pos.y
        }
    }
}

export const actions = {
    add(context, prop) {
        context.commit('addElement', prop)
    },
    select(context, prop) {
        context.commit('selectElement', prop)
    },
    clearSelection(context) {
        context.commit('clearSelection')
    },
    setPosition(context, pos) {
        context.commit('setPosition', pos)
    }
}

export const getters = {
    elements(state) {
        return state.elements
    },
    selected(state) {
        return state.selected
    }
}