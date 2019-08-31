<template lang="pug">
  .sidebar_edit(:class="{'sidebar_edit--close': menuClose}")
    .sidebar_edit__wrapper
      .toggle_sidebar
        button(@click="toggleBar()").toggle_sidebar__button
          fa-icon(icon="angle-left").toggle_sidebar__button_icon
    .sidebar_edit__header
    map-info
    .sidebar_edit__content
      layer-selector
</template>

<script>
import layer from '~/models/layer'

export default {
  data(){
    return {
      menuClose: false,
    }
  },
  components: {
    MapInfo: () => import('~/components/molecules/MapInfo'),
    LayerSelector: () => import('~/components/molecules/LayerSelector')
  },
  computed: {
    layers () {
      return this.$store.state.mapEdit.layers
    }
  },
  methods: {
    toggleBar(){
      this.menuClose = (this.menuClose ? false:true)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

$padding: 20px;

.sidebar_edit {
  background-color: $back-gray;
  position: absolute;
  top: 0;
  left: 0;
  width: $sidemenu-width;
  height: 100%;
  z-index: 10;
  transform: translateX(0);
  transition: .2s $bezier-ease-out;

  &--close{
    transform: translateX(-$sidemenu-width);
    .toggle_sidebar__button_icon{
      transform: scale(-1,1);
    }
  }
}

.sidebar_edit__wrapper{
  position: relative;
}

.sidebar_edit__content {
  padding-left: $padding;
  padding-right: $padding;
}

.toggle_sidebar {
  position: absolute;
  top:12px;
  left: $sidemenu-width;
}
.toggle_sidebar__button {
  background: $white;
  border: 2px solid $dark-gray;
  border-radius: 0 8px 8px 0;
  border-left: none;
  color: $dark-gray;
  padding: 4px 8px;
  padding-left: 4px;
  &:focus{
    outline: none;
    border-color: $theme-pink;
    color: $theme-pink;
  }
}
.toggle_sidebar__button_icon{
  transition: .2s $bezier-ease-out;
  font-size: 1.8rem;
  transform: scale(1);
}
</style>
