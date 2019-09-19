<template lang="pug">
  .box_data
    .box_image
      Carousel(
        :per-page="1"
        :navigation-enabled="true"
        navigation-prev-label="〈"
        navigation-next-label="〉"
      )
        Slide(v-for="(src,src_id) in box.src" :key="`box_image_${src_id}`")
          img(:src="src").box_image__img
    //
    //fa-icon(icon="angle-left").box_image_next
</template>
<script>
import Carousel from 'vue-carousel/src/Carousel.vue';
import Slide from 'vue-carousel/src/Slide.vue';

export default {
  components: {
    Carousel,
    Slide,
  },
  props: ['box'],
};
</script>
<style lang="scss" scoped>
.box_image {
  width: 100%;
  &__img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
<style lang="scss">
.VueCarousel-navigation {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: calc(100% - 60px);
}
.VueCarousel-navigation-button {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 30px;
  height: auto;
  font-size: 2rem;
  text-align: center;
  padding: 0 !important;
  &:focus {
    outline: none !important;
  }
}
.VueCarousel-navigation-prev {
  left: 0;
}
.VueCarousel-navigation-next {
  right: 0;
}
.VueCarousel-dot-container {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  width: auto;
  height: 20px;
}
.VueCarousel-dot {
  margin: 0;
}
</style>
