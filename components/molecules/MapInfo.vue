<template lang="pug">
  .sidebar_edit__map_info
    h2.sidebar_edit__map_info__mapname hoge
    .sidebar_edit__map_info__user
      UserInfo(
        :author="'username'"
        :editors="null"
      )
    .sidebar_edit__map_info__others
      NumberInfo(
        :comments="'5'"
        :like="'8'"
        :stock="'3'"
      ).number_info__sidebar
</template>

<script>
import ModalService from '~/services/ModalSvc'

export default {
  computed: {
    layers () {
      return this.$store.state.mapEdit.layers
    }
  },
  methods: {
    // あとでmodalとかに移行
    addLayer() {
      const prop = {
        name: "layer",
        color: "red",
      }
      this.$store.dispatch('mapEdit/addLayer', prop)
    },
    popup() {
      this.modalSvc.openPopup('BoxAndPinPopup', {}, null)
    }
  },
  components: {
    LayerSelectorItem: () => import('~/components/atoms/mapEdit/LayerSelectorItem'),
    UserInfo: () => import('~/components/atoms/mapInfo/UserInfo'),
    NumberInfo: () => import('~/components/atoms/mapInfo/NumberInfo')
  },
  created() {
    this.modalSvc = new ModalService(this.$store)
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/variables.scss";

$padding: 10px;

.sidebar_edit__map_info {
  background-color: $white;

  &__others_wrapper {
    display: inline-block;
    padding-left: $padding;
    padding-right: $padding;
  }

  &__others_icon {
    display: inline-block;
    height: 20px;
  }

  &__others_label {
    display: inline;
    font-weight: bold;
  }
}

.number_info__sidebar {
  margin: 0;
}
</style>
