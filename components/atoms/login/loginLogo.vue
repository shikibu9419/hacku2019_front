<template lang="pug">
  .top_title
    img(src="~assets/svgs/logo.svg").top_title__logo
    .top_title__comment あなただけの地図を作ろう
</template>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

.top_title {
  margin-bottom: 9vh;
  &__logo {
    display: block;
    margin: auto;
    max-width: 280px;
  }
  &__comment {
    text-align: center;
    @include noto-font(2rem,$text-black);
    letter-spacing: .6rem;
  }
}
</style>