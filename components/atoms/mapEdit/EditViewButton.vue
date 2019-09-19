<template lang="pug">
  .edit_view_button
    nuxt-link(:to="ButtonLink")
      .sidebar_edit__view_button__text {{ButtonText}}
</template>
<script>
export default {
  computed: {
    ButtonLink() {
      if (this.$route.path.match(/\/view$/)) {
        return '/maps/edit';
      }
      if (this.$route.path.match(/\/edit$/)) {
        return '/maps/view';
      }
    },
    ButtonText() {
      if (this.$route.path.match(/\/view$/)) {
        // 編集権限があれば
        // if(){
        //   return "編集する"
        // }else{
        return '編集権限をリクエスト';
        // }
      }
      if (this.$route.path.match(/\/edit$/)) {
        return '閲覧モードでみる';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';
.sidebar_edit__view_button__text {
  background: $gray;
  @include noto-font(1.5rem, $white);
  padding: 6px;
  text-align: center;
  border-radius: 4px;
}
</style>
