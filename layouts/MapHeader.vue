<template lang="pug">
    .container
        //- map__headerをorganisms化する
        .header.map__header
            h2.map__header--molecules this is MapHeader.vue
            input.map__header--molecules(v-model="query" placeholder="マップを検索する")
            button.map__header--molecules(@click="searchOnMap") 検索
        nuxt.map__main
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
                    this.$store.dispatch('ymap/setMarkers', response.Feature)
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
@import "~/assets/styles/normalize.scss";
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

html {
  font-family: $noto-font;
  font-size: 62.5%;
  color: $text-main;
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  height: 100%;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
body {
  margin: 0;
  width: 100%;
  height: 100%;
  @include noto-font(1.5rem);
}

:focus{
  outline: 3px auto rgba($theme-pink,.5);
}
button {
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

.container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.map__header {
    height: $header-height;

    &--molecules {
        display: inline-block;
    }
}
.map__main {
    height: $main-height;
    overflow: hidden;
}

.header.map__header{
    width: 100%;
    background: $white;
}
</style>
