<template lang="pug">
    g(@dblclick.stop="select")
        path.map_edit__map__direction(:d="direction" v-if="attr.points.length" :class="{active__layer_on: layerActive}")
        g(v-if="selected")
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
        }
    },
    computed: {
        direction() {
            self = this
            return 'M ' + this.attr.points.map(function(point) {
                const p = self.$store.getters['ymap/latLngToPixel'](point)
                return p.x + ' ' + p.y
            }).join(' L ')
        }
    },
    mixins: [Shared]
}
</script>

<style lang="scss">
.map_edit__map__direction {
    fill: none;
    cursor: pointer;
    stroke-width: 3;
    stroke: red;
}
</style>
