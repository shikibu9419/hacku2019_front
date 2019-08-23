<template lang="pug">
    .container.map-edit__map
        #map-canvas.map-edit__layer
        map-layer.map-edit__map--map-layer(@scroll="scrollMap")
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
            ymap: {}
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
            this.$store.dispatch('mapEdit/scrollMap', center)
        },
        pixelToLanLng(position) {
            return this.ymap.fromContainerPixelToLatLng(
                new Y.Point(...Object.values(position))
            )
        }
    },
    mounted () {
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

    &--map-layer {
        position: absolute;
        z-index: 10;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }
}

.map-edit__layer {
    width: 100%;
    height: 100%;
}
</style>
