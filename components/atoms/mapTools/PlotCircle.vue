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
import Shared from './Shared.vue'

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
            if (this.plotting) {
                this.$store.dispatch('mapEdit/plot', {
                    ...this.$store.state.mapEdit.mousePosition,
                    toolId: this.id
                })
            }
        },
        stopPlot() {
            if (this.plotting)
                this.$store.dispatch('mapEdit/togglePlotting')
        },
        grabCircle() {
            if (! this.plotting)
                this.grabbed = true
        },
        releaseCircle() {
            if (! this.plotting) {
                this.$store.dispatch('mapEdit/replot', {
                    ...this.$store.state.mapEdit.mousePosition,
                    toolId: this.id,
                    index: this.index
                })
                this.grabbed = false
            }
        },
    },
    computed: {
        x() {
            return (this.grabbed || this.nowPlotted) ? this.$store.state.mapEdit.mousePosition.x : this.attr.x
        },
        y() {
            return (this.grabbed || this.nowPlotted) ? this.$store.state.mapEdit.mousePosition.y : this.attr.y
        }
    },
    mixins: [Shared]
}
</script>
