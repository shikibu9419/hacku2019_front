import toolList from '~/models/toolList.js'
import map from '~/models/map.js'
import layer from '~/models/layer.js'

const uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random()*16|0
      const v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
};

const state = () => ({
    // APIと通信して逐次変更する変数
    map: map,
    layers: map.layers,
    activeLayer: {},
    selected: {},
    // 自己保持する変数
    mousePosition: {x: 0, y: 0},
    offset: {x: 0, y: 0},
    plotting: false,
    grabbing: false,
    mapGrabbing: false,
})

// map = {...map, key: value} はMapをリアクティブに編集するいい書き方 (らしい)
const mutations = {
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
    addTool(state, {attr, toolId}) {
        attr = Object.assign(toolList[attr.type], attr, {id: toolId})
        state.activeLayer.tools = {...state.activeLayer.tools, [toolId]: attr}
    },
    plot(state, prop) {
        state.activeLayer.tools[prop.toolId].points.push(prop)
    },
    replot(state, prop) {
        state.activeLayer.tools[prop.toolId].points.splice(prop.index, 1, {lat: prop.lat, lng: prop.lng})
    },
    replotAll(state, prop) {
        const dlat = prop.now.lat - prop.prev.lat
        const dlng = prop.now.lng - prop.prev.lng

        state.activeLayer.tools[prop.toolId].points.forEach((point, index) => {
            state.activeLayer.tools[prop.toolId].points.splice(index, 1, {lat: point.lat + dlat, lng: point.lng + dlng})
        })
    },
    resize(state, prop) {
        var tool = state.activeLayer.tools[prop.toolId]
        state.activeLayer.tools[prop.toolId] = {...tool, width: prop.width, height: prop.height}
    },
    selectTool(state, {prop, getters}) {
        state.selected = {...state.selected, [prop.toolId]: getters.getUserId}
    },
    clearSelection(state, othersSelecting) {
        state.selected = othersSelecting
    },
    moveTools(state, {prop, getters}) {
        const dlat = prop.now.lat - prop.prev.lat
        const dlng = prop.now.lng - prop.prev.lng

        for(const toolId of Object.keys(getters.selecting)) {
            const tool = state.activeLayer.tools[toolId]
            state.activeLayer.tools[toolId] = {...tool, lat: tool.lat + dlat, lng: tool.lng + dlng}
        }
    },
    initLayers(state) {
        // 実際はAPIからデータをとりにきてlayersにセット
        state.layers = [{id: 1, name: 'layer1', color: 'red', tools: {}}]
    },
    addLayer(state, layer) {
        state.layers.push(layer)
    },
    selectLayer(state, layerId) {
        state.activeLayer = state.layers.find(layer => layer.id === layerId)
    }
}

const actions = {
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
    addTool(context, attr) {
        const toolId = uuid()
        context.commit('addTool', {attr, toolId})
        context.dispatch('selectTool', {toolId: toolId})
    },
    plot(context, prop) {
        context.commit('plot', prop)
    },
    replot(context, prop) {
        context.commit('replot', prop)
    },
    replotAll(context, prop) {
        context.commit('replotAll', prop)
    },
    resize(context, prop) {
        context.commit('resize', prop)
    },
    selectTool({commit, getters}, prop) {
        if(!prop.multiple)
            commit('clearSelection')
        commit('selectTool', {prop, getters})
    },
    clearSelection(context) {
        context.commit('clearSelection', context.getters.othersSelecting)
    },
    moveTools({commit, getters}, prop) {
        commit('moveTools', {prop, getters})
    },
    initLayers(context) {
        context.commit('initLayers')
    },
    addLayer(context, layer) {
        // 実際はlayer作成要求をして, レスポンスをlayerにセット
        const id = Object.keys(context.state.layers).length + 1
        layer.id = id
        layer.tools = {}

        context.commit('addLayer', layer)
        context.dispatch('selectLayer', id)
    },
    selectLayer(context, layerId) {
        context.commit('selectLayer', layerId)
        context.dispatch('clearSelection')
    }
}

const getters = {
    selecting(state, getters, rootState, rootGetters) {
        if (!Object.keys(state.selected).length) return state.selected
        return Object.entries(state.selected)                              // [key, value]のArrayを取得
                     .filter(item => item[1] === getters.getUserId)        // 本人が選択しているものだけ抽出
                     .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})  // Mapに再構成
    },
    othersSelecting(state, getters, rootState, rootGetters) {
        if (!Object.keys(state.selected).length) return state.selected
        return Object.entries(state.selected)
                     .filter(item => item[1] !== getters.getUserId)         // 本人が選択していないものだけ抽出
                     .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})
    },
    getUserId(state, _, rootState, rootGetters) {
      return rootGetters['user/getUserId']
    },
    activeLayer(state) {
        return state.activeLayer
    },
    inactiveLayers (state) {
        return state.layers.filter(layer => layer.id !== state.activeLayer.id)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
