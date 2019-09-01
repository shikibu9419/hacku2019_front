<template lang="pug">
  .maplists
    CardTile(
        v-for="(mapCard, index) in 10" :key="`card_test_${index}`"
        :mapCard="mapCards"
    )
</template>
<script>
export default {
  components:{
    CardTile: () => import("~/components/molecules/CardTile"),
  },
  data() {
    return {
      //VueXから取得する
      //Likeはlikeしたuserの配列でもいいかも。その辺は任せた！
      mapCards: {
        map_id: 'maps',
        title: '俺的ラーメン屋まとめ',
        author: 'tanakataro',
        editors: ['tanakajiro','tanakasaburo','tanakasiro'],
        img_url: 'https://picsum.photos/400/300',
        layers: [{id: 1, name: '豚骨'}, {id: 2, name: '塩'}, {id: 3, name: '醤油'}, {id: 4, name: '味噌'}],
        tags: [{id: 1, name: 'ラーメン'}, {id: 2, name: '大阪'}, {id: 3, name: '激戦区'}],
        like: 8,
        stock: 12,
        comments: [
          {user:'tanakataro',comment:'わーい'},
          {user:'tanakataro',comment:'わーい'},
          {user:'tanakataro',comment:'わーい'}
        ],
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
.maplists {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  padding: 4px 16px;
}
</style>