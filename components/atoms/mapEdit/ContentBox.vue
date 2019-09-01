<template lang="pug">
  .content_box
    .content_box__label(v-if="! onBox") {{ title }}
    .content_box__content(v-if="content.type === 'text'")
      p.content_box__text {{ content.text }}
    .content_box__content(v-else-if="content.type === 'link'")
      p.content_box__text {{ content.link }}
    .content_box__content(v-else-if="content.type === 'image'")
      p.content_box__text {{ content.urls }}
    .content_box__content(v-else)
</template>

<script>
export default {
  props: ['title', 'content', 'onBox'],
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

$label-min-height: 20px;

.content_box {
  &__label {
    min-height: $label-min-height;
    background: $light-gray;
    border: 2px $gray;
    border-style: solid solid none;
  }

  &__content {
    width: 100%;
    height: 100%;
    min-height: $label-min-height * 2;
    background: $white;
    margin-bottom: 10px;
    border: 2px solid $gray;
  }
}
</style>
