<template lang="pug">
  .home.toppage
    Header(
      :returnLink="null"
      :placeholder="'マップを検索する'"
      :type="'maplists/search'"
      :buttons="false"
    )
    main.main
      SideMenu
      MapList(lists="searchData")
</template>

<script>
export default {
  layout: "MapListsLayout",
  name: "home",
  middleware: 'authenticated',
  components: {
    Header: () => import("~/components/organisms/Header.vue"),
    SideMenu: () => import("~/components/organisms/topPage/SideMenu.vue"),
    MapList: () => import("~/components/organisms/topPage/MapList.vue")
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

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
