<template lang="pug">
  .header_cir_button__main
    button.header_cir_button(
        @click="pushComment()"
        :class="{'header_cir_button--on':mapCommentsAreaOn}"
      )
      .header_cir_button__icon
        commentBtn.header_cir_button__icon__svg
</template>

<script>
export default {
  components:{
    commentBtn: () => import('~/assets/svgs/comment_box.svg?inline'),
  },
  methods:{
    pushComment(){
      //処理
    }
  },
  computed:{
    mapCommentsAreaOn(){
      //VueXから取ってくる
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "~/assets/styles/atoms/headerButtons.scss";
</style>