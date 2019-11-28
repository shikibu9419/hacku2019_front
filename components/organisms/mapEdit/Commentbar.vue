<template lang="pug">
  .map_edit__commentbar(:class="{'map_edit__commentbar--close': commentbarClose}")
    .map_commentbar__wrapper
      comment-form
      comment-list
</template>

<script>
export default {
  components: {
    CommentForm: () => import('~/components/atoms/mapEdit/CommentForm'),
    CommentList: () => import('~/components/molecules/commentbar/CommentList'),
  },
  data() {
    return {
      menu_close: false,
      message: '',
    };
  },
  computed: {
    commentbarClose() {
      return !this.$store.state.mapEdit.commentbarOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';

$padding: 16px;

.map_edit__commentbar {
  background-color: $back-gray;
  position: absolute;
  top: 0;
  right: 0;
  width: $sidemenu-width;
  height: 100%;
  padding: $padding;
  z-index: 10;
  overflow-y: auto;
  transform: translateX(0);
  transition: 0.2s $bezier-ease-out;
  &--close {
    transform: translateX($sidemenu-width);
  }
}
</style>
