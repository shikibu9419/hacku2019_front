<template lang="pug">
  .mymap.toppage
    Header(
      :returnLink="null"
      :placeholder="'マイマップを検索する'"
      :type="'maplists/mymap'"
      :buttons="false"
      )
    main.main
      SideMenu
      MapList(lists="searchData")
</template>
<script>
//components
import Header from "~/components/organisms/Header.vue"
import SideMenu from "~/components/organisms/topPage/SideMenu.vue"
import MapList from "~/components/organisms/topPage/MapList.vue"

export default {
  layout: "MapListsLayout",
  components:{
    Header,
    SideMenu,
    MapList
  },
  computed:{
    searchData(){
      //vuexから受け取る
      return "hoge"
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

.toppage {
  width: 100%;
  height: 100vh;
}

.main {
  display: flex;
  width: 100%;
  height: $main-height;
  background: $back-light-gray;
}
</style>