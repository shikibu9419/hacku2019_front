<template lang="pug">
  .header_share_button__main
    button(@click="pushShare()").header_share_button
      .header_comment_button__icon
        img(src="~/assets/svgs/share.svg").header_share_button__icon__svg
</template>

<script>
export default {
  methods:{
    pushShare(){
      //処理
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

$padding: 28px;

.header_share_button__main{
  padding: 10px $padding;
}

.header_share_button__icon__svg {
  height: 30px;
  padding: 4px 10px 4px;
}

.header_share_button{
  width: 100px;
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background: #ffffff;
}

.header_share_button__icon {
  padding: 0 8px;
}

</style>