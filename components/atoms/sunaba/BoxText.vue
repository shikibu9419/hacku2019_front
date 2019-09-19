<template lang="pug">
  .box_data
    .box_text {{box.text}}
</template>
<script>
export default {
  props: ['box'],
};
</script>
<style lang="scss" scoped>
.box_text {
  padding: 4px 6px;
  white-space: pre-wrap;
}
</style>
