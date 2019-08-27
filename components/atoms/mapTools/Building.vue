<template lang="pug">
    g
        polygon.map_edit__map__building(:points="points" v-if="attr.points.length" @dblclick.stop="select")
        g(v-if="selected")
            plot-circle(v-for="(point, index) in attr.points" :key="index" :index="index"
                :id="id" :attr="point" :selected="selected" :layer-active="layerActive")
            plot-circle(v-if="plotting" :now-plotted="true"
                :id="id" :attr="attr"  :selected="selected" :layer-active="layerActive")
</template>

<script>
import Shared from './Shared.vue'

export default {
    components: {
        PlotCircle: () => import('./PlotCircle')
    },
    data() {
        return {
            type: 'building'
        }
    },
    computed: {
        points() {
            return this.attr.points.map((point) => point.x + ',' + point.y).join(' ')
        }
    },
    mixins: [Shared]
}
</script>

<style lang="scss">
.map_edit__map__building {
    fill: none;
    cursor: pointer;
    stroke-width: 3;
    stroke: red;
}
</style>
