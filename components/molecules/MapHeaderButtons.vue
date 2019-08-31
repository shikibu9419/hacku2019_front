<template lang="pug">
  .map_header_buttons
    .map_header_buttons--cir
      headerShare
      headerComment
    .map_header_buttons--sq
      headerLike
      headerStock
</template>
<script>
export default {
  components: {
    headerComment: () => import('~/components/atoms/headers/headerComment'),
    headerLike: () => import('~/components/atoms/headers/headerLike'),
    headerShare: () => import('~/components/atoms/headers/headerShare'),
    headerStock: () => import('~/components/atoms/headers/headerStock'),
  }
}
</script>
<style lang="scss" scoped>
  .map_header_buttons {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    &--cir, &--sq {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      padding-right: 12px;
    }
  }
</style>