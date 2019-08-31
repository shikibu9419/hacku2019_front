<template lang="pug">
  .header_comment_button__main
    button(@click="pushComment()").header_comment_button
      .header_comment_button__icon
        img(src="~/assets/svgs/comment_box.svg").header_comment_button__icon__svg
</template>

<script>
export default {
  methods:{
    pushComment(){
      //処理
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

$padding: 28px;

.header_comment_button__main{
  padding: 10px $padding;
}

.header_comment_button__icon__svg {
  height: 30px;
  padding: 4px 10px 4px;
}

.header_comment_button{
  width: 100px;
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background: #ffffff;
}

.header_comment_button__icon {
  padding: 0 8px;
}

</style>