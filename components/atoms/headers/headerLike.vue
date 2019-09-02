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
      this.$store.dispatch('changeLike')
    }
  },
  computed:{
    mapLikedOn(){
      return this.$store.state.mapEdit.like
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "~/assets/styles/atoms/headerButtons.scss";
</style>