<template lang="pug">
  .sidebar__layer_selector__item(:class="{active__layer_on: isActive}" @click="selectLayer")
    layer-icon.sidebar__layer_selector__item_icon(src="~/assets/svgs/layer.svg" :style="{fill: color}")
    p.sidebar__layer_selector__item_name {{ name }}
</template>

<script>
export default {
  props: ['id', 'name', 'color'],
  components: {
    LayerIcon: () => import('~/assets/svgs/layer.svg?inline')
  },
  computed: {
    backgroundFocused() {
      return this.$store.state.mapEdit.backgroundFocused
    },
    isActive() {
      if (this.$store.state.mapEdit.backgroundFocused)
        return this.id === 'background'

      return this.$store.state.mapEdit.activeLayer.id === this.id
    }
  },
  methods: {
    selectLayer() {
      if (this.id !== 'background')
        this.$store.dispatch('mapEdit/selectLayer', this.id)
      else
        this.$store.dispatch('mapEdit/focusBackground')
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.sidebar__layer_selector__item {
  height: 40px;
  // align elements vartically
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  overflow: hidden;

  &.active__layer_on {
    border: 2px solid $gray;
  }

  &_icon {
    display: inline-block;
    height: 30px;
  }

  &_name {
    display: inline;
  }
}
</style>
