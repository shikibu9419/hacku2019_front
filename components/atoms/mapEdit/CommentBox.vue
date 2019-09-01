<template lang="pug">
  .comment_box
    button.comment_box__button(@click.stop="focusComment()" v-if="!onBox") {{ title }}
    .comment_box__content
      UserInfo(
          :author="'tanakataro'"
          :editors="null"
        )
      p.comment_box__comment {{ comment }}
</template>

<script>
export default {
  components: {
    UserInfo: () => import('~/components/atoms/mapInfo/UserInfo')
  },
  props: ['title', 'comment', 'user', 'lat', 'lng', 'onBox'],
  methods: {
    focusComment() {
      if (this.onBox) return
      this.$store.dispatch('ymap/panTo', {lat: this.lat, lng: this.lng})
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.comment_box {

  &__button {
    width: 100%;
    padding: 6px 8px;
    background: $back-light-gray;
    border: 2px solid transparent;
    text-align: left;
    color: $text-main;
    &:focus {
      outline: none;
      border: 2px solid $gray;
    }
  }

  &__content {
    background: $white;
    margin-bottom: 10px;
    padding: 8px;
    padding-top: 4px;
  }
}
</style>
