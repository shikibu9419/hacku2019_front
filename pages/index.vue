<template lang="pug">
  .home
    Header(
    :returnLink="'/maplists/search'"
    :placeholder="'マップを検索する'"
    :type="'maplists/search'"
    :buttons="false"
    )
    .card-pages
      card-tile(
          v-for="(data, index) in array" :key="`card_test_${index}`"
          :title="title"
          :img_url="img_url"
          :layers="layers"
          :tags="tags"
          :comments="comments"
          :id="data"
      )
</template>

<script>
export default {
  layout: "MapListsLayout",
  name: "home",
  middleware: 'authenticated',
  components: {
    Header: () => import("~/components/organisms/Header.vue"),
    CardTile: () => import("~/components/molecules/CardTile")
  },
  data() {
    return {
      title: '俺的ラーメン屋まとめ',
      img_url: 'https://picsum.photos/400/300',
      layers: [{id: 1, name: '豚骨'}, {id: 2, name: '塩'}, {id: 3, name: '醤油'}, {id: 4, name: '味噌'}],
      tags: [{id: 1, name: 'ラーメン'}, {id: 2, name: '大阪'}, {id: 3, name: '激戦区'}],
      comments: [...Array(16).keys()],
      array: [...Array(9).keys()] // とりあえず9個絵画
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.card-pages{
  padding: 2.5% 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
