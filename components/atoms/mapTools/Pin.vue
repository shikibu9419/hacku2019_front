<template lang="pug">
  g.map_edit_tools__pin(@dblclick.stop="select" @mousedown.stop="grab" :class="{selected__tool_on: selected, grab__tool_on: grabbing}")
    image.map_edit_tools__pin_icon(
      v-if="typeIs('image')"
      v-bind="attributes"
      xlink:href="~/assets/svgs/image_pin.svg"
    )
    image.map_edit_tools__pin_icon(
      v-else-if="typeIs('text')"
      v-bind="attributes"
      xlink:href="~/assets/svgs/text_pin.svg"
    )
    image.map_edit_tools__pin_icon(
      v-else-if="typeIs('comment')"
      v-bind="attributes"
      xlink:href="~/assets/svgs/comment_pin.svg"
    )
    image.map_edit_tools__pin_icon(
      v-else-if="typeIs('link')"
      v-bind="attributes"
      xlink:href="~/assets/svgs/link_pin.svg"
    )
    image.map_edit_tools__pin_icon(
      v-else
      v-bind="attributes"
      xlink:href="~/assets/svgs/pin.svg"
    )
    pin-popup(:position="pinPopupPosition" contents="attr.contents" v-if="selected && !grabbing" @popup="popup()")
</template>

<script>
import ModalService from '~/services/ModalSvc'
import Shared from './Shared'

export default {
  data() {
    return {
      init: true
    }
  },
  watch: {
    grabbing() {
      if(!this.init) return
      this.popup()
      this.init = false
    }
  },
  methods: {
    popup() {
      if(!this.selected || this.grabbing) return
      this.modalSvc.openPopup('BoxAndPinPopup', {attr: this.attr}, null)
    }
  },
  created() {
    this.modalSvc = new ModalService(this.$store)
  },
  computed: {
    attributes() {
      this.$store.state.ymap.now // To observe map scrolling

      const attr = Object.assign({}, this.attr, this.$store.getters['ymap/latLngToPixel'](this.attr))
      delete attr.lat
      delete attr.lng

      return attr
    },
    pinPopupPosition() {
      const position = this.$store.getters['ymap/latLngToPixel'](this.attr)
      return {
        x: position.x - 50,
        y: position.y - 120,
      }
    },
    typeIs() {
      return function(type) {
        const contentTypes = this.attr.contents.map(content => content.type)
        return contentTypes.includes(type)
      }
    }
  },
  components: {
    // 使ってない
    PinPopup: () => import('./PinPopup'),
    NormalPin: () => import('~/assets/svgs/pin.svg?inline'),
    ImagePin: () => import('~/assets/svgs/image_pin.svg?inline'),
    TextPin: () => import('~/assets/svgs/text_pin.svg?inline'),
    CommentPin: () => import('~/assets/svgs/comment_pin.svg?inline'),
    LinkPin: () => import('~/assets/svgs/link_pin.svg?inline'),
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
