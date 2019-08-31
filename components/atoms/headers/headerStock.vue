<template lang="pug">
  .header_sq_button__main
    button.header_sq_button(
        @click="pushStock()"
        :class="{'header_sq_button--on':mapStockdOn}"
      )
      .header_sq_button__icon
        stockBtn.header_sq_button__icon__svg
      .header_sq_button__text(v-if="!mapStockdOn") ストックに追加
      .header_sq_button__text(v-else) ストックから外す
</template>

<script>
export default {
  components:{
    stockBtn: () => import('~/assets/svgs/stock.svg?inline'),
  },
  methods:{
    pushStock(){
      //VueXから拾ってきて条件分岐
      let stockd_on // = this.$store.like
      if(stockd_on){
        //外す処理
      }else{
        //つける処理
      }
    }
  },
  computed:{
    mapStockdOn(){
      //VueXから、マップがすでにストックされていたらtrueを返す
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "~/assets/styles/atoms/headerButtons.scss";
</style>