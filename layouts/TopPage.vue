<template lang="pug">
  .top_page
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
.top_page__border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
}
</style>