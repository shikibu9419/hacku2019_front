<template lang="pug">
  .sidebar_edit__map_info
    h2.sidebar_edit__map_info__mapname hoge
    .sidebar_edit__map_info__user
      user-info
    .sidebar_edit__map_info__others
      .sidebar_edit__map_info__others_wrapper
        img.sidebar_edit__map_info__others_icon(src="~/assets/svgs/comment_mini.svg")
        p.sidebar_edit__map_info__others_label {{ 16 }}
      .sidebar_edit__map_info__others_wrapper
        img.sidebar_edit__map_info__others_icon(src="~/assets/svgs/like.svg")
        p.sidebar_edit__map_info__others_label {{ 47 }}
      .sidebar_edit__map_info__others_wrapper
        img.sidebar_edit__map_info__others_icon(src="~/assets/svgs/stock.svg")
        p.sidebar_edit__map_info__others_label {{ 8 }}
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
    UserInfo: () => import('~/components/atoms/UserInfo')
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
</style>
