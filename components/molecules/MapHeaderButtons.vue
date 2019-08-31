<template lang="pug">
  .map_header_buttons
    headerShare
    headerComment
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
    padding: 0 12px;
  }
</style>