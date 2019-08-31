<template lang="pug">
  p.tag_list__item {{ name }}
</template>

<script>
export default {
  name: 'Tag',
  props: ['name']
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

$space: 5px;

.tag_list__item {
  display: inline;
  margin-left: $space;
  margin-right: $space;
  padding-left: $space;
  padding-right: $space;
  background: $white;
  border: none;
  border-radius: 4px;
}
</style>
