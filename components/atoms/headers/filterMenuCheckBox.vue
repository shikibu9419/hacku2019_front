<template lang="pug">
  .filter_menu__type
    .filter_menu__type
      .filter_menu__type__text {{text}}
      .filter_menu__type__input
        input(v-model="filter" type="checkbox")
</template>
<script>
export default {
  props:["text","filter"]
}
</script>