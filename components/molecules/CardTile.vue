<template lang="pug">
  .maplist__card
    img.maplist__card__img(:src="img_url")
    .maplist__card__content
      h3.title {{ title }}
      UserInfo
      .maplist__card__layers
        font-awesome-icon.maplist__card__icon(icon="layer-group")
        tag-item(v-for="layer in layers" v-bind="layer" :key="`maplist_layer_${layer.id}`")
      .maplist__card__tags
        font-awesome-icon.maplist__card__icon(icon="tag")
        tag-item(v-for="tag in tags" v-bind="tag" :key="`maplist_tag_${tag.id}`")
      .maplist__card__comments
        Comment(:comment_count="comments.length")
</template>

<script>
import UserInfo from '../atoms/UserInfo'
import TagItem from '../atoms/TagItem'
import Comment from '../atoms/CardTile/Comment'

export default {
  name: "CardTile",
  components: {UserInfo, TagItem, Comment},
  props: {
    title: {
      type: String,
      require: true
    },
    img_url: {
      type: String,
      require: true
    },
    layers: {
      type: Array,
      require: true
    },
    tags: {
      type: Array,
      require: true
    },
    comments: {
      type: Array,
      require: true
    }
  }
}
</script>

<style scoped>
.card {
  margin: 30px auto;
  width: 350px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}
.maplist__card__img {
  border-radius: 5px 5px 0 0;
  max-width: 100%;
  height: auto;
}
.title {
  margin: 5px;
}
.contents {
  margin: 10px;
}
.parent >>> .icon {
  margin-right: 10px;
}
</style>
