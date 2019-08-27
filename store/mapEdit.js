const uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random()*16|0
      const v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
};

export const state = () => ({
    // APIと通信して逐次変更する変数
    layers: [],
    activeLayer: {},
    selected: {},
    // 自己保持する変数
    center: {lat: 35.71, lng: 139.72},
    mousePosition: {x: 0, y: 0},
    offset: {x: 0, y: 0},
    markerLatLngs: [],
    plotting: false,
    grabbing: false,
    mapGrabbing: false,
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
        state.activeLayer.tools = {...state.activeLayer.tools, [uuid()]: attr}
    },
    addSelect(state, {attr, toolId}) {
        attr = {...state.mousePosition, ...attr}
        state.activeLayer.tools = {...state.activeLayer.tools, [toolId]: attr}
    },
    plot(state, prop) {
        state.activeLayer.tools[prop.toolId].points.push({x: prop.x, y: prop.y})
    },
    replot(state, prop) {
        state.activeLayer.tools[prop.toolId].points.splice(prop.index, 1, {x: prop.x, y: prop.y})
    },
    selectTool(state, {prop, getters}) {
        state.selected = {...state.selected, [prop.toolId]: getters.getUserId}
    },
    clearSelection(state) {
        state.selected = getters.othersSelecting
    },
    setPosition(state, {prop, getters}) {
        for(const toolId of Object.keys(getters.selecting))
            state.activeLayer.tools[toolId] = {...state.activeLayer.tools[toolId], x: prop.x, y: prop.y}
    },
    setCenter(state, prop) {
        state.center = {...state.center, lat: prop.lat, lng: prop.lng}
    },
    setMarkerLatLngs(state, latlng) {
        state.markerLatLngs.length = 0
        state.markerLatLngs.push(latlng)
    },
    initLayers(state) {
        // 実際はAPIからデータをとりにきてlayersにセット
        state.layers = [{id: 1, name: 'layer1', color: 'red', tools: {}}]
    },
    addLayer(state, prop) {
        state.layers.push(prop)
    },
    selectLayer(state, layerId) {
        state.activeLayer = state.layers.find(layer => layer.id === layerId)
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
    setCenter(context, prop) {
        context.commit('setCenter', prop)
    },
    setMarkerLatLngs(context, latlng) {
        context.commit('setMarkerLatLngs', latlng)
    },
    initLayers(context) {
        context.commit('initLayers')
    },
    addLayer(context, prop) {
        // 実際はlayer作成要求をして, レスポンスをlayerにセット
        const id = Object.keys(context.state.layers).length + 1
        prop.id = id
        prop.tools = {}

        context.commit('addLayer', prop)
        context.dispatch('selectLayer', id)
    },
    selectLayer(context, layerId) {
        context.commit('selectLayer', layerId)
        context.dispatch('clearSelection')
    }
}

export const getters = {
    selecting(state, _, rootState) {
        if (!Object.keys(state.selected).length) return state.selected
        return Object.entries(state.selected)                              // [key, value]のArrayを取得
                     .filter(item => item[1] === rootState.userId)         // 本人が選択しているものだけ抽出
                     .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})  // Mapに再構成
    },
    othersSelecting(state, _, rootState) {
        if (!Object.keys(state.selected).length) return state.selected
        return Object.entries(state.selected)
                     .filter(item => item[1] !== rootState.userId)         // 本人が選択していないものだけ抽出
                     .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})
    },
    getUserId(state, _, rootState) {
        return rootState.userId
    },
    activeLayer(state) {
        return state.activeLayer
    },
    inactiveLayers (state) {
        return state.layers.filter(layer => layer.id !== state.activeLayer.id)
    }
}
