<template lang="pug">
  .header_sq_button__main
    button.header_sq_button(
        @click="pushLike()"
        :class="{'header_sq_button--on':mapLikedOn}"
      )
      .header_sq_button__icon
        likeBtn.header_sq_button__icon__svg
      .header_sq_button__text(v-if="!mapLikedOn") いいね
      .header_sq_button__text(v-else) いいね中
</template>

<script>
export default {
  components:{
    likeBtn: () => import('~/assets/svgs/like.svg?inline'),
  },
  methods:{
    pushLike(){
      //VueXから拾ってきて条件分岐
      let like_on // = this.$store.hoge
      if(like_on){
        //外す処理
      }else{
        //つける処理
      }
    }
  },
  computed:{
    mapLikedOn(){
      //マップがすでにいいねされていたらtrueを返す
      //VueXにlike:true/falseを用意して、そこから直接拾ってくる
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