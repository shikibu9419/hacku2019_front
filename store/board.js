const uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random()*16|0
      const v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
};

export const state = () => ({
    tools: {},
    selected: {}
})

// map = {...map, key: value} はMapをリアクティブに編集するいい書き方 (らしい)
export const mutations = {
    addTool(state, attr) {
        state.tools = { ...state.tools, [uuid()]: attr }
    },
    selectElement(state, prop) {
        state.selected = { ...state.selected, [prop.tool_id]: prop.user_id }
    },
    clearSelection(state, prop) {
        state.selected = Object.entries(state.selected)                              // [key, value]のArrayを取得
                               .filter(item => item[1] !== prop.user_id)             // 本人が選択していないものだけ抽出
                               .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})  // Mapに再構成
    },
    setPosition(state, prop) {
        for(const tool_id of Object.keys(state.selected))
            state.tools[tool_id] = { ...state.tools[tool_id], x: prop.x, y: prop.y }
    }
}

export const actions = {
    add(context, attr) {
        context.commit('addTool', attr)
    },
    select(context, prop) {
        context.commit('selectElement', prop)
    },
    clearSelection(context, prop) {
        context.commit('clearSelection', prop)
    },
    setPosition(context, prop) {
        context.commit('setPosition', prop)
    }
}

export const getters = {
    tools(state) {
        return state.tools
    },
    selected(state) {
        return state.selected
    },
    selecting(state) {
        return Object.entries(state.selected)                              // [key, value]のArrayを取得
                     .filter(item => item[1] === prop.user_id)             // 本人が選択しているものだけ抽出
                     .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})  // Mapに再構成
    }
}