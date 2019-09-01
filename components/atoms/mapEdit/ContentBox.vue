<template lang="pug">
  .content_box(@click.stop="focusComment()")
    .content_box__label(v-if="! onBox") {{ title }}
    .content_box__content(v-if="content.type === 'text'")
      p.content_box__text {{ content.text }}
    .content_box__content(v-else-if="content.type === 'link'")
      p.content_box__text {{ content.link }}
    .content_box__content(v-else-if="content.type === 'image'")
      p.content_box__text {{ content.urls }}
</template>

<script>
export default {
  props: ['title', 'content', 'onBox'],
  methods: {
    focusComment() {
      this.focused = true
      this.$store.dispatch('ymap/panTo', {lat: this.lat, lng: this.lng})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.content_box {
  max-height: 10px;

  &__label {
    background: $light-gray;
    border: 2px $gray;
    border-style: solid solid none;
  }

  &__content {
    background: $white;
    margin-bottom: 10px;
    border: 2px solid $gray;
  }
}
</style>
