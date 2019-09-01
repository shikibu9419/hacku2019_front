<template lang="pug">
  .commentbar__comment_list
    .sidebar__edit_category
      img.sidebar__edit_category__icon(src="~assets/svgs/comment_box.svg")
      .sidebar__edit_category__text
        span.sidebar__edit_category__text--strong {{comments.length}}
        span  Comments
    comment-box(v-for="comment in comments" :key="`comment_list_${comment.comment}`" v-bind="comment" :on-box="toolId")
</template>

<script>
export default {
  props: ['toolId'],
  computed: {
    comments () {
      if (this.toolId)
        return this.$store.getters['mapEdit/getTool'](this.toolId).comments
      return this.$store.getters['mapEdit/comments']
    }
  },
  components: {
    CommentBox: () => import('~/components/atoms/mapEdit/CommentBox')
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "~/assets/styles/atoms/Sidebar.scss";

.commentbar__comment_list {
  &__label_icon {
    display: inline-block;
    width: 20px;
  }

  &__label {
    display: inline;
  }
}
</style>
