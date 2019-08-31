import { Model } from '@vuex-orm/core'
import User from './user'
import Layer from './layer'

export default class Map extends Model {
  static entity = 'maps'
  static primaryKey = 'id';

  static fields() {
    return {
      id: this.string(''),
      name: this.string(''),
      description: this.string(''),
      publish_setting: this.number(0),
      layers: this.hasMany(Layer, 'map_id'),
      creator: this.belongsTo(User, 'user_id'),
//       tags: this.hasMany(Tag, 'map_id'),
//       likes: this.hasMany(Like, 'map_id'),
//       permissions: this.hasMany(Permission, 'map_id'),
    }
  }
}
