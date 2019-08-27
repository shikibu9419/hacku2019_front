<template lang="pug">
    .container
        .header.map__header
            h2.map__header--molecules this is MapHeader.vue
            input.map__header--molecules(v-model="query" placeholder="マップを検索する")
            button.map__header--molecules(@click="searchOnMap") 検索
        nuxt
</template>

<script>
export default {
    components: {
    },
    data () {
        return {
            query: ''
        }
    },
    methods: {
        searchOnMap () {
            const baseUrl = 'https://map.yahooapis.jp/search/local/V1/localSearch'

            this.$jsonp(baseUrl, {appid: process.env.YOLP_APPID, query: this.query, output: 'json'})
                .then(response => {
                    if (response.ResultInfo.Count === 0) return
                    for (const feature of response.Feature) {
                        // get latlng
                        const latlng = feature.Geometry.Coordinates.split(',').map(c => parseFloat(c)).reverse()
                        this.$store.dispatch('mapEdit/setMarkerLatLngs', latlng)
                    }
                })
//             var geocoder = new google.maps.Geocoder();
//             geocoder.geocode({'address': this.query}, function(results, status) {
//                 if (status === 'OK') {
//                     console.log(results)
//                     //                     resultsMap.setCenter(results[0].geometry.location);
//                     //                     var marker = new google.maps.Marker({
//                     //                         map: resultsMap,
//                     //                         position: results[0].geometry.location
//                     //                     });
//                 } else {
//                     alert('Geocode was not successful for the following reason: ' + status);
//                 }
//             });
        }
    },
}
</script>

<style lang="scss">
.map__header {
    height: 50px;

    &--molecules {
        display: inline-block;
    }
}
</style>
