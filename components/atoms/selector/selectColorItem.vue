<template lang="pug">
  .select-color-item
    LayerIcon.select-color-item__icon(v-bind:class="[item.value]")
    .select-color-item__name {{ getName() }}
</template>

<script>
  import LayerIcon from '~/assets/svgs/layer.svg?inline'
  export default {
    name: "selectColorItem.vue",
    components: {
      LayerIcon
    },
    props: {
      item: Object,
      // {
      //  param: Object,
      //  value: any,
      //  selected: boolean
      // }
    },
    methods: {
      getName() {
        if(!this.item.param) return ''
        return Object.keys(this.item.param).length ? this.item.param.name : ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/styles/variables";
  @import "../../../assets/styles/atoms/layerSvg";
  .select-color-item {
    background: $white;
    height: 32px;
    display: flex;
    align-items: center;
    &__icon {
      width: 24px;
      margin-right: 8px;
    }
  }
</style>