<template lang="pug">
    circle.tool(
        v-bind="attr"
        :cx="attr.x" :cy="attr.y" r="5"
        @click.left="plot"
        @click.right="stopPlot"
        @mousedown.stop="nop"
        stroke="red"
        fill="white"
    )
</template>

<script>
import BaseTool from './BaseTool.vue'

export default {
    methods: {
        plot() {
            const prop = {...this.attr, tool_id: this.id}
            if(this.$store.state.plotting)
                this.$store.dispatch('board/plot', prop)
//             else
//                 this.$store.dispatch('toggleGrabbing')
        },
        stopPlot() {
            this.$store.dispatch('togglePlotting')
        },
        nop() {}
    },
    mixins: [BaseTool]
}
</script>
