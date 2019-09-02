<template lang="pug">
  .layer-popup
    .layer-popup__titles
      LayerSelectorItem.layer-popup__title(v-bind="backgroundAttr")
      CustomButton.layer-popup--button(:handler="createLayer") 追加
    .layer-popup__create
      .layer-popup__create__new レイヤーを新規作成
        .layer-popup__create__new__content
          .layer-popup__create__new__content__name
            .layer-popup--column-title レイヤー名
            input(placeholder="layer", v-model="layer.name")
          .layer-popup__create__new__content__color
            .layer-popup--column-title レイヤーカラー
            Selector(:component="'selectColorItem'" :items.async="layerColorItems"  v-bind:width="'100px'")
      .layer-popup__create__from-stock レイヤーをストックから追加
        .layer-popup__selectors
          Selector(v-bind:items.async="items" v-bind:width="'150px'")
          .layer-popup__selector--to ->
          Selector(v-bind:items.async="items" v-bind:width="'150px'")

</template>

<script>
  import LayerSelectorItem from '~/components/atoms/mapEdit/LayerSelectorItem'
  import Selector from '~/components/atoms/selector/Selector'
  import LayerSvc from '~/services/LayerSvc'
  import layerModel from '~/models/layer'
  import CustomButton from '~/components/atoms/CustomButton'
  export default {
    name: "LayerPopup.vue",
    props: {
      params: Object,
      // {
      //  mapId: number
      // }
      closeModal: () => {},
      onOk: () => {}
    },
    created() {
      this.layer.name = ''
      this.layer.color = 'light-pink'
    },
    methods: {
      createLayer() {
        if(!this.layer.name){
          alert('レイヤー名を入力してください')
          return
        }
        this.layer.color = this.getLayerColor()
        this.$store.dispatch('mapEdit/addLayer', this.layer)
        this.layerSvcCreate(this.params.mapId, this.layer.name, this.layer.color)
        this.closeModal()
      },
      getLayerColor() {
        return this.layerColorItems.filter(item => {
          return item.selected
        })[0].value
      }
    },
    components: {
      LayerSelectorItem,
      Selector,
      CustomButton
    },
    data() {
      return {
        layer: JSON.parse(JSON.stringify(layerModel)),
        backgroundAttr: {
          id: 'background',
          name: 'Yah◯o!地図',
          color: 'gray'
        },
        items: [
          { text: '', value: 0, selected: true },
          { text: '無理', value: 1, selected: false },
          { text: '閲覧可', value: 2, selected: false },
        ],
        layerColorItems: [
          { params: {}, value: 'light-pink', selected: true },
          { params: {}, value: 'pink', selected: false },
          { params: {}, value: 'red', selected: false },
          { params: {}, value: 'light-orange', selected: false },
          { params: {}, value: 'orange', selected: false },
          { params: {}, value: 'dark-orange', selected: false },
          { params: {}, value: 'light-yellow', selected: false },
          { params: {}, value: 'yellow', selected: false },
          { params: {}, value: 'dark-yellow', selected: false },
          { params: {}, value: 'light-green', selected: false },
          { params: {}, value: 'green', selected: false },
          { params: {}, value: 'blue-green', selected: false },
          { params: {}, value: 'light-sky', selected: false },
          { params: {}, value: 'sky', selected: false },
          { params: {}, value: 'cyan', selected: false },
          { params: {}, value: 'light-purple', selected: false },
          { params: {}, value: 'purple', selected: false },
          { params: {}, value: 'dark-blue', selected: false },
          { params: {}, value: 'light-gray', selected: false },
          { params: {}, value: 'gray', selected: false },
          { params: {}, value: 'black', selected: false }
        ]
      }
    },
    mixins: [ LayerSvc ]
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/styles/variables";
  .layer-popup {
    height: auto;
    width: 400px;
    flex-direction: column;
    &__titles {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: solid 2px $white;
      padding: 8px;
    }
    &__title {
      width: 70%;
    }
    &--button {
      background: $dark-gray;
      color: $white;
    }
    &__create {
      padding: 8px;
      display: flex;
      flex-direction: column;
      &__new {
        padding: 8px;
        display: flex;
        flex-direction: column;
        font-weight: bold;
        &__content {
          padding: 8px;
          &__name,&__color {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
        }
      }
      &__from-stock {
        padding: 8px;
        display: flex;
        flex-direction: column;
        font-weight: bold;
      }
    }
    &__selectors {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-weight: normal;
    }
    &--column-title {
      width: 35%;
      font-weight: normal;
    }
  }
</style>