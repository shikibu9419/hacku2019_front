// import Vue from 'vue'
// import Vuex from 'vuex'
// import mapEdit from '~/store/mapEdit'
// import modal from '~/store/modal'
// import ymap from '~/store/ymap'
// import user from '~/store/user'
//
// Vue.use(Vuex)
//
// const store = () => {
//     return new Vuex.Store({
//         modules: {
//             modal,
//             mapEdit,
//             ymap,
//             user,
//         }
//     })
// }
//
// export default store

import VuexORM from '@vuex-orm/core'
import { Database } from '@vuex-orm/core'
import User from '@/models/User'
import Map from '@/models/Map'
import Layer from '@/models/Layer'

const database = new Database()
database.register(User)
database.register(Map)
database.register(Layer)

export const plugins = [
  VuexORM.install(database)
]
