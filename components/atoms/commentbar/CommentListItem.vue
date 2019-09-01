<template lang="pug">
  .commentbar_item(@click.stop="focusComment()")
    .commentbar_item__label(:class="{comment_focus_on: focused}") 中央北口
    .commentbar_item__content
      UserInfo(
        :author="'username'"
        :editors="null"
      )
      p.commentbar_item__comment {{ message }}
</template>

<script>
export default {
  components: {
    UserInfo: () => import('~/components/atoms/mapInfo/UserInfo')
  },
  props: ['id', 'message', 'user', 'lat', 'lng'],
  data() {
    return {
      focused: false
    }
  },
  methods: {
    focusComment() {
      this.focused = true
      this.$store.dispatch('ymap/panTo', {lat: this.lat, lng: this.lng})
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.commentbar_item {

  &__label {
    background: $light-gray;

    &.comment_focus_on {
      border: 2px solid $gray;
    }
  }

  &__content {
    background: $white;
    margin-bottom: 10px;
  }
}
</style>
