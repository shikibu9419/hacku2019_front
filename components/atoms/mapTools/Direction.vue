<template lang="pug">
  g
    path.map_edit__map__direction(:d="direction" v-if="attr.points.length" :class="{active__layer_on: layerActive}"
        @mousedown.stop="grab" @mouseup="replotAll" @dblclick.stop="select")
    g(v-if="selected && !grabbing")
      plot-point(v-for="(point, index) in attr.points" :key="index" :index="index"
        :id="id" :attr="point" :selected="selected" :layer-active="layerActive")
      plot-point(v-if="plotting" :now-plotted="true"
        :id="id" :attr="attr"  :selected="selected" :layer-active="layerActive")
</template>

<script>
import Shared from './Shared.vue'

export default {
  components: {
    PlotPoint: () => import('./PlotPoint')
  },
  data() {
    return {
      type: 'direction',
      prev: {},
      diff: {}
    }
  },
  mounted() {
    this.prev = this.$store.state.mapEdit.mousePosition
    this.diff = {x: 0, y: 0}
  },
  computed: {
    direction() {
      this.$store.state.ymap.center // To observe map scrolling

      if (!this.selected)
        return 'M ' + this.attr.points.map(point => {
          var pixel = self.$store.getters['ymap/latLngToPixel'](point)
          return pixel.x + ' ' + pixel.y
        }).join(' L ')

      if (!this.$store.state.mapEdit.grabbing)
        this.diff = {x: 0, y: 0}

      // now - prev + diff-sum
      const dx = this.$store.state.mapEdit.mousePosition.x - this.prev.x + this.diff.x
      const dy = this.$store.state.mapEdit.mousePosition.y - this.prev.y + this.diff.y
      this.prev = this.$store.state.mapEdit.mousePosition
      this.diff = {x: dx, y: dy}

      self = this
      return 'M ' + this.attr.points.map(function(point) {
        var pixel = self.$store.getters['ymap/latLngToPixel'](point)
        if (self.$store.state.mapEdit.grabbing && self.selected)
          pixel = {x: pixel.x + dx, y: pixel.y + dy}
        return pixel.x + ' ' + pixel.y
      }).join(' L ')
    }
  },
  methods: {
    replotAll() {
      if (!this.selected) return

      const now = {
        x: this.prev.x + this.diff.x,
        y: this.prev.y + this.diff.y
      }

      this.$store.dispatch('mapEdit/replotAll', {
        prev: this.$store.getters['ymap/pixelToLatLng'](this.prev),
        now: this.$store.getters['ymap/pixelToLatLng'](now),
        toolId: this.id
      })
    }
  },
  mixins: [Shared]
}
</script>

<style lang="scss">
.map_edit__map__direction {
  fill-opacity: 0;
  cursor: pointer;
  stroke-width: 3;
  stroke: red;
}
</style>
