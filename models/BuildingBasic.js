import { Model } from 'vuex-orm'

class BuildingBasic extends Model {
  static entity = 'posts'

  static fields () {
    return {
      id: this.attr(null),
      user_id: this.attr(null),
      title: this.attr(''),
      body: this.attr(''),
      author: this.belongsTo(User),
      comments: this.hasMany(Comment)
    }
  }
}
