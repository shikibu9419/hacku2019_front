import socket from '~/plugins/socket.io.js'
import selectToolModel from '~/models/selectToolModel.js'
import mapModel from '~/models/map.js'

const uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random()*16|0
    const v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

const state = () => ({
  // APIと通信して逐次変更する変数
  map: JSON.parse(JSON.stringify(mapModel)),
  layers: [],
  activeLayer: {},
  selected: {},
  // 自己保持する変数
  mousePosition: {x: 0, y: 0},
  offset: {x: 0, y: 0},
  plotting: false,
  grabbing: false,
  mapGrabbing: false,
  backgroundFocused: false,
  commentbarOpen: false
})

const mutations = {
  init(state) {
    // 実際はAPIからデータをとりにきてlayersにセット
    state.layers = [{id: 1, name: 'layer1', color: 'red', visible: true, tools: {}}]
  },
  toggle(state, key) {
    state[key] = !state[key]
  },
  setOffset(state, prop) {
    state.offset = {...state.offset, x: prop.x, y: prop.y}
  },
  setMousePosition(state, prop) {
    state.mousePosition = {...state.mousePosition, x: prop.x, y: prop.y}
  },

  addTool(state, {tool, layerId}) {
    // ツールの初期化と代入を同時に行う高等テクニック
    tool = Object.assign(selectToolModel(tool.type), tool)

    let tools = state.layers.find(layer => layer.id === layerId).tools
    state.layers.find(layer => layer.id === layerId).tools = {...tools, [tool.id]: tool}
  },
  updateTool(state, {attr, layerId}) {
    const layerTools = state.layers.find(layer => layer.id === layerId).tools
    const tool = Object.assign(layerTools[attr.id], attr)
    state.activeLayer.tools = {...layerTools, [attr.id]: tool}
  },
  deleteTool(state, toolId) {
    let obj = {...state.activeLayer.tools}
    delete(obj[toolId])
    state.activeLayer.tools = obj
  },
  addComment(state, {prop, getters}) {
    if (!['pin', 'box'].includes(state.activeLayer.tools[prop.toolId].type)) return

    const comment = {comment: prop.commentText, user: getters.getUser}
    state.activeLayer.tools[prop.toolId].comments.push(comment)
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

  selectTool(state, {toolId, userId}) {
    if (state.selected[toolId]) return
    state.selected = {...state.selected, [toolId]: userId}
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

  addLayer(state, layer) {
    state.layers.push(layer)
  },
  selectLayer(state, layerId) {
    state.activeLayer = state.layers.find(layer => layer.id === layerId)
    state.backgroundFocused = false
  },
  focusBackground(state) {
    state.backgroundFocused = true
  },
  updateTags(state, tags) {
    state.map = {...map, tags: tags}
  },

  updateMap(state, map) {
    state.map = Object.assign(state.map, map)
    console.log(state.map)
  }
}

const actions = {
  toggle(context, key) {
    context.commit('toggle', key)
  },
  setOffset(context, prop) {
    context.commit('setOffset', prop)
  },
  setMousePosition(context, prop) {
    context.commit('setMousePosition', prop)
  },
  addTool(context, tool) {
    const layerId = context.state.activeLayer.id
    const toolId = uuid()
    tool = {...tool, id: toolId}

    context.commit('addTool', {tool, layerId})
    context.dispatch('selectTool', {toolId: toolId})

//     socket.emit('tool/add', {tool: tool, layerId: layerId})
  },
  updateTool(context, attr) {
    const layerId = context.state.activeLayer.id
    context.commit('updateTool', {attr, layerId})
  },
  deleteTool(context, toolId) {
    context.commit('deleteTool', toolId)
  },
  addComment({commit, getters}, prop) {
    commit('addComment', {prop, getters})
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
  selectTool(context, prop) {
    const userId = context.getters.getUser.id
    const toolId = prop.toolId
//     if(!prop.multiple)
//       context.commit('clearSelection')
    context.commit('selectTool', {toolId, userId})
  },
  clearSelection(context, prop) {
    context.commit('clearSelection', context.getters.othersSelecting())
  },
  moveTools({commit, getters}, prop) {
    commit('moveTools', {prop, getters})
  },
  init(context) {
    context.commit('init')
  },
  addLayer(context, layer) {
    // 実際はlayer作成要求をして, レスポンスをlayerにセット
    const id = Object.keys(context.state.layers).length + 1
    layer.id = id
    layer.tools = {}

    context.commit('addLayer', layer)
    context.dispatch('selectLayer', id)

//     socket.emit('layer/add', layer)
  },
  selectLayer(context, layerId) {
    context.commit('selectLayer', layerId)
    context.dispatch('clearSelection', context.getters.othersSelecting())
  },
  focusBackground(context) {
    context.commit('focusBackground')
    context.dispatch('clearSelection', context.getters.othersSelecting())
  },
  updateTags(context, tags) {
    context.commit('updateTags', tags)
  },


  mapSocket(context, prop) {
    switch (prop.method) {
      case 'add':
        break;
      case 'update':
        context.commit('updateMap', prop.map)
        break;
      case 'delete':
        break;
    }
  },
  layerSocket(context, prop) {
    switch (prop.method) {
      case 'add':
        context.commit('addLayer', prop.layer)
        break;
      case 'update':
        break;
      case 'delete':
        break;
    }
  },
  toolSocket(context, prop) {
    const tool = prop.tool
    const layerId = prop.layerId

    switch (prop.method) {
      case 'add':
        context.commit('addTool', {tool, layerId})
        break;
      case 'update':
        context.commit('updateTool', {tool, layerId})
        break;
      case 'delete':
        break;
      case 'comments':
        break;
      case 'contents':
        break;
    }
  },
  selectSocket(context, prop) {
    const userId = prop.userId
    const toolId = prop.toolId

    switch (prop.method) {
      case 'add':
        context.dispatch('selectTool', {toolId, userId})
        break;
      case 'clear':
        context.dispatch('clearSelection', context.getters.othersSelecting(userId))
        break;
    }
  }
}

const getters = {
  selecting(state, getters, rootState, rootGetters) {
    if (!Object.keys(state.selected).length) return state.selected
    return Object.entries(state.selected)                              // [key, value]のArrayを取得
      .filter(item => item[1] === getters.getUser.id)        // 本人が選択しているものだけ抽出
      .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})  // Mapに再構成
  },
  othersSelecting(state, getters, rootState, rootGetters) {
    return (userId) => {
      if (!Object.keys(state.selected).length) return state.selected
      if (!userId) userId = getters.getUser.id

      return Object.entries(state.selected)
        .filter(item => item[1] !== userId)         // 本人が選択していないものだけ抽出
        .reduce((l,[k,v]) => Object.assign(l, {[k]: v}), {})
    }
  },
  getUser(state, _, rootState, rootGetters) {
    return rootGetters['user/getUser']
  },
  activeLayer(state) {
    return state.activeLayer
  },
  inactiveLayers(state) {
    return state.layers.filter(layer => layer.id !== state.activeLayer.id)
  },
  getTool(state) {
    return function(toolId) {
      return state.activeLayer.tools[toolId]
    }
  },
  comments(state, _, rootState) {
    const toolsWithComments = state.layers.map(layer => {
      return Object.values(layer.tools).filter(tool => ['pin', 'box'].includes(tool.type))
    }).flat(5).filter(tool => tool.comments.length)

    const comments = toolsWithComments.map(tool => {
      return tool.comments.map(comment => {
        return {...tool, ...comment, toolId: tool.id}
      })
    }).flat()

    return comments
  },
  getTags(state) {
    return state.map.tags
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
