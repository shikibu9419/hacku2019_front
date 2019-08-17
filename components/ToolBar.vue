<template lang="pug">
    .container
        button(type="button" @click="addExample") addExample
        button(type="button" @click="addPolygon") addPolygon
        button(type="button" @click="addRect") addRect
</template>

<script>
export default {
    methods: {
        addPolygon() {
            this.$store.dispatch('board/add', { type: 'building', points: [250, 50, 300, 100, 250, 100], color: 'black'})
        },
        addExample() {
            this.$store.dispatch('board/add', { type: 'circle', x: 50, y: 50, r: 20})
        },
        addRect() {
            this.$store.dispatch('board/add', { type: 'building_basic', x: 50, y: 50, width: 100, height: 100})
        }
    }
}
</script>
