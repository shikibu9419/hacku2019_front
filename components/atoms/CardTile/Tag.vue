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

$margin: 2px;
$padding: 5px;

.tag_list__item {
  display: inline;
  margin-left: $margin;
  margin-right: $margin;
  padding-left: $padding;
  padding-right: $padding;
  background: $white;
  border: none;
  border-radius: 4px;
}
</style>
