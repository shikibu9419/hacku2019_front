<template lang="pug">
  .top_page
    .top_page__border
      .top_page__border__square
      .top_page__border__circle(v-for="(cor,cur_id) in corner" :key="`top_page_cur_${cur_id}`")
        div(:class="`top_page__border__circle__${cor}`")
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

.top_page {
  position: relative;
  width: 100vw;
  height: 100vh;
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
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  border: 4px solid $theme-pink;
}

.top_page__inside {
  padding: 34px;
}
</style>