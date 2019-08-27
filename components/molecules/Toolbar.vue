<template lang="pug">
    g.map_edit__toolbar( transform="translate(500,10)" width="500" height="500")
        rect.map_edit__toolbar__background(width="500" height="50" rx="10" ry="10")
        image.map_edit__toolbar__icon(x="0" xlink:href="~assets/svgs/figure_tool.svg")
        image.map_edit__toolbar__icon(x="40" xlink:href="~assets/svgs/way_tool.svg")
        image.map_edit__toolbar__icon(x="80" xlink:href="~assets/svgs/text_box.svg" @click="addBuildingBasic")
</template>

<script>
export default {
    methods: {
        addBuilding() {
            this.$store.dispatch('mapEdit/addSelect', { type: 'building', x: 1000, y: 1000, points: []})
            this.$store.dispatch('mapEdit/togglePlotting')
        },
        addDirection() {
            this.$store.dispatch('mapEdit/addSelect', {type: 'direction', x: 1000, y: 1000, points: []})
            this.$store.dispatch('mapEdit/togglePlotting')
        },
        addBuildingBasic() {
            console.log('addselect')
            this.$store.dispatch('mapEdit/addSelect', { type: 'building_basic', x: 50, y: 50, width: 100, height: 100})
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
