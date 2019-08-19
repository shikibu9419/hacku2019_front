<template lang="pug">
    circle.plot(
        v-bind="attr"
        :cx="x" :cy="y"
        :stroke="stroke"
        @click.left="plot"
        @click.right="stopPlot"
        @mousedown.stop="grabCircle"
        @mouseup.stop="releaseCircle"
        r="5"
    )
</template>

<script>
import BaseTool from './BaseTool.vue'

export default {
    data() {
        return {
            grabbed: false
        }
    },
    props: {
        stroke: {
            type: String,
            default: 'black'
        },
        index: {
            type: Number
        },
        nowPlotted: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        plot() {
            if (this.$store.state.plotting) {
                this.$store.dispatch('board/plot', {
                    ...this.$store.state.mousePosition,
                    tool_id: this.id
                })
            }
        },
        stopPlot() {
            if (this.$store.state.plotting)
                this.$store.dispatch('togglePlotting')
        },
        grabCircle() {
            if (! this.$store.state.plotting)
                this.grabbed = true
        },
        releaseCircle() {
            if (! this.$store.state.plotting) {
                this.$store.dispatch('board/replot', {
                    ...this.$store.state.mousePosition,
                    tool_id: this.id,
                    index: this.index
                })
                this.grabbed = false
            }
        },
    },
    computed: {
        x() {
            return (this.grabbed || this.nowPlotted) ? this.$store.state.mousePosition.x : this.attr.x
        },
        y() {
            return (this.grabbed || this.nowPlotted) ? this.$store.state.mousePosition.y : this.attr.y
        }
    },
    mixins: [BaseTool]
}
</script>
