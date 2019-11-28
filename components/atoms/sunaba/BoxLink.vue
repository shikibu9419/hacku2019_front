<template lang="pug">
  .box_data
    .box_link
      a.box_link__text(
        :href="box.link"
      ) {{box.text}}
</template>
<script>
export default {
  props: ['box'],
};
</script>
<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';
.box_link {
  padding: 4px 6px;
}
.box_link__text {
  color: $link-text;
  text-decoration: underline;
}
</style>
