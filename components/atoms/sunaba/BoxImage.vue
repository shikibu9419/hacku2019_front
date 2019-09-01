<template lang="pug">
  .box_data
    .box_image
      img(:src="box.src[0]").box_image__img
    fa-icon(icon="angle-left").box_image_prev
    fa-icon(icon="angle-left").box_image_next
</template>
<script>
export default {
  props:["box"]
}
</script>
<style lang="scss" scoped>
.box_image{
  width: 100%;
  &__img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>