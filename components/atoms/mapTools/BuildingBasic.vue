<template lang="pug">
  g
    rect.map_edit__tools.box(
        v-bind="attributes"
        @dblclick.stop="select"
        @mousedown.stop="grab"
        :class="{selected__tool_on: selected, grab__tool_on: grabbing}"
    )
    circle.map_edit__tools.box.resize(
      :cx="attributes.x + attributes.width"
      :cy="attributes.y + attributes.height"
    )
</template>

<script>
import Shared from './Shared.vue'

export default {
  data() {
    return {
      type: 'building_basic',
    }
  },
  computed: {
    attributes() {
      this.$store.state.ymap.center // To observe map scrolling

      const position = this.$store.getters['ymap/latLngToPixel'](this.attr)
      const attr = Object.assign({}, this.attr)
      delete attr.lat
      delete attr.lng
      return {...attr, ...position}
    }
  },
  mixins: [Shared]
}
</script>

<style lang="scss">
.map_edit__tools.box {
  fill-opacity: 0;
  stroke-width: 2;
  stroke: #000;  // unselected color
  cursor: grab;

  &.selected__tool_on {
    stroke: #42b983;  // selected color
  }

  &.grab__tool_on {
    cursor: grabbing;
  }

  &.resize {
    fill-opacity: 0;
    r: 3;
    cursor: nwse-resize;
  }
}
</style>
