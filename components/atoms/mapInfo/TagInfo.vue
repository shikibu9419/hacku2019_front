<template lang="pug">
  .tag_info
    .info_data
      tagIcon.info_data__icon
      .info_data__main
        .info_data__main__name(
          v-for="(tag,tag_id) in tags"
          :key="`taginfo_${tag_id}`"
        ) {{tag.name}}
      .info_data__right 
        span.info_data__right--strong {{tags.length}}
        span  Tags

</template>
<script>
  export default {
    components:{
      tagIcon: () => import('~/assets/svgs/tag.svg?inline'),
    },
    props: ["tags"]
  }
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "~/assets/styles/atoms/mapInfo.scss";
</style>