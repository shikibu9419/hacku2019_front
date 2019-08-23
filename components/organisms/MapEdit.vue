<template lang="pug">
    .container.map-edit__map
        #map-canvas.map-edit__map--background
        map-layer.map-edit__map--layer(@scroll="scrollMap")
</template>

<script>
import axios from 'axios'

export default {
    components: {
        MapLayer: () => import('~/components/molecules/MapLayer'),
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
    mounted () {
        this.markerLatLngs = this.$store.state.mapEdit.markerLatLngs
        this.ymap = new Y.Map("map-canvas");
        this.ymap.drawMap(new Y.LatLng(...Object.values(this.$store.state.mapEdit.center)),
                          this.zoom,
                          Y.LayerSetId.NORMAL);
    }
}
</script>

<style lang="scss">
.map-edit__map {
    width: 100%;
    height: 700px;

    &--background {
        z-index: 10;
        width: 100%;
        height: 100%;
    }

    &--layer {
        position: absolute;
        z-index: 10;
        top: 50px;
        width: 100%;
        height: 100%;
    }

    &--toolbar {
        position: absolute;
        z-index: 10;
    }

    &--svg {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 700px;
    }
}
</style>
