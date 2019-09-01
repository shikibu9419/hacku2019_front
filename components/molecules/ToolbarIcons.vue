<template lang="pug">
  g.map_edit__toolbar(:transform="`translate(${this.center.x - 340 / 2},10)`")
    image.map_edit__toolbar__icon(:x="iconX(0)" @click="addBuilding" xlink:href="~assets/svgs/pen_tool.svg")
    image.map_edit__toolbar__icon(:x="iconX(1)" @mousedown.stop="addBuildingBasic" xlink:href="~assets/svgs/figure_tool.svg")
    image.map_edit__toolbar__icon(:x="iconX(2)" @click="addDirection" xlink:href="~assets/svgs/way_tool.svg")
    image.map_edit__toolbar__icon(:x="iconX(3)" @mousedown.stop="addPin" xlink:href="~assets/svgs/pin.svg")
    image.map_edit__toolbar__icon(:x="iconX(4)" @mousedown.stop="addText" xlink:href="~assets/svgs/text_tool.svg")
    image.map_edit__toolbar__icon(:x="iconX(5)" @mousedown.stop="addBox" xlink:href="~assets/svgs/text_box.svg")
</template>

<script>
export default {
  components: {
    AddBuilding: () => import('~/assets/svgs/pen_tool.svg?inline')
  },
  data() {
    return {
      center: this.$store.getters['ymap/latLngToPixel'](this.$store.state.ymap.center)
    }
  },
  methods: {
    addBuilding() {
      this.$store.dispatch('mapEdit/toggle', 'plotting')
      if (!this.$store.state.mapEdit.plotting) return

      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'building'})
    },
    addBuildingBasic() {
      this.$store.dispatch('mapEdit/toggle', 'grabbing')
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'building_basic'})
    },
    addDirection() {
      this.$store.dispatch('mapEdit/toggle', 'plotting')
      if (!this.$store.state.mapEdit.plotting) return

      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'direction'})
    },
    addPin() {
      this.$store.dispatch('mapEdit/toggle', 'grabbing')
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'pin'})
    },
    addText() {
      alert('Text is not implemented yet!')
    },
    addBox() {
      this.$store.dispatch('mapEdit/toggle', 'grabbing')
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'box'})
    },
    getLatLng() {
      return this.$store.getters['ymap/pixelToLatLng'](this.$store.state.mapEdit.mousePosition)
    }
  },
  computed: {
    iconX() {
      return function(index) {
        // icon + space + center-space
        return 30 * index + 20 * (index + 1) + (index > 2 ? 20 : 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit__toolbar {
  width: min-content;
  height: min-content;
  cursor: pointer;

  &__icon {
    y: calc(calc(#{$toolbar-height} - #{$toolbar-icon-size}) / 2);
    width: $toolbar-icon-size;
    height: $toolbar-icon-size;
  }
}
</style>
