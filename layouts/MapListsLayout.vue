<template lang="pug">
  .maplists_layouts
    nuxt.maplists_inside
</template>

<script>
export default {
  data(){
    return {
      corner:[
        "top_left",
        "top_right",
        "bottom_left",
        "bottom_right"
      ]
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/styles/normalize.scss";
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
html {
  font-family: $noto-font;
  font-size: 62.5%;
  color: $text-main;
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  height: 100%;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
body {
  margin: 0;
  width: 100%;
  height: 100%;
  @include noto-font(1.5rem);
}
:focus{
  outline: 3px auto rgba($theme-pink,.5);
}
button {
  font-weight: normal;
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
</style>