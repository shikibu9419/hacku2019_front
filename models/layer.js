import { Model } from '@vuex-orm/core'
import Map from './map'

export default class Layer extends Model {
  static entity = 'layers'
  static primaryKey = 'id';

  static fields () {
    return {
      id: this.string(''),
      name: this.string(''),
      default_visible: this.boolean(true),
      origin: this.belongsTo(Layer, 'layer_id'),
      map: this.belongsTo(Map, 'map_id'),
      map_id: this.string(''),
//       tools: this.hasMany(Tool, 'layer_id'),
    }
  }
}
