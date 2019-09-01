<template lang="pug">
  .layer_info
    .info_data
      layersIcon.info_data__icon
      .info_data__main
        .info_data__main__name(
          v-for="(layer,layer_id) in layers"
          :key="`layerinfo_${layer_id}`"
        ) {{layer.name}}
      .info_data__right 
        span.info_data__right--strong {{layers.length}}
        span  Layers

</template>
<script>
  export default {
    components:{
      layersIcon: () => import('~/assets/svgs/layers.svg?inline'),
    },
    props: ["layers"]
  }
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "~/assets/styles/atoms/mapInfo.scss";
</style>