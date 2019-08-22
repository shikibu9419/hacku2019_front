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
        mapScroll(prop) {
            const dx = prop.x - this.$store.state.mapEdit.mousePosition.x
            const dy = prop.y - this.$store.state.mapEdit.mousePosition.y

            var newCenter = Object.assign({}, this.$store.state.mapEdit.center)
            newCenter.lat = newCenter.lat + 0.0001 * dy
            newCenter.lng = newCenter.lng - 0.0001 * dx
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
