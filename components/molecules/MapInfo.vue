<template lang="pug">
  .sidebar_edit__map_info
    .sidebar_edit__map_info__mapname {{ map.name }}
    .sidebar_edit__map_info__user
      // TODO: author name & editors name
      UserInfo(
        :author="'username'"
        :editors="null"
      )
    .sidebar_edit__map_info__others
      // TODO: num
      NumberInfo(
        :comments="'5'"
        :like="'8'"
        :stock="'3'"
      ).number_info__sidebar
</template>

<script>
import ModalSvc from '~/services/ModalSvc';

export default {
  components: {
    LayerSelectorItem: () =>
      import('~/components/atoms/mapEdit/LayerSelectorItem'),
    UserInfo: () => import('~/components/atoms/mapInfo/UserInfo'),
    NumberInfo: () => import('~/components/atoms/mapInfo/NumberInfo'),
  },
  mixins: [ModalSvc],
  props: ['map'],
  computed: {
    layers() {
      return this.$store.state.mapEdit.layers;
    },
  },
  methods: {
    // あとでmodalとかに移行
    addLayer() {
      const prop = {
        name: 'layer',
        color: 'red',
      };
      this.$store.dispatch('mapEdit/addLayer', prop);
    },
    popup() {
      this.openPopup('BoxAndPinPopup', {}, null);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';

$padding: 10px;

.sidebar_edit__map_info {
  background-color: $white;
  padding: 16px;
  padding-top: 4px;
  padding-bottom: 8px;

  &__mapname {
    @include noto-font(2.4rem);
  }
  &__user {
    margin-top: 4px;
  }

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
  margin-top: 2px !important;
}
</style>
