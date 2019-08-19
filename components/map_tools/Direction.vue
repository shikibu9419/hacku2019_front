<template lang="pug">
    g(@dblclick.stop="select")
        path(:d="direction" stroke="red" fill="none" stroke-width="3" v-if="points.length")
        g(v-if="selected")
            plot-circle(v-for="(point, index) in points" :key="index"
                :id="id" :attr="point" :stroke="'red'" :index="index")
            plot-circle(v-if="plotting"
                :id="id" :attr="null"  :stroke="'red'" :now-plotted="true")
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
        plotting() {
            return this.$store.state.plotting
        },
        direction() {
            return 'M ' + this.attr.points.map((point) => point.x + ' ' + point.y).join(' L ')
        }
    },
    mixins: [BaseTool]
}
</script>
