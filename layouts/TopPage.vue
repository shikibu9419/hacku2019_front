<template lang="pug">
  .top_page
    .top_background_image
    .top_page__border
      .top_page__border__square
      .top_page__border__circle(
        v-for="(cor,cur_id) in corner"
        :key="`top_page_cur_${cur_id}`"
        :class="`top_page__border__circle__${cor}`"
        )
      .top_page__border__square_white
    nuxt.top_page__inside
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
  cursor: pointer;
}
</style>


<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

$border-margin: 20px;
$square-width: calc(100% - (20px * 2));
$border-width: 4px;
$corner-rounded: 30px;
$border-circle-margin: $border-margin - $corner-rounded + ($border-width/2);

.top_page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.top_background_image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('~assets/imgs/googlemap_osaka.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: .08;
  z-index: -1;
}
.top_page__border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.top_page__border__square {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: $square-width;
  height: $square-width;
  border: $border-width solid $theme-pink;
}
.top_page__border__square_white {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  border: $border-margin solid $white;
}

.top_page__border__circle {
  position: absolute;
  width: $corner-rounded*2;
  height: $corner-rounded*2;
  background: $white;
  border-radius: $corner-rounded;
  border: $border-width solid $theme-pink;
  &__top_left {
    top: $border-circle-margin;
    left: $border-circle-margin;
  }
  &__top_right {
    top: $border-circle-margin;
    right: $border-circle-margin;
  }
  &__bottom_left {
    bottom: $border-circle-margin;
    left: $border-circle-margin;
  }
  &__bottom_right {
    bottom: $border-circle-margin;
    right: $border-circle-margin;
  }
}

.top_page__inside {
  padding: $border-margin + $border-width;
  width: 100%;
  height: 100%;
}
</style>