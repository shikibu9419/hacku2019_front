<template lang="pug">
  .sidebar_edit(:class="{'sidebar_edit--close': menuClose}")
    .sidebar_edit__wrapper
      .sidebar_edit__scroll
        .sidebar_edit__scroll__wrapper
          .sidebar_edit__header
            img.sidebar_edit__header__img(:src="'https://picsum.photos/400/300'")
            MapInfo(:map="map")
          .sidebar_edit__content
            MapTags(:map="map")
            LayerSelector(:layers="layers")
        .sidebar_edit__view_button
          EditViewButton
      .toggle_sidebar
        button(@click="toggleBar()").toggle_sidebar__button
          fa-icon(icon="angle-left").toggle_sidebar__button_icon
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
    MapTags: () => import('~/components/molecules/MapTags'),
    LayerSelector: () => import('~/components/molecules/LayerSelector'),
    EditViewButton: () => import('~/components/atoms/mapEdit/EditViewButton')
  },
  computed: {
    map() {
      return this.$store.state.mapEdit.map
    },
    layers() {
      return this.$store.state.mapEdit.layers
    },
  },
  methods: {
    toggleBar(){
      this.menuClose = (this.menuClose ? false : true)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";
@import "~/assets/styles/mixin.scss";

$padding: 16px;

$card-width : $sidemenu-width;
$card-height : $card-width / 3;

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
  height: 100%;
}

.sidebar_edit__scroll {
  position: relative;
  overflow-y: auto;
  height: calc(100% - 70px);
  padding-bottom: 20px;
}

.sidebar_edit__header {

  &__img {
    display: block;
    width: $card-width;
    height: $card-height;
    object-fit: cover;
    background: $theme-yellow;
  }
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

.sidebar_edit__view_button {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $white;
  padding: 16px 28px;
}
</style>
