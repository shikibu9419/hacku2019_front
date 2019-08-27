<template lang="pug">
    .container.map_edit__map(ref="layer")
        #map-canvas.map_edit__map__background
        map-layer(v-for="layer in inactiveLayers" :key="layer.id" v-bind="layer")
        map-layer(v-bind="activeLayer")
        sidebar
        toolbar
</template>

<script>
import axios from 'axios'

export default {
    layout: 'MapHeader',
    components: {
        MapLayer: () => import('~/components/organisms/mapEdit/MapLayer'),
        Sidebar: () => import('~/components/organisms/mapEdit/Sidebar'),
    },
    beforeCreate() {
        this.$store.dispatch('mapEdit/initLayers')
        this.$store.dispatch('mapEdit/selectLayer', 1)
    },
    mounted() {
        this.$store.dispatch('ymap/init')
        this.setOffset()
        window.addEventListener('resize', () => this.setOffset())
        window.addEventListener('scroll', () => this.setOffset())
    },
    methods: {
        setOffset() {
            const rect = this.$refs.layer.getBoundingClientRect()
            const prop = {
                x: window.pageXOffset + rect.left,
                y: window.pageYOffset + rect.top
            }
            this.$store.dispatch('mapEdit/setOffset', prop)
        }
    },
    computed: {
        activeLayer () {
            return this.$store.getters['mapEdit/activeLayer']
        },
        inactiveLayers () {
            return this.$store.getters['mapEdit/inactiveLayers']
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit__map {
    position: relative;
    width: 100%;
    height: 100%;
    background: $back-light-gray;

    &__background {
        width: 100%;
        height: 100%;
    }
}
</style>
