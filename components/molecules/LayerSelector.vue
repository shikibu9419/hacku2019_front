<template lang="pug">
  .sidebar__layer_selector
    .sidebar__edit_category
      img.sidebar__edit_category__icon(src="~assets/svgs/layers.svg")
      .sidebar__edit_category__text
        span.sidebar__edit_category__text--strong {{layers.length}}
        span  Layers
    .sidebar__layer_selector__content
      .sidebar__layer_selector__content__item(v-for="layer in layers")
        layer-selector-item(:key="layer.id" v-bind="layer" :edit="true")
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
        layer-selector-item(v-bind="backgroundAttr" :edit="true")
</template>

<script>
import ModalSvc from '~/services/ModalSvc';
import LayerSvc from '~/services/LayerSvc';
import layerModel from '~/models/layer';
import Selector from '~/components/atoms/selector/Selector';

export default {
  components: {
    LayerSelectorItem: () =>
      import('~/components/atoms/mapEdit/LayerSelectorItem'),
    Selector,
  },
  mixins: [LayerSvc, ModalSvc],
  props: ['layers'],
  data() {
    return {
      backgroundAttr: {
        id: 'background',
        name: 'Yah◯o!地図',
        color: 'gray',
      },
      items: [
        { param: {}, value: 'red', selected: true },
        { param: {}, value: 'pink', selected: true },
        { param: {}, value: 'orange', selected: true },
      ],
    };
  },
  computed: {
    CanIEdit() {
      if (this.$route.path === '/maps/edit') {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    // あとでmodalとかに移行
    addLayer() {
      this.openPopup('LayerPopup', {}, null);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';
@import '~/assets/styles/atoms/Sidebar.scss';

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
