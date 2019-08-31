<template lang="pug">
  div.card
    img.card-img(:src="img_url")
    .contents
      h3.title {{ title }}
      Username(:username="username" :src="usericon_url")
      Layer(:layers="layers")
      font-awesome-icon.maplist__card_icon(icon="tag")
      Tag(v-for="tag in tags" v-bind="tag")
      Comment(:comment_count="comments.length")
</template>

<script>
import Username from '../atoms/CardTile/Username'
import Layer from '../atoms/CardTile/Layer'
import Tag from '../atoms/CardTile/Tag'
import Comment from '../atoms/CardTile/Comment'

export default {
  name: "CardTile",
  components: {Comment, Tag, Layer, Username},
  props: {
    title: {
      type: String,
      require: true
    },
    img_url: {
      type: String,
      require: true
    },
    username: {
      type: String,
      require: true
    },
    usericon_url: {
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
.card-img {
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
