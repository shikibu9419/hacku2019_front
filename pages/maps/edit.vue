<template lang="pug">
    .container.map_edit__map(ref="layer")
        #map-canvas.map_edit__map__background
        map-layer(v-for="layer in inactiveLayers" :key="layer.id" v-bind="layer")
        map-layer(v-bind="activeLayer" @scroll="scrollMap")
        sidebar
</template>

<script>
import axios from 'axios'

export default {
    components: {
        MapLayer: () => import('~/components/molecules/MapLayer'),
        Sidebar: () => import('~/components/organisms/editMap/Sidebar'),
    },
    data() {
        return {
            zoom: 18,
            ymap: {},
            markerLatLngs: [],
            prevMarkers: [],
        }
    },
    beforeCreate() {
        this.$store.dispatch('mapEdit/initLayers')
        this.$store.dispatch('mapEdit/selectLayer', 1)
    },
    mounted() {
        this.markerLatLngs = this.$store.state.mapEdit.markerLatLngs

        this.ymap = new Y.Map("map-canvas");
        this.ymap.drawMap(new Y.LatLng(...Object.values(this.$store.state.mapEdit.center)),
                          this.zoom,
                          Y.LayerSetId.NORMAL);

        this.setOffset()
        window.addEventListener('resize', () => this.setOffset())
        window.addEventListener('scroll', () => this.setOffset())
    },
    watch: {
        markerLatLngs () {
            for (const marker of this.prevMarkers)
                this.ymap.removeFeature(marker)
            this.prevMarkers.length = 0

            for (const latlng of this.markerLatLngs) {
                const marker = new Y.Marker(new Y.LatLng(...latlng))
                this.ymap.addFeature(marker)
                this.prevMarkers.push(marker)
            }
        }
    },
    methods: {
        scrollMap(prop) {
            const prev = this.pixelToLanLng(this.$store.state.mapEdit.mousePosition)
            const now  = this.pixelToLanLng(prop)

            const dlat = now.Lat - prev.Lat
            const dlng = now.Lon - prev.Lon

            const center = Object.assign({}, this.$store.state.mapEdit.center)
            center.lat = center.lat - dlat
            center.lng = center.lng - dlng

            this.ymap.panTo(new Y.LatLng(...Object.values(center)))
            this.$store.dispatch('mapEdit/setCenter', center)
        },
        pixelToLanLng(position) {
            return this.ymap.fromContainerPixelToLatLng(
                new Y.Point(...Object.values(position))
            )
        },
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

<style lang="scss">
.map_edit__map {
    width: 100%;
    height: 700px;

    &__background {
        width: 100%;
        height: 100%;
    }
}
</style>
