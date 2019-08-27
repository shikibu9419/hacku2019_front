<template lang="pug">
  .header_search
    .search_input
      button().search_button.button
        SearchBtn.search_button__icon
      input(v-model="search_txt" :placeholder="placeholder" @change="update()").header_search__input
    .filter_wrapper(v-if="type==='maplists'")
      button().filter_button.button
        FilterBtn.filter_button__icon
        .filter_button__text Filter 

</template>
<script>
export default {
  props:["placeholder","type"],
  components:{
    //svg
    SearchBtn: () => import('~/assets/svgs/search.svg?inline'),
    FilterBtn: () => import('~/assets/svgs/filter.svg?inline'),
  },
  data(){
    return{
      search_txt:""
    }
  },
  methods: {
    update(){
      //VueXに投げて検索処理
        if(this.type === "inmap"){
          //map-editとmap-viewのとき
        }
        if(this.type === "maplists"){
          //マップをさがす
          //filter処理(tag,like-only,mymap-only,stock-only)
        }
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