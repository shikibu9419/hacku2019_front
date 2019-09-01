<template lang="pug">
  g.map_edit__tools.box(:class="{grab__tool_on: grabbing}" ref="box")
    foreignObject.map_edit_tools.box.content(@dblclick.stop="popup" v-bind="attributes" @mousedown.stop="grab")
      comment-box(v-if="attr.comments.length && !Object.keys(previewContent).length" :title="title" :comment="attr.comments[0].comment")
      content-box(v-else :title="attr.title" :content="previewContent")
    circle.map_edit__tools.box.resizepoint(
      v-if="selected"
      v-bind="pointPosition"
      @mousedown.stop="grabPoint"
      @mouseup.stop="releasePoint"
    )
</template>

<script>
import ModalService from '~/services/ModalSvc'
import Shared from './Shared'

export default {
  data() {
    return {
      init: true,
      pointGrabbed: false,
      width: 0,
      height: 0
    }
  },
  mounted() {
    this.modalSvc = new ModalService(this.$store)
    this.width = 100
  },
  watch: {
    grabbing() {
      if(!this.init) return
      this.popup()
      this.init = false
    }
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
      return {
        cx: this.attributes.x + this.width,
        cy: this.attributes.y + this.height
      }
    },
    typeIs() {
      return function(type) {
        if (type === 'comment') return this.attr.comments.length
        const contentTypes = this.attr.contents.map(content => content.type)
        return contentTypes.includes(type)
      }
    },
    previewContent() {
      var content = {}
      content = this.attr.contents.filter(content => content.type === 'link')[0]  || content
      content = this.attr.contents.filter(content => content.type === 'text')[0]  || content
      content = this.attr.contents.filter(content => content.type === 'image')[0] || content
      return content
    }
  },
  methods: {
    popup() {
      this.modalSvc.openPopup('BoxAndPinPopup', {attr: this.attr}, null)
      this.select()
    },
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
  components: {
    ContentBox: () => import('~/components/atoms/mapEdit/ContentBox'),
    CommentBox: () => import('~/components/atoms/mapEdit/CommentBox')
  },
  mixins: [Shared],
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit__tools.box {
  cursor: grab;

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
