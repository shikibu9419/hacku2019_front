<template lang="pug">
  .map_edit__commentbar__form_main
    textarea.map_edit__commentbar__form_textarea(v-model="message")
    .map_edit__commentbar__form_wrapper
      img(src="~/assets/svgs/comment_pin.svg" @click="addComment").map_edit__commentbar__form_pin
      p.map_edit__commentbar__form_pin_label 地図の中心にピンを刺す
      button.map_edit__commentbar__form_btn コメントする
</template>

<script>
import pinModel from '~/models/tools/pin'
import commentModel from '~/models/contents/comment'

export default {
  data() {
    return {
      message: '',
    }
  },
  methods: {
    addComment() {
      let pin = JSON.parse(JSON.stringify(pinModel))
      let comment = JSON.parse(JSON.stringify(commentModel))

      comment.message = this.message
      comment.user = this.$store.getters['user/getUser']
      pin.contents.push(comment)
      pin = {...pin, ...this.$store.state.ymap.now}

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
