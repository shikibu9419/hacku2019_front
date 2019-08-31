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
      pin: pin,
      comment: comment
    }
  },
  methods: {
    addComment() {
      this.comment.message = this.message
      this.comment.user = Object.assign(this.comment, this.$store.getters['user/getUser'])
      this.pin.contents.push(this.comment)
//       pin = {...pin, ...this.$store.getters['ymap/pixelToLatLng'](this.$store.state.mapEdit.mousePosition)}
      this.pin = {...this.pin, ...this.$store.state.ymap.center}

      this.$store.dispatch('mapEdit/addTool', this.pin)
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
