<template lang="pug">
    .container.map-edit__map
        gmap-map.map-edit__layer(:center="center" :zoom="zoom" :options="{styles: styles}" ref="gmap")
        map-layer.map-edit__map--map-layer(@scroll="mapScroll")
</template>

<script>
export default {
    components: {
        MapLayer: () => import('~/components/molecules/MapLayer'),
    },
    data() {
        return {
            zoom: 14,
            styles: [
                {
                    "featureType": "poi",
                    "stylers": [
                        { "visibility": "off" }
                    ]
                }
            ]
        }
    },
    computed: {
        center() {
            return this.$store.state.mapEdit.center
        },
    },
    methods: {
        mapScroll() {
            var newCenter = Object.assign({}, this.$store.state.mapEdit.center)
            newCenter.lat = newCenter.lat + 0.001
            newCenter.lng = newCenter.lng + 0.001
            this.$refs.gmap.panTo(newCenter)
            this.$store.dispatch('mapEdit/scrollMap', newCenter)
        }
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
