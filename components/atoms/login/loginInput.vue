<template lang="pug">
.topInput
  input.input(:placeholder="placeholder" :type="type" :name="name"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)")
</template>
<script>
export default {
  props: ['value', 'placeholder', 'type', 'name'],
  methods: {
    update() {},
  },
};
</script>
<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';

.input {
  display: block;
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-bottom: 1px solid $black;
  @include noto-font(1.5rem, $text-black);
  transition: 0.2s $bezier-ease-out;
  &:focus {
    outline: none;
    border-bottom: 1px solid $theme-pink;
    color: $theme-pink;
  }
}
</style>
