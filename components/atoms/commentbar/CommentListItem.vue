<template lang="pug">
  .commentbar_item(@click="focusComment")
    .commentbar_item__label(:class="{comment_focus_on: focused}" @click="focusComment") 中央北口
    .commentbar_item__content(@click="focusComment")
      .commentbar_item__user_info
        img.commentbar_item__user_icon(src="~/assets/svgs/layer.svg")
        p.commentbar_item__user_name {{ 'username' }}
      p.commentbar_item__comment {{ 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' }}
</template>

<script>
export default {
  props: ['comment', 'name', 'color'],
  computed: {
    focused() {
      return false
    }
  },
  methods: {
    focusComment(id) {
      this.focused = true
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.commentbar_item {

  &.comment_focus_on {
    border: 2px solid $gray;
  }

  &__label {
    background: $light-gray;
  }

  &__content {
    background: $white;
    margin-bottom: 10px;
  }

  &__user_icon {
    display: inline-block;
    max-width: 20px;
  }

  &__user_name {
    display: inline;
    max-width: 30px;
  }
}
</style>
