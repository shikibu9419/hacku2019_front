<template lang="pug">
  .box_data
    .box_comment
      UserInfo(
        :author="box.username"
        :editors="null"
      )
      .box_comment__text {{box.text}}
</template>
<script>
export default {
  components: {
    UserInfo: () => import('~/components/atoms/mapInfo/UserInfo'),
  },
  props: ['box'],
};
</script>
<style lang="scss" scoped>
.box_comment {
  padding: 4px 6px;
}
</style>
