<template lang="pug">
    g(@dblclick.stop="select")
        path(:d="direction" stroke="red" fill="none" stroke-width="3" v-if="points.length")
        g(v-if="selected")
            plot-circle(v-for="(point, index) in attr.points" :key="index" :stroke="'red'" :index="index"
                :id="id" :attr="point" :selected="selected")
            plot-circle(v-if="plotting" :stroke="'red'" :now-plotted="true"
                :id="id" :attr="attr"  :selected="selected")
</template>

<script>
import Shared from './Shared.vue'

export default {
    components: {
        PlotCircle: () => import('./PlotCircle')
    },
    data() {
        return {
            type: 'direction',
        }
    },
    computed: {
        points() {
            return this.attr.points
        },
        direction() {
            return 'M ' + this.attr.points.map((point) => point.x + ' ' + point.y).join(' L ')
        }
    },
    mixins: [Shared]
}
</script>
