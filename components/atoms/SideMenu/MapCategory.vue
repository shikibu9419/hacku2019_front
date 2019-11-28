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
  components: {
    //svg
    SearchSvg: () => import('~/assets/svgs/search.svg?inline'),
    PenToolSvg: () => import('~/assets/svgs/pen_tool.svg?inline'),
    StockSvg: () => import('~/assets/svgs/stock.svg?inline'),
    LikeSvg: () => import('~/assets/svgs/like.svg?inline'),
  },
  props: ['icon', 'text', 'link'],
};
</script>
<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';

.map_category__item_a {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 8px 28px;
  text-decoration: none;
}

.map_category__item_a.nuxt-link-exact-active {
  background: $back-light-gray;
  background: linear-gradient(-90deg, $back-light-gray 10%, $white 100%);
  .map_category__item__text {
    color: $text-black;
  }
}
.map_category__item__icon {
  padding-right: 8px;
}
.map_category__item__text {
  transition: 0.5s $bezier-ease-out;
  @include noto-font(1.6rem, $text-main);
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
