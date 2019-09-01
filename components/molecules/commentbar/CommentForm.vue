<template lang="pug">
  .map_edit__commentbar__form_main
    textarea.map_edit__commentbar__form_textarea(v-model="message")
    .map_edit__commentbar__form_wrapper
      img(src="~/assets/svgs/comment_pin.svg" @click="addComment").map_edit__commentbar__form_pin
      p.map_edit__commentbar__form_pin_label 地図の中心にピンを刺す
      button.map_edit__commentbar__form_btn コメントする
</template>

<script>
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
</style>
