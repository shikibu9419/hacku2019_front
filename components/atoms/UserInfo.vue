<template lang="pug">
  .user_info
    // アイコン絶対これじゃない
    img.user_info_icon(src="~/assets/svgs/layer.svg")
    p.user_info_name {{ userName }}
</template>

<script>
export default {
  computed: {
    userName () {
      return 'username'
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.user_info_icon {
  display: inline-block;
  width: 20px;
}

.user_info_name {
  display: inline;
  font-size: 15px;
}
</style>
