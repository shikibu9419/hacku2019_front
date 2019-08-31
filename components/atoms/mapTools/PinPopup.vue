<template lang="pug">
  rect.map_edit_tools__pin_popup(
    v-bind="attr"
  )
</template>

<script>
export default {
    name: "PinPopup.vue",
    props: ['attr']
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit_tools__pin_popup {
  height: 100px;
  width: 100px;
  background-color: black;
}
</style>
