<template lang="pug">
  .header_search
    .search_input
      button().search_button.button
        SearchBtn.search_button__icon
      input(v-model="query" :placeholder="placeholder" @change="update()").header_search__input
    .filter_wrapper(v-if="type.split('/')[0] === 'maplists'")
      button(@click="toggleFilterMenu()").filter_button.button
        FilterBtn.filter_button__icon
        .filter_button__text Filter
      .filter_menu(:class="{'filter_menu--open':!filterMenu_close}")
        input(v-model="filter.tag" type="text" placeholder="タグを検索").filter_menu__input_text
        .filter_menu__types
          .filter_menu__type
            .filter_menu__type__text マイマップ：
            .filter_menu__type__input
              input(v-model="filter.mymap" type="checkbox")
          .filter_menu__type
            .filter_menu__type__text ストック：
            .filter_menu__type__input
              input(v-model="filter.stock" type="checkbox")
          .filter_menu__type
            .filter_menu__type__text いいね：
            .filter_menu__type__input
              input(v-model="filter.like" type="checkbox")


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
      filter:{
        tag: "",
        like: false,
        mymap: false,
        stock: false
      },
      query: "",
      filterMenu_close:true
    }
  },
  mounted(){
    //ページ遷移でfilterの設定を変更
    if(this.type.split('/')[1] === "like"){
      this.filter.like = true
    }
    if(this.type.split('/')[1] === "mymap"){
      this.filter.mymap = true
    }
    if(this.type.split('/')[1] === "stock"){
      this.filter.stock = true
    }
  },
  methods: {
    update() {
        if(this.type === "inmap")
          this.searchYOLP()
        if(this.type.split('/')[0] === "maplists") {
          
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
    },
    toggleFilterMenu(){
      this.filterMenu_close = (this.filterMenu_close ? false:true)
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
  z-index: 0;
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

.filter_menu {
  position: absolute;
  top: 0;
  left: 0;
  background: $white;
  padding: 16px 20px;
  border-radius: 0 0 8px 8px;
  z-index: -1;
  transform: translateY(-20px);
  opacity: 0;
  transition: .3s $bezier-ease-out;
  &--open {
    transform: translateY(30px);
    opacity: 1;
  }
}
.filter_menu__input_text {
  padding: 4px 8px;
  margin: 4px 0;
}
.filter_menu__type {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

</style>
