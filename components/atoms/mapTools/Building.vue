<template lang="pug">
  g
    polygon.map_edit__tools.building(:points="points" v-if="attr.points.length" :class="{active__layer_on: layerActive, grab__tool_on: grabbing}"
        @mousedown.stop="grab" @mouseup="replotAll")
    g(v-if="selected && !grabbing")
      plot-point(v-for="(point, index) in attr.points" :key="index" :index="index"
        :id="id" :attr="point" :selected="selected" :layer-active="layerActive")
      plot-point(v-if="plotting" :now-plotted="true"
        :id="id" :attr="attr"  :selected="selected" :layer-active="layerActive")
</template>

<script>
import Shared from './Shared.vue';

export default {
  components: {
    PlotPoint: () => import('./PlotPoint'),
  },
  mixins: [Shared],
  data() {
    return {
      prev: {},
      diff: {},
    };
  },
  computed: {
    points() {
      this.$store.state.ymap.now; // To observe map scrolling

      const prev = Object.assign({}, this.prev);
      this.prev = this.$store.state.mapEdit.mousePosition;

      // 選択してなかったらpointsをxy座標に変換して返す
      if (!this.selected)
        return this.attr.points
          .map(point => {
            var pixel = self.$store.getters['ymap/latLngToPixel'](point);
            return pixel.x + ',' + pixel.y;
          })
          .join(' ');

      // 掴んでないときはdiffをリセット
      if (!this.$store.state.mapEdit.grabbing) this.diff = { x: 0, y: 0 };

      // diff = now - prev + diff
      const dx =
        this.$store.state.mapEdit.mousePosition.x - prev.x + this.diff.x;
      const dy =
        this.$store.state.mapEdit.mousePosition.y - prev.y + this.diff.y;
      this.diff = { x: dx, y: dy };

      self = this;
      return this.attr.points
        .map(function(point) {
          var pixel = self.$store.getters['ymap/latLngToPixel'](point);

          // このツールを掴んでいるときはdiff分を補正してpointsを返す
          if (self.$store.state.mapEdit.grabbing && self.selected)
            pixel = { x: pixel.x + dx, y: pixel.y + dy };

          return pixel.x + ',' + pixel.y;
        })
        .join(' ');
    },
  },
  mounted() {
    this.prev = this.$store.state.mapEdit.mousePosition;
    this.diff = { x: 0, y: 0 };
  },
  methods: {
    replotAll() {
      if (!this.selected) return;

      // prevとdiffからnowを算出
      const now = {
        x: this.prev.x + this.diff.x,
        y: this.prev.y + this.diff.y,
      };

      // 全pointsにdiffを適用
      this.$store.dispatch('mapEdit/replotAll', {
        prev: this.$store.getters['ymap/pixelToLatLng'](this.prev),
        now: this.$store.getters['ymap/pixelToLatLng'](now),
        toolId: this.id,
      });
    },
  },
};
</script>

<style lang="scss">
.map_edit__tools.building {
  fill-opacity: 0;
  cursor: grab;
  stroke-width: 3;
  stroke: red;

  &.grab__tool_on {
    cursor: grabbing;
  }
}
</style>
