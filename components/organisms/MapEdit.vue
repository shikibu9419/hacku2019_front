<template lang="pug">
    .container.map_edit__map
        #map-canvas.map_edit__map__background
        map-layer(v-for="layer in inactiveLayers" :key="layer.id" v-bind="layer")
        map-layer(v-bind="activeLayer" @scroll="scrollMap")
        sidebar
        toolbar
</template>

<script>
import axios from 'axios'

export default {
    components: {
        MapLayer: () => import('~/components/molecules/MapLayer'),
        Sidebar: () => import('~/components/molecules/Sidebar'),
        Toolbar: () => import('~/components/molecules/Toolbar')
    },
    data() {
        return {
            zoom: 18,
            ymap: {},
            markerLatLngs: [],
            prevMarkers: [],
        }
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
        }
    },
    beforeCreate() {
        this.$store.dispatch('mapEdit/initLayers')
        this.$store.dispatch('mapEdit/setActiveLayer', 1)
    },
    mounted () {
        this.markerLatLngs = this.$store.state.mapEdit.markerLatLngs

        this.ymap = new Y.Map("map-canvas");
        this.ymap.drawMap(new Y.LatLng(...Object.values(this.$store.state.mapEdit.center)),
                          this.zoom,
                          Y.LayerSetId.NORMAL);
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
