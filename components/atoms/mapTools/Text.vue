<template lang="pug">
  g.map_edit__tools.text(:class="{grab__tool_on: grabbing}" ref="text")
    foreignObject.map_edit_tools__content(v-bind="attributes" @mousedown.stop="grab")
      AutosizeTextarea.map_edit__tools.text.input(v-bind:text.async="text" v-bind:maxSize="maxSize" v-bind:defaultSize="defaultSize" v-bind:class="{ selected: selected }")
    circle.map_edit__tools.box.resizepoint(
    v-if="selected"
    v-bind="pointPosition"
    @mousedown.stop="grabPoint"
    @mouseup.stop="releasePoint"
    )
</template>

<script>
  import ModalSvc from '~/services/ModalSvc'
  import Shared from './Shared'
  import AutosizeTextarea from '~/components/atoms/AutosizeTextarea'

  export default {
    data() {
      return {
        init: true,
        pointGrabbed: false,
        width: 0,
        height: 0,
        text: '',
        maxSize: 10,
        defaultSize: 2
      }
    },
    mounted() {
      this.width = 100
    },
    watch: {
      grabbing() {
        if(!this.init) return
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
      rows() {
        return Math.max(Math.min(Math.max(this.text.split('\n').length, Math.ceil(this.text.length/20)), this.maxSize), this.defaultSize)
      }
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
    mixins: [ Shared, ModalSvc ],
    components: {
      AutosizeTextarea
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/variables.scss";

  .map_edit__tools{
    .text {
      cursor: grab;
      &.input {
        width: 160px;
        background: transparent;
        border: none;
        white-space: normal;
        &.selected {
          border: dashed 1px;
        }
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
  }
  .map_edit_tools__content {
    overflow: visible;
    width: 160px;
    height: 100px;
  }
</style>
