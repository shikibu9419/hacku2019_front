<template lang="pug">
    g.map_edit__toolbar(transform="translate(500,10)" width="500" height="500")
        rect.map_edit__toolbar__background(width="500" height="50" rx="10" ry="10")
        image.map_edit__toolbar__icon(x="0" @click="addBuilding" xlink:href="~assets/svgs/figure_tool.svg")
        image.map_edit__toolbar__icon(x="40" @click="addDirection" xlink:href="~assets/svgs/way_tool.svg")
        image.map_edit__toolbar__icon(x="80" @mousedown.stop="addBuildingBasic" xlink:href="~assets/svgs/text_box.svg")
</template>

<script>
export default {
    methods: {
        addBuilding() {
            this.$store.dispatch('mapEdit/addTool', { type: 'building', points: []})
            this.$store.dispatch('mapEdit/togglePlotting')
        },
        addDirection() {
            this.$store.dispatch('mapEdit/addTool', {type: 'direction', points: []})
            this.$store.dispatch('mapEdit/togglePlotting')
        },
        addBuildingBasic() {
            this.$store.dispatch('mapEdit/addTool', { type: 'building_basic', width: 100, height: 100})
            this.$store.dispatch('mapEdit/toggleGrabbing')
        },
    },
    computed: {
    },
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.map_edit__toolbar {
    width: 100%;
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
