<template lang="pug">
  .map_edit
    Header(
        :returnLink="'/'"
        :placeholder="'マップ内を検索する'"
        :type="'inmap'"
        :buttons="true"
        )
    .map_edit__map
      #map-canvas.map_edit__map__background(ref="layer" :class="{background__focus_on: backgroundFocused}")
      map-layer(v-for="layer in inactiveLayers" :key="layer.id" v-bind="layer")
      map-layer(v-bind="activeLayer")
      sidebar.map_edit__bar
      commentbar.map_edit__bar
    .map_edit__popup-modal
      component(v-for="(modal, i) in modals" :is="modal.component" :key="`modals_${i}`" v-bind:params="modal.params")
</template>

<script>
import axios from 'axios'

export default {
  layout: 'MapHeaderLayout',
  middleware: 'authenticated',
  components: {
    Header: () => import('~/components/organisms/Header'),
    MapLayer: () => import('~/components/organisms/mapEdit/MapLayer'),
    Sidebar: () => import('~/components/organisms/mapEdit/Sidebar'),
    Commentbar: () => import('~/components/organisms/mapEdit/Commentbar')
  },
  beforeCreate() {
    this.$store.dispatch('mapEdit/initLayers')
    this.$store.dispatch('mapEdit/selectLayer', 1)
    this.$store.dispatch('mapEdit/setLike', this.$store.state.user.id)
    this.$store.dispatch('mapEdit/setStock', this.$store.state.user.id)
  },
  mounted() {
    this.$store.dispatch('ymap/init')
  },
  methods: {
  },
  computed: {
    activeLayer () {
      return this.$store.getters['mapEdit/activeLayer']
    },
    inactiveLayers () {
      return this.$store.getters['mapEdit/inactiveLayers']
    },
    modals() {
      return this.$store.getters['modal/modals']
    },
    backgroundFocused() {
      return this.$store.state.mapEdit.backgroundFocused
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

.map_edit {
  width: 100%;
  height: 100vh;
}

.map_edit__map {
  position: relative;
  width: 100%;
  height: $main-height;
  background: $back-light-gray;
  overflow: hidden;

  &__background {
    width: 100%;
    height: 100%;

    &.background__focus_on {
      z-index: 9;
    }
  }
}

.map_edit__bar {
  z-index: 10;
}
</style>