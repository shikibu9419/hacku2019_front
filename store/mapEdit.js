const uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random()*16|0
      const v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
};

export const state = () => ({
    plotting: false,
    grabbing: false,
    mousePosition: {x: 1000, y: 1000},
    offset: {x: 0, y: 0},
    tools: {},
    selected: {}
})

// map = {...map, key: value} はMapをリアクティブに編集するいい書き方 (らしい)
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
    },
    addTool(state, attr) {
        state.tools = { ...state.tools, [uuid()]: attr }
    },
    addSelect(state, attr) {
        const tool_id = uuid()
        state.tools = { ...state.tools, [tool_id]: attr }
        mutations.selectTool(state, {tool_id: tool_id})
    },
    plot(state, prop) {
        state.tools[prop.tool_id].points.push({x: prop.x, y: prop.y})
    },
    replot(state, prop) {
        state.tools[prop.tool_id].points.splice(prop.index, 1, {x: prop.x, y: prop.y})
    },
    selectTool(state, prop) {
        state.selected = { ...state.selected, [prop.tool_id]: 'hoge' }
    },
    clearSelection(state) {
        state.selected = getters.othersSelecting
    },
    setPosition(state, prop) {
        for(const tool_id of Object.keys(state.selected))
            state.tools[tool_id] = { ...state.tools[tool_id], x: prop.x, y: prop.y }
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
    },
    add(context, attr) {
        context.commit('addTool', attr)
    },
    addSelect(context, attr) {
        context.commit('addSelect', attr)
    },
    plot(context, prop) {
        context.commit('plot', prop)
    },
    replot(context, prop) {
        context.commit('replot', prop)
    },
    select(context, prop) {
        if(!prop.multiple)
            context.commit('clearSelection')
        context.commit('selectTool', prop)
    },
    clearSelection(context) {
        context.commit('clearSelection')
    },
    setPosition(context, prop) {
        context.commit('setPosition', prop)
    }
}

export const getters = {
    selecting(state) {
        return Object.entries(state.selected)                              // [key, value]のArrayを取得
                     .filter(item => item[1] === 'hoge')                   // 本人が選択しているものだけ抽出
                     .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})  // Mapに再構成
    },
    othersSelecting(state) {
        return Object.entries(state.selected)
                     .filter(item => item[1] !== 'hoge')                   // 本人が選択していないものだけ抽出
                     .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})
    },
}
