<template lang="pug">
    .custom-button(@click="handler")
        slot
</template>

<script>
export default {
  name: 'CustomButtonVue',
  props: {
    handler: Function,
  },
};
</script>

<style lang="scss" scoped>
.custom-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 28px;
  width: 96px;
  margin: 4px;
  &:hover {
    filter: brightness(0.7);
  }
}
</style>
