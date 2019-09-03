<template lang="pug">
  .maplists
    CardTile(
        v-for="(mapCard, index) in mapDatas" :key="`card_test_${index}`"
        :mapCard="mapCard"
    )
    .maplists--none(
      v-if="mapDatas.length===0"
    ) {{maplist_none_text}}
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
      mapCards: [{
        map_id: 'maps',
        title: '俺的ラーメン屋まとめ',
        author: 'tanakataro',//1
        editors: ['tanakajiro','tanakasaburo','tanakasiro'],//2,3
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
      }],
    }
  },
  computed:{
    mapDatas(){
      let serve_maps = this.$store.state.maplist.maps
      let map_datas = []
      if(this.$route.path == '/'){
        map_datas = this.mapCards
      }
      if(serve_maps.length !== 0){
        for (let i = 0; i < serve_maps.length; i++) {
          let sMap = serve_maps[i]
          let fMap = {}
          fMap.map_id = sMap.map_id
          fMap.title = sMap.map_name
          fMap.author = sMap.permission.filter(x => (x.permission_id == 1))[0].user_name
          //途中で投げた。誰かお願いします。
          map_datas.push()
        }
        
      }
      return map_datas
    },
    maplist_none_text(){
      switch(this.$route.path){
        case '/' :
        case '/maplists/search' :
          return "検索結果はありません。"
          break;
        case '/maplists/mymap' :
          return "マイマップは無いようです。"
          break;
        case '/maplists/stock' :
          return "ストックしたマップは無いようです。"
          break;
        case '/maplists/like' :
          return "いいねしたマップは無いようです。"
          break;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
.maplists {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  overflow-y: auto;
  padding: 4px 16px;
}
.maplists--none {
  padding: 8px;
  @include noto-font(1.8rem);
}
</style>