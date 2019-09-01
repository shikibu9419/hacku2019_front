<template lang="pug">
  g.map_edit__toolbar(:transform="`translate(${this.center.x - 340 / 2},10)`")
    rect.map_edit__toolbar__background
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
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'building'})
      this.$store.dispatch('mapEdit/togglePlotting')
    },
    addBuildingBasic() {
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'building_basic'})
      this.$store.dispatch('mapEdit/toggleGrabbing')
    },
    addDirection() {
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'direction'})
      this.$store.dispatch('mapEdit/togglePlotting')
    },
    addPin() {
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'pin'})
      this.$store.dispatch('mapEdit/toggleGrabbing')
    },
    addText() {
      alert('Text is not implemented yet!')
    },
    addBox() {
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'box'})
      this.$store.dispatch('mapEdit/toggleGrabbing')
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

$toolbar-height: 50px;
$toolbar-width:  340px;
$icon-size:      30px;

.map_edit__toolbar {
  width: min-content;
  height: min-content;
  cursor: pointer;

  &__background {
    fill: $back-gray;
    height: $toolbar-height;
    width: $toolbar-width;
    rx: 10px;
    ry: 10px;
  }

  &__icon {
    y: calc(calc(#{$toolbar-height} - #{$icon-size}) / 2);
    width: $icon-size;
    height: $icon-size;
  }
}
</style>
