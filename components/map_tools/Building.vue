<template lang="pug">
    g(@dblclick.stop="select")
        polygon.tool(:points="points" stroke-width="3" stroke="red" v-if="attr.points.length")
        g(v-if="selected")
            plot-circle(v-for="(point, index) in attr.points" :key="index"
                :id="id" :attr="point" :stroke="'red'" :index="index")
            plot-circle(v-if="plotting"
                :id="id" :attr="attr"  :stroke="'red'" :now-plotted="true")
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
            type: 'building',
        }
    },
    computed: {
        plotting() {
            return this.$store.state.mapEdit.plotting
        },
        points() {
            return this.attr.points.map((point) => point.x + ',' + point.y).join(' ')
        },
    },
    mixins: [BaseTool]
}
</script>
