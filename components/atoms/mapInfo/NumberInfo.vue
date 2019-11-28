<template lang="pug">
  .number_info
    .number_info__one
      commentIcon.info_data__icon
      .number_info__one__count {{ comments.length }}
    .number_info__one
      likeIcon.info_data__icon
      .number_info__one__count {{ like }}
    .number_info__one
      StockIcon.info_data__icon
      .number_info__one__count {{ stock }}
</template>

<script>
export default {
  name: 'Comment',
  components: {
    commentIcon: () => import('~/assets/svgs/comment_box.svg?inline'),
    likeIcon: () => import('~/assets/svgs/like.svg?inline'),
    StockIcon: () => import('~/assets/svgs/stock.svg?inline'),
  },
  props: ['comments', 'like', 'stock'],
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';
@import '~/assets/styles/atoms/mapInfo.scss';
</style>
