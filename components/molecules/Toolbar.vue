<template lang="pug">
    .map_edit__toolbar
        button.toolbar_btn(type="button" @click="addBuildingBasic") addBuildingBasic
        button.toolbar_btn(type="button" @click="addBuilding") addBuilding
        button.toolbar_btn(type="button" @click="addDirection") addDirection
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

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit__toolbar {
    background: $back-gray;
    position: absolute;
    display: flex;
    top: 4px;
    left: 0;
    right: 0;
    margin: auto;
    width: min-content;
    z-index: 10;
    padding: 8px;
    border-radius: 30px;
    box-shadow: 0 2px 8px rgba($black,.3);
}
.toolbar_btn {
    border-radius: 30px;
}
</style>
