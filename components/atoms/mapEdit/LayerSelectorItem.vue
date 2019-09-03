<template lang="pug">
  .sidebar__layer_selector__item(:class="{active__layer_on: isActive}" @click="selectLayer")
    LayerIcon.sidebar__layer_selector__item_icon(v-bind:class="[color]")
    .sidebar__layer_selector__item_name {{ name }}
    .sidebar__layer_edit(
      v-if="EditOnly"
      @click="editLayer()"
    )
      fa-icon(icon="pen").sidebar__layer_edit__icon

</template>

<script>
import ModalSvc from '~/services/ModalSvc'
import LayerSvc from '~/services/LayerSvc'

export default {
  props: ['id', 'name', 'color','edit'],
  components: {
    LayerIcon: () => import('~/assets/svgs/layer.svg?inline')
  },
  computed: {
    isActive() {
      if (this.$store.state.mapEdit.backgroundFocused)
        return this.id === 'background'

      return this.$store.state.mapEdit.activeLayer.id === this.id
    },
    EditOnly(){
      if(this.$route.path.match(/\/view$/)){
        return false
      }
      if(this.$route.path.match(/\/edit$/)){
        if(this.edit){
          return true
        }else{
          return false
        }
      }
    }
  },
  methods: {
    selectLayer() {
      if(this.edit){
        if(this.id !== 'null' || this.id !== 'undefined'){
          if (this.id !== 'background')
            this.$store.dispatch('mapEdit/selectLayer', this.id)
          else
            this.$store.dispatch('mapEdit/focusBackground')
          this.$store.commit('ymap/updateNow')
        }
      }
    },
    editLayer(){
      if(this.edit){
        //mapId, layerId, layerName, description, color
        this.openPopup('LayerSettingPopup', {
                mapId: null,
                layerId: this.id,
                layerName: this.name,
                description: null,
                color: this.color
        })
      }
    }
  },
  mixins: [ LayerSvc, ModalSvc ]
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";
@import "../../../assets/styles/atoms/layerSvg";

.sidebar__layer_selector__item {
  position: relative;
  height: 44px;
  // align elements vartically
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  overflow: hidden;
  background-color: $white;
  padding: 2px 4px;
  border: 2px solid transparent;

  &.active__layer_on {
    border: 2px solid $gray;
  }

  &_icon {
    display: block;
    height: 30px;
  }

  &_name {
    display: block;
    @include noto-font(1.6rem);
  }
}

.sidebar__layer_edit {
  position: absolute;
  top: 0;
  right: 4px;
  bottom: 0;
  margin: auto;
  width: min-content;
  height: min-content;
  cursor: pointer;
  &__icon {
    font-size: 1.6rem;
    color: $gray;
    padding: 2px;
  }
}
</style>
