<template lang="pug">
  .header_cir_button__main
    button.header_cir_button(
        @click="pushShare()"
        :class="{'header_cir_button--on':mapShareOn}"
      )
      .header_cir_button__icon
        shareBtn.header_cir_button__icon__svg.header_cir_button__icon__svg--share
</template>

<script>
import ModalSvc from '~/services/ModalSvc';
import LayerSvc from '~/services/LayerSvc';
export default {
  components: {
    shareBtn: () => import('~/assets/svgs/share.svg?inline'),
  },
  mixins: [LayerSvc, ModalSvc],
  computed: {
    mapShareOn() {
      //VueXから取ってくる
      return false;
    },
  },
  methods: {
    pushShare() {
      //処理
      this.openPopup('ShareSettingPopup');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
@import '~/assets/styles/mixin.scss';
@import '~/assets/styles/atoms/headerButtons.scss';
</style>
