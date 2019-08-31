<template lang="pug">
  .header_stock_button__main
    button(@click="pushStock()").header_stock_button
      .header_like_button__icon
        img(src="~/assets/svgs/stock.svg").header_stock_button__icon__svg
      .header_stock_button__text ストックに追加
</template>

<script>
export default {
  methods:{
    pushStock(){
      //処理
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

$padding: 28px;

.header_stock_button__main{
  padding: 10px $padding;
}

.header_stock_button__icon__svg {
  height: $header-height - 35px;
  padding: 4px 10px 4px;
}

.header_stock_button{
  width: 150px;
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background: #ffffff;
  color: #EC78B4;
  border-color: $theme-pink;
  border-radius: 4px;
}

.header_stock_button__icon {
  padding: 0 8px;
  color: $theme-pink;
}

</style>