const uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random()*16|0
      const v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
};

export const state = () => ({
    center: {lat: 35.71, lng: 139.72},
    markerLatLngs: [],
    plotting: false,
    grabbing: false,
    mapGrabbing: false,
    mousePosition: {x: 0, y: 0},
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
    toggleMapGrabbing(state) {
        state.mapGrabbing = !state.mapGrabbing
    },
    setOffset(state, prop) {
        state.offset = {...state.offset, x: prop.x, y: prop.y}
    },
    setMousePosition(state, prop) {
        state.mousePosition = {...state.mousePosition, x: prop.x, y: prop.y}
    },
    addTool(state, attr) {
        state.tools = {...state.tools, [uuid()]: attr}
    },
    addSelect(state, {attr, toolId}) {
        state.tools = {...state.tools, [toolId]: attr}
    },
    plot(state, prop) {
        state.tools[prop.toolId].points.push({x: prop.x, y: prop.y})
    },
    replot(state, prop) {
        state.tools[prop.toolId].points.splice(prop.index, 1, {x: prop.x, y: prop.y})
    },
    selectTool(state, {prop, getters}) {
        state.selected = {...state.selected, [prop.toolId]: getters.getUserId}
    },
    clearSelection(state) {
        state.selected = getters.othersSelecting
    },
    setPosition(state, {prop, getters}) {
        for(const toolId of Object.keys(getters.selecting))
            state.tools[toolId] = {...state.tools[toolId], x: prop.x, y: prop.y}
    },
    scrollMap(state, prop) {
        state.center = {...state.center, lat: prop.lat, lng: prop.lng}
    },
    setMarkerLatLngs(state, latlng) {
        state.markerLatLngs.length = 0
        state.markerLatLngs.push(latlng)
    }
}

export const actions = {
    togglePlotting(context) {
        context.commit('togglePlotting')
    },
    toggleGrabbing(context) {
        context.commit('toggleGrabbing')
    },
    toggleMapGrabbing(context) {
        context.commit('toggleMapGrabbing')
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
        const toolId = uuid()
        context.commit('addSelect', {attr, toolId})
        context.dispatch('select', {toolId: toolId})
    },
    plot(context, prop) {
        context.commit('plot', prop)
    },
    replot(context, prop) {
        context.commit('replot', prop)
    },
    select({commit, getters}, prop) {
        if(!prop.multiple)
            commit('clearSelection')
        commit('selectTool', {prop, getters})
    },
    clearSelection(context) {
        context.commit('clearSelection')
    },
    setPosition({commit, getters}, prop) {
        commit('setPosition', {prop, getters})
    },
    scrollMap(context, prop) {
        context.commit('scrollMap', prop)
    },
    setMarkerLatLngs(context, latlng) {
        context.commit('setMarkerLatLngs', latlng)
    },
}

export const getters = {
    selecting(state, _, rootState) {
        return Object.entries(state.selected)                              // [key, value]のArrayを取得
                     .filter(item => item[1] === rootState.userId)         // 本人が選択しているものだけ抽出
                     .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})  // Mapに再構成
    },
    othersSelecting(state, _, rootState) {
        return Object.entries(state.selected)
                     .filter(item => item[1] !== rootState.userId)         // 本人が選択していないものだけ抽出
                     .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})
    },
    getUserId(state, _, rootState) {
        return rootState.userId
    }
}
