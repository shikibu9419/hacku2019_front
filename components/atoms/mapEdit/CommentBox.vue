<template lang="pug">
  .comment_box(@click.stop="focusComment()")
    .comment_box__label(v-if="!onBox" :class="{comment_focus_on: focused}") {{ title }}
    .comment_box__content
      user-info
      p.comment_box__comment {{ comment }}
</template>

<script>
export default {
  components: {
    UserInfo: () => import('~/components/atoms/mapEdit/UserInfo')
  },
  props: ['title', 'comment', 'user', 'lat', 'lng', 'onBox'],
  data() {
    return {
      focused: false
    }
  },
  methods: {
    focusComment() {
      if (this.onBox) return
      this.focused = true
      this.$store.dispatch('ymap/panTo', {lat: this.lat, lng: this.lng})
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.comment_box {

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
