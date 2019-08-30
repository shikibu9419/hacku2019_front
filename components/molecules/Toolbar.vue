<template lang="pug">
  g.map_edit__toolbar(:transform="`translate(${this.center.x - 340 / 2},10)`")
    rect.map_edit__toolbar__background
    image.map_edit__toolbar__icon(:x="iconX(0)" @click="addBuilding" xlink:href="~assets/svgs/pen_tool.svg")
    image.map_edit__toolbar__icon(:x="iconX(1)" @mousedown.stop="addBuildingBasic" xlink:href="~assets/svgs/figure_tool.svg")
    image.map_edit__toolbar__icon(:x="iconX(2)" @click="addDirection" xlink:href="~assets/svgs/way_tool.svg")
    image.map_edit__toolbar__icon(:x="iconX(3)" @click="addPin" xlink:href="~assets/svgs/pin.svg")
    image.map_edit__toolbar__icon(:x="iconX(4)" @click="addText" xlink:href="~assets/svgs/text_tool.svg")
    image.map_edit__toolbar__icon(:x="iconX(5)" @click="addTextBox" xlink:href="~assets/svgs/text_box.svg")
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
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'building', points: []})
      this.$store.dispatch('mapEdit/togglePlotting')
    },
    addBuildingBasic() {
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'building_basic', width: 100, height: 100})
      this.$store.dispatch('mapEdit/toggleGrabbing')
    },
    addDirection() {
      this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'direction', points: []})
      this.$store.dispatch('mapEdit/togglePlotting')
    },
    addPin() {
      alert('Pin is not implemented yet!')
    },
    addText() {
      alert('Text is not implemented yet!')
    },
    addTextBox() {
      alert('TextBox is not implemented yet!')
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
