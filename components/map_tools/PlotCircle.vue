<template lang="pug">
    circle.plot(
        v-bind="attr"
        :cx="attr.x" :cy="attr.y"
        :stroke="stroke"
        @click.left="plot"
        @click.right="stopPlot"
        @mousedown.stop="nop"
        r="5"
    )
</template>

<script>
import BaseTool from './BaseTool.vue'

export default {
    props: {
        stroke: {
            type: String,
            default: 'black'
        }
    },
    methods: {
        plot() {
            const prop = {...this.attr, tool_id: this.id}
            if(this.$store.state.plotting)
                this.$store.dispatch('board/plot', prop)
//             else
//                 circleを動かす処理
        },
        stopPlot() {
            this.$store.dispatch('togglePlotting')
        },
        nop() {}
    },
    mixins: [BaseTool]
}
</script>
