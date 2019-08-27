<template lang="pug">
    g.map_edit__toolbar(transform="translate(500,10)")
        rect.map_edit__toolbar__background(rx="10" ry="10")
        image.map_edit__toolbar__icon(x="0" @click="addBuilding" xlink:href="~assets/svgs/figure_tool.svg")
        image.map_edit__toolbar__icon(x="40" @click="addDirection" xlink:href="~assets/svgs/way_tool.svg")
        image.map_edit__toolbar__icon(x="80" @mousedown.stop="addBuildingBasic" xlink:href="~assets/svgs/text_box.svg")
</template>

<script>
export default {
    methods: {
        addBuilding () {
            this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'building', points: []})
            this.$store.dispatch('mapEdit/togglePlotting')
        },
        addDirection () {
            this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'direction', points: []})
            this.$store.dispatch('mapEdit/togglePlotting')
        },
        addBuildingBasic () {
            this.$store.dispatch('mapEdit/addTool', {...this.getLatLng(), type: 'building_basic', width: 100, height: 100})
            this.$store.dispatch('mapEdit/toggleGrabbing')
        },
        getLatLng () {
            return this.$store.getters['ymap/pixelToLatLng'](this.$store.state.mapEdit.mousePosition)
        }
    },
    computed: {
    },
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit__toolbar {
    width: min-content;
    height: 30%;

    &__background {
        fill: $back-gray;
    }

    &__icon {
        width: 30px;
        height: 30px;
    }
}
</style>
