<template lang="pug">
  circle.map_edit__tools.plotpoint(
    v-bind="attributes"
    @click.left="plot"
    @mousedown.stop="grabPoint"
    @mouseup.stop="releasePoint"
    :class="{active__layer_on: layerActive, grab__tool_on: grabbed}"
  )
</template>

<script>
import Shared from './Shared.vue';

export default {
  mixins: [Shared],
  props: {
    index: {
      type: Number,
    },
    nowPlotted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      grabbed: false,
    };
  },
  computed: {
    attributes() {
      this.$store.state.ymap.center; // To observe map scrolling

      const position =
        this.grabbed || this.nowPlotted
          ? this.$store.state.mapEdit.mousePosition
          : this.$store.getters['ymap/latLngToPixel'](this.attr);

      const attr = Object.assign({}, this.attr, {
        cx: position.x,
        cy: position.y,
      });
      delete attr.lat;
      delete attr.lng;

      return attr;
    },
  },
  methods: {
    plot() {
      if (this.$store.state.mapEdit.plotting) {
        this.$store.dispatch('mapEdit/plot', {
          point: this.$store.getters['ymap/pixelToLatLng'](
            this.$store.state.mapEdit.mousePosition
          ),
          toolId: this.id,
        });
      }
    },
    grabPoint() {
      if (!this.$store.state.mapEdit.plotting) this.grabbed = true;
    },
    releasePoint() {
      if (!this.$store.state.mapEdit.plotting) {
        this.$store.dispatch('mapEdit/replot', {
          point: this.$store.getters['ymap/pixelToLatLng'](
            this.$store.state.mapEdit.mousePosition
          ),
          toolId: this.id,
          index: this.index,
        });
        this.grabbed = false;
      }
    },
  },
};
</script>

<style lang="scss">
.map_edit__tools.plotpoint {
  fill: white;
  stroke: red;
  stroke-width: 2;
  r: 5;
  cursor: grab;

  &.grab__tool_on {
    cursor: grabbing;
  }
}
</style>
