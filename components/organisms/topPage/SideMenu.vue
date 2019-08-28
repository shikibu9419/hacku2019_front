<template lang="pug">
  .top_sidemenu
    .make_map
      MakeNewMap()
    .map_category_list
      MapCategory(
        :icon="'search'"
        :text="'マップを見つける'"
        :link="'/maplists/search'"
      )
      MapCategory(
        :icon="'pen_tool'"
        :text="'マイマップ'"
        :link="'/maplists/mymap'"
      )
      MapCategory(
        :icon="'stock'"
        :text="'ストック'"
        :link="'/maplists/stock'"
      )
      MapCategory(
        :icon="'like'"
        :text="'いいね'"
        :link="'/maplists/like'"
      )


</template>
<script>
export default {
  components:{
    //components
    MakeNewMap: () => import('~/components/atoms/SideMenu/MakeNewMap.vue'),
    MapCategory: () => import('~/components/atoms/SideMenu/MapCategory.vue'),
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

.top_sidemenu {
  width: $sidemenu-width;
  height: 100%;
  background: $back-gray;
}
.map_category_list{
  border-top: 2px solid $light-gray;
}
</style>