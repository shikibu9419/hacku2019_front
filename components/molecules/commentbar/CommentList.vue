<template lang="pug">
  .commentbar__comment_list
    img.commentbar__comment_list__label_icon(src="~/assets/svgs/comment_mini.svg")
    p.commentbar__comment_list__label {{ comments.length }} Comments
    comment-box(v-for="comment in comments" :key="`comment_list_${comment}`" v-bind="comment" :on-box="toolId")
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
