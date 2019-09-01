<template lang="pug">
  foreignObject.map_edit_tools__pin_popup(v-bind="position" @mousedown.stop="popup")
</template>

<script>
export default {
  name: "PinPopup.vue",
  props: ['position'],
  methods: {
    popup() {
      this.$emit('popup')
    }
  },
  computed: {
  }
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
