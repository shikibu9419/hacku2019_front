<template lang="pug">
  g.map_edit_tools__pin(@dblclick.stop="select" @mousedown.stop="grab" :class="{selected__tool_on: selected, grab__tool_on: grabbing}")
    image.map_edit_tools__pin_icon(
      v-bind="attributes"
      xlink:href="~/assets/svgs/comment_pin.svg"
    )
    pin-popup(:attr="popupAttr" v-if="selected")
</template>

<script>
import Shared from './Shared'

export default {
  data() {
    return {
    }
  },
  computed: {
    attributes() {
      this.$store.state.ymap.center // To observe map scrolling

      const attr = Object.assign({}, this.attr, this.$store.getters['ymap/latLngToPixel'](this.attr))
      delete attr.lat
      delete attr.lng

      return attr
    },
    popupAttr() {
      return {
        x: this.attributes.x - 50, y: this.attributes.y - 120
      }
    },
    pinIcon() {
      const dir = '~/assets/svgs/'
      return dir + 'comment_pin.svg'
    }
  },
  components: {
    PinPopup: () => import('./PinPopup')
  },
  mixins: [Shared],
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit_tools__pin {
  cursor: grab;

  &.grab__tool_on {
    cursor: grabbing;
  }

  &_icon {
    height: 40px;
  }
}
</style>
