<template lang="pug">
  g
    rect.map_edit__tools.box(
      v-bind="attributes"
      @dblclick.stop="select"
      @mousedown.stop="grab"
      :class="{selected__tool_on: selected, grab__tool_on: grabbing}"
    )
    circle.map_edit__tools.box.resizepoint(
      v-if="selected"
      v-bind="pointPosition"
      @mousedown.stop="grabPoint"
      @mouseup.stop="releasePoint"
    )
</template>

<script>
import Shared from './Shared.vue'

export default {
  data() {
    return {
      pointGrabbed: false,
      width: 0,
      height: 0
    }
  },
  mounted() {
    this.width = this.attr.width
    this.height = this.attr.height
  },
  computed: {
    attributes() {
      this.$store.state.ymap.now // To observe map scrolling

      const attr = Object.assign({}, this.attr, this.$store.getters['ymap/latLngToPixel'](this.attr))
      delete attr.lat
      delete attr.lng

      if (!this.selected || !this.pointGrabbed) return attr

      const mousePosition = this.$store.state.mapEdit.mousePosition
      this.width  = Math.max(mousePosition.x - attr.x, 0)
      this.height = Math.max(mousePosition.y - attr.y, 0)

      return {...attr, width: this.width, height: this.height}
    },
    pointPosition() {
      const position = this.$store.getters['ymap/latLngToPixel'](this.attr)
      return {
        cx: position.x + this.width,
        cy: position.y + this.height
      }
    },
  },
  methods: {
    grabPoint() {
      this.pointGrabbed = true
    },
    releasePoint() {
      this.$store.dispatch('mapEdit/resize', {
        toolId: this.id,
        width: this.width,
        height: this.height
      })
      this.pointGrabbed = false
    },
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

  &.resizepoint {
    fill-opacity: 0;
    stroke-opacity: 0;
    r: 3;
    cursor: nwse-resize;
  }
}
</style>
