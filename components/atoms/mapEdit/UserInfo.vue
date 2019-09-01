<template lang="pug">
  .user_info
    // アイコン変える
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
  width: 22px;
  height: 22px;
  background: $back-gray;
  border: 1px solid $gray;
  border-radius: 22px;
}

.user_info_name {
  display: inline;
  font-size: 15px;
}
</style>
