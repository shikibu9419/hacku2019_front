<template lang="pug">
  .map_edit__comment_form__main
    autosize-textarea.map_edit__comment_form__textarea(:text.sync="comment" :maxSize="6" :defaultSize="3")
    // .map_edit__comment_form__wrapper
      img(src="~/assets/svgs/comment_pin.svg" @click="addComment").map_edit__comment__form_pin
      p.map_edit__comment__form_pin_label 地図の中心にピンを刺す
    button.map_edit__comment_form__btn(@click="addComment") コメントする
</template>

<script>
import pinModel from '~/models/tools/pin'
import commentModel from '~/models/contents/comment'

export default {
  props: ['id'],
  data() {
    return {
      comment: '',
    }
  },
  methods: {
    addComment() {
      const commentText = this.comment
      this.comment = ""

      if (this.id) {
        this.$store.dispatch('mapEdit/addComment', {toolId: this.id, commentText: commentText})
        return
      }

      let pin = JSON.parse(JSON.stringify(pinModel))
      let comment = JSON.parse(JSON.stringify(commentModel))

      comment.comment = commentText
      comment.user = this.$store.getters['user/getUser']
      pin.comments.push(comment)
      pin = {...pin, ...this.$store.state.ymap.now}

      this.$store.dispatch('mapEdit/addTool', pin)
    }
  },
  components: {
    AutosizeTextarea: () => import('~/components/atoms/AutosizeTextarea')
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit__comment_form_main {
  position: relative;
}

//   &_pin {
//     display: inline-block;
//     height: 25px;
//   }
//
//   &_pin_label {
//     display: inline;
//     font-size: 10px;
//   }

.map_edit__comment_form__btn {
    display: inline;
    background: $dark-gray;
    color: $white;
    border: none;
    border-radius: 4px;
}
</style>
