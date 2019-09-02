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
      this.$store.dispatch('changeStock')
    }
  },
  computed:{
    mapStockdOn(){
      return this.$store.state.mapEdit.stock
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "~/assets/styles/atoms/headerButtons.scss";
</style>