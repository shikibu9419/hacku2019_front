<template lang="pug">
    .container(style="text-align: right; width: 100%;")
        button(type="button" @click="addBuildingBasic") addBuildingBasic
        button(type="button" @click="addBuilding") addBuilding
        button(type="button" @click="addDirection") addDirection
</template>

<script>
export default {
    methods: {
        addBuildingBasic() {
            this.$store.dispatch('mapEdit/add', { type: 'building_basic', x: 50, y: 50, width: 100, height: 100})
        },
        addBuilding() {
            this.$store.dispatch('mapEdit/addSelect', { type: 'building', x: 1000, y: 1000, points: []})
            this.$store.dispatch('mapEdit/togglePlotting')
        },
        addDirection() {
            this.$store.dispatch('mapEdit/addSelect', {type: 'direction', x: 1000, y: 1000, points: []})
            this.$store.dispatch('mapEdit/togglePlotting')
        },
    }
}
</script>
