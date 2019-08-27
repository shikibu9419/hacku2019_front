<template lang="pug">
    circle.map_edit__map__plotpoint(
        v-bind="attributes"
        @click.left="plot"
        @mousedown.stop="grabPoint"
        @mouseup.stop="releasePoint"
        :class="{active__layer_on: layerActive}"
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
            if (this.$store.state.mapEdit.plotting) {
                this.$store.dispatch('mapEdit/plot', {
                    ...this.$store.getters['ymap/pixelToLatLng'](this.$store.state.mapEdit.mousePosition),
                    toolId: this.id
                })
            }
        },
        grabPoint() {
            if (! this.$store.state.mapEdit.plotting)
                this.grabbed = true
        },
        releasePoint() {
            if (! this.$store.state.mapEdit.plotting) {
                this.$store.dispatch('mapEdit/replot', {
                    ...this.$store.getters['ymap/pixelToLatLng'](this.$store.state.mapEdit.mousePosition),
                    toolId: this.id,
                    index: this.index
                })
                this.grabbed = false
            }
        },
    },
    computed: {
        attributes () {
            const position = (this.grabbed || this.nowPlotted) ?
                this.$store.state.mapEdit.mousePosition : this.$store.getters['ymap/latLngToPixel'](this.attr)
            const attr = Object.assign({}, this.attr)
            delete attr.lat
            delete attr.lng
            return {...attr, cx: position.x, cy: position.y}
        }
    },
    mixins: [Shared]
}
</script>

<style lang="scss">
.map_edit__map__plotpoint {
    fill: white;
    cursor: pointer;
    stroke: red;
    stroke-width: 2;
    r: 5;
}
</style>
