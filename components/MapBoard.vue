<template lang="pug">
  .container
      gmap-map#map-canvas(:center="center" :zoom="zoom" :options="{styles: styles}" map-type-id="terrain")
          gmap-marker(v-for="(m,id) in marker_items" :position="m.position" :title="m.title" :clickable="true" :draggable="false" @click="center=m.position" :key="id")
</template>

<script>
export default {
    data () {
    return {
      center: {lat: 35.71, lng: 139.72},
      zoom: 14,
      marker_items: [
        {position: {lat: 35.71, lng: 139.72}, title: 'marker_1'},
        {position: {lat: 35.72, lng: 139.73}, title: 'marker_2'},
        {position: {lat: 35.70, lng: 139.71}, title: 'marker_3'},
        {position: {lat: 35.71, lng: 139.70}, title: 'marker_4'}
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
  }
}
</script>

<style lang="scss">
#map-canvas {
    width: 100%;
    height: 600px;
}
</style>
