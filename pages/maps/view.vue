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
      component(v-for="(modal, i) in modals" :is="modal.component" :key="`modal_${i}`" v-bind:params="modal.params")
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
import LayerService from '~/services/LayerSvc'

export default {
  layout: 'MapHeaderLayout',
  middleware: 'authenticated',
  components: {
    Header: () => import('~/components/organisms/Header'),
    MapLayer: () => import('~/components/organisms/mapEdit/MapLayer'),
    Sidebar: () => import('~/components/organisms/mapEdit/Sidebar'),
    Commentbar: () => import('~/components/organisms/mapEdit/Commentbar'),
  },
  computed: {
    activeLayer() {
      return this.$store.getters['mapEdit/activeLayer'];
    },
    inactiveLayers() {
      return this.$store.getters['mapEdit/inactiveLayers'];
    },
    modals() {
      return this.$store.getters['modal/modals'];
    },
    backgroundFocused() {
      return this.$store.state.mapEdit.backgroundFocused;
    },
  },
  beforeCreate() {
    this.$store.dispatch('mapEdit/setLike', this.$store.state.user.id);
    this.$store.dispatch('mapEdit/setStock', this.$store.state.user.id);
    //     const socket = io(process.env.SOCKET_SERVER_URL)
    //
    //     socket.on('init', map => {
    //       this.$store.dispatch('mapEdit/initSocket', map)
    //     })
    //
    //     socket.on('map/update', prop => {
    //       this.$store.dispatch('mapEdit/mapSocket', {...prop, method: 'update'})
    //     })
    //
    //     socket.on('layer/add', layer => {
    //       this.$store.dispatch('mapEdit/layerSocket', {layer: layer, method: 'add'})
    //     })
    //     socket.on('layer/update', layer => {
    //       this.$store.dispatch('mapEdit/layerSocket', {layer: layer, method: 'update'})
    //     })
    //     socket.on('layer/delete', layer => {
    //       this.$store.dispatch('mapEdit/layerSocket', {layer: layer, method: 'delete'})
    //     })
    //
    //     socket.on('tool/add', prop => {
    //       this.$store.dispatch('mapEdit/toolSocket', {...prop, method: 'add'})
    //     })
    //     socket.on('tool/update', prop => {
    //       this.$store.dispatch('mapEdit/toolSocket', {...prop, method: 'update'})
    //     })
    //     socket.on('tool/delete', prop => {
    //       this.$store.dispatch('mapEdit/toolSocket', {...prop, method: 'delete'})
    //     })
    //
    //     socket.on('select/add', prop => {
    //       this.$store.dispatch('mapEdit/selectSocket', {...prop, method: 'add'})
    //     })
    //     socket.on('select/clear', prop => {
    //       this.$store.dispatch('mapEdit/selectSocket', {...prop, method: 'clear'})
    //     })

    //     this.$store.commit('mapEdit/init', socket)

    if (this.$store.state.mapEdit.layers.length)
      this.$store.commit(
        'mapEdit/selectLayer',
        this.$store.state.mapEdit.layers[0].id
      );
  },
  mounted() {
    this.$store.commit('ymap/init');
    //     this.setOffset()
    //     window.addEventListener('resize', () => this.setOffset())
    //     window.addEventListener('scroll', () => this.setOffset())
  },
  methods: {
    //     setOffset() {
    //       const rect = this.$refs.layer.getBoundingClientRect()
    //       const prop = {
    //         x: window.pageXOffset + rect.left,
    //         y: window.pageYOffset + rect.top
    //       }
    //       this.$store.dispatch('mapEdit/setOffset', prop)
    //     }
  },
  mixins: [LayerService],
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';

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
