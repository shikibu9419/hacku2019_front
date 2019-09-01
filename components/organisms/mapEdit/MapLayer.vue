<template lang="pug">
  .map_edit__map__layer(v-if="visible")
    svg.map_edit__map__svg(@mousemove="moveOrScroll" @mousedown="grabMap" @mouseup="resetGrabbing" @click.right="resetEditting")
      rect.map_edit__map__svg_filter(v-if="isActive")
      tool(v-for="[id, attr] in unSelectingTools" :key="attr.id" :id="id" :attr="attr" :selected="false" :layer-active="isActive")
      rect.map_edit__toolbar__background(:transform="`translate(${this.center.x - 340 / 2},10)`")
      tool(v-for="[id, attr] in selectingTools" :key="attr.id" :id="id" :attr="attr" :selected="true" :layer-active="isActive")
      toolbar-icons(v-if="isActive")
</template>

<script>
export default {
  components: {
    Tool: () => import('~/components/atoms/mapTools/ToolWrapper'),
    ToolbarIcons: () => import('~/components/molecules/ToolbarIcons'),
  },
  props: ['id', 'name', 'color', 'visible', 'tools'],
  data() {
    return {
      center: this.$store.getters['ymap/latLngToPixel'](this.$store.state.ymap.now)
    }
  },
  methods: {
    moveOrScroll(e) {
      const prev = this.$store.state.mapEdit.mousePosition
      const now = {
        x: e.clientX - this.$store.state.mapEdit.offset.x,
        y: e.clientY - this.$store.state.mapEdit.offset.y - 80 // header-height
      }
      const prop = {
        prev: this.$store.getters['ymap/pixelToLatLng'](prev),
        now: this.$store.getters['ymap/pixelToLatLng'](now)
      }

      if (this.$store.state.mapEdit.grabbing || this.$store.state.mapEdit.mapGrabbing || this.$store.state.mapEdit.plotting) {
        if (this.$store.state.mapEdit.mapGrabbing)
          this.$store.dispatch('ymap/scroll', prop)
        else
          this.$store.dispatch('mapEdit/moveTools', prop)
      }

      this.$store.dispatch('mapEdit/setMousePosition', now)
    },
    grabMap() {
      this.$store.dispatch('mapEdit/toggle', 'mapGrabbing')
      this.$store.dispatch('mapEdit/clearSelection')
    },
    resetGrabbing() {
      if(this.$store.state.mapEdit.grabbing)
        this.$store.dispatch('mapEdit/toggle', 'grabbing')
      if(this.$store.state.mapEdit.mapGrabbing)
        this.$store.dispatch('mapEdit/toggle', 'mapGrabbing')
    },
    resetEditting() {
      if (this.$store.state.mapEdit.plotting)
        this.$store.dispatch('mapEdit/toggle', 'plotting')
      this.resetGrabbing()
    },
  },
  computed: {
    unSelectingTools() {
      const toolIds = Object.keys(this.$store.getters['mapEdit/selecting'])
      return Object.entries(this.tools).filter(item => !toolIds.includes(item[0]))
    },
    selectingTools() {
      const toolIds = Object.keys(this.$store.getters['mapEdit/selecting'])
      return Object.entries(this.tools).filter(item => toolIds.includes(item[0]))
    },
    isActive() {
      return this.id === this.$store.state.mapEdit.activeLayer.id
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit__map__layer {
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
  width: 100%;
  height: 100%;
}

.map_edit__map__svg {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: move;

  &_filter {
    fill: white;
    fill-opacity: 0.4;
    width: 10000px;
    height: 10000px;
  }
}

.map_edit__toolbar__background {
  cursor: pointer;
  fill: $back-gray;
  height: $toolbar-height;
  width: $toolbar-width;
  rx: 10px;
  ry: 10px;
}
</style>
