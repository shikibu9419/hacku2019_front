<template lang="pug">
    .container
        gmap-map.map-edit__map(:center="center" :zoom="zoom" :options="{styles: styles}" ref="gmap")
            gmap-marker(v-for="(m,id) in marker_items" :position="m.position" :icon="m.icon" :title="m.title" :clickable="true" :draggable="false" :key="id")
        map-layer.map-edit__map(@hoge="hoge")
</template>

<script>
export default {
    components: {
        MapLayer: () => import('~/components/molecules/MapLayer'),
    },
    data() {
        return {
            ymap: null,
            zoom: 14,
            marker_items: [
                {position: {lat: 35.71, lng: 139.72}, title: 'marker_1', icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
                {position: {lat: 35.72, lng: 139.73}, title: 'marker_2'},
                {position: {lat: 35.70, lng: 139.71}, title: 'marker_3'},
                {position: {lat: 35.71, lng: 139.70}, title: 'marker_4'},
            ],
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
        hoge() {
            var hoge = Object.assign({}, this.$store.state.mapEdit.center)
            hoge.lat = hoge.lat + 0.001
            hoge.lng = hoge.lng + 0.001
            this.$refs.gmap.panTo(hoge)
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
