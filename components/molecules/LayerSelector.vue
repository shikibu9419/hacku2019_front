<template lang="pug">
  .sidebar__layer_selector
    img.sidebar__title_icon(src="~assets/svgs/layers.svg")
    p.sidebar__title {{ layers.length }} Layers

    .sidebar__layer_selector__content
      layer-selector-item(v-for="layer in layers" :key="layer.id" v-bind="layer")
    .sidebar__layer_selector__add(@click="addLayer")
      font-awesome-icon.sidebar__layer_selector__add_icon(icon="plus-circle")
      p.sidebar__layer_selector__add_label レイヤーを追加

    img.sidebar__title_icon(src="~assets/svgs/layers.svg")
    p.sidebar__title Background
    .sidebar__background__content
      layer-selector-item(v-bind="backgroundAttr")

    button(@click="popup") hogehoge
</template>

<script>
import ModalService from '~/services/ModalSvc'
import layerModel from '~/models/layer'

export default {
  data() {
    return {
      backgroundAttr: {
        id: 'background',
        name: 'Yah◯o!地図',
        color: 'gray'
      }
    }
  },
  computed: {
    layers () {
      return this.$store.state.mapEdit.layers
    }
  },
  methods: {
    // あとでmodalとかに移行
    addLayer() {
      let layer = JSON.parse(JSON.stringify(layerModel))

      layer.name = 'layer'
      layer.color = 'red'
      this.$store.dispatch('mapEdit/addLayer', layer)
    },
    popup() {
      this.modalSvc.openPopup('BoxAndPinPopup', {}, null)
    }
  },
  components: {
    LayerSelectorItem: () => import('~/components/atoms/mapEdit/LayerSelectorItem')
  },
  created() {
    this.modalSvc = new ModalService(this.$store)
  },
}
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.sidebar__layer_selector {
  &__content {
    background-color: $white;
  }

  &__add_icon {
    display: inline-box;
    height: 20px;
  }

  &__add_label {
    display: inline;
  }
}

.sidebar__background__content {
  background-color: $white;
}

.sidebar__title_icon {
  display: inline-block;
  height: 20px;
}

.sidebar__title {
  display: inline;
  font-weight: bold;
}
</style>
