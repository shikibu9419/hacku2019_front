<template lang="pug">
  .header_search
    .search_input
      button().search_button.button
        SearchBtn.search_button__icon
      input(v-model="query" :placeholder="placeholder" @change="update()").header_search__input
    .filter_wrapper(v-if="type==='maplists'")
      button().filter_button.button
        FilterBtn.filter_button__icon
        .filter_button__text Filter

</template>
<script>
export default {
  props: ["placeholder", "type"],
  components: {
    //svg
    SearchBtn: () => import('~/assets/svgs/search.svg?inline'),
    FilterBtn: () => import('~/assets/svgs/filter.svg?inline'),
  },
  data() {
    return {
      query: ""
    }
  },
  methods: {
    update() {
        if(this.type === "inmap")
          this.searchYOLP()
        if(this.type === "maplists") {
          //マップをさがす
          //filter処理(tag,like-only,mymap-only,stock-only)
          // this.searchMap()
        }
    },
    searchYOLP() {
      this.$store.dispatch('ymap/resetMarkers')

      const baseUrl = 'https://map.yahooapis.jp/search/local/V1/localSearch'

      this.$jsonp(baseUrl, {appid: process.env.YOLP_APPID, query: this.query, output: 'json'})
        .then(response => {
          if (response.ResultInfo.Count === 0) return

          const latlngs = response.Feature.map(feature =>
            feature.Geometry.Coordinates.split(',').map(c => parseFloat(c)).reverse()
          )
          this.$store.dispatch('ymap/setMarkers', latlngs)
        })
    },
    searchMap() {
      const baseUrl = 'API base url'

      this.$axios(baseUrl, {})
        .then(response => {})
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

.header_search {
  position: relative;
  display: flex;
  align-items: center;
}

button {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: min-content;
  height: min-content;
  border: none;
  padding: 0;
}

.search_button{
  left: 4px;
  background: transparent;
}
.search_button__icon {
  display: block;
  width: 28px;
  height: 28px;
}
.search_cls-2 {
  fill:$gray;
}

.header_search__input {
  padding: 8px 12px;
  padding-left: 36px;
  min-width: 420px;
  border: 1px solid $gray;
  color: $gray;
  transition: .2s $bezier-ease-out;
  &:focus {
    color: $dark-gray;
  }
}

.filter_wrapper {
  position: relative;
  display: block;
  width: min-content;
  height: auto;
  padding: 0 10px;
}
.filter_button {
  background: transparent;
  display: flex;
  align-items: center;
  padding: 2px;
}
.filter_button__icon {
  display: block;
  width: 28px;
  height: 28px;
}
.filter_button__text {
  padding-left: 2px;
}
</style>
