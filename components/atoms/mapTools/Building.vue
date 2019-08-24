<template lang="pug">
    g(@dblclick.stop="select")
        polygon.tool(:points="points" stroke-width="3" stroke="red" v-if="attr.points.length")
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
