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
    pin-popup(v-if="selected && !grabbing" @popup="popup()" v-bind="pinPopupAttr")
</template>

<script>
import ModalSvc from '~/services/ModalSvc'
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
      this.openPopup('BoxAndPinPopup', {attr: this.attr}, null)
    }
  },
  computed: {
    attributes() {
      this.$store.state.ymap.now // To observe map scrolling

      const attr = Object.assign({}, this.attr, this.$store.getters['ymap/latLngToPixel'](this.attr))
      delete attr.lat
      delete attr.lng

      return attr
    },
    typeIs() {
      return function(type) {
        if (type === 'comment') return this.attr.comments.length
        const contentTypes = this.attr.contents.map(content => content.type)
        return contentTypes.includes(type)
      }
    },
    pinPopupAttr() {
      const position = this.attributes

      var content = {}
      content = this.attr.contents.filter(content => content.type === 'link')[0]  || content
      content = this.attr.contents.filter(content => content.type === 'text')[0]  || content
      content = this.attr.contents.filter(content => content.type === 'image')[0] || content

      return {
        id: this.id,
        position: {
          x: position.x - 60,
          y: position.y - 220
        },
        title: this.attr.title,
        content: content,
        comments: this.attr.comments
      }
    },
    mounted() {
      console.log(this.$refs)
    }
  },
  components: {
    PinPopup: () => import('./PinPopup'),
    // 使ってない
    NormalPin: () => import('~/assets/svgs/pin.svg?inline'),
    ImagePin: () => import('~/assets/svgs/image_pin.svg?inline'),
    TextPin: () => import('~/assets/svgs/text_pin.svg?inline'),
    CommentPin: () => import('~/assets/svgs/comment_pin.svg?inline'),
    LinkPin: () => import('~/assets/svgs/link_pin.svg?inline'),
  },
  mixins: [ Shared, ModalSvc ],
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
