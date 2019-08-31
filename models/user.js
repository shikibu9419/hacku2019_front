import { Model } from '@vuex-orm/core'
import Map from './map'

export default class User extends Model {
  static entity = 'users'
  static primaryKey = 'id';

  static fields() {
    return {
      id: this.string(''),
      name: this.string(''),
      email: this.string(''),
      maps: this.hasMany(Map, 'user_id'),
//       stocks: this.hasMany(Stock, 'user_id'),
//       likes: this.hasMany(Like, 'user_id'),
//       permissions: this.hasMany(Permission, 'user_id'),
    }
  }
}
