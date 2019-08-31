<template lang="pug">
  .map_edit__commentbar__form_main
    textarea.map_edit__commentbar__form_textarea(v-model="message")
    .map_edit__commentbar__form_wrapper
      img(src="~/assets/svgs/comment_pin.svg" @click="addComment").map_edit__commentbar__form_pin
      p.map_edit__commentbar__form_pin_label ドラッグして位置を追加
      button.map_edit__commentbar__form_btn コメントする
</template>

<script>
import pin from '~/models/tools/pin'
import comment from '~/models/contents/comment'

export default {
  data() {
    return {
      message: '',
      pinModel: pin,
      commentModel: comment
    }
  },
  methods: {
    addComment() {
      let pin = Object.assign({}, this.pinModel)
      let comment = Object.assign({}, this.commentModel)

      comment.message = this.message
      comment.user = Object.assign(comment, this.$store.getters['user/getUser'])
      pin.contents.push(comment)
      pin = {...pin, ...this.$store.state.ymap.center}
//       pin = {...pin, ...$store.getters['ymap/pixelToLatLng']($store.state.mapEdit.mousePosition)}

      this.$store.dispatch('mapEdit/addTool', pin)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit__commentbar__form {
  position: relative;

  &_textarea {
  }

  &_pin {
    display: inline-block;
    height: 25px;
  }

  &_pin_label {
    display: inline;
    font-size: 10px;
  }

  &_btn {
    display: inline;
    background: $dark-gray;
    color: $white;
    border: none;
    border-radius: 4px;
  }
}
</style>
