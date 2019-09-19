<template lang="pug">
  .content_box(:class="{in_popup: inPopup}")
    .content_box__label(v-if="! onBox" :class="{in_popup: inPopup}") {{ title }}
    .content_box__content(v-if="content.type === 'text'" :class="{in_popup: inPopup}")
      p.content_box__text {{ content.text }}
    .content_box__content(v-else-if="content.type === 'link'" :class="{in_popup: inPopup}")
      p.content_box__text {{ content.link }}
    .content_box__content(v-else-if="content.type === 'image'" :class="{in_popup: inPopup}")
      p.content_box__text {{ content.urls }}
    .content_box__content(v-else :class="{in_popup: inPopup}")
</template>

<script>
export default {
  props: ['title', 'content', 'onBox', 'inPopup'],
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';

$label-min-height: 20px;

.content_box {
  bottom: 0px;
  width: 100%;

  &.in_popup {
    position: absolute;
  }

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
