<template lang="pug">
    .container
        gmap-map.map-edit__map(:center="center" :zoom="zoom" :options="{styles: styles}" ref="gmap")
            gmap-marker(v-for="(m,id) in marker_items" :position="m.position" :icon="m.icon" :title="m.title" :clickable="true" :draggable="false" :key="id")
        map-layer.map-edit__map(@scroll="mapScroll")
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
}
</style>
