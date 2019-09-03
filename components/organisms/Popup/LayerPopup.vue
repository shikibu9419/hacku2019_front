<template lang="pug">
  .layer-popup
    .layer-popup__titles
      LayerSelectorItem.layer-popup__title(
        v-bind="backgroundAttr"
        :id="layer.id"
        :name="layer.name"
        :color="getLayerColorCom"
        :edit="false"
        )
      CustomButton.layer-popup--button(:handler="createLayer") 追加
    .layer-popup__create
      .layer-popup__create__new レイヤーを新規作成
        .layer-popup__create__new__content
          .layer-popup__create__new__content__name
            .layer-popup--column-title レイヤー名
            input(placeholder="レイヤー名", v-model="layer.name").layer-popup--column--name_input
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
  import ModalSvc from '~/services/ModalSvc'
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
      //closeModal: () => {},
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
        this.layer.id = this.$store.state.mapEdit.layers.length;
        this.layer.color = this.getLayerColor()
        this.$store.dispatch('mapEdit/addLayer', this.layer)
        this.layerSvcCreate(this.params.mapId, this.layer.name, this.layer.color)
        this.closePopup()
      },
      getLayerColor() {
        return this.layerColorItems.filter(item => {
          return item.selected
        })[0].value
      }
    },
    computed:{
      getLayerColorCom() {
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
          { text: '拒否', value: 0, selected: true },
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
    mixins: [ LayerSvc, ModalSvc ]
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
      border: none !important;
    }
    &--button {
      background: $theme-pink;
      color: $white;
      transition: .3s $bezier-fast-ease-out;
      cursor: pointer;
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
    &--column--name_input {
      margin: 8px;
      border: 2px solid $dark-gray;
      padding: 8px;
    }
  }
</style>