<template lang="pug">
  .sidebar__layer_selector
    .sidebar__edit_category
      img.sidebar__edit_category__icon(src="~assets/svgs/layers.svg")
      .sidebar__edit_category__text
        span.sidebar__edit_category__text--strong {{layers.length}}
        span  Layers
    .sidebar__layer_selector__content
      .sidebar__layer_selector__content__item(v-for="layer in layers")
        layer-selector-item(:key="layer.id" v-bind="layer")
    .sidebar__layer_selector__add(
        @click="addLayer()"
        v-if="CanIEdit"
      )
      fa-icon(icon="plus-circle").sidebar__layer_selector__add_icon
      p.sidebar__layer_selector__add_label レイヤーを追加

    .sidebar__edit_category
      img.sidebar__edit_category__icon(src="~assets/svgs/layers.svg")
      .sidebar__edit_category__text
        //span.sidebar__edit_category__text--strong {{layers.length}}
        span Background
    .sidebar__background__content
        layer-selector-item(v-bind="backgroundAttr")

    button(@click="popup") hogehoge
    Selector(v-bind:component="'selectColorItem'" v-bind:items.async="items")
</template>

<script>
import ModalService from '~/services/ModalSvc'
import layerModel from '~/models/layer'
import Selector from '~/components/atoms/selector/Selector'

export default {
  props: ['layers'],
  data() {
    return {
      backgroundAttr: {
        id: 'background',
        name: 'Yah◯o!地図',
        color: 'gray'
      },
      items: [
        { param: {}, value: 'red', selected: true },
        { param: {}, value: 'pink', selected: true },
        { param: {}, value: 'orange', selected: true },
      ],
    }
  },
  computed: {
    CanIEdit(){
      if(this.$route.path === "/maps/edit"){
        return true
      }else{
        return false
      }
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
      this.modalSvc.openPopup('LayerSettingPopup', {}, null)
    }
  },
  components: {
    LayerSelectorItem: () => import('~/components/atoms/mapEdit/LayerSelectorItem'),
    Selector
  },
  mounted() {
    this.modalSvc = new ModalService(this.$store)
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "~/assets/styles/atoms/Sidebar.scss";

.sidebar__layer_selector {
  &__add {
    margin: 2px 0;
    padding: 4px 8px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    &_icon {
      display: block;
      font-size: 18px;
    }
    &_label {
      padding-left: 2px;
    }
    &:hover {
      background: $back-light-gray;
    }
  }
}

.sidebar__layer_selector__content__item {
  margin-bottom: 1px;
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
