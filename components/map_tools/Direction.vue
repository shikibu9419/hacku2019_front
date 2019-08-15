<template lang="pug">
    g(@dblclick.stop="select")
        path(:d="direction" stroke="red" fill="none" stroke-width="3" v-if="points.length")
        g(v-if="selected")
            plot-circle(v-for="(point, index) in points" :key="index" :id="id" :attr="point" :stroke="'red'")
            plot-circle(v-if="nowPlotting" :id="id" :attr="attr" :stroke="'red'")
</template>

<script>
import BaseTool from './BaseTool.vue'
import PlotCircle from './PlotCircle.vue'

export default {
    components: {
        PlotCircle
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
        nowPlotting() {
            return this.$store.state.plotting
        },
        direction() {
            return 'M ' + this.attr.points.map((point) => point.x + ' ' + point.y).join(' L ')
        }
    },
    mixins: [BaseTool]
}
</script>
