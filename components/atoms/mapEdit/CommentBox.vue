<template lang="pug">
  .comment_box(:class="{in_popup: inPopup}")
    .comment_box__button(@click.stop="focusComment()" v-if="!onBox" :class="{in_popup: inPopup}") {{ title }}
    .comment_box__content(:class="{in_popup: inPopup}")
      UserInfo(
        :author="user.name"
        :editors="null"
      )
      p.comment_box__comment {{ comment }}
</template>

<script>
export default {
  components: {
    UserInfo: () => import('~/components/atoms/mapInfo/UserInfo')
  },
  props: ['toolId', 'title', 'comment', 'user', 'lat', 'lng', 'onBox', 'inPopup'],
  methods: {
    focusComment() {
      if (this.onBox) return
      this.$store.dispatch('ymap/panTo', {lat: this.lat, lng: this.lng})
      this.$store.dispatch('mapEdit/selectTool', {toolId: this.toolId})
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.comment_box {
  bottom: 0px;
  width: 100%;

  &.in_popup {
    position: absolute;
  }

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

    &.in_popup {
      border: 2px;
      border-style: solid solid none;
    }
  }

  &__content {
    background: $white;
    margin-bottom: 10px;
    padding: 8px;
    padding-top: 4px;

    &.in_popup {
      border: 2px solid;
    }
  }
}
</style>
