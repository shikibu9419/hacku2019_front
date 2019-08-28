<template lang="pug">
  .map_category__item
    nuxt-link(:to="link").map_category__item_a
      .map_category__item__icon
        SearchSvg(v-if="icon==='search'").mci__svg.mci__svg--search
        PenToolSvg(v-if="icon==='pen_tool'").mci__svg.mci__svg--pen_tool
        StockSvg(v-if="icon==='stock'").mci__svg.mci__svg--stock
        LikeSvg(v-if="icon==='like'").mci__svg.mci__svg--like
      .map_category__item__text {{text}}
</template>
<script>
export default {
  props:["icon","text","link"],
  components:{
    //svg
    SearchSvg: () => import('~/assets/svgs/search.svg?inline'),
    PenToolSvg: () => import('~/assets/svgs/pen_tool.svg?inline'),
    StockSvg: () => import('~/assets/svgs/stock.svg?inline'),
    LikeSvg: () => import('~/assets/svgs/like.svg?inline')
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

.map_category__item_a {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 8px 28px;
  text-decoration: none;
  transition: .2s $bezier-ease-out;
}
.map_category__item_a.nuxt-link-active {
  background: $back-light-gray;
  background: linear-gradient(-90deg, $back-light-gray 10%, $white 100%);
  .map_category__item__text {
    color: $text-black
  }
}
.map_category__item__icon{
  padding-right: 8px;
}
.map_category__item__text {
  @include noto-font(1.6rem,$text-main);
  text-decoration: none;
}
.mci__svg {
  display: block;
  width: 40px;
  padding: 4px;
  .pen-tool_cls-3 {
    fill: $dark-gray;
  }
  .pen-tool_cls-2 {
    fill: none;
  }
  .stock_cls-2 {
    fill: $dark-gray;
  }
  .stock_cls-1 {
    fill: none;
  }
  .like_cls-3 {
    fill: $dark-gray;
  }
  .like_cls-2 {
    fill: none;
  }
}
</style>